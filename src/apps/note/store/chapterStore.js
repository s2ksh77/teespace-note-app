import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import NoteStore from "./noteStore";

const ChapterStore = observable({
  chapterColor: "",
  chapterList: [],
  async getChapterList() {
    await NoteRepository.getChapterList(NoteStore.getChannelId()).then(
      (response) => {
        const {
          data: { dto: notbookList },
        } = response;
        this.chapterList = notbookList.notbookList;
      }
    );
    return this.chapterList;
  },
  getChapterId(e) {
    const {
      target: { id },
    } = e;
    return id;
  },
  getChapterColor() {
    this.chapterList.forEach((chapter) => {
      this.chapterColor = chapter.color;
      return this.chapterColor;
    });
  },
  getChapterName(chapterId) {
    const { value } = NoteRepository.getChapterText(chapterId);
    return value;
  },
});

export default ChapterStore;
