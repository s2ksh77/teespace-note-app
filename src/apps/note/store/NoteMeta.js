import NoteStore from './noteStore';
import PageStore from './pageStore';
import ChapterStore from './chapterStore';
import EditorStore from './editorStore';

const NoteMeta = {
  openDialog(type) {
    return this.setDialogConfig(this.setModalConfig(type), this.setEventConfig(type))
  },
  setDialogConfig(dialogType, eventList) {
    const buttonList = [];

    eventList.map((event, index) => {
      dialogType.buttonConfig[index].onClick = event;
      buttonList.push(dialogType.buttonConfig[index])
    })
    return {
      type: 'alert',
      title: dialogType.title,
      subTitle: dialogType.subtitle ? dialogType.subtitle : null,
      buttons: buttonList,
      sharedInfo: dialogType.info ? dialogType.info : null,
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
      case 'titleDuplicate':
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'fileDelete':
        eventList.push(function (e) { e.stopPropagation(); EditorStore.tempDeleteFile(); NoteStore.setModalInfo(null) });
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null); EditorStore.setDeleteFileConfig('', '') });
        break;
      case 'sharedInfo':
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'editingPage':
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'shareRoom':
        eventList.push(function (e) { e.stopPropagation(); NoteStore.shareNote(); NoteStore.setIsShared(false); NoteStore.setModalInfo(null); })
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null); NoteStore.setIsShared(false); });
        break;
      case 'multiFileSomeFail':
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
      default:
        break;
    }
    return eventList;
  },
  setButtonConfig(type) {
    switch (type) {
      case 'delete':
      case 'fileDelete':
      case 'editingPage':
      case 'confirm':
      case 'titleDuplicate':
      case 'sharedInfoConfirm':
      case 'multiFileSomeFail':
        return [{ type: 'confirm', text: '확인' }];
      case 'editCancel':
        return [{ type: 'save', text: '저장' }, { type: 'notSave', text: '저장 안 함' }, { type: 'cancel', text: '취소' }]
      case 'shareRoom':
        return [{ type: 'share', text: '전달' }, { type: 'cancel', text: '취소' }]
      default:
        return;
    }
  },
  setModalConfig(type) {
    const userName = '';
    const fileName = EditorStore.deleteFileName;
    const dialogType = {
      type: 'alert',
      title: '',
      subtitle: '',
      buttonConfig: []
    }
    const editingUserName = PageStore.editingUserName;
    const { sharedRoomName, sharedUserName, sharedDate } = NoteStore.sharedInfo;
    switch (type) {
      case 'chapter':
        dialogType.title = '챕터를 삭제하시겠습니까?';
        dialogType.subtitle = '챕터에 속한 페이지도 삭제됩니다.';
        dialogType.buttonConfig = this.setButtonConfig('delete');
        break;
      case 'page':
        dialogType.title = '페이지를 삭제하시겠습니까?';
        dialogType.subtitle = '';
        dialogType.buttonConfig = this.setButtonConfig('delete');
        break;
      case 'confirm':
        dialogType.type = 'normal';
        dialogType.title = '삭제할 수 없습니다.';
        dialogType.subtitle = `${userName} 님이 수정 중 입니다.`;
        dialogType.buttonConfig = this.setButtonConfig(type);
        break;
      case 'editCancel':
        dialogType.title = '페이지를 저장하고 나가시겠습니까?';
        dialogType.subtitle = '';
        dialogType.buttonConfig = this.setButtonConfig(type);
        break;
      case 'fileDelete':
        dialogType.title = `선택한 ${fileName} 을 삭제하시겠습니까?`;
        dialogType.subtitle = '삭제 후에는 복구할 수 없습니다.';
        dialogType.buttonConfig = this.setButtonConfig('delete');
        break;
      case 'titleDuplicate':
        dialogType.title = '중복된 이름이 있습니다.';
        dialogType.subtitle = '다른 이름을 입력해주세요.';
        dialogType.buttonConfig = this.setButtonConfig('titleDuplicate');
        break;
      case 'editingPage':
        dialogType.title = '수정할 수 없습니다.';
        dialogType.subtitle = `${editingUserName} 님이 수정 중 입니다.`;
        dialogType.buttonConfig = this.setButtonConfig('editingPage');
        break;
      case 'sharedInfo':
        dialogType.info = [
          { title: '출처 룸', content: sharedRoomName },
          { title: '전달한 멤버', content: sharedUserName },
          { title: '전달 날짜', content: sharedDate }
        ]
        dialogType.buttonConfig = this.setButtonConfig('sharedInfoConfirm');
        break;
      case 'shareRoom':
        dialogType.buttonConfig = this.setButtonConfig('shareRoom');
        break;
      case 'deletedPage':
        dialogType.title = '노트가 삭제되어 불러올 수 없습니다.';
        dialogType.subtitle = '';
        dialogType.buttonConfig = this.setButtonConfig('deletedPage');
        break;
      case 'multiFileSomeFail':
        dialogType.title = '일부 파일이 업로드되지 못하였습니다.';
        dialogType.subtitle = `(${EditorStore.uploadLength}개 항목 중 ${EditorStore.failCount}개 실패)`;
        dialogType.buttonConfig = this.setButtonConfig('multiFileSomeFail');
        break;
      default:
        break;
    }
    return dialogType;
  }
};

export default NoteMeta;
