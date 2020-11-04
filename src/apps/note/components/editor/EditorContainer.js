import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import EditorHeader from './EditorHeader';
import {
  EditorContainerWrapper,
  ReadModeContainer,
  ReadModeText,
} from '../../styles/editorStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import TagListContainer from '../tag/TagListContainer';
import { Editor } from '@tinymce/tinymce-react';
import FileLayout from './FileLayout';
import GlobalVariable from '../../GlobalVariable';
import { checkUrlValidation } from '../common/validators.js'
import {changeLinkDialog, changeButtonStyle } from './customLink.js'

const EditorContainer = () => {
  const { PageStore, EditorStore } = useStore();
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
    let isImage;
    if (dotIndex !== -1) {
      fileExtension = fileName.substring(dotIndex + 1, fileName.length);
      fileName = fileName.substring(0, dotIndex);
    }

    isImage = EditorStore.uploadFileIsImage(fileExtension);

    const fd = new FormData();
    if (isImage) fd.append('image', blobInfo.blob());
    else fd.append('file', blobInfo.blob())

    if (isImage) {
      const currentImg = EditorStore.getImgElement();
      const tempArr = currentImg.getAttribute('src').split('/');
      const tempId = tempArr[tempArr.length - 1];
      EditorStore.setUploadFileMeta('image', tempId, { fileName, fileExtension, fileSize }, fd, currentImg);
      currentImg.setAttribute('temp-id', tempId);
    } else {
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
      input.setAttribute('accept', 'image/*');
    }
    else input.setAttribute('type', 'file');
    input.onchange = function () {
      var file = this.files[0];
      var reader = new FileReader();
      var isImage = EditorStore.readerIsImage(file.type);
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

  // useEffect return 문에서 쓰면 변수값이 없어 저장이 안 됨
  // tinymce.on('BeforeUnload', ()=>{})가 동작을 안해서 유지
  window.addEventListener('beforeunload', function (e) {
    if (!PageStore.isReadMode()) PageStore.handleSave();
  })

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
            toolbar_mode: 'sliding',
            height: 'calc(100% - 8.8rem)',
            setup: function (editor) {
              setNoteEditor(editor);
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

              editor.ui.registry.addButton('insertImage', {
                icon: 'image',
                tooltip: '이미지 첨부',
                onAction: function () {
                  editor.editorUpload.uploadImages(handleFileBlob('image'))
                }
              });

              editor.ui.registry.addMenuButton('insertfile', {
                icon: 'browse',
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
                  changeButtonStyle(0, 0);
                }
              });
              editor.ui.registry.addToggleButton('customToggleUnLink', {
                icon: 'unlink',
                onAction: function (_) {
                  editor.execCommand('Unlink');
                },
                onSetup: function (api) {
                  changeButtonStyle(1, 0);
                }
              });
              editor.ui.registry.addToggleButton('customToggleOpenLink', {
                icon: 'new-tab',
                tooltip: 'open link',
                onAction: function (_) {
                  const targetUrl = getAnchorElement() ? getAnchorElement().href : null;
                  if (targetUrl) window.open(targetUrl);
                },
                onSetup: function (api) {
                  const targetUrl = getAnchorElement() ? checkUrlValidation(getAnchorElement().href) : null;
                  if (!targetUrl) api.setDisabled(true)
                  changeButtonStyle(2, 0);
                }
              });
              // l-click하면 나오는 메뉴
              editor.ui.registry.addContextToolbar('link-toolbar', {
                predicate: isAnchorElement,
                items: 'customToggleLink customToggleUnLink customToggleOpenLink',
                position: 'node',
                scope: 'node'
              })
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
            language: 'ko_KR',
            toolbar_drawer: false,
            paste_data_images: true,
            contextmenu: 'link-toolbar image imagetools table',
            table_sizing_mode: 'fixed', // only impacts the width of tables and cells
            content_style: ` 
              a {
                cursor:pointer;
              }
              .mce-content-body .note-invalidUrl[data-mce-selected=inline-boundary] {
                background-color: #f8cac6;
              }
              table[style*="border-width: 0px"],
              .mce-item-table:not([border]),
              .mce-item-table[border="0"],
              table[style*="border-width: 0px"] td,
              .mce-item-table:not([border]) td,
              .mce-item-table[border="0"] td,
              table[style*="border-width: 0px"] th,
              .mce-item-table:not([border]) th,
              .mce-item-table[border="0"] th,
              table[style*="border-width: 0px"] caption,
              .mce-item-table:not([border]) caption,
              .mce-item-table[border="0"] caption {
                border: 1px solid #ccc;
              }
            `
          }}
          onEditorChange={getEditorContent}
          apiKey="d9c90nmok7sq2sil8caz8cwbm4akovrprt6tc67ac0y7my81"
          plugins="print preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars"
          toolbar="undo redo | formatselect | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | numlist bullist | outdent indent | link | hr insertdatetime | table tabledelete | tableprops tablerowprops tablecellprops | insertImage insertfile media"
        />
        {EditorStore.isFile ? <FileLayout /> : null}
        <TagListContainer />
      </EditorContainerWrapper>
    </>
  ));
};

export default EditorContainer;
