import NoteStore from './store/noteStore';
import PageStore from './store/pageStore';
import ChapterStore from './store/chapterStore';
import EditorStore from './store/editorStore';
import Mark from 'mark.js';
import i18n from './i18n/i18n';
/*
  target 컴포넌트가 계속 바뀌어서 헷갈림
  open + target 컴포넌트 이름
*/

const NoteMeta = {

  // antd modal prop 설정
  openModal(type) {
    return this.setModalConfig(type);
  },
  // antd modal prop 만들기
  setModalConfig(type) {
    const handleCancel = function (e) {
      e.stopPropagation();
      NoteStore.setModalInfo(null); NoteStore.setIsShared(false);
    }
    const initialConfig = {
      targetComponent: "Modal",
      modalName: type,
      handleCancel
    }
    switch (type) {
      case "viewInfo":
        return {
          ...initialConfig,
          title: i18n.t('NOTE_DELIVER_CONTEXT_MENU_04'),
          className: "viewInfoModal"
        }
      case "forward":
        return {
          ...initialConfig,
          title: i18n.t('CM_FORWARD'),
          className: "forwardModal"
        }
      default:
        return;
    }
  },
  // core - Modal prop 설정
  openMessage(type) {
    return this.setMessageConfig(this.setMessageInfoConfig(type), this.setEventConfig(type))
  },
  // Modal(core - Message) prop 만들기
  setMessageConfig(dialogType, eventList) {
    const buttonList = [];
    // type, shape, onClick, text 
    eventList.map((event, index) => {
      dialogType.btns[index].onClick = event;
      buttonList.push(dialogType.btns[index])
    })

    return {
      targetComponent: "Message",
      modalName: dialogType.modalName, // openMessage의 인자인 type
      type: dialogType.type,
      title: dialogType.title,
      subTitle: dialogType.subtitle,
      btns: buttonList
    }
  },
  setEventConfig(type) {
    const eventList = [];
    switch (type) {
      case 'chapter':
        // 삭제 함수 추가
        eventList.push(function (e) { e.stopPropagation(); ChapterStore.deleteNoteChapter() })
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'page':
        // 삭제 함수 추가
        eventList.push(function (e) {
          e.stopPropagation();
          if (PageStore.lastSharedPageParentId) {
            ChapterStore.setDeleteChapterId(PageStore.lastSharedPageParentId);
            PageStore.setLastSharedPageParentId('');
            ChapterStore.deleteNoteChapter();
          } else PageStore.deleteNotePage();
          if (EditorStore.fileList) EditorStore.deleteAllFile();
        })
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'editCancel':
        eventList.push(function (e) {
          e.stopPropagation();
          if (EditorStore.isSearch) {
            const instance = new Mark(EditorStore.tinymce?.getBody());
            instance.unmark();
          }
          PageStore.handleSave();
          import('teespace-core')
            .then(module => {
              try {
                const { logEvent } = module;
                logEvent('note', 'clickModifyBtn')
              } catch (e) {
                console.error(e);
              }
            })
            .catch(e => console.error(e));
        });
        eventList.push(function (e) {
          e.stopPropagation();
          if (PageStore.isNewPage) PageStore.handleNoneEdit();
          else {
            if (EditorStore.notSaveFileList.length > 0) {
              EditorStore.notSaveFileDelete().then(() => {
                PageStore.noteNoneEdit(PageStore.currentPageId);
                EditorStore.tinymce?.undoManager.clear();
              });
            } else {
              PageStore.noteNoneEdit(PageStore.currentPageId);
              EditorStore.tinymce?.undoManager.clear();
            }
          }
        });
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'confirm':
      case 'editingPage':
      case 'chapterconfirm':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'fileOpenMail':
      case 'uploadingFiles':
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      // NoteFile을 import해야해서 NoeModal component에서 이벤트 추가함
      case 'failUploadByFileNameLen':
        eventList.push(function (e) { });
        break;
      default:
        break;
    }
    return eventList;
  },
  setBtns(type) {
    const shape = "default";
    const defaultBtn1 = { type: "solid", shape, text: i18n.t('NOTE_PAGE_LIST_CREATE_N_CHPT_03') }; // 버튼 한 개일 때랑 text 바꿔서 사용
    const defaultBtn2 = { type: "default", shape, text: i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_05') };

    switch (type) {
      case 'delete': // chapter랑 page
        return [{ ...defaultBtn1, text: i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04') }, defaultBtn2];
      case 'confirm':
      case 'editingPage':
      case 'chapterconfirm':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'failUploadByFileNameLen':
      case 'uploadingFiles':
        return [defaultBtn1];
      case 'editCancel':
        return [{ ...defaultBtn1, text: i18n.t('NOTE_PAGE_LIST_ADD_NEW_PGE_04') }, { ...defaultBtn1, text: i18n.t('NOTE_EDIT_PAGE_COMPLETE_02') }, defaultBtn2];
      default:
        return;
    }
  },
  setMessageInfoConfig(type) {
    // const userName = '';
    const fileName = EditorStore.deleteFileName;
    // type이 error면 빨간색, error말고 다른 색이면 보라색
    const dialogType = {
      type: 'default',
      modalName: type,
      title: '',
      subtitle: '',
      btns: []
    }
    // const editingUserName = PageStore.editingUserName;
    switch (type) {
      case 'chapter':
        dialogType.title = 'NOTE_PAGE_LIST_DEL_PGE_CHPT_06';
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_07');
        dialogType.btns = this.setBtns('delete');
        break;
      case 'page':
        dialogType.title = 'NOTE_PAGE_LIST_DEL_PGE_CHPT_03';
        dialogType.btns = this.setBtns('delete');
        break;
      case 'confirm':
        dialogType.type = 'info';
        dialogType.title = 'NOTE_PAGE_LIST_DEL_PGE_CHPT_01';
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_02', { userName: PageStore.editingUserName });
        dialogType.btns = this.setBtns(type);
        break;
      case 'chapterconfirm':
        dialogType.type = 'info';
        dialogType.title = 'NOTE_PAGE_LIST_DEL_PGE_CHPT_01';
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_08', { count: PageStore.editingUserCount });
        dialogType.btns = this.setBtns(type);
        break;
      case 'editCancel':
        dialogType.title = 'NOTE_EDIT_PAGE_COMPLETE_01';
        dialogType.btns = this.setBtns(type);
        break;
      case 'titleDuplicate':
        dialogType.title = 'NOTE_PAGE_LIST_CREATE_N_CHPT_01';
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_CREATE_N_CHPT_02');
        dialogType.btns = this.setBtns(type);
        break;
      case 'duplicateTagName':
        dialogType.title = 'NOTE_EDIT_PAGE_ADD_TAG_01';
        dialogType.btns = this.setBtns(type);
        break;
      case 'editingPage':
        dialogType.title = 'NOTE_EDIT_PAGE_CANT_EDIT_01';
        dialogType.subtitle = i18n.t('NOTE_PAGE_LIST_DEL_PGE_CHPT_02', { userName: PageStore.editingUserName });
        dialogType.btns = this.setBtns('editingPage');
        break;
      case 'deletedPage':
        dialogType.title = 'TALK_DEEP_FEATURE_METATAG_DELD_NOTE_01';
        dialogType.btns = this.setBtns('deletedPage');
        break;
      case 'multiFileSomeFail':
        dialogType.title = 'NOTE_EDIT_PAGE_ATTACH_FILE_06';
        dialogType.subtitle = i18n.t('NOTE_EDIT_PAGE_ATTACH_FILE_07', { uploadCnt: EditorStore.totalUploadLength, failCnt: EditorStore.failCount });
        dialogType.btns = this.setBtns('multiFileSomeFail');
        break;
      case 'sizefailUpload':
        dialogType.title = 'NOTE_EDIT_PAGE_ATTACH_FILE_04';
        dialogType.btns = this.setBtns('sizefailUpload');
        break;
      case 'failUpload':
        dialogType.title = 'NOTE_EDIT_PAGE_ATTACH_FILE_05';
        dialogType.btns = this.setBtns('failUpload');
        break;
      case 'failUploadByFileNameLen':
        dialogType.title = 'DRIVE_UPLOAD_BTN_04';
        dialogType.btns = this.setBtns(type);
        break;
      case 'uploadingFiles':
        dialogType.title = '업로드 중인 파일이 있습니다.'; // 아직 기능이 완벽하게 구현 안된거라 i18n은 기능 구현 후
        dialogType.btns = this.setBtns(type);
      default:
        break;
    }
    return dialogType;
  }
};

export default NoteMeta;
