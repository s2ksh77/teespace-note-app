import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import NoteStore from "./noteStore";
import PageStore from "./pageStore";

const ChapterStore = observable({
  chapterColor: "",
  chapterList: [],
  currentChapterId: "",
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
  isSearching:false,
  inputValue:"", // lnb title 영역 input창 value
  searchStr:"",
  searchResult:{}, // {chapter:[], page:[]} 형태
  getCurrentChapterId() {
    return this.currentChapterId;
  },
  setCurrentChapterId(chapterId) {
    this.currentChapterId = chapterId;
  },
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
  // search 관련
  getIsSearching() {
    return this.isSearching;
  },
  setIsSearching(isSearching) {
    this.isSearching = isSearching;
    if (!isSearching) this.searchResult={};
  },
  getInputValue() {
    return this.inputValue;
  },
  setInputValue(value) {
    this.inputValue = value;
  },
  getSearchStr() {
    return this.searchStr;
  },  
  setSearchStr(str) {
    this.searchStr = str;
    // searchResult 만들기
    let resultChapterArr=[], resultPageArr=[];
    this.chapterList.map((chapter)=>{
      // chapter 저장
      if (chapter.text.includes(this.searchStr)) {
        resultChapterArr.push({
          id:chapter.id,
          title:chapter.text,
          color:chapter.color,
          // 클릭하면 setCurrentPageId 해야해서 필요
          firstPageId:(chapter.children.length>0 ? chapter.children[0].id : null)
        })
      }
      // page 저장
      chapter.children.map((page) => {
        if (page.text.includes(this.searchStr)){
          resultPageArr.push({
            chapterId : chapter.id,
            chapterTitle: chapter.text,
            id: page.id,
            title: page.text
          })
        }
      })
    })

    this.searchResult = {
      chapter: resultChapterArr,
      page: resultPageArr
    }
  },
  getSearchResult() {
    return this.searchResult;
  }
});

export default ChapterStore;
