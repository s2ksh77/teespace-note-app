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
    }
  },
  setEventConfig(type) {
    const eventList = [];
    switch (type) {
      case 'chapter':
        // 삭제 함수 추가
        eventList.push(function (e) { e.stopPropagation(); ChapterStore.deleteChapter() })
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'page':
        // 삭제 함수 추가
        eventList.push(function (e) { e.stopPropagation(); if (EditorStore.fileList) { PageStore.deletePage(); EditorStore.deleteAllFile(); } else PageStore.deletePage(); })
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'editCancel':
        eventList.push(function (e) { e.stopPropagation(); PageStore.handleSave() });
        eventList.push(function (e) { e.stopPropagation(); PageStore.noneEdit(PageStore.currentPageId) });
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'confirm':
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null) });
        break;
      case 'fileDelete':
        eventList.push(function (e) { e.stopPropagation(); EditorStore.tempDeleteFile(); NoteStore.setModalInfo(null) });
        eventList.push(function (e) { e.stopPropagation(); NoteStore.setModalInfo(null); EditorStore.setDeleteFileConfig('', '') });
        break;
    }
    return eventList;
  },
  setButtonConfig(type) {
    switch (type) {
      case 'fileDelete':
      case 'delete':
        return [{ type: 'delete', text: '삭제' }, { type: 'cancel', text: '취소' }]
      case 'confirm':
        return [{ type: 'confirom', text: '확인' }]
      case 'editCancel':
        return [{ type: 'save', text: '저장' }, { type: 'notSave', text: '저장 안 함' }, { type: 'cancel', text: '취소' }]
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
    }
    return dialogType;
  }
};

export default NoteMeta;
