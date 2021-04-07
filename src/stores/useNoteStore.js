import NoteStore from './store/NoteStore';
import ChapterStore from './store/ChapterStore';
const useNoteStore = () => {
  return { NoteStore, ChapterStore };
};

export default useNoteStore;
