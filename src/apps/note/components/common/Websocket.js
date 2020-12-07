import PageStore from '../../store/pageStore';
import ChapterStore from '../../store/chapterStore';
import NoteRepository from '../../store/noteRepository';

export const handleWebsocket = (message) => {

    const EVENT_TYPE = {
        CREATE: "CREATE",
        DELETE: "DELETE",
        REMOVE: "REMOVE",
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
        const USER_INFO = message.NOTI_ETC.split(':');
        const targetID = USER_INFO[1];
        const targetUSER = USER_INFO[2];

        switch (EVENT_CASE) {
            case EVENT_TYPE.CREATE:
                if (targetUSER === loginUSER) return;
                else {
                    // if (PageStore.getIsEdit() === loginUSER) return;
                    // else 
                    ChapterStore.getNoteChapterList();
                }
                break;
            case EVENT_TYPE.DELETE:
                break;
            case EVENT_TYPE.REMOVE:
                break;
            case EVENT_TYPE.UPDATE:
                break;
            case EVENT_TYPE.EDIT_START:
                break;
            case EVENT_TYPE.EDIT_DONE:
                break;
            case EVENT_TYPE.RENAME:
                break;
            case EVENT_TYPE.NONEDIT:
                break;
            case EVENT_TYPE.MOVE:
                break;
            case EVENT_TYPE.CHAPTER_RENAME:
                break;
            case EVENT_TYPE.CHAPTER_CREATE:
                break;
            case EVENT_TYPE.CHAPTER_DELETE:
                break;
        }
    }

}