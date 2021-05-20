/* eslint-disable react-hooks/rules-of-hooks */
import { reaction } from 'mobx';
import { ComponentStore, EventBus, logEvent } from 'teespace-core';
import useNoteStore from './store/useStore';
import ShareNoteMessage from './components/common/ShareNoteMessage';

const initNewNoteCommand = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const store = {
    isCalling: false,
    handler: null,
  };

  EventBus.on('Note:Command:NewNote', () => {
    // NOTE: 메모리 릭을 방지하기 위해 함수 실행 중인 경우 새로운 reaction 생성하지 않음
    if (!store.isCalling) {
      store.handler = reaction(
        () =>
          // TODO: 새 페이지를 생성 못하는 경우 예외처리 필요(계정 권한, 새 페이지 생성이 불가능 한 챕터, etc...)
          !store.isCalling &&
          !NoteStore.loadingNoteApp &&
          ChapterStore.chapterList.length,
        flag => {
          if (flag) {
            store.isCalling = true;

            // NOTE: 가장 상위 챕터의 새 페이지로 생성
            const index = 0;
            const topChapter = ChapterStore.chapterList[index];

            PageStore.setCreatePageParent(topChapter.id);
            PageStore.setCreatePageParentIdx(index);
            PageStore.createNotePage();
            logEvent('note', 'clickNewPageBtn');

            store.isCalling = false;
            store.handler();
          }
        },
        {
          // NOTE: 이미 로딩이 완료된 경우를 위해 true
          fireImmediately: true,
        },
      );
    }
  });
};

const initApp = () => {
  initNewNoteCommand();
  ComponentStore.register('Note:ShareNoteMessage', ShareNoteMessage);
};

export default initApp;
