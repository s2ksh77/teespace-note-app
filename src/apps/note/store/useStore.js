import NoteStore from './noteStore';
import ChapterStore from './chapterStore';
import TagStore from './tagStore';
import PageStore from './pageStore';
import EditorStore from './editorStore';
const useStore = () => {
  return { NoteStore, ChapterStore, TagStore, PageStore, EditorStore };
};

export default useStore;
