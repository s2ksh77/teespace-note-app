import NoteStore from '../../store/noteStore';
import PageStore from '../../store/pageStore';
import ChapterStore from '../../store/chapterStore';
import NoteRepository from '../../store/noteRepository';

export const handleWebsocket = message => {
  const EVENT_TYPE = {
    CHAPTER_CREATE: 'CHAPTERCREATE',
    CHAPTER_DELETE: 'CHAPTERDELETE',
    CHAPTER_RENAME: 'CHAPTERRENAME',
    CREATE: 'CREATE',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    EDIT_START: 'EDIT',
    EDIT_DONE: 'EDITDONE',
    NONEDIT: 'NONEDIT',
    MOVE: 'MOVE',
  };
  if (!message.NOTI_ETC) {
    console.warn('NOTE_ETC is empty');
    return;
  }
  const loginUserId = NoteRepository.USER_ID;
  const [
    eventType,
    targetId,
    parentId,
    targetUserId,
    device,
  ] = message.NOTI_ETC.split(',');

  switch (eventType) {
    case EVENT_TYPE.CHAPTER_CREATE:
    case EVENT_TYPE.CHAPTER_RENAME:
    case EVENT_TYPE.CREATE:
      if (device === 'PC' && targetUserId === loginUserId) return;
      ChapterStore.getNoteChapterList();
      break;
    case EVENT_TYPE.CHAPTER_DELETE:
      if (device === 'PC' && targetUserId === loginUserId) return;
      ChapterStore.getNoteChapterList();
      if (ChapterStore.getCurrentChapterId() === targetId) {
        setTimeout(() => {
          if (ChapterStore.chapterList?.length > 0) {
            const firstChapter = ChapterStore.chapterList[0];
            ChapterStore.setCurrentChapterInfo(firstChapter.id);
            PageStore.fetchCurrentPageData(
              firstChapter.children?.length > 0
                ? firstChapter.children[0].id
                : '',
            );
          } else NoteStore.setShowPage(false);
        }, 200);
      }
      break;
    case EVENT_TYPE.DELETE:
      if (device === 'PC' && targetUserId === loginUserId) return;
      if (PageStore.pageInfo.id === targetId) {
        ChapterStore.getChapterFirstPage(ChapterStore.getCurrentChapterId());
      }
      ChapterStore.getNoteChapterList();
      break;
    case EVENT_TYPE.UPDATE:
    case EVENT_TYPE.EDIT_DONE:
    case EVENT_TYPE.NONEDIT:
    case EVENT_TYPE.EDIT_START:
      if (device === 'PC' && targetUserId === loginUserId) return;
      if (PageStore.pageInfo.id === targetId) {
        PageStore.fetchCurrentPageData(PageStore.pageInfo.id);
      }
      ChapterStore.getNoteChapterList();
      break;
    case EVENT_TYPE.MOVE: // 서버에서 곧 넣을 예정
      break;
    default:
      break;
  }
};

export default handleWebsocket;
