import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import { API, useCoreStores, ComponentStore } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';
import { Button, Upload } from 'antd';
import { apiKey } from '../../utils/const';
import { EditorContentStyle } from '../../styles/EditorStyle';
import StorageModel from '../../stores/model/StorageModel';
import { isFilled } from '../../utils/validators';
import {
  openSaveDrive,
  driveSaveSuccess,
  driveSaveCancel,
  getFileInfo,
  handleUpload,
  isValidFileNameLength,
} from '../common/FileUpload';

const Editor = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { authStore, configStore } = useCoreStores();
  const FilePreview = ComponentStore.get('Drive:FilePreview');
  const DriveSaveModal = ComponentStore.get('Drive:DriveSaveModal');
  const { t } = useTranslation();

  // document.addEventListener('visibilitychange', () => {
  //   if (
  //     !PageStore.pageModel.isReadMode &&
  //     document.visibilityState === 'hidden'
  //   ) {
  //     EditorStore.setVisiblityState('hidden');
  //   }
  // });

  const initializeEditor = editor => {
    EditorStore.setEditor(editor);
    if (PageStore.pageModel.isReadMode) EditorStore.editor.setMode('readonly');
    else EditorStore.editor.setMode('design');
  };

  const handleEditorChange = content => {
    // TODO TAB 변경시 Content마음대로 바뀌는 이슈
    if (
      EditorStore.visiblityState === 'hidden' &&
      document.visibilityState === 'visible'
    )
      return;
    PageStore.pageModel.setNoteContent(content);
  };

  useLayoutEffect(() => {
    if (!EditorStore.editor) return;
    if (PageStore.pageModel.isReadMode) {
      EditorStore.editor.setMode('readonly');
      // EditorStore.editor.addEventListener('click', handleUnselect);
    } else {
      EditorStore.editor.setMode('design');
      // EditorStore.editor.removeEventListener('click', handleUnselect);
    }
  }, [PageStore.pageModel.isReadMode]);

  return useObserver(() => (
    <>
      <TinyMCE
        id="noteEditor"
        value={PageStore.pageModel.content}
        init={{
          selector: '#noteEditor',
          menubar: false,
          toolbar_mode: 'floating',
          height: '100%',
          setup(editor) {
            initializeEditor(editor);
            // setNoteEditor(editor);
            // init 함수 : 처음 에디터 켰을 때, 그리고 태그 화면 가서 새 페이지 추가 버튼 눌렀을 때 동작한다.
            editor.on('init', () => {
              console.log('init');
              // [축소 모드] pdf 내보내기 후 페이지 선택하면 iframe 생기기 전에 useEffect를 타서 setContent가 안 먹음
              // init에도 useEffect 내용 추가
              // if (
              //   PageStore.currentPageData.note_content &&
              //   PageStore.currentPageData.note_content !==
              //     EditorStore.tinymce.getContent
              // ) {
              //   EditorStore.tinymce.setContent(
              //     PageStore.currentPageData.note_content,
              //   );
              // }
              // editor.focus();
              // handleEditorContentsListener();
            });
            editor.on('PostProcess', () => {
              // handleEditorContentsListener();
            });
            // fired when a dialog has been opend
            editor.on('OpenWindow', e => {
              // try {
              //   // link dialog 열렸을 때
              //   if (Object.keys(e.dialog.getData()).includes('url')) {
              //     changeLinkDialog();
              //   }
              // } catch (err) {
              //   console.log(err);
              // }
            });
            editor.on('NodeChange', e => {
              // if (e.element.children[0] !== undefined) {
              //   if (e.element.children[0].tagName === 'IMG') {
              //     EditorStore.setImgElement(e.element.children[0]);
              //   }
              // }
              // // url invalid면 red highlighting
              // if (isAnchorElement(e.element)) {
              //   if (!isOpenLink(e.element.href)) {
              //     // url이거나 basic plan 아니면서 메일인 경우
              //     e.element.classList.add('note-invalidUrl');
              //   } else {
              //     e.element.classList.remove('note-invalidUrl');
              //   }
              // }
            });
            // Register some other event callbacks...
            editor.on('click', e => {
              // handleUnselect();
            });

            editor.on('keydown', e => {
              // switch (e.code && e.key) {
              //   case 'Tab':
              //     // 이미 있는 ul,li는 원래 기능써야함
              //     if (
              //       editor.selection?.getNode()?.closest('li') ||
              //       editor.selection?.getNode()?.querySelector('li')
              //     )
              //       break;
              //     e.preventDefault();
              //     e.stopPropagation();
              //     if (e.shiftKey) editor.execCommand('Outdent');
              //     else editor.execCommand('Indent');
              //     break;
              //   case 'Space':
              //     const target = getAnchorElement();
              //     if (target) {
              //       const curCaretPosition = editor.selection.getRng()
              //         .endOffset;
              //       const _length = target.textContent.length;
              //       // anchor tag앞에 caret 놓으면 getAnchorElement() === null
              //       if (curCaretPosition === _length - 1) {
              //         e.preventDefault();
              //         e.stopPropagation();
              //         target.insertAdjacentHTML('afterend', '&nbsp;');
              //         editor.selection.setCursorLocation(
              //           target.nextSibling,
              //           1,
              //         );
              //       }
              //     }
              //     break;
              //   default:
              //     break;
              // }
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
              onAction() {
                // EditorStore.setUploaderType('image');
                EditorStore.uploaderRef.click();
                // // editor.editorUpload.uploadImages(handleFileBlob('image'))
              },
            });

            editor.ui.registry.addIcon(
              'fileIcon',
              `
            <?xml version="1.0" encoding="UTF-8"?>
            <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
                <g id="Icon/system/attach2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M16.2531062,9.4970085 L9.68131059,16.1137765 C8.44870863,17.3548135 6.36532803,17.2775531 5.03811517,15.9412578 C3.71044964,14.6045067 3.63371435,12.506869 4.86631631,11.2658321 L12.5598106,3.51968926 C13.2837555,2.79079022 14.5101025,2.83947794 15.2927597,3.6274911 C16.075417,4.41550426 16.1233211,5.64978765 15.3993762,6.37868669 L8.93712984,12.8851558 C8.72184198,13.1019169 8.35343399,13.0827134 8.11533237,12.8429824 C7.87677808,12.6027956 7.85815776,12.2323223 8.07344562,12.0155612 L13.4137633,6.63869838 C13.818021,6.23167424 13.8231955,5.57696759 13.4253208,5.17637015 C13.0274461,4.77577271 12.3771893,4.78098258 11.9729316,5.18800672 L6.63261392,10.5648695 C5.6599822,11.5441572 5.7080297,13.1866593 6.74101052,14.2267091 C7.77353867,15.2663031 9.40487715,15.3146794 10.3775089,14.3353917 L16.8397553,7.82892259 C18.3214954,6.33704257 18.2441654,3.83164057 16.6670816,2.24376443 C15.0899978,0.655888293 12.6016244,0.578029109 11.1198843,2.06990913 L3.42638994,9.81605192 C1.43554145,11.8205243 1.5417026,15.1892806 3.66334199,17.3254389 C5.78452871,19.4611414 9.13084112,19.5684848 11.1216896,17.5640124 L17.6934852,10.9472444 C18.0976159,10.5403481 18.1027888,9.88584718 17.7050391,9.4853756 C17.3072894,9.08490401 16.6572369,9.09011224 16.2531062,9.4970085 Z" id="Fill-1" fill="#000000"></path>
                </g>
            </svg>
          `,
            );
            editor.ui.registry.addMenuButton('insertfile', {
              icon: 'fileIcon',
              tooltip: t('NOTE_EDIT_PAGE_MENUBAR_24'),
              fetch(callback) {
                const items = [
                  configStore.isActivateComponent(
                    'Note',
                    'EditorContainer:InsertFileButton',
                  )
                    ? {
                        type: 'menuitem',
                        text: t('NOTE_EDIT_PAGE_ATTACH_FILE_01'),
                        onAction() {
                          // EditorStore.setIsDrive(true);
                        },
                      }
                    : '',
                  {
                    type: 'menuitem',
                    text: t('NOTE_EDIT_PAGE_ATTACH_FILE_02'),
                    onAction() {
                      // editor.editorUpload.uploadImages(handleFileBlob('file'))
                      // EditorStore.setUploaderType('file');
                      EditorStore.uploaderRef.click();
                    },
                  },
                ];
                callback(items);
              },
            });
            const isAnchorElement = node => {
              return node.nodeName.toLowerCase() === 'a' && node.href;
            };
            const isImageElement = node => {
              return node.nodeName === 'IMG';
            };

            const getAnchorElement = () => {
              const node = editor.selection.getNode();
              return isAnchorElement(node) ? node : null;
            };
            editor.ui.registry.addToggleButton('customToggleLink', {
              icon: 'link',
              onAction(_) {
                editor.execCommand('mceLink');
              },
              onSetup(api) {
                // 텍스트 블록 선택했을 때 링크 말고 다른 menu도 떠서 블록선택 안했을 때만 보이게 하기
                // changeButtonStyle({
                //   str: t('NOTE_EDIT_PAGE_INSERT_LINK_07'),
                //   idx: 0,
                //   count: 0,
                // });
              },
            });
            editor.ui.registry.addToggleButton('customToggleUnLink', {
              icon: 'unlink',
              onAction(_) {
                editor.execCommand('Unlink');
              },
              onSetup(api) {
                // changeButtonStyle({
                //   str: t('NOTE_EDIT_PAGE_INSERT_LINK_08'),
                //   idx: 1,
                //   count: 0,
                // });
              },
            });
            editor.ui.registry.addToggleButton('customToggleOpenLink', {
              icon: 'new-tab',
              onAction(_) {
                // openLink({
                //   isOnlyReadMode: false,
                //   url: getAnchorElement()?.href,
                //   target: '_blank',
                // });
              },
              onSetup(api) {
                // const targetUrl = getAnchorElement()
                //   ? isOpenLink(getAnchorElement().href)
                //   : null;
                // if (!targetUrl) api.setDisabled(true);
                // changeButtonStyle({
                //   str: t('NOTE_EDIT_PAGE_INSERT_LINK_09'),
                //   idx: 2,
                //   count: 0,
                // });
              },
            });
            // l-click하면 나오는 메뉴
            // 블록 선택했을 때(커서만 깜빡일 때 X) && a태그 아닐 때 && 이미지 아닐 때
            editor.ui.registry.addContextToolbar('textselection', {
              predicate(node) {
                return (
                  !editor.selection.isCollapsed() &&
                  !isAnchorElement(node) &&
                  !isImageElement(node)
                );
              },
              items:
                'forecolor backcolor | bold italic underline strikethrough | link',
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
              onAction(_) {
                // EditorStore.setUploaderType('image');
                EditorStore.uploaderRef.click();
              },
            });

            // 이미지 다운로드/삭제
            editor.ui.registry.addMenuButton('downloadImage', {
              icon: 'save',
              tooltip: t('NOTE_EDIT_PAGE_MENUBAR_34'),
              fetch(callback) {
                // const items = [
                //   configStore.isActivateComponent(
                //     'Note',
                //     'EditorContainer:SaveToDrive',
                //   )
                //     ? {
                //         type: 'menuitem',
                //         text: t('NOTE_EDIT_PAGE_MENUBAR_32'),
                //         onAction() {
                //           const node = editor.selection.getNode();
                //           let fileName = node.getAttribute('data-name');
                //           let fileExtension;
                //           const dotIndex = fileName.lastIndexOf('.');
                //           if (dotIndex !== -1) {
                //             fileExtension = fileName.substring(
                //               dotIndex + 1,
                //               fileName.length,
                //             );
                //             fileName = fileName.substring(0, dotIndex);
                //           }
                //           EditorStore.setSaveFileMeta(
                //             node.id,
                //             fileExtension,
                //             fileName,
                //           );
                //           openSaveDrive();
                //         },
                //       }
                //     : '',
                //   {
                //     type: 'menuitem',
                //     text: t('NOTE_EDIT_PAGE_MENUBAR_33'),
                //     onAction() {
                //       const { id } = editor.selection.getNode();
                //       if (id) downloadFile(id);
                //       else downloadFile();
                //     },
                //   },
                // ];
                // callback(items);
              },
            });
            editor.ui.registry.addButton('deleteImage', {
              icon: 'remove',
              tooltip: t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04'),
              onAction() {
                // EditorStore.deleteImage();
              },
            });
          },
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
          language: NoteStore.i18nLanguage,
          toolbar_drawer: false,
          // paste_data_images: true, // add images by drag and drop
          paste_postprocess(plugin, args) {
            // 복붙하고 간헐적으로 undo버튼이 활성화 안되는 현상 수정 : 페이지 삭제되지 않도록
            // EditorStore.tinymce?.undoManager?.add();

            const target = args.node.textContent;
            // if (checkUrlValidation(target)) {
            //   const temp = document.createElement('a');
            //   temp.href = target;
            //   temp.setAttribute('data-mce-href', target);
            //   temp.textContent = target;
            //   args.node.textContent = '';
            //   args.node.appendChild(temp);
            // }
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
          autosave_interval: '1s',
          autosave_prefix: `Note_autosave_${NoteStore.notechannel_id}`,
          // autolink_pattern: customAutoLinkPattern(),
          contextmenu: 'link-toolbar image imagetools table',
          table_sizing_mode: 'fixed', // only impacts the width of tables and cells
          content_style: EditorContentStyle,
        }}
        onEditorChange={handleEditorChange}
        apiKey={apiKey}
        plugins="print preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars"
        toolbar="undo redo | formatselect | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | alignment | numlist bullist | outdent indent | link | hr table insertdatetime | insertImage insertfile"
      />
      <HandleUploader />
      {EditorStore.isPreview ? (
        <FilePreview
          visible={EditorStore.isPreview}
          fileMeta={EditorStore.previewFileMeta}
          handleClose={() => EditorStore.setIsPreview(false)}
        />
      ) : null}
      <DriveSaveModal
        visible={EditorStore.isSaveDrive}
        successCallback={driveSaveSuccess}
        cancelCallback={driveSaveCancel}
        file={EditorStore.saveDriveMeta}
        roomId={NoteStore.roomId}
      />
    </>
  ));
};

export default Editor;

export const HandleUploader = () => {
  const { EditorStore, NoteStore } = useNoteStore();
  const uploaderRef = useRef('');

  const uploadProps = {
    beforeUpload: async (file, fileList) => {
      let uploadsize = 0;
      let totalsize = 21474836480; // 20GB

      if (file === fileList[0]) {
        // 전처리 1. name vaild
        const filtered = fileList.filter(file =>
          isValidFileNameLength(file.name),
        );
        if (fileList.length !== filtered.length) {
          if (filtered.length === 0) {
            // NoteStore.setModalInfo('failUploadByFileNameLen');
            return;
          }
        }

        EditorStore.setTotalUploadLength(fileList.length); // 실패가 되어도 전체 선택한 length 필요
        EditorStore.setValidUploadLength(filtered.length);

        // 전처리 2. 한번에 업로드 파일 갯수 30 개 이상
        if (filtered.length > 30) {
          // NoteStore.setModalInfo('failUpload');
          return;
        }

        // 전처리 3. 업로드 size
        if (filtered) {
          for (let i = 0; i < filtered.length; i++) {
            uploadsize += filtered[i].size;
          }
          if (uploadsize > totalsize) {
            // NoteStore.setModalInfo('sizefailUpload');
            return;
          }
        }

        for (let i = 0; i < filtered.length; i++) {
          (function (file) {
            const { fileName, fileExtension, fileSize } = getFileInfo(file);
            const type =
              fileExtension && EditorStore.isImage(fileExtension)
                ? 'image'
                : 'file';

            const cancelToken = new API.CancelToken.source();
            const model = new StorageModel({
              workspace_id: NoteStore.roomId,
              channel_id: NoteStore.chId,
              storageFileInfo: {
                user_id: NoteStore.userId,
                file_last_update_user_id: NoteStore.userId,
                file_name: fileName,
                file_extension: fileExtension,
                file_size: fileSize,
              },
            });
            EditorStore.setUploadFileDTO(model, file, type, cancelToken);
          })(filtered[i]);
        }
        // if (fileList.length !== filtered.length) {
        //   EditorStore.failCount = fileList.length - filtered.length;
        //   NoteStore.setModalInfo('failUploadByFileNameLen');
        // } else if (EditorStore.uploadDTO.length === EditorStore.uploadLength)
        //   handleUpload();
        if (EditorStore.uploadDTO.length === EditorStore.validUploadLen) {
          EditorStore.uploadDTO.forEach(item => handleUpload(item));
        }
      }

      return false;
    },
    showUploadList: false,
    multiple: true,
  };

  useEffect(() => {
    EditorStore.setUploaderRef(uploaderRef.current);
    return () => EditorStore.setUploaderRef('');
  }, []);

  return useObserver(() => (
    <>
      <div style={{ display: 'none' }}>
        <Upload
          {...uploadProps}
          accept={
            EditorStore.uploaderType === 'image' ? 'image/*, video/*' : 'file'
          }
        >
          <Button ref={uploaderRef} />
        </Upload>
      </div>
    </>
  ));
};
