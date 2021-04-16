import NoteStore from './store/NoteStore';
import ChapterStore from './store/ChapterStore';
import PageStore from './store/PageStore';

const useNoteStore = () => {
  return { NoteStore, ChapterStore, PageStore };
};

export default useNoteStore;
