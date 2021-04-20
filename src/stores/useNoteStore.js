import NoteStore from './store/NoteStore';
import ChapterStore from './store/ChapterStore';
import PageStore from './store/PageStore';
import EditorStore from './store/EditorStore';
import TagStore from './store/TagStore';

const useNoteStore = () => {
  return { NoteStore, ChapterStore, PageStore, EditorStore, TagStore };
};

export default useNoteStore;
