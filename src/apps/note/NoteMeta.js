import NoteStore from './store/noteStore';
import PageStore from './store/pageStore';
import ChapterStore from './store/chapterStore';
import EditorStore from './store/editorStore';
import Mark from 'mark.js';
import i18n from './i18n/i18n';

const NoteMeta = {
  // antd modal prop 설정
  openModal(type) {
    return this.setModalConfig(type);
  },
  // antd modal prop 만들기
  setModalConfig(type) {
    const initialConfig = {
      targetComponent: 'Modal',
      modalName: type,
    };
    switch (type) {
      case 'viewInfo':
        return {
          ...initialConfig,
          title: i18n.t('NOTE_DELIVER_CONTEXT_MENU_04'),
          className: 'viewInfoModal',
        };
      case 'forward':
        return {
          ...initialConfig,
          title: i18n.t('NOTE_CONTEXT_MENU_01'),
          className: 'forwardModal',
        };
      case 'restore':
        return {
          ...initialConfig,
          title: i18n.t('NOTE_BIN_RESTORE_01'),
          className: 'restoreModal',
        };
      default:
        return;
    }
  },
  // core - Modal prop 설정
  openMessage(type, data) {
    return this.setMessageConfig(
      this.setMessageInfoConfig(type, data),
      this.setEventConfig(type, data),
    );
  },
  // Modal(core - Message) prop 만들기
  setMessageConfig(dialogType, eventList) {
    const buttonList = [];
    // type, shape, onClick, text
    eventList.map((event, index) => {
      dialogType.btns[index].onClick = event;
      buttonList.push(dialogType.btns[index]);
    });

    return {
      targetComponent: 'Message',
      modalName: dialogType.modalName, // openMessage의 인자인 type
      type: dialogType.type,
      title: dialogType.title,
      subTitle: dialogType.subtitle,
      btns: buttonList,
    };
  },
  setEventConfig(type, data) {
    const eventList = [];
    switch (type) {
      case 'sharedChapter':
      case 'chapter':
      case 'draggedChapter':
        // 삭제 함수 추가
        eventList.push(function (e) {
          e.stopPropagation();
          ChapterStore.deleteNoteChapter(data);
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setIsDragging(false);
          ChapterStore.setDeleteChapterList([]);
          NoteStore.setModalInfo(null);
        });
        break;
      // case 'page':
      //   // 삭제 함수 추가
      //   eventList.push(function (e) {
      //     e.stopPropagation();
      //     if (PageStore.lastSharedPageParentId) {
      //       ChapterStore.setDeleteChapterId(PageStore.lastSharedPageParentId);
      //       PageStore.setLastSharedPageParentId('');
      //       ChapterStore.deleteNoteChapter();
      //     } else PageStore.throwNotePage({});
      //     if (EditorStore.fileList) EditorStore.deleteAllFile();
      //   });
      //   eventList.push(function (e) {
      //     e.stopPropagation();
      //     NoteStore.setModalInfo(null);
      //   });
      //   break;
      case 'sharedPage':
      case 'deletePage': // 페이지 영구 삭제
        eventList.push(function (e) {
          e.stopPropagation();
          PageStore.deleteNotePage(data); // 전에 PageStore.setDeletePageList 이거 돼 있어야 함
          if (EditorStore.fileList) EditorStore.deleteAllFile();
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;
      case 'uploadingFiles':
        eventList.push(function (e) {
          e.stopPropagation();
          if (EditorStore.isSearch) {
            const instance = new Mark(EditorStore.tinymce?.getBody());
            instance.unmark();
          }
          if (EditorStore.isUploading) {
            EditorStore.uploadingFileallCancel();
            return;
          }
          PageStore.handleSave();
          import('teespace-core')
            .then(module => {
              try {
                const { logEvent } = module;
                logEvent('note', 'clickModifyBtn');
              } catch (e) {
                console.error(e);
              }
            })
            .catch(e => console.error(e));
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;
      case 'nonDeletableSinglePage':
      case 'nonDeletableMultiPage':
      case 'editingPage':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'failUploadSpaceFullSize':
      case 'fileOpenMail':
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;
      // NoteFile을 import해야해서 NoeModal component에서 이벤트 추가함
      case 'failUploadByFileNameLen':
        eventList.push(function (e) {});
        break;
      case 'recover':
        eventList.push(async function (e) {
          // 복구 로직
          e.stopPropagation();
          try {
            const { id, note_content } = PageStore.recoverInfo;
            if (!id) return;
            NoteStore.setShowPage(true);
            if (NoteStore.layoutState === 'collapse')
              NoteStore.setTargetLayout('Content');

            // [todo] 이게 왜 ChapterStore에 있을까
            ChapterStore.setLoadingPageInfo(true);
            await PageStore.fetchCurrentPageData(id);
            ChapterStore.setLoadingPageInfo(false);
            /*
             * 내용 로컬 스토리지에 저장된 내용으로 바꾸기
             * 여길 탄 다음에 tinymce가 init되는 경우가 대부분=> editor.on('init')에서 setContent해야함
             * 이 경우 recoverinfo 초기화하면 안 됨
             */
            if (EditorStore.tinymce?.getBody()) {
              EditorStore.tinymce?.setContent(note_content);
              PageStore.setRecoverInfo({});
            }
          } catch (err) {
            console.log('err', err);
          } finally {
            NoteStore.setModalInfo(null);
          }
        });

        eventList.push(async function (e) {
          e.stopPropagation();
          const { parentId, id } = PageStore.recoverInfo;
          if (!id) return;
          NoteStore.setShowPage(true);
          if (NoteStore.layoutState === 'collapse')
            NoteStore.setTargetLayout('Content');
          // 복구 원하지 않으면 로컬 스토리지에서 지우자
          localStorage.removeItem(
            `Note_autosave_${NoteStore.notechannel_id}_${id}`,
          );

          NoteStore.setModalInfo(null);

          // 여기 안에서 fetchCurrentPageData한다
          // current chapterId 없으면 에디터를 안 띄워서 await 필요
          ChapterStore.setLoadingPageInfo(true);
          const dto = await PageStore.noneEdit(id, parentId);
          await PageStore.fetchCurrentPageData(id);
          ChapterStore.setLoadingPageInfo(false);

          PageStore.setRecoverInfo({});
        });
        break;
      case 'emptyRecycleBin':
        eventList.push(function (e) {
          e.stopPropagation();
          PageStore.deleteNotePage(data);
        });
        eventList.push(function (e) {
          e.stopPropagation();
          NoteStore.setModalInfo(null);
        });
        break;
      default:
        break;
    }
    return eventList;
  },
  setBtns(type) {
    const shape = 'default';
    const defaultBtn1 = {
      type: 'solid',
      shape,
      text: i18n.t('NOTE_PAGE_LIST_CREATE_N_CHPT_03'),
    }; // 버튼 한 개일 때랑 text 바꿔서 사용
    const defaultBtn2 = {
      type: 'default',
      shape,
      text: i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_05'),
    };

    switch (type) {
      case 'delete': // chapter랑 page
      case 'deletePage':
        return [
          { ...defaultBtn1, text: i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04') },
          defaultBtn2,
        ];
      case 'recover':
        return [
          { ...defaultBtn1, text: i18n.t('NOTE_CONTEXT_MENU_02') },
          defaultBtn2,
        ];
      case 'nonDeletableSinglePage':
      case 'nonDeletableMultiPage':
      case 'editingPage':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'failUploadSpaceFullSize':
      case 'failUploadByFileNameLen':
        return [defaultBtn1];
      case 'uploadingFiles':
        return [
          { ...defaultBtn1, text: i18n.t('NOTE_PAGE_LIST_ADD_NEW_PGE_04') },
          defaultBtn2,
        ];
      default:
        return;
    }
  },
  setMessageInfoConfig(type, data) {
    // const userName = '';
    const fileName = EditorStore.deleteFileName;
    // type이 error면 빨간색, error말고 다른 색이면 보라색
    const dialogType = {
      type: 'default',
      modalName: type,
      title: '',
      subtitle: '',
      btns: [],
    };
    // const editingUserName = PageStore.editingUserName;
    switch (type) {
      case 'chapter':
      case 'draggedChapter':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_06');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_07');
        dialogType.btns = this.setBtns('delete');
        break;
      case 'page':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_03');
        dialogType.btns = this.setBtns('delete');
        break;
      case 'sharedChapter':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_06');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_09');
        dialogType.btns = this.setBtns('delete');
        break;
      case 'sharedPage':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_03');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_09');
        dialogType.btns = this.setBtns('delete');
        break;
      case 'deletePage': // 페이지 영구 삭제
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_BIN_06');
        (dialogType.subtitle = i18n.t('NOTE_BIN_07')),
          (dialogType.btns = this.setBtns('delete'));
        break;
      case 'nonDeletableSinglePage':
        dialogType.type = 'info';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_01');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_02', {
          userName: data.name,
        });
        dialogType.btns = this.setBtns(type);
        break;
      case 'nonDeletableMultiPage':
        dialogType.type = 'info';
        dialogType.title = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_01');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_08', {
          count: data.count,
        });
        dialogType.btns = this.setBtns(type);
        break;
      case 'titleDuplicate':
        dialogType.title = i18n.t('NOTE_PAGE_LIST_CREATE_N_CHPT_01');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_CREATE_N_CHPT_02');
        dialogType.btns = this.setBtns(type);
        break;
      case 'duplicateTagName':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ADD_TAG_01');
        dialogType.btns = this.setBtns(type);
        break;
      case 'editingPage':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_CANT_EDIT_01');
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_02', {
          userName: PageStore.editingUserName,
        });
        dialogType.btns = this.setBtns('editingPage');
        break;
      case 'deletedPage':
        dialogType.title = i18n.t('NOTE_META_TAG_03');
        dialogType.btns = this.setBtns('deletedPage');
        break;
      case 'multiFileSomeFail':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_06');
        dialogType.subtitle = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_07', {
          uploadCnt: EditorStore.totalUploadLength,
          failCnt: EditorStore.failCount,
        });
        dialogType.btns = this.setBtns('multiFileSomeFail');
        break;
      case 'sizefailUpload':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_04');
        dialogType.btns = this.setBtns('sizefailUpload');
        break;
      case 'failUpload':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_05');
        dialogType.btns = this.setBtns('failUpload');
        break;
      case 'failUploadByFileNameLen':
        dialogType.title = i18n.t('DRIVE_UPLOAD_BTN_04');
        dialogType.btns = this.setBtns(type);
        break;
      case 'uploadingFiles':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_08');
        dialogType.subtitle = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_09');
        dialogType.btns = this.setBtns(type);
        break;
      case 'recover':
        dialogType.title = i18n.t('NOTE_RECOVER_DATA_01');
        dialogType.btns = this.setBtns(type);
        break;
      case 'emptyRecycleBin':
        dialogType.type = 'error';
        dialogType.title = i18n.t('NOTE_BIN_08', {
          num: data.pageList.length,
        });
        dialogType.subtitle = i18n.t('NOTE_BIN_07');
        dialogType.btns = this.setBtns('delete');
        break;
      case 'failUploadSpaceFullSize':
        dialogType.title = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_03');
        dialogType.btns = this.setBtns(type);
        break;
      default:
        break;
    }
    return dialogType;
  },
};

export default NoteMeta;
