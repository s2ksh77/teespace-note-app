import useNoteStore from "./store/useStore";

const beforeRoute = (location) => {
    const { PageStore, NoteStore, EditorStore } = useNoteStore();
    const { search: targetApp, pathname } = location;
    if (!PageStore.isReadMode()) {
        const locationRoomId = pathname.split('/')[2];
        const isUndoActive = EditorStore.tinymce?.undoManager.hasUndo();
        if (!isUndoActive && !PageStore.otherEdit) { PageStore.handleNoneEdit(); return false; }
        else if (targetApp === '' && locationRoomId === NoteStore.getWsId()) return false;
        else {
            NoteStore.setModalInfo('editCancel');
            return false;
        }
    } else return true;
}

export default beforeRoute;