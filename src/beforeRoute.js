import useNoteStore from './store/useStore';

const beforeRoute = location => {
  const { PageStore, NoteStore, EditorStore } = useNoteStore();
  const { search: targetApp, pathname } = location;
  if (PageStore.isReadMode()) return true;
  if (EditorStore.isUploading) {
    NoteStore.setModalInfo('uploadingFiles');
    return false;
  }
  if (!EditorStore.isEditCancelOpen()) {
    PageStore.handleNoneEdit();
    return false;
  }
  const locationRoomId = pathname.split('/')[2];
  if (targetApp === '' && locationRoomId === NoteStore.getWsId()) return false;
  if (pathname === '/logout') {
    PageStore.editCancel();
    return true;
  }
  PageStore.editCancel();
  return false;
};

export default beforeRoute;
