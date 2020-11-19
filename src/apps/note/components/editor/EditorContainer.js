import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import EditorHeader from './EditorHeader';
import {
  EditorContainerWrapper,
  ReadModeContainer,
  ReadModeText,
  editorContentCSS
} from '../../styles/editorStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import TagListContainer from '../tag/TagListContainer';
import { Editor } from '@tinymce/tinymce-react';
import FileLayout from './FileLayout';
import GlobalVariable from '../../GlobalVariable';
import { checkUrlValidation } from '../common/validators.js'
import { changeLinkDialog, changeButtonStyle } from './customLink.js'
import PageStore from '../../store/pageStore';
import NoteStore from '../../store/noteStore';
import { downloadFile, handleLinkListener } from '../common/NoteFile';

// useEffect return 문에서 쓰면 변수값이 없어 저장이 안 됨
// tinymce.on('BeforeUnload', ()=>{})가 동작을 안해서 유지
window.addEventListener('beforeunload', function (e) {
  if (!PageStore.isReadMode()) PageStore.handleSave();
})

const EditorContainer = () => {
  const { PageStore, EditorStore } = useNoteStore();
  const editorWrapperRef = useRef(null);

  const getEditorContent = content => {
    PageStore.setContent(content);
  };

  const setNoteEditor = instance => {
    EditorStore.setEditor(instance);
    // 첫 init 때 onChange가 불리지 않아서 setting...
    PageStore.setContent(PageStore.currentPageData.note_content);
    // 첫 setup 으로 생성시 한번만 불림, instance 타이밍 이슈로 mode가 잘 안먹음
    initialMode();
  };
  const handleFileHandler = (blobInfo, success, failure, progress) => {
    let fileName = blobInfo.blob().name;
    let dotIndex = fileName.lastIndexOf('.');
    let fileExtension;
    let fileSize = blobInfo.blob().size;
    let isImage, isVideo;
    if (dotIndex !== -1) {
      fileExtension = fileName.substring(dotIndex + 1, fileName.length);
      fileName = fileName.substring(0, dotIndex);
    }

    isImage = EditorStore.uploadFileIsImage(fileExtension);
    isVideo = EditorStore.uploadFileIsVideo(fileExtension);

    const fd = new FormData();
    if (isImage) fd.append('image', blobInfo.blob());
    else if (isVideo) fd.append('video', blobInfo.blob());
    else fd.append('file', blobInfo.blob());

    if (isImage) {
      const currentImg = EditorStore.getImgElement();
      const tempArr = currentImg.getAttribute('src').split('/');
      const tempId = tempArr[tempArr.length - 1];
      EditorStore.setUploadFileMeta('image', tempId, { fileName, fileExtension, fileSize }, fd, currentImg);
      currentImg.setAttribute('temp-id', tempId);
    }
    else if (isVideo) {
      const currentVideo = EditorStore.getVideoElement();
      const tempId = Math.random().toString(36).substr(2, 8);
      EditorStore.setUploadFileMeta('video', tempId, { fileName, fileExtension, fileSize }, fd, currentVideo);
      currentVideo.setAttribute('temp-id', tempId);
    }
    else {
      const tempId = Math.random().toString(36).substr(2, 8);
      EditorStore.setTempFileMeta({ tempId, fileName, fileExtension, fileSize })
      const currentFile = document.getElementById(tempId);
      // 실제 업로드 data set
      EditorStore.setUploadFileMeta('file', tempId, { fileName, fileExtension, fileSize }, fd, currentFile);
      currentFile.setAttribute('temp-id', tempId);
    }
  };

  const handleFileBlob = (type) => {
    var input = document.createElement('input');
    if (type === 'image') {
      input.setAttribute('type', 'file');
      input.setAttribute('accept', ['image/*', 'video/*']);
    }
    else input.setAttribute('type', 'file');
    input.onchange = function () {
      var file = this.files[0];
      var reader = new FileReader();
      var isImage = EditorStore.readerIsImage(file.type);
      var isVideo = EditorStore.readerIsVideo(file.type);
      reader.onload = function () {
        var id = 'blobid' + (new Date()).getTime();
        var blobCache = EditorStore.tinymce.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var baseUri = reader.result;
        var blobInfo = blobCache.create(id, file, base64, file.name);
        blobCache.add(blobInfo);
        if (isImage) {
          var img = new Image();
          img.setAttribute('src', reader.result);
          img.setAttribute('data-name', file.name);
          EditorStore.tinymce.execCommand('mceInsertContent', false, '<img src="' + img.src + '" data-name="' + file.name + '"/>');
        }
        else if (isVideo) {
          EditorStore.tinymce.insertContent(
            `<p>
              <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src='' data-mce-html="%20">
                <video width="400" controls>
                  <source src=${reader.result} />
                </video>
              </span>
            </p>`
          );
        }
        handleFileHandler(blobInfo, { title: file.name });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  // useLayoutEffect : it gets executed right after a React component render lifecycle, 
  // and before useEffect gets triggered.
  useLayoutEffect(() => {
    // 모드 변경의 목적
    if (PageStore.isReadMode()) {
      EditorStore.tinymce?.setMode('readonly');
      if (document.querySelector('.tox-editor-header'))
        document.querySelector('.tox-editor-header').style.display = 'none';
      if (document.querySelector('.tox-tinymce'))
        document.querySelector('.tox-tinymce').style.height =
          'calc(100% - 8.8rem)';
    } else {
      EditorStore.tinymce?.setMode('design');
      if (document.querySelector('.tox-editor-header'))
        document.querySelector('.tox-editor-header').style.display = 'block';
      if (document.querySelector('.tox-tinymce'))
        document.querySelector('.tox-tinymce').style.height =
          'calc(100% - 6rem)';
    }
  }, [PageStore.isReadMode()]);

  useEffect(() => {
    // Layout에 따른 height 변경의 목적
    if (PageStore.isReadMode()) {
      if (document.querySelector('.tox-tinymce') && !EditorStore.isFile)
        document.querySelector('.tox-tinymce').style.height =
          'calc(100% - 8.8rem)';
      else if (document.querySelector('.tox-tinymce') && EditorStore.isFile)
        document.querySelector('.tox-tinymce').style.height =
          'calc(100% - 13.8rem)';
    } else {
      if (document.querySelector('.tox-tinymce') && !EditorStore.isFile)
        document.querySelector('.tox-tinymce').style.height =
          'calc(100% - 6rem)';
      else if (document.querySelector('.tox-tinymce') && EditorStore.isFile)
        document.querySelector('.tox-tinymce').style.height =
          'calc(100% - 11rem)';
    }
  });

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

  return useObserver(() => (
    <>
      <EditorContainerWrapper ref={editorWrapperRef}>
        <EditorHeader />
        {PageStore.isReadMode() ? (
          <ReadModeContainer style={{ display: 'flex' }}>
            <FontAwesomeIcon
              icon={faLock}
              className="readModeIcon"
              size={'1x'}
            />
            <ReadModeText>읽기 모드</ReadModeText>
            <ReadModeText>편집하려면 수정 버튼을 클릭해주세요.</ReadModeText>
          </ReadModeContainer>
        ) : null}
        <Editor
          id="noteEditor"
          value={PageStore.currentPageData.note_content}
          init={{
            menubar: false,
            toolbar_mode: 'floating',
            height: 'calc(100% - 8.8rem)',
            setup: function (editor) {
              setNoteEditor(editor);
              // fired when a dialog has been opend
              editor.on('init', () => {
                handleLinkListener();
              })
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
                  else if (e.element.children[0].tagName === 'SPAN') {
                    EditorStore.setVideoElement(e.element.children[0])
                  }
                }
                // url invalid면 red highlighting
                if (isAnchorElement(e.element)) {
                  if (!checkUrlValidation(e.element.href)) {
                    e.element.classList.add('note-invalidUrl')
                  } else {
                    e.element.classList.remove('note-invalidUrl')
                  }
                }
              });
              // Register some other event callbacks...
              editor.on('click', function (e) {
                const focusedTags = [...document.querySelectorAll('.noteFocusedTag')];
                focusedTags.forEach((tag) => tag.classList.remove('noteFocusedTag'));
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
                tooltip: '정렬',
                items: 'alignleft aligncenter alignright alignjustify'
              });

              editor.ui.registry.addButton('insertImage', {
                icon: 'image',
                tooltip: '이미지 첨부',
                onAction: function () {
                  editor.editorUpload.uploadImages(handleFileBlob('image'))
                }
              });

              editor.ui.registry.addIcon('fileIcon', `
                <?xml version="1.0" encoding="UTF-8"?>
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                    <title>Icon/system/attach2</title>
                    <desc>Created with Sketch.</desc>
                    <g id="Icon/system/attach2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path d="M16.2531062,9.4970085 L9.68131059,16.1137765 C8.44870863,17.3548135 6.36532803,17.2775531 5.03811517,15.9412578 C3.71044964,14.6045067 3.63371435,12.506869 4.86631631,11.2658321 L12.5598106,3.51968926 C13.2837555,2.79079022 14.5101025,2.83947794 15.2927597,3.6274911 C16.075417,4.41550426 16.1233211,5.64978765 15.3993762,6.37868669 L8.93712984,12.8851558 C8.72184198,13.1019169 8.35343399,13.0827134 8.11533237,12.8429824 C7.87677808,12.6027956 7.85815776,12.2323223 8.07344562,12.0155612 L13.4137633,6.63869838 C13.818021,6.23167424 13.8231955,5.57696759 13.4253208,5.17637015 C13.0274461,4.77577271 12.3771893,4.78098258 11.9729316,5.18800672 L6.63261392,10.5648695 C5.6599822,11.5441572 5.7080297,13.1866593 6.74101052,14.2267091 C7.77353867,15.2663031 9.40487715,15.3146794 10.3775089,14.3353917 L16.8397553,7.82892259 C18.3214954,6.33704257 18.2441654,3.83164057 16.6670816,2.24376443 C15.0899978,0.655888293 12.6016244,0.578029109 11.1198843,2.06990913 L3.42638994,9.81605192 C1.43554145,11.8205243 1.5417026,15.1892806 3.66334199,17.3254389 C5.78452871,19.4611414 9.13084112,19.5684848 11.1216896,17.5640124 L17.6934852,10.9472444 C18.0976159,10.5403481 18.1027888,9.88584718 17.7050391,9.4853756 C17.3072894,9.08490401 16.6572369,9.09011224 16.2531062,9.4970085 Z" id="Fill-1" fill="#000000"></path>
                    </g>
                </svg>
              `);
              editor.ui.registry.addMenuButton('insertfile', {
                icon: 'fileIcon',
                tooltip: '파일 첨부',
                fetch: function (callback) {
                  var items = [
                    {
                      type: 'menuitem',
                      text: '내 로컬에서 첨부',
                      onAction: function () {
                        editor.editorUpload.uploadImages(handleFileBlob('file'))
                      }
                    },
                    {
                      type: 'menuitem',
                      text: 'Drive에서 첨부',
                      onAction: function () {
                        alert('기능 구현 중입니다.')
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
                  const targetUrl = getAnchorElement() ? getAnchorElement().href : null;
                  if (targetUrl) window.open(targetUrl);
                },
                onSetup: function (api) {
                  const targetUrl = getAnchorElement() ? checkUrlValidation(getAnchorElement().href) : null;
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
                tooltip: '이미지 교체',
                onAction: function (_) {
                  handleFileBlob('image');
                }
              });

              // 이미지 다운로드/삭제
              editor.ui.registry.addMenuButton('downloadImage', {
                icon: 'save',
                tooltip: '다운로드',
                fetch: function (callback) {
                  var items = [
                    {
                      type: 'menuitem',
                      text: 'Drive에 저장',
                      onAction: function () {
                        alert('기능 구현 중입니다.');
                      }
                    },
                    {
                      type: 'menuitem',
                      text: '내 PC에 저장',
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
                tooltip: '삭제',
                onAction: function () {
                  NoteStore.setModalInfo('imageDelete');
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
            quickbars_insert_toolbar: 'insertImage table',
            quickbars_image_toolbar: false,
            imagetools_toolbar: 'rotateleft rotateright flipv fliph editimage changeImage | downloadImage deleteImage',
            language: 'ko_KR',
            toolbar_drawer: false,
            paste_data_images: true,
            contextmenu: 'link-toolbar image imagetools table',
            table_sizing_mode: 'fixed', // only impacts the width of tables and cells
            content_style: editorContentCSS
          }}
          onEditorChange={getEditorContent}
          apiKey="d9c90nmok7sq2sil8caz8cwbm4akovrprt6tc67ac0y7my81"
          plugins="print preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars"
          toolbar="undo redo | formatselect | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | link | hr table insertdatetime | insertImage insertfile media"
        />
        {EditorStore.isFile ? <FileLayout /> : null}
        <TagListContainer />
      </EditorContainerWrapper>
    </>
  ));
};

export default EditorContainer;
