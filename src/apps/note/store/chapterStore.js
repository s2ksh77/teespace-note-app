import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import NoteStore from "./noteStore";
import PageStore from "./pageStore";

const ChapterStore = observable({
  chapterColor: "",
  chapterList: [],
  currentChapter: "",
  currentPage: "",
  chapterNewTitle: "",
  isNewChapterColor: "",
  isNewChapter: false,
  colorArray: {
    1: "#FB7748",
    2: "#FB891B",
    3: "#E7B400",
    4: "#B4CC1B",
    5: "#65D03F",
    6: "#14C0B3",
    7: "#00C6E6",
    8: "#4A99F5",
    9: "#046305",
    10: "#E780FF",
    11: "#FF7BA8",
  },
  getCurrentChapter() {
    return this.currentChapter;
  },
  setCurrentChapter(chapterId) {
    this.currentChapter = chapterId;
  },
  getCurrentPage() {
    return this.currentPage;
  },
  setCurrentPage(pageId) {
    this.currentPage = pageId;
  },
  async getChapterList() {
    await NoteRepository.getChapterList(NoteStore.getChannelId()).then(
      (response) => {
        const {
          data: { dto: notbookList },
        } = response;
        this.chapterList = notbookList.notbookList;
        // 초기화
        if (!this.currentChapter) this.currentChapter = this.chapterList[0].id;
        if (!this.currentPage)
          this.currentPage = this.chapterList[0].children[0]?.id;
        // 고쳐야함
        NoteStore.setShowPage(true);
        PageStore.getNoteInfoList(this.currentPage);
      }
    );
    return this.chapterList;
  },
  async createChapter(chapterTitle, chapterColor) {
    await NoteRepository.createChapter(chapterTitle, chapterColor).then(
      (response) => {
        if (response.status === 200) {
          const {
            data: { dto: notbookList },
          } = response;
          ChapterStore.getChapterList();
          PageStore.getNoteInfoList(notbookList.children[0].id);
          this.setChapterTempUl(false);
        }
      }
    );
  },
  setChapterTempUl(flag) {
    this.isNewChapter = flag;
  },
  setChapterTitle(title) {
    this.chapterNewTitle = title;
  },
  getChapterId(e) {
    const {
      target: { id },
    } = e;
    return id;
  },
  getChapterRandomColor() {
    const COLOR_ARRAY = Object.values(this.colorArray);
    this.isNewChapterColor =
      COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)];
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
