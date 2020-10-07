import NoteStore from './noteStore';
import PageStore from './pageStore';

const NoteMeta = {
  // dialog info
  editCancelModalInfo() {
    return {
      type: 'alert',
      title: '페이지를 저장하고 나가시겠습니까?',
      subTitle: null,
      buttons: [
        {
          type: 'save',
          text: '저장',
          onClick: () => {
            PageStore.handleSave();
          },
        },
        {
          type: 'notSave',
          text: '저장 안 함',
          onClick: () => {
            PageStore.noneEdit(PageStore.currentPageId);
          },
        },
        {
          type: 'cancel',
          text: '취소',
          onClick: () => {
            NoteStore.setModalInfo(null);
          },
        },
      ],
    };
  },
};

export default NoteMeta;
