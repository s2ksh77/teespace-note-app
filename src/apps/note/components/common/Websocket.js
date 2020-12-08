import PageStore from '../../store/pageStore';
import ChapterStore from '../../store/chapterStore';
import NoteRepository from '../../store/noteRepository';

export const handleWebsocket = (message) => {
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
        const loginUSER = NoteRepository.USER_ID;
        const EVENT_CASE = message.NOTI_ETC.split(',')[0];
        const MESSAGE_INFO = message.NOTI_ETC.split(',')[1];
        const Info = MESSAGE_INFO.split(':');
        let targetID = Info[0];
        let targetUSER = Info[1];

        switch (EVENT_CASE) {
            case EVENT_TYPE.CREATE:
                if (targetUSER === loginUSER) return;
                else ChapterStore.getNoteChapterList();
                break;
            case EVENT_TYPE.DELETE:
                if (targetUSER === loginUSER) return;
                else {
                    if (PageStore.getCurrentPageId() === targetID) {
                        ChapterStore.setCurrentChapterId(ChapterStore.getCurrentChapterId());
                        ChapterStore.getChapterFirstPage(ChapterStore.getCurrentChapterId());
                    }
                    ChapterStore.getNoteChapterList();
                }
                break;
            case EVENT_TYPE.UPDATE:
            case EVENT_TYPE.EDIT_DONE:
            case EVENT_TYPE.NONEDIT:
            case EVENT_TYPE.EDIT_START: // EDIT,NOTE_ID:USER_ID
                if (targetUSER === loginUSER) return;
                else {
                    if (PageStore.getCurrentPageId() === targetID) {
                        PageStore.fetchCurrentPageData(PageStore.getCurrentPageId());
                    }
                    ChapterStore.getNoteChapterList();
                }
                break;
            case EVENT_TYPE.MOVE: // 서버에서 곧 넣을 예정
                break;
            case EVENT_TYPE.CHAPTER_CREATE:
            case EVENT_TYPE.CHAPTER_RENAME:
                if (targetUSER === loginUSER) return;
                else {
                    ChapterStore.getNoteChapterList();
                }
                break;
            case EVENT_TYPE.CHAPTER_DELETE:
                if (targetUSER === loginUSER) return;
                else {
                    if (ChapterStore.getCurrentChapterId() === targetID) {
                        ChapterStore.getNoteChapterList();
                        setTimeout(() => {
                            if (ChapterStore.chapterList && ChapterStore.chapterList.length > 0) {
                                const firstChapter = ChapterStore.chapterList[0];
                                ChapterStore.setCurrentChapterId(firstChapter.id);
                                if (firstChapter.children && firstChapter.children.length > 0) {
                                    PageStore.setCurrentPageId(firstChapter.children[0].id);
                                    PageStore.fetchCurrentPageData(firstChapter.children[0].id);
                                } else PageStore.setCurrentPageId('');
                            } else NoteStore.setShowPage(false);
                        }, 200)
                    } else ChapterStore.getNoteChapterList();
                }
                break;
        }
    }

}