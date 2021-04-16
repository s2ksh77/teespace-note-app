import NoteStore from './store/NoteStore';
import ChapterStore from './store/ChapterStore';
import PageStore from './store/PageStore';
import TagStore from './store/TagStore';

const useNoteStore = () => {
  return { NoteStore, ChapterStore, PageStore, TagStore };
};

export default useNoteStore;
