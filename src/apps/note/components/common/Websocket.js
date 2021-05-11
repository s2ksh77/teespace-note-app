import NoteStore from '../../store/noteStore';
import PageStore from '../../store/pageStore';
import ChapterStore from '../../store/chapterStore';
import NoteRepository from '../../store/noteRepository';

export const handleWebsocket = (isWeb=true) => (message) => {
    const EVENT_TYPE = {
        CREATE: "CREATE",
        DELETE: "DELETE",
        UPDATE: "UPDATE",
        EDIT_START: "EDIT",
        EDIT_DONE: "EDITDONE",
        RENAME: "RENAME",
        CHAPTER_RENAME: "CHAPTERRENAME",
        CHAPTER_CREATE: "CHAPTERCREATE",
        CHAPTER_DELETE: "CHAPTERDELETE",
        NONEDIT: "NONEDIT",
        MOVE: "MOVE"
    };
    if (message.NOTI_ETC === null) {
        console.warn(" NOTE_ETC is empty");
        return;
    }
    if (message.NOTI_ETC) {
        const loginUserId = NoteRepository.USER_ID;
        const [eventType, targetId, parentId, targetUserId] = message.NOTI_ETC.split(',');

        switch (eventType) {
            case EVENT_TYPE.CREATE:
                if (message.TYPE === 'PC' && targetUserId === loginUserId) return;
                ChapterStore.getNoteChapterList();
                break;
            case EVENT_TYPE.DELETE:
                if (message.TYPE === 'PC' && targetUserId === loginUserId) return;
                if (PageStore.getCurrentPageId() === targetId) {
                    ChapterStore.getChapterFirstPage(ChapterStore.getCurrentChapterId());
                }
                ChapterStore.getNoteChapterList();
                break;
            case EVENT_TYPE.UPDATE:
            case EVENT_TYPE.EDIT_DONE:
            case EVENT_TYPE.NONEDIT:
            case EVENT_TYPE.EDIT_START:
                if (message.TYPE === 'PC' && targetUserId === loginUserId) return;
                if (PageStore.getCurrentPageId() === targetId) {
                    PageStore.fetchCurrentPageData(PageStore.getCurrentPageId());
                }
                ChapterStore.getNoteChapterList();
                break;
            case EVENT_TYPE.MOVE: // 서버에서 곧 넣을 예정
                break;
            case EVENT_TYPE.CHAPTER_CREATE:
            case EVENT_TYPE.CHAPTER_RENAME:
                if (message.TYPE === 'PC' && targetUserId === loginUserId) return;
                ChapterStore.getNoteChapterList();
                break;
            case EVENT_TYPE.CHAPTER_DELETE:
                if (message.TYPE === 'PC' && targetUserId === loginUserId) return;
                ChapterStore.getNoteChapterList();
                if (ChapterStore.getCurrentChapterId() === targetId) {
                    setTimeout(() => {
                        if (ChapterStore.chapterList && ChapterStore.chapterList.length > 0) {
                            const firstChapter = ChapterStore.chapterList[0];
                            ChapterStore.setCurrentChapterInfo(firstChapter.id); // 이 안에서 isRecycleBin true/false값 넣어줌
                            if (firstChapter.children && firstChapter.children.length > 0) {
                                PageStore.fetchCurrentPageData(firstChapter.children[0].id);
                            } else PageStore.fetchCurrentPageData('');
                        } else NoteStore.setShowPage(false);
                    }, 200)
                }
                break;
        }
    }

}