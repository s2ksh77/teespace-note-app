import NoteStore from './store/noteStore';
import PageStore from './store/pageStore';
import ChapterStore from './store/chapterStore';
import EditorStore from './store/editorStore';

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
    const handleCancel = function(e) {
      e.stopPropagation();
      NoteStore.setModalInfo(null); NoteStore.setIsShared(false);
    }
    switch (type) {
      case "viewInfo":
        return {
          targetComponent: "Modal",
          name:type,
          title:"정보 보기",
          handleCancel,
          className:"viewInfoModal"
        }
      case "forward":
        return {
          targetComponent: "Modal",
          name:type,
          title:"다른 룸으로 전달",
          handleCancel,
          className:"forwardModal"
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
      btns: buttonList,
      customBadge : dialogType.customBadge
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
        eventList.push(function (e) { e.stopPropagation(); PageStore.handleSave() });
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
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'fileOpenMail':
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      default:
        break;
    }
    return eventList;
  },  
  setBtns(type) {
    const shape="default";
    const defaultBtn1 = { type :"solid", shape, text:'확인' }; // 버튼 한 개일 때랑 text 바꿔서 사용
    const defaultBtn2 = { type :"default", shape, text:'취소'};

    switch (type) {
      case 'delete': // chapter랑 page
        return [{...defaultBtn1, text:'삭제'}, defaultBtn2];
      case 'confirm':
      case 'editingPage':
      case 'chapterconfirm':
      case 'titleDuplicate':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
        return [defaultBtn1];
      case 'editCancel':
        return [{...defaultBtn1, text:'저장'}, {...defaultBtn1, text:'저장 안 함'}, defaultBtn2];
      case 'failOpenMail':
        return [defaultBtn1];
      default:
        return;
    }
  },
  setMessageInfoConfig(type) {
    const userName = '';
    const fileName = EditorStore.deleteFileName;
    // type이 error면 빨간색, error말고 다른 색이면 보라색
    const dialogType = {
      type: 'default',
      title: '',
      subtitle: null,
      btns: [],
      customBadge:null
    }
    const editingUserName = PageStore.editingUserName;
    switch (type) {
      case 'chapter':
        dialogType.title = '챕터를 삭제하시겠습니까?';
        dialogType.subtitle = '챕터에 속한 페이지도 삭제됩니다.';
        dialogType.btns = this.setBtns('delete');
        break;
      case 'page':
        dialogType.title = '페이지를 삭제하시겠습니까?';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns('delete');
        break;
      case 'confirm':
        dialogType.type = 'info';
        dialogType.title = '삭제할 수 없습니다.';
        dialogType.subtitle = `${PageStore.editingUserName} 님이 수정 중 입니다.`;
        dialogType.btns = this.setBtns(type);
        break;
      case 'chapterconfirm':
        dialogType.type = 'info';
        dialogType.title = '삭제할 수 없습니다.';
        dialogType.subtitle = `${PageStore.editingUserCount} 명이 수정 중 입니다.`;
        dialogType.btns = this.setBtns(type);
        break;
      case 'editCancel':
        dialogType.title = '페이지를 저장하고 나가시겠습니까?';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns(type);
        break;
      case 'fileDelete':
        dialogType.title = `선택한 ${fileName} 을 삭제하시겠습니까?`;
        dialogType.subtitle = '삭제 후에는 복구할 수 없습니다.';
        dialogType.btns = this.setBtns('delete');
        break;
      case 'titleDuplicate':
        dialogType.title = '중복된 이름이 있습니다.';
        dialogType.subtitle = '다른 이름을 입력해주세요.';
        dialogType.btns = this.setBtns('titleDuplicate');
        break;
      case 'editingPage':
        dialogType.title = '수정할 수 없습니다.';
        dialogType.subtitle = `${editingUserName} 님이 수정 중 입니다.`;
        dialogType.btns = this.setBtns('editingPage');
        break;
      case 'deletedPage':
        dialogType.title = '노트가 삭제되어 불러올 수 없습니다.';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns('deletedPage');
        break;
      case 'multiFileSomeFail':
        dialogType.title = '일부 파일이 업로드되지 못하였습니다.';
        dialogType.subtitle = `(${EditorStore.uploadLength}개 항목 중 ${EditorStore.failCount}개 실패)`;
        dialogType.btns = this.setBtns('multiFileSomeFail');
        break;
      case 'sizefailUpload':
        dialogType.title = '파일 첨부는 한 번에 최대 20GB까지 가능합니다.';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns('sizefailUpload');
        break;
      case 'failUpload':
        dialogType.title = '파일 첨부는 한 번에 30개까지 가능합니다.';
        dialogType.subtitle = '';
        dialogType.btns = this.setBtns('failUpload');
        break;
      case 'failOpenMail':
        dialogType.title = 'Mail로 전달할 수 없습니다.';
        dialogType.subtitle = '외부 메일 연동 후 다시 시도해주세요.';
        dialogType.btns = this.setBtns(type);
      default:
        break;
    }
    return dialogType;
  }
};

export default NoteMeta;
