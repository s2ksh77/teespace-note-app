import React, { useContext } from 'react';
import { Editor as TinyMceEditor } from '@tinymce/tinymce-react';
import { useCoreStores, API } from 'teespace-core';
import { useNoteStore } from '../../external';
import { checkUrlValidation, isOpenLink } from '../common/validators';
import {
  changeButtonStyle,
  changeLinkDialog,
  customAutoLinkPattern,
  openLink,
} from './customLink';
import {
  downloadFile,
  handleEditorContentsListener,
  handleUnselect,
  openSaveDrive,
  handleUpload,
} from '../common/NoteFile';
import { editorContentCSS } from '../../styles/editorStyle';
import { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import StorageModel from '../../store/model/StorageModel';
import NoteRepository from '../../store/noteRepository';

const Editor = () => {
  const { NoteStore, PageStore, EditorStore } = useNoteStore();
  const { configStore } = useCoreStores();
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

  const getEditorContent = content => {
    // TODO TAB 변경시 Content마음대로 바뀌는 이슈
    // if (
    //   EditorStore.visiblityState === 'hidden' &&
    //   document.visibilityState === 'visible'
    // )
    //   return;
    // else
    PageStore.setContent(content);
  };

  const setNoteEditor = instance => {
    EditorStore.setEditor(instance);
    // 첫 setup 으로 생성시 한번만 불림, instance 타이밍 이슈로 mode가 잘 안먹음
    initialMode();
  };

  const initialMode = () => {
    if (PageStore.isReadMode()) EditorStore.tinymce?.setMode('readonly');
    else EditorStore.tinymce?.setMode('design');
  };

  const isExternalImage = el => {
    return el.getAttribute('id') === null ? true : false;
  };

  const pasteSingleImage = async src => {
    const res = await fetch(src);
    const blob = await res.blob();
    const file = new File([blob], `WAPL_image_${new Date().getTime()}.png`, {
      type: 'image/png',
    });
    const { fileName, fileExtension, fileSize } = EditorStore.getFileInfo(file);

    EditorStore.setUploaderType('image');
    EditorStore.setTotalUploadLength(1);
    EditorStore.setFileLength(1);
    const cancelToken = new API.CancelToken.source();
    const model = new StorageModel({
      workspace_id: NoteRepository.WS_ID,
      channel_id: NoteRepository.chId,
      storageFileInfo: {
        user_id: NoteRepository.USER_ID,
        file_last_update_user_id: NoteRepository.USER_ID,
        file_name: fileName,
        file_extension: fileExtension,
        file_size: fileSize,
      },
    });
    EditorStore.setUploadFileDTO(model, file, 'image', cancelToken);

    EditorStore.uploadDTO.forEach(item => handleUpload(item));
  };

  return (
    <TinyMceEditor
      id="noteEditor"
      value={PageStore.pageInfo.content}
      init={{
        ...EditorInitConfig,
        setup(editor) {
          setNoteEditor(editor);

          editor.on('init', () => {
            /*
             * initialMode();  // [ todo ] initialMode 메서드 호출이 init전 setup이 아니라 여기서 이루어져야 하는거 아닌지 확인해주세요
             * 복구 버튼 눌렀을 때 editor가 init되기 전인 경우
             * init된 후 localStorage내용을 에디터에 set해주어야 한다
             */
            if (PageStore.recoverInfo.note_content) {
              EditorStore.tinymce?.setContent(PageStore.recoverInfo.note_content);
              PageStore.setRecoverInfo({});
            }
            editor.focus();
            handleEditorContentsListener();
          });
          editor.on('PostProcess', () => {
            handleEditorContentsListener();
          });
          // fired when a dialog has been opend
          editor.on('OpenWindow', e => {
            try {
              // link dialog 열렸을 때
              if (Object.keys(e.dialog.getData()).includes('url')) {
                changeLinkDialog();
              }
            } catch (err) {
              console.log(err);
            }
          });
          editor.on('NodeChange', e => {
            if (e.element.children[0] !== undefined) {
              if (e.element.children[0].tagName === 'IMG') {
                EditorStore.setImgElement(e.element.children[0]);
              }
            }
            // url invalid면 red highlighting
            if (!isAnchorElement(e.element)) return;
            if (isOpenLink(e.element.href)) {
              e.element.classList.remove('note-invalidUrl');
            } else {
              // 1) url
              // 2) basic plan 아니면서 메일인 경우
              e.element.classList.add('note-invalidUrl');
            }
          });
          // Register some other event callbacks...
          editor.on('click', function (e) {
            handleUnselect();
          });

          editor.on('keydown', e => {
            switch (e.code && e.key) {
              case 'Tab':
                // 이미 있는 ul,li는 원래 기능써야함
                if (
                  editor.selection?.getNode()?.closest('li') ||
                  editor.selection?.getNode()?.querySelector('li')
                )
                  break;
                e.preventDefault();
                e.stopPropagation();
                if (e.shiftKey) editor.execCommand('Outdent');
                else editor.execCommand('Indent');
                break;
              case 'Space':
                const target = getAnchorElement();
                if (target) {
                  const curCaretPosition = editor.selection.getRng().endOffset;
                  const _length = target.textContent.length;
                  // anchor tag앞에 caret 놓으면 getAnchorElement() === null
                  if (curCaretPosition === _length - 1) {
                    e.preventDefault();
                    e.stopPropagation();
                    target.insertAdjacentHTML('afterend', '&nbsp;');
                    editor.selection.setCursorLocation(target.nextSibling, 1);
                  }
                }
                break;
              default:
                break;
            }
          });

          // 정렬 그룹 버튼
          editor.ui.registry.addGroupToolbarButton('alignment', {
            icon: 'align-center',
            tooltip: t('NOTE_EDIT_PAGE_MENUBAR_35'),
            items: 'alignleft aligncenter alignright alignjustify',
          });

          editor.ui.registry.addButton('insertImage', {
            icon: 'image',
            tooltip: t('NOTE_EDIT_PAGE_MENUBAR_23'),
            onAction: function () {
              EditorStore.setUploaderType('image');
              EditorStore.uploaderRef.click();
              // editor.editorUpload.uploadImages(handleFileBlob('image'))
            },
          });

          editor.ui.registry.addIcon(
            'fileIcon',
            `
                    <?xml version="1.0" encoding="UTF-8"?>
                    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                        <g id="Icon/system/attach2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path d="M16.2531062,9.4970085 L9.68131059,16.1137765 C8.44870863,17.3548135 6.36532803,17.2775531 5.03811517,15.9412578 C3.71044964,14.6045067 3.63371435,12.506869 4.86631631,11.2658321 L12.5598106,3.51968926 C13.2837555,2.79079022 14.5101025,2.83947794 15.2927597,3.6274911 C16.075417,4.41550426 16.1233211,5.64978765 15.3993762,6.37868669 L8.93712984,12.8851558 C8.72184198,13.1019169 8.35343399,13.0827134 8.11533237,12.8429824 C7.87677808,12.6027956 7.85815776,12.2323223 8.07344562,12.0155612 L13.4137633,6.63869838 C13.818021,6.23167424 13.8231955,5.57696759 13.4253208,5.17637015 C13.0274461,4.77577271 12.3771893,4.78098258 11.9729316,5.18800672 L6.63261392,10.5648695 C5.6599822,11.5441572 5.7080297,13.1866593 6.74101052,14.2267091 C7.77353867,15.2663031 9.40487715,15.3146794 10.3775089,14.3353917 L16.8397553,7.82892259 C18.3214954,6.33704257 18.2441654,3.83164057 16.6670816,2.24376443 C15.0899978,0.655888293 12.6016244,0.578029109 11.1198843,2.06990913 L3.42638994,9.81605192 C1.43554145,11.8205243 1.5417026,15.1892806 3.66334199,17.3254389 C5.78452871,19.4611414 9.13084112,19.5684848 11.1216896,17.5640124 L17.6934852,10.9472444 C18.0976159,10.5403481 18.1027888,9.88584718 17.7050391,9.4853756 C17.3072894,9.08490401 16.6572369,9.09011224 16.2531062,9.4970085 Z" id="Fill-1" fill=${themeContext.TextMain}></path>
                        </g>
                    </svg>
                  `,
          );
          editor.ui.registry.addMenuButton('insertfile', {
            icon: 'fileIcon',
            tooltip: t('NOTE_EDIT_PAGE_MENUBAR_24'),
            fetch: function (callback) {
              var items = [
                configStore.isActivateComponent(
                  'Note',
                  'EditorContainer:InsertFileButton',
                )
                  ? {
                      type: 'menuitem',
                      text: t('NOTE_EDIT_PAGE_ATTACH_FILE_01'),
                      onAction: function () {
                        EditorStore.getStorageVolume();
                        EditorStore.setIsDrive(true);
                      },
                    }
                  : '',
                {
                  type: 'menuitem',
                  text: t('NOTE_EDIT_PAGE_ATTACH_FILE_02'),
                  onAction: function () {
                    // editor.editorUpload.uploadImages(handleFileBlob('file'))
                    EditorStore.setUploaderType('file');
                    EditorStore.uploaderRef.click();
                  },
                },
              ];
              callback(items);
            },
          });
          var isAnchorElement = function (node) {
            return node.nodeName.toLowerCase() === 'a' && node.href;
          };
          const isImageElement = node => {
            return node.nodeName.toLowerCase() === 'img';
          };
          const isCodeSampleElement = node => {
            return node.nodeName.toLowerCase() === 'pre';
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
              changeButtonStyle({
                str: t('NOTE_EDIT_PAGE_INSERT_LINK_07'),
                idx: 0,
                count: 0,
              });
            },
          });
          editor.ui.registry.addToggleButton('customToggleUnLink', {
            icon: 'unlink',
            onAction: function (_) {
              editor.execCommand('Unlink');
            },
            onSetup: function (api) {
              changeButtonStyle({
                str: t('NOTE_EDIT_PAGE_INSERT_LINK_08'),
                idx: 1,
                count: 0,
              });
            },
          });
          editor.ui.registry.addToggleButton('customToggleOpenLink', {
            icon: 'new-tab',
            onAction: function (_) {
              openLink({
                isOnlyReadMode: false,
                url: getAnchorElement()?.href,
                target: '_blank',
              });
            },
            onSetup: function (api) {
              const targetUrl = getAnchorElement()
                ? isOpenLink(getAnchorElement().href)
                : null;
              if (!targetUrl) api.setDisabled(true);
              changeButtonStyle({
                str: t('NOTE_EDIT_PAGE_INSERT_LINK_09'),
                idx: 2,
                count: 0,
              });
            },
          });
          // l-click하면 나오는 메뉴
          // 블록 선택했을 때(커서만 깜빡일 때 X) && a태그 아닐 때 && 이미지 아닐 때
          editor.ui.registry.addContextToolbar('textselection', {
            predicate: function (node) {
              if (node.nodeName.toLowerCase() === 'body') return;
              return (
                !editor.selection.isCollapsed() &&
                !isAnchorElement(node) &&
                !isImageElement(node) &&
                !isCodeSampleElement(node)
              );
            },
            items: 'forecolor backcolor | bold italic underline strikethrough | link',
            position: 'selection',
          });
          // l-click하면 나오는 메뉴
          editor.ui.registry.addContextToolbar('link-toolbar', {
            predicate: isAnchorElement,
            items: 'customToggleLink customToggleUnLink customToggleOpenLink',
            position: 'selection',
            scope: 'node',
          });
          editor.ui.registry.addButton('changeImage', {
            icon: 'gallery',
            tooltip: t('NOTE_EDIT_PAGE_MENUBAR_30'),
            onAction: function (_) {
              EditorStore.setUploaderType('image');
              EditorStore.uploaderRef.click();
            },
          });
          // 이미지 다운로드/삭제
          editor.ui.registry.addMenuButton('downloadImage', {
            icon: 'save',
            tooltip: t('NOTE_EDIT_PAGE_MENUBAR_34'),
            fetch: function (callback) {
              var items = [
                configStore.isActivateComponent('Note', 'EditorContainer:SaveToDrive') &&
                !isExternalImage(editor.selection.getNode())
                  ? {
                      type: 'menuitem',
                      text: t('NOTE_EDIT_PAGE_MENUBAR_32'),
                      onAction: function () {
                        const node = editor.selection.getNode();
                        let fileName = node.getAttribute('data-name');
                        let fileExtension;
                        let dotIndex = fileName.lastIndexOf('.');
                        if (dotIndex !== -1) {
                          fileExtension = fileName.substring(
                            dotIndex + 1,
                            fileName.length,
                          );
                          fileName = fileName.substring(0, dotIndex);
                        }
                        EditorStore.setSaveFileMeta(node.id, fileExtension, fileName);
                        openSaveDrive();
                      },
                    }
                  : '',
                {
                  type: 'menuitem',
                  text: t('NOTE_EDIT_PAGE_MENUBAR_33'),
                  onAction: function () {
                    const id = editor.selection.getNode().id;
                    if (id) downloadFile(id);
                    else downloadFile();
                  },
                },
              ];
              callback(items);
            },
          });
          editor.ui.registry.addButton('deleteImage', {
            icon: 'remove',
            tooltip: t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04'),
            onAction: function () {
              EditorStore.deleteImage();
            },
          });
        },
        async paste_preprocess(plugin, args) {
          const content = args.content.split('"');
          if (content.length !== 3 || !content[0].includes('img')) return;

          // 이미지 하나만 붙여넣기 하는 경우 (임시)
          args.content = '';
          pasteSingleImage(content[1]);
        },
        paste_postprocess: function (plugin, args) {
          // 복붙하고 간헐적으로 undo버튼이 활성화 안되는 현상 수정 : 페이지 삭제되지 않도록
          EditorStore.tinymce?.undoManager?.add();

          const target = args.node.textContent;
          if (
            checkUrlValidation(target) &&
            args.node &&
            args.node.childNodes.length === 1
          ) {
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
        language: NoteStore.i18nLanguage,
        skin: themeContext.name === 'dark' ? 'oxide-dark' : 'oxide',
        content_style:
          editorContentCSS +
          `
            .mce-content-body {
            background: radial-gradient(rgba(0, 0, 0, ${
              themeContext.name === 'dark' ? 0.9 : 0.04
            }) 0.063rem, ${themeContext.StateNormal} 0rem);
            color: ${themeContext.TextMain};
            }
          `,
      }}
      onEditorChange={getEditorContent}
      apiKey={window.env.EDITOR_API_KEY}
      plugins="print preview paste importcss autolink directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars"
      toolbar="undo redo | formatselect | fontselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | link | insertImage insertfile | hr table codesample insertdatetime print"
    />
  );
};

const EditorInitConfig = {
  selector: '#noteEditor',
  menubar: false,
  statusbar: false,
  toolbar_mode: 'floating',
  height: '100%',
  a11y_advanced_options: true,
  image_description: false,
  image_dimensions: false,
  image_uploadtab: true,
  file_picker_types: 'image media',
  automatic_uploads: true,
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
  // 링크 있는 부분을 textSelection하면 에디터 설정상 링크 메뉴3개가 추가돼서 맨 뒤 링크메뉴 제거함
  quickbars_selection_toolbar: false,
  imagetools_toolbar:
    'rotateleft rotateright flipv fliph editimage changeImage | downloadImage deleteImage',
  toolbar_drawer: false,
  paste_data_images: true,
  autolink_pattern: customAutoLinkPattern(),
  contextmenu: 'link-toolbar image imagetools table',
  table_sizing_mode: 'fixed', // only impacts the width of tables and cells
  font_formats:
    'Noto Sans KR=noto sans kr, Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;',
};

export default Editor;
