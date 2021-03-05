import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import NoteRepository from '../../store/noteRepository';
import EditorHeader from './EditorHeader';
import {
  EditorContainerWrapper,
  ReadModeContainer,
  ReadModeIcon,
  ReadModeText,
  editorContentCSS
} from '../../styles/editorStyle';
import lockImg from '../../assets/lock.svg'
import TagListContainer from '../tag/TagListContainer';
import { Editor } from '@tinymce/tinymce-react';
import FileLayout from './FileLayout';
import GlobalVariable from '../../GlobalVariable';
import { checkUrlValidation, isOpenLink } from '../common/validators.js'
import { changeLinkDialog, changeButtonStyle, openLink, customAutoLinkPattern } from './customLink.js'
import PageStore from '../../store/pageStore';
import {
  downloadFile,
  driveCancelCb,
  driveSaveCancel,
  driveSaveSuccess,
  driveSuccessCb,
  handleEditorContentsListener,
  handleUnselect,
  handleUpload,
  openSaveDrive,
  isValidFileNameLength
} from '../common/NoteFile';
import { ComponentStore, WaplSearch } from 'teespace-core';
import Mark from 'mark.js';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// useEffect return 문에서 쓰면 변수값이 없어 저장이 안 됨
// tinymce.on('BeforeUnload', ()=>{})가 동작을 안해서 유지
window.addEventListener('beforeunload', function (e) {
  if (!PageStore.isReadMode()) PageStore.handleSave();
})
const EditorContainer = () => {
  const { NoteStore, PageStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();
  const DriveAttachModal = ComponentStore.get('Drive:DriveAttachModal');
  const FilePreview = ComponentStore.get('Drive:FilePreview');
  const DriveSaveModal = ComponentStore.get('Drive:DriveSaveModal');

  const editorWrapperRef = useRef(null);
  const instance = new Mark(EditorStore.tinymce?.getBody());
  let eleArr = EditorStore.tinymce?.getBody()?.querySelectorAll('mark');

  const [searchValue, setSearchValue] = useState('');
  const instanceOption = {
    "accuracy": {
      "value": "partially",
      "limiters": []
    },
    "done": function (count) {
      EditorStore.setSearchTotalCount(count);
    }
  };
  const getEditorContent = content => {
    PageStore.setContent(content);
  };

  const setNoteEditor = instance => {
    EditorStore.setEditor(instance);
    // 첫 setup 으로 생성시 한번만 불림, instance 타이밍 이슈로 mode가 잘 안먹음
    initialMode();
  };

  const handleFileHandler = (blobInfo) => {
    let fileName = blobInfo.blob().name;
    let dotIndex = fileName.lastIndexOf('.');
    let fileExtension;
    let fileSize = blobInfo.blob().size;
    let isImage;
    if (dotIndex !== -1) {
      fileExtension = fileName.substring(dotIndex + 1, fileName.length);
      fileName = fileName.substring(0, dotIndex);
    }

    isImage = fileExtension && EditorStore.uploadFileIsImage(fileExtension);
    const fd = new FormData();
    if (isImage) fd.append('image', blobInfo.blob());
    else fd.append('file', blobInfo.blob());

    EditorStore.setUploadFileDTO({ fileName, fileExtension, fileSize }, fd, isImage ? 'image' : 'file');

    // 먼저 파일 이름 길이 체크하고 upload해야
    if (EditorStore.isFileFilteredByNameLen) NoteStore.setModalInfo('failUploadByFileNameLen');
    else if (EditorStore.uploadDTO.length === EditorStore.uploadLength) handleUpload();
  };

  const handleFileBlob = (type) => {
    var input = document.createElement('input');
    if (type === 'image') {
      input.setAttribute('type', 'file');
      input.setAttribute('accept', ['image/*', 'video/*']);
      input.setAttribute('multiple', true);
    }
    else {
      input.setAttribute('type', 'file');
      input.setAttribute('multiple', true);
    }
    input.onchange = function () {
      let files = [...this.files];
      let uploadsize = 0;
      let totalsize = 20000000000; // 20GB
      // 파일명 filtering
      const filteredFiles = files.filter(file => isValidFileNameLength(file.name));
      if (files.length !== filteredFiles.length) {
        files = filteredFiles;
        EditorStore.setIsFileFilteredByNameLen(true);
        if (files.length === 0) { NoteStore.setModalInfo('failUploadByFileNameLen'); return };
      }

      EditorStore.setFileLength(files.length);
      if (EditorStore.uploadLength > 30) {
        NoteStore.setModalInfo('failUpload');
        return;
      }

      if (files) {
        for (let i = 0; i < files.length; i++) {
          uploadsize += files[i].size
        }
        if (uploadsize > totalsize) {
          NoteStore.setModalInfo('sizefailUpload');
          return;
        }
      }
      for (let i = 0; i < files.length; i++) {
        (function (file) {
          var reader = new FileReader();
          reader.onload = function () {
            var id = 'blobid' + (new Date()).getTime();
            var blobCache = EditorStore.tinymce.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64, file.name);
            blobCache.add(blobInfo);
            handleFileHandler(blobInfo, { title: file.name });
          };
          reader.readAsDataURL(file);
        })(files[i])
      }
    };
    input.click();
  }
  const handleSearchInputChange = (value) => {
    EditorStore.setSearchValue(value);
  }

  const handleSearchEditor = () => {
    if (searchValue === EditorStore.searchValue) {
      handleSearchNext();
    } else {
      instance.unmark();
      setSearchValue(EditorStore.searchValue);
      instance.mark(EditorStore.searchValue, instanceOption);
      eleArr = EditorStore.tinymce?.getBody()?.querySelectorAll('mark');
      if (EditorStore.searchTotalCount === 0) EditorStore.setSearchCurrentCount(0);
      else {
        EditorStore.setSearchCurrentCount(1);
        eleArr[EditorStore.searchCurrentCount - 1].classList.add('searchselected');
      }
      EditorStore.setSearchResultState(true);
    }
  }

  const handleClearSearch = () => {
    EditorStore.setSearchValue('');
    setSearchValue('');
    EditorStore.setIsSearch(false);
    EditorStore.setSearchResultState(false);
    instance.unmark();
  }
  const handleSearchPrev = () => {
    if (EditorStore.searchTotalCount === 0) return;
    else {
      if (EditorStore.searchCurrentCount > 1) {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(EditorStore.searchCurrentCount - 1);
      }
      else {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(EditorStore.searchTotalCount);
      }
      eleArr[EditorStore.searchCurrentCount - 1].scrollIntoView(false);
      eleArr[EditorStore.searchCurrentCount - 1].classList.add('searchselected');
    }
  }

  const handleSearchNext = () => {
    if (EditorStore.searchTotalCount === 0) return;
    else {
      if (EditorStore.searchCurrentCount < EditorStore.searchTotalCount) {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(EditorStore.searchCurrentCount + 1);
      } else {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(1);
      }
      eleArr[EditorStore.searchCurrentCount - 1].scrollIntoView(false);
      eleArr[EditorStore.searchCurrentCount - 1].classList.add('searchselected');
    }
  }

  useLayoutEffect(() => {
    // 모드 변경의 목적
    if (PageStore.isReadMode()) {
      EditorStore.tinymce?.setMode('readonly');
      EditorStore.editor?.addEventListener('click', handleUnselect);
    }
    else {
      EditorStore.tinymce?.setMode('design');
      EditorStore.editor?.removeEventListener('click', handleUnselect);
    }
  }, [PageStore.isReadMode()]);

  const initialMode = () => {
    if (PageStore.isReadMode()) EditorStore.tinymce?.setMode('readonly');
    else EditorStore.tinymce?.setMode('design');
  };

  useEffect(() => {
    if (editorWrapperRef.current) {
      GlobalVariable.setEditorWrapper(editorWrapperRef.current);
    }
    return () => {
      GlobalVariable.setEditorWrapper(null);
    }
  }, [editorWrapperRef.current]);

  /*
    **새 챕터 생성 후 [+ 새 페이지] 버튼을 눌러 본문 작성한 뒤 다른 영역을 클릭 > 팝업창에서 저장 안함을 클릭하면 해당 페이지 화면이 그대로 유지되는 이슈
    currentPageData는 서비스 받아올 때만 set하고 PageStore.noteContent는 editorChange 이벤트시 set하는데
    새 노트에서 작성하다가 지우면 currentPageData는 여전히 <p><br></p> 였기 때문에 
    새로 받아오는 노트 컨텐츠도 <p><br></p>인 경우 editor content가 안바뀌는 이슈 수정
      && (PageStore.currentPageData.note_content !== EditorStore.tinymce.getContent)
  */
  useEffect(() => {
    // todo : 테스트 후 value를 <p><br></p>로 바꾸고 마지막 조건 없애기
    if (EditorStore.tinymce && PageStore.currentPageData.note_id
      && (PageStore.currentPageData.note_content !== EditorStore.tinymce.getContent)) {
      EditorStore.tinymce.setContent(PageStore.currentPageData.note_content);
    }
  }, [PageStore.currentPageData.note_id]);

  // Search Toggle 시 reset
  useEffect(() => {
    return () => setSearchValue('');
  }, [EditorStore.isSearch]);

  return useObserver(() => (
    <>
      <EditorContainerWrapper ref={editorWrapperRef} mode={PageStore.isReadMode().toString()} isFile={EditorStore.isFile.toString()} isSearch={EditorStore.isSearch.toString()}>
        <EditorHeader />
        {PageStore.isReadMode() && !EditorStore.isSearch ? (
          <ReadModeContainer style={{ display: 'flex' }}>
            <ReadModeIcon src={lockImg} />
            <ReadModeText>{t('readmode')}</ReadModeText>
          </ReadModeContainer>) : null}
        {EditorStore.isSearch ? (
          <ReadModeContainer style={{ display: 'flex' }}>
            <StyledWaplSearch
              onChange={handleSearchInputChange}
              placeholder={t('searchContent')}
              onEnterDown={handleSearchEditor}
              onClear={handleClearSearch}
              onSearchPrev={handleSearchPrev}
              onSearchNext={handleSearchNext}
              className=''
              isCountExist={EditorStore.searchResultState ? true : false}
              SearchNumber={EditorStore.searchCurrentCount}
              TotalNumber={EditorStore.searchTotalCount}
            />
          </ReadModeContainer>) : null}
        <Editor
          id="noteEditor"
          value={PageStore.currentPageData.note_content}
          init={{
            selector: '#noteEditor',
            menubar: false,
            toolbar_mode: 'floating',
            height: 'calc(100% - 8.8rem)',
            setup: function (editor) {
              setNoteEditor(editor);
              // init 함수 : 처음 에디터 켰을 때, 그리고 태그 화면 가서 새 페이지 추가 버튼 눌렀을 때 동작한다.
              editor.on('init', () => {
                // [축소 모드] pdf 내보내기 후 페이지 선택하면 iframe 생기기 전에 useEffect를 타서 setContent가 안 먹음
                // init에도 useEffect 내용 추가
                if (PageStore.currentPageData.note_content &&
                  (PageStore.currentPageData.note_content !== EditorStore.tinymce.getContent)) {
                  EditorStore.tinymce.setContent(PageStore.currentPageData.note_content);
                }
                editor.focus();
                handleEditorContentsListener();
              })
              editor.on('PostProcess', () => {
                handleEditorContentsListener();
              })
              // fired when a dialog has been opend
              editor.on('OpenWindow', (e) => {
                try {
                  // link dialog 열렸을 때
                  if (Object.keys(e.dialog.getData()).includes('url')) {
                    changeLinkDialog();
                  }
                } catch (err) { console.log(err) }
              })
              editor.on('NodeChange', function (e) {
                if (e.element.children[0] !== undefined) {
                  if (e.element.children[0].tagName === 'IMG') {
                    EditorStore.setImgElement(e.element.children[0]);
                  }
                }
                // url invalid면 red highlighting
                if (isAnchorElement(e.element)) {
                  if (!isOpenLink(e.element.href)) {  // url이거나 basic plan 아니면서 메일인 경우
                    e.element.classList.add('note-invalidUrl')
                  } else {
                    e.element.classList.remove('note-invalidUrl')
                  }
                }
              });
              // Register some other event callbacks...
              editor.on('click', function (e) {
                handleUnselect();
              });

              editor.on('keydown', (e) => {
                const target = getAnchorElement();
                if (target && e.code === "Space") {
                  const curCaretPosition = editor.selection.getRng().endOffset;
                  const _length = target.textContent.length;
                  // anchor tag앞에 caret 놓으면 getAnchorElement() === null
                  if (curCaretPosition === _length - 1) {
                    e.preventDefault();
                    e.stopPropagation();
                    target.insertAdjacentHTML('afterend', '&nbsp;')
                    editor.selection.setCursorLocation(target.nextSibling, 1);
                  }
                }
              })

              // 정렬 그룹 버튼
              editor.ui.registry.addGroupToolbarButton('alignment', {
                icon: 'align-center',
                tooltip: t('align'),
                items: 'alignleft aligncenter alignright alignjustify'
              });

              editor.ui.registry.addButton('insertImage', {
                icon: 'image',
                tooltip: t('insertImages'),
                onAction: function () {
                  editor.editorUpload.uploadImages(handleFileBlob('image'))
                }
              });

              editor.ui.registry.addIcon('fileIcon', `
                <?xml version="1.0" encoding="UTF-8"?>
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                    <g id="Icon/system/attach2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M16.2531062,9.4970085 L9.68131059,16.1137765 C8.44870863,17.3548135 6.36532803,17.2775531 5.03811517,15.9412578 C3.71044964,14.6045067 3.63371435,12.506869 4.86631631,11.2658321 L12.5598106,3.51968926 C13.2837555,2.79079022 14.5101025,2.83947794 15.2927597,3.6274911 C16.075417,4.41550426 16.1233211,5.64978765 15.3993762,6.37868669 L8.93712984,12.8851558 C8.72184198,13.1019169 8.35343399,13.0827134 8.11533237,12.8429824 C7.87677808,12.6027956 7.85815776,12.2323223 8.07344562,12.0155612 L13.4137633,6.63869838 C13.818021,6.23167424 13.8231955,5.57696759 13.4253208,5.17637015 C13.0274461,4.77577271 12.3771893,4.78098258 11.9729316,5.18800672 L6.63261392,10.5648695 C5.6599822,11.5441572 5.7080297,13.1866593 6.74101052,14.2267091 C7.77353867,15.2663031 9.40487715,15.3146794 10.3775089,14.3353917 L16.8397553,7.82892259 C18.3214954,6.33704257 18.2441654,3.83164057 16.6670816,2.24376443 C15.0899978,0.655888293 12.6016244,0.578029109 11.1198843,2.06990913 L3.42638994,9.81605192 C1.43554145,11.8205243 1.5417026,15.1892806 3.66334199,17.3254389 C5.78452871,19.4611414 9.13084112,19.5684848 11.1216896,17.5640124 L17.6934852,10.9472444 C18.0976159,10.5403481 18.1027888,9.88584718 17.7050391,9.4853756 C17.3072894,9.08490401 16.6572369,9.09011224 16.2531062,9.4970085 Z" id="Fill-1" fill="#000000"></path>
                    </g>
                </svg>
              `);
              editor.ui.registry.addMenuButton('insertfile', {
                icon: 'fileIcon',
                tooltip: t('attachFile'),
                fetch: function (callback) {
                  var items = [
                    {
                      type: 'menuitem',
                      text: t('attachDrive'),
                      onAction: function () {
                        EditorStore.setIsDrive(true);
                      }
                    },
                    {
                      type: 'menuitem',
                      text: t('attachLocal'),
                      onAction: function () {
                        editor.editorUpload.uploadImages(handleFileBlob('file'))
                      }
                    }
                  ];
                  callback(items);
                }
              });
              var isAnchorElement = function (node) {
                return node.nodeName.toLowerCase() === 'a' && node.href;
              };

              var getAnchorElement = function () {
                var node = editor.selection.getNode();
                return isAnchorElement(node) ? node : null;
              };
              editor.ui.registry.addToggleButton('customToggleLink', {
                icon: 'link',
                onAction: function (_) {
                  editor.execCommand('mceLink');
                },
                onSetup: function (api) {
                  // 텍스트 블록 선택했을 때 링크 말고 다른 menu도 떠서 블록선택 안했을 때만 보이게 하기
                  if (editor.selection.isCollapsed()) changeButtonStyle(0, 0);
                }
              });
              editor.ui.registry.addToggleButton('customToggleUnLink', {
                icon: 'unlink',
                onAction: function (_) {
                  editor.execCommand('Unlink');
                },
                onSetup: function (api) {
                  if (editor.selection.isCollapsed()) changeButtonStyle(1, 0);
                }
              });
              editor.ui.registry.addToggleButton('customToggleOpenLink', {
                icon: 'new-tab',
                onAction: function (_) {
                  openLink({ isOnlyReadMode: false, url: getAnchorElement()?.href, target: '_blank' });
                },
                onSetup: function (api) {
                  const targetUrl = getAnchorElement() ? isOpenLink(getAnchorElement().href) : null;
                  if (!targetUrl) api.setDisabled(true)
                  if (editor.selection.isCollapsed()) changeButtonStyle(2, 0);
                }
              });
              // l-click하면 나오는 메뉴
              editor.ui.registry.addContextToolbar('link-toolbar', {
                predicate: isAnchorElement,
                items: 'customToggleLink customToggleUnLink customToggleOpenLink',
                position: 'selection',
                scope: 'node'
              });
              editor.ui.registry.addButton('changeImage', {
                icon: 'gallery',
                tooltip: t('replaceImages'),
                onAction: function (_) {
                  handleFileBlob('image');
                }
              });

              // 이미지 다운로드/삭제
              editor.ui.registry.addMenuButton('downloadImage', {
                icon: 'save',
                tooltip: t('download'),
                fetch: function (callback) {
                  var items = [
                    {
                      type: 'menuitem',
                      text: t('saveToDrive'),
                      onAction: function () {
                        const node = editor.selection.getNode();
                        let fileName = node.getAttribute('data-name');
                        let fileExtension
                        let dotIndex = fileName.lastIndexOf('.');
                        if (dotIndex !== -1) {
                          fileExtension = fileName.substring(dotIndex + 1, fileName.length);
                          fileName = fileName.substring(0, dotIndex);
                        }
                        EditorStore.setSaveFileMeta(node.id, fileExtension, fileName);
                        openSaveDrive();
                      }
                    },
                    {
                      type: 'menuitem',
                      text: t('saveToMyPC'),
                      onAction: function () {
                        const id = editor.selection.getNode().id;
                        if (id) downloadFile(id);
                        else downloadFile();
                      }
                    }
                  ];
                  callback(items);
                }
              });
              editor.ui.registry.addButton('deleteImage', {
                icon: 'remove',
                tooltip: t('delete'),
                onAction: function () {
                  EditorStore.deleteImage();
                },
              });
            },
            a11y_advanced_options: true,
            image_description: false,
            image_dimensions: false,
            image_uploadtab: true,
            file_picker_types: 'image media',
            automatic_uploads: true,
            file_picker_callback: handleFileBlob,
            default_link_target: '_blank',
            target_list: false,
            link_assume_external_targets: 'http',
            link_context_toolbar: false,
            link_title: false,
            anchor_top: false, // link 입력중 dropdown으로 <top> 안뜨게 해
            anchor_bottom: false,
            extended_valid_elements: 'a[href|target=_blank]',
            quickbars_insert_toolbar: false,
            quickbars_image_toolbar: false,
            quickbars_selection_toolbar: 'forecolor backcolor | bold italic underline strikethrough | link',
            imagetools_toolbar: 'rotateleft rotateright flipv fliph editimage changeImage | downloadImage deleteImage',
            language: NoteStore.i18nLanguage === 'ko' ? 'ko_KR' : NoteStore.i18nLanguage,
            toolbar_drawer: false,
            paste_data_images: true, // add images by drag and drop
            paste_postprocess: function (plugin, args) {
              const target = args.node.textContent;
              if (checkUrlValidation(target)) {
                let temp = document.createElement('a');
                temp.href = target;
                temp.setAttribute('data-mce-href', target);
                temp.textContent = target;
                args.node.textContent = '';
                args.node.appendChild(temp);
              }
              /*
                p tag 없이 br 태그만 있는 경우
                현재는 contents 전체가 하나의 ptag 안에 있어서 블록 설정한 부분만 정렬이 불가능
                복붙하고나서 일부만 정렬하고 싶을 때 주석 풀어서 각각 p tag 만들기
              */
              // if (args.node.querySelector('p') === null && args.node.querySelectorAll('br').length) {
              //   const parent = document.createDocumentFragment();
              //   let temp = document.createElement('p');
              //   [...args.node.childNodes].forEach((node, idx, self) => {
              //     if (node.nodeName === 'BR') {
              //       if (temp.childElementCount > 0) parent.appendChild(temp);
              //       temp = document.createElement('p');

              //       const $pbr = document.createElement('p');
              //       $pbr.appendChild(node);
              //       parent.appendChild($pbr);
              //     } 
              //     else if ((idx+1) === self.length) {
              //       temp.appendChild(node);
              //       parent.appendChild(temp);
              //     } else temp.appendChild(node);
              //   })
              //   args.node.appendChild(parent);
              // }
            },
            autolink_pattern: customAutoLinkPattern(),
            contextmenu: 'link-toolbar image imagetools table',
            table_sizing_mode: 'fixed', // only impacts the width of tables and cells
            content_style: editorContentCSS
          }}
          onEditorChange={getEditorContent}
          apiKey={GlobalVariable.apiKey}
          plugins="print preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars"
          toolbar="undo redo | formatselect | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | link | hr table insertdatetime | insertImage insertfile"
        />
        {EditorStore.isFile ? <FileLayout /> : null}
        <TagListContainer />
        <DriveAttachModal visible={EditorStore.isDrive}
          successCallback={driveSuccessCb}
          cancelCallback={driveCancelCb}
          roomId={NoteRepository.WS_ID}
        />
        {EditorStore.isPreview
          ? <FilePreview
            visible={EditorStore.isPreview}
            fileMeta={EditorStore.previewFileMeta}
            handleClose={() => EditorStore.setIsPreview(false)}
          />
          : null
        }
        <DriveSaveModal
          visible={EditorStore.isSaveDrive}
          successCallback={driveSaveSuccess}
          cancelCallback={driveSaveCancel}
          file={EditorStore.saveDriveMeta}
          roomId={NoteRepository.WS_ID}
        />
      </EditorContainerWrapper>
    </>
  ));
};

export default EditorContainer;

const StyledWaplSearch = styled(WaplSearch)`
  width: 100%;
  background-color: #F7F4EF;
  margin: 0 0.438rem;
  border-bottom: 0rem solid #17202b;
  border-radius: 0.375rem;
  &:hover:not(:focus-within){
    background-color: #F7F4EF !important;
  }
  &:focus-within {
    background-color: #FFFFFF;
    border: 1px solid #7B7671;
  }
`