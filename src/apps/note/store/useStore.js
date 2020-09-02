import NoteStore from "./noteStore";
import ChapterStore from "./chapterStore";
import TagStore from "./tagStore";
import PageStore from "./pageStore";

const useStore = () => {
  return { NoteStore, ChapterStore, TagStore, PageStore };
};

export default useStore;
