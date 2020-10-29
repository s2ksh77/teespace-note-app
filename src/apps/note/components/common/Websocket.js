
export const handleWebsocket = (message) => {
    console.log(message);
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
    const EVENT_CASE = message.NOTI_ETC.split(',')[0];

    switch (EVENT_CASE) {
        case EVENT_TYPE.CREATE:
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