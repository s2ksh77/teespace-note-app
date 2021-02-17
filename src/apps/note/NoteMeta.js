import NoteStore from './store/noteStore';
import PageStore from './store/pageStore';
import ChapterStore from './store/chapterStore';
import EditorStore from './store/editorStore';
import Mark from 'mark.js';
import { logEvent } from 'teespace-core';

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
      name: type,
      handleCancel
    }
    switch (type) {
      case "viewInfo":
        return {
          ...initialConfig,
          title: NoteStore.getI18n('viewInfo'),
          className: "viewInfoModal"
        }
      case "forward":
        return {
          ...initialConfig,
          title: NoteStore.getI18n('forward'),
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
        eventList.push(function (e) { e.stopPropagation(); if (EditorStore.fileList) { PageStore.deleteNotePage(); EditorStore.deleteAllFile(); } else PageStore.deleteNotePage(); })
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
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'failUploadByFileNameLen':
        eventList.push(function (e) {
          e.stopPropagation(); NoteStore.setModalInfo(null);
          EditorStore.setIsFileFilteredByNameLen(false);
        });
        break;
      default:
        break;
    }
    return eventList;
  },
  setBtns(type) {
    const shape = "default";
    const defaultBtn1 = { type: "solid", shape, text: NoteStore.getI18n('ok') }; // 버튼 한 개일 때랑 text 바꿔서 사용
    const defaultBtn2 = { type: "default", shape, text: NoteStore.getI18n('cancel') };

    switch (type) {
      case 'delete': // chapter랑 page
        return [{ ...defaultBtn1, text: NoteStore.getI18n('delete') }, defaultBtn2];
      case 'confirm':
      case 'editingPage':
      case 'chapterconfirm':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'failUploadByFileNameLen':
        return [defaultBtn1];
      case 'editCancel':
        return [{ ...defaultBtn1, text: NoteStore.getI18n('save') }, { ...defaultBtn1, text: NoteStore.getI18n('notSave') }, defaultBtn2];
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
      title: '',
      subtitle: '',
      btns: []
    }
    // const editingUserName = PageStore.editingUserName;
    switch (type) {
      case 'chapter':
        dialogType.title = NoteStore.getI18n('chapterDelete');
        dialogType.subtitle = NoteStore.getI18n('chapterChildrenDelete');
        dialogType.btns = this.setBtns('delete');
        break;
      case 'page':
        dialogType.title = NoteStore.getI18n('pageDelete');
        dialogType.btns = this.setBtns('delete');
        break;
      case 'confirm':
        dialogType.type = 'info';
        dialogType.title = NoteStore.getI18n('unableDelte');
        dialogType.subtitle = NoteStore.getI18n('otherEditing');
        dialogType.btns = this.setBtns(type);
        break;
      case 'chapterconfirm':
        dialogType.type = 'info';
        dialogType.title = NoteStore.getI18n('unableDelte');
        dialogType.subtitle = NoteStore.getI18n('othersEditing');
        dialogType.btns = this.setBtns(type);
        break;
      case 'editCancel':
        dialogType.title = NoteStore.getI18n('editCancel');
        dialogType.btns = this.setBtns(type);
        break;
      case 'fileDelete':
        dialogType.title = NoteStore.getI18n('selectedDelete')(fileName);
        dialogType.subtitle = NoteStore.getI18n('notRestore');
        dialogType.btns = this.setBtns('delete');
        break;
      case 'titleDuplicate':
        dialogType.title = NoteStore.getI18n('duplicate');
        dialogType.subtitle = NoteStore.getI18n('anotherName');
        dialogType.btns = this.setBtns(type);
        break;
      case 'duplicateTagName':
        dialogType.title = NoteStore.getI18n('usedTagName');
        dialogType.btns = this.setBtns(type);
        break;
      case 'editingPage':
        dialogType.title = NoteStore.getI18n('unableModify');
        dialogType.subtitle = NoteStore.getI18n('otherEditing');
        dialogType.btns = this.setBtns('editingPage');
        break;
      case 'deletedPage':
        dialogType.title = NoteStore.getI18n('deletedNote');
        dialogType.btns = this.setBtns('deletedPage');
        break;
      case 'multiFileSomeFail':
        dialogType.title = NoteStore.getI18n('someFilesUploadFail');
        dialogType.subtitle = NoteStore.getI18n('uploadFail');
        dialogType.btns = this.setBtns('multiFileSomeFail');
        break;
      case 'sizefailUpload':
        dialogType.title = NoteStore.getI18n('sizeoverUpload');
        dialogType.btns = this.setBtns('sizefailUpload');
        break;
      case 'failUpload':
        dialogType.title = NoteStore.getI18n('countoverUpload');
        dialogType.btns = this.setBtns('failUpload');
        break;
      case 'failUploadByFileNameLen':
        dialogType.title = NoteStore.getI18n('lengthoverUpload');
        dialogType.btns = this.setBtns(type);
        break;
      default:
        break;
    }
    return dialogType;
  }
};

export default NoteMeta;
