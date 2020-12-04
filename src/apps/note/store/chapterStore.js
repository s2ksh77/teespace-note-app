import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import NoteStore from "./noteStore";
import PageStore from "./pageStore";
import { checkNotDuplicate } from '../components/common/validators';
import { type } from "ramda";

const ChapterStore = observable({
  chapterColor: "",
  chapterList: [],
  sortedChapterList:{
    roomChapterList:[],
    sharedPageList:[],
    sharedChapterList:[]
  },
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
  isSearching: false,
  isTagSearching: false,//tag chip 클릭해서 tag chip 띄울 때 씀
  searchingTagName: '',
  searchStr: "", // <LNBSearchResultNotFound /> component에 넘겨줘야해서 필요
  searchResult: {}, // {chapter:[], page:[]} 형태
  deleteChapterId: '',
  nextSelectableChapterId: '',
  renameChapterId: '',
  renameChapterText: '',
  allDeleted: false,
  isMovingChapter: false,
  moveChapterIdx: '',
  dragEnterChapterIdx: '',
  chapterMap: new Map(),
  pageMap: new Map(),
  chapterChildren: [],
  exportChapterId: '',
  exportChapterTitle: '',
  sharedCnt: 0,
  scrollIntoViewId: '',
  getCurrentChapterId() {
    return this.currentChapterId;
  },
  setCurrentChapterId(chapterId) {
    this.currentChapterId = chapterId;
  },
  getDeleteChapterId() {
    return this.deleteChapterId;
  },
  setDeleteChapterId(chapterId) {
    this.deleteChapterId = chapterId;
  },
  getNextSelectableChapterId() {
    return this.nextSelectableChapterId;
  },
  setNextSelectableChapterId(chapterId) {
    this.nextSelectableChapterId = chapterId;
  },
  getRenameChapterId() {
    return this.renameChapterId;
  },
  setRenameChapterId(chapterId) {
    this.renameChapterId = chapterId;
  },
  getRenameChapterText() {
    return this.renameChapterText;
  },
  setRenameChapterText(chapterText) {
    this.renameChapterText = chapterText;
  },
  getAllDeleted() {
    return this.allDeleted;
  },
  setAllDeleted(allDeleted) {
    this.allDeleted = allDeleted;
  },
  getIsMovingChapter() {
    return this.isMovingChapter;
  },
  setIsMovingChapter(isMoving) {
    this.isMovingChapter = isMoving;
  },
  getMoveChapterIdx() {
    return this.moveChapterIdx;
  },
  setMoveChapterIdx(chapterIdx) {
    this.moveChapterIdx = chapterIdx;
  },
  getDragEnterChapterIdx() {
    return this.dragEnterChapterIdx;
  },
  setDragEnterChapterIdx(chapterIdx) {
    this.dragEnterChapterIdx = chapterIdx;
  },
  setChapterListChildren(chapterId) {
    this.chapterChildren = this.chapterList.filter(chapter => chapter.id === chapterId)[0].children;
  },
  getChapterChildren() {
    return this.chapterChildren;
  },
  setChapterTempUl(flag) {
    this.isNewChapter = flag;
    if (flag === false) this.setChapterTitle('');
  },
  setChapterTitle(title) {
    this.chapterNewTitle = title;
  },
  // 사용자 input이 없을 때
  getNewChapterTitle() {
    const re = /^새 챕터 (\d+)$/gm;
    let chapterTitle, temp;
    let isNotAvailable = [];
    let fullLength = this.chapterList.length;
    isNotAvailable.length = fullLength + 1;

    this.chapterList.forEach((chapter) => {
      chapterTitle = chapter.text;
      if (chapterTitle === '새 챕터') {
        isNotAvailable[0] = 1;
      } else if (re.test(chapterTitle)) {
        temp = parseInt(chapterTitle.replace(re, "$1"));
        if (temp <= fullLength) {
          isNotAvailable[temp] = 1;
        }
      }
    })

    if (!isNotAvailable[0]) return "새 챕터";
    for (let i = 1; i <= fullLength; i++) {
      if (!isNotAvailable[i]) return "새 챕터 " + i;
    }
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
    return this.isNewChapterColor;
  },
  getChapterColor(chapterId) {
    const { value } = NoteRepository.getChapterColor(chapterId);
    return value;
  },
  getChapterName(chapterId) {
    const { value } = NoteRepository.getChapterText(chapterId);
    return value;
  },
  getIsSearching() {
    return this.isSearching;
  },
  setIsSearching(isSearching) {
    this.isSearching = isSearching;
  },
  getSearchStr() {
    return this.searchStr;
  },
  setSearchStr(str) {
    this.searchStr = str;
  },
  // 태그칩 선택시 사용 목적 : 해당 태그가 들어있는 페이지 리스트 보여주기
  // tagStore에서 setSearchResult({chapter:[],page:[page1,page2..]})
  setSearchResult(result) {
    this.searchResult = result;
  },
  // 태그칩 클릭해서 lnblist 띄우기
  getSearchingTagName() {
    return this.searchingTagName;
  },
  setSearchingTagName(str) {
    this.searchingTagName = str;
  },
  getIsTagSearching() {
    return this.isTagSearching;
  },
  setIsTagSearching(isSearching) {
    this.isTagSearching = isSearching;
  },

  isValidChapterText(targetText) {
    return checkNotDuplicate(this.chapterList, 'text', targetText);
  },
  setExportId(chapterId) {
    this.exportChapterId = chapterId;
  },
  setExportTitle(chapterTitle) {
    this.exportChapterTitle = chapterTitle;
  },
  changePageList(chapterIdx, pageList) {
    this.chapterList[chapterIdx].children = pageList;
  },

  setScrollIntoViewId(chapterId) {
    this.scrollIntoViewId = chapterId;
  },

  /**
   *  ChapterStore Method : getChapterList, createChapter, deleteChapter, renameChapter
   */
  async getChapterList() {
    const {
      data: { dto:
        { notbookList }
      }
    } = await NoteRepository.getChapterList(NoteStore.getChannelId());

    this.setChapterList(notbookList);
    return notbookList;
  },
  setChapterList(chapterList) {
    this.chapterList = chapterList;
  },
  getSortedChapterList() {
    return this.sortedChapterList;
  },
  setSortedChapterList(obj) {
    this.sortedChapterList = obj;
  },

  async createChapter(chapterTitle, chapterColor) {
    const { dto } = await NoteRepository.createChapter(chapterTitle, chapterColor);
    return dto;
  },
  async deleteChapter(deleteChapterId) {
    const { dto } = await NoteRepository.deleteChapter(deleteChapterId);
    return dto;
  },
  async renameChapter(renameId, renameText, color) {
    const { dto } = await NoteRepository.renameChapter(renameId, renameText, color)
    return dto;
  },
  async updateChapterColor(chapterId) {    
    const targetColor = this.getChapterRandomColor();
    const { dto } = await NoteRepository.updateChapterColor(chapterId, targetColor)
    return dto;
  },
  async getChapterChildren(chapterId) {
    const {
      data: { dto }
    } = await NoteRepository.getChapterChildren(chapterId);
    return dto;
  },
  async getChapterInfoList(chapterId) {
    const { 
      data: { dto },
    } = await NoteRepository.getChapterInfoList(chapterId);
    return dto;
  },

  /**
   * ChapterStore Business Logic in NoteApp
   */
  createMap(notebookList) {
    // chapterMap: {key: chapterId, value: chapterIndex on server}
    // pageMap: {key: pageId, value: {parent: chapterIndex on server, idx: pageIndex on server}}
    this.chapterMap.clear();
    this.pageMap.clear();

    notebookList.forEach((chapter, i) => {
      if (chapter.type === 'shared_page' || chapter.type === 'shared') return;

      this.chapterMap.set(chapter.id, i);
      chapter.children.forEach((page, j) => {
        this.pageMap.set(page.id, { parent: chapter.id, idx: j });
      });
    });
  },

  getSharedList(notebookList) {
    const sharedList = [];
    notebookList.forEach((chapter, idx) => {
      if (chapter.type === 'shared_page') sharedList.splice(0, 0, notebookList[idx]);
      else if (chapter.type === 'shared') sharedList.push(notebookList[idx]);
    });

    return sharedList;
  },

  setLocalStorageItem(targetChannelId, tempChapterList) {
    // tempChapterList: includes only [chapterType: notebook, default]
    const item = [];
    tempChapterList.forEach((chapter) => {
      const children = [];
      chapter.children.forEach((page) => children.push(page.id));
      item.push({ id: chapter.id, children: children });
    });

    localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(item));
  },

  applyDifference(targetChannelId, notebookList) {
    var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));

    // 로컬 스토리지에 없는 챕터/페이지가 있는지 확인한다. (생성된 챕터/페이지 확인)
    const createdChapterIds = [];
    let chapterIds = item.map((chapter) => chapter.id);
    notebookList.forEach((chapter) => {
      if (chapter.type === 'shared_page' || chapter.type === 'shared') return;

      if (!chapterIds.includes(chapter.id)) {
        createdChapterIds.push({ id: chapter.id, children: chapter.children.map((page) => page.id) });
      }
      else {
        const createdPageIds = [];
        const chapterIdx = chapterIds.indexOf(chapter.id);
        chapter.children.forEach((page) => {
          if (!item[chapterIdx].children.includes(page.id)) {
            createdPageIds.push(page.id);
          }
        })

        item[chapterIdx].children = createdPageIds.concat(item[chapterIdx].children);
      }
    });
    item = createdChapterIds.concat(item);

    // 서버에 없는 챕터/페이지가 있는지 확인한다. (삭제된 챕터/페이지 확인)
    item.slice().forEach((chapter) => {
      chapterIds = item.map((chapter) => chapter.id);
      if (this.chapterMap.get(chapter.id) === undefined) {
        item.splice(chapterIds.indexOf(chapter.id), 1);
      }
      else {
        chapter.children.slice().forEach((pageId) => {
          const pageIds = chapter.children;
          if (this.pageMap.get(pageId) === undefined
            || this.pageMap.get(pageId).parent !== chapter.id) {
            chapter.children.splice(pageIds.indexOf(pageId), 1);
          }
        });
      }
    });

    localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(item));
  },

  getLocalStorageItem(targetChannelId, notebookList) {
    const item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));

    const localChapterList = [];
    item.forEach((chapter, idx) => {
      const chapterIdx = this.chapterMap.get(chapter.id);
      localChapterList.push(notebookList[chapterIdx]);
      const localPageList = [];
      chapter.children.forEach((pageId) => {
        const pageIdx = this.pageMap.get(pageId).idx;
        localPageList.push(notebookList[chapterIdx].children[pageIdx]);
      })
      localChapterList[idx].children = localPageList;
    });

    return localChapterList;
  },

  async fetchChapterList() {
    await this.getNoteChapterList();
    if (this.chapterList.length === 0) {
      NoteStore.setShowPage(false);
    } else {
      NoteStore.setShowPage(true);
      const chapterId = this.chapterList[0].id;
      const pageId = 
        this.chapterList[0].children.length > 0
          ? this.chapterList[0].children?.[0]?.id
          : ''
      this.setCurrentChapterId(chapterId);
      PageStore.setCurrentPageId(pageId);
      PageStore.fetchCurrentPageData(pageId);
    }
  },
  
  async checkDefaultChapterColor(notbookList) {
    const idx = notbookList.findIndex(chapter => chapter.type === "default");
    if (idx === -1) return notbookList;
    const defaultChapter = notbookList.splice(idx,1);
    if (defaultChapter[0]?.color === null) {
      const {color} = await this.updateChapterColor(defaultChapter[0].id);
      defaultChapter[0].color = color;
      return notbookList.concat(defaultChapter);
    }
    return notbookList;
  },

  async getNoteChapterList() {
    const notbookList = await this.getChapterList();
    this.createMap(notbookList);
    const sharedList = this.getSharedList(notbookList);
    this.sharedCnt = sharedList.length;

    let tempChapterList = [];
    if (!localStorage.getItem('NoteSortData_' + NoteStore.getChannelId())) {
      tempChapterList = notbookList.filter((chapter) => chapter.type === 'notebook' || chapter.type === 'default');
      // TODO : update chapterColor 로직 더 좋은 아이디어로 수정하기
      tempChapterList = await this.checkDefaultChapterColor(tempChapterList);
      this.setLocalStorageItem(NoteStore.getChannelId(), tempChapterList);
    }
    else {
      this.applyDifference(NoteStore.getChannelId(), notbookList);
      tempChapterList = this.getLocalStorageItem(NoteStore.getChannelId(), notbookList);
    }
    this.chapterList = tempChapterList.concat(sharedList);

    // component에서 render하기 좋도록 category 분류하기
    this.sortChapterList();
    return this.chapterList;
  },

  sortChapterList() {
    let _roomChapterList=[], _sharedPageList=[], _sharedChapterList=[];

    this.chapterList.forEach(chapter=>{
      if (chapter.type === "shared_page") _sharedPageList.push(chapter);
      else if (chapter.type === 'shared') _sharedChapterList.push(chapter);
      else _roomChapterList.push(chapter);
    })

    this.setSortedChapterList({
      roomChapterList : _roomChapterList,
      sharedPageList : _sharedPageList,
      sharedChapterList : _sharedChapterList
    })
  },

  async createNoteChapter(chapterTitle, chapterColor) {
    const notbookList = await this.createChapter(chapterTitle, chapterColor);
    this.getNoteChapterList();
    this.setCurrentChapterId(notbookList.id);
    PageStore.setCurrentPageId(notbookList.children[0].id);
    PageStore.fetchCurrentPageData(notbookList.children[0].id);
    this.setChapterTempUl(false);
    this.setAllDeleted(false);
  },
  deleteNoteChapter() {
    this.deleteChapter(this.deleteChapterId).then(() => {
      if (this.currentChapterId === this.deleteChapterId) {
        this.setCurrentChapterId(this.nextSelectableChapterId);
        PageStore.setCurrentPageId(PageStore.nextSelectablePageId ? PageStore.nextSelectablePageId : '');
        PageStore.fetchCurrentPageData(PageStore.nextSelectablePageId ? PageStore.nextSelectablePageId : '');
        if (!this.nextSelectableChapterId) this.setAllDeleted(true);
      }
      this.getNoteChapterList();
      if (this.allDeleted) NoteStore.setShowPage(false);
      this.deleteChapterId = '';
      NoteStore.setShowModal(false);
    });
  },
  renameNoteChapter(color) {
    this.renameChapter(this.renameChapterId, this.renameChapterText, color).then(() => this.getNoteChapterList());
  },

  moveChapter(moveTargetChapterIdx) {
    if (this.moveChapterIdx !== moveTargetChapterIdx
      && this.moveChapterIdx + 1 !== moveTargetChapterIdx) {
      const item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));
      const copyOfChapterList = this.chapterList.slice();
      const target = this.chapterList[this.moveChapterIdx];
      const targetInLocalStorage = item[this.moveChapterIdx];
      
      if (this.moveChapterIdx < moveTargetChapterIdx) {
        copyOfChapterList.splice(moveTargetChapterIdx, 0, target);
        copyOfChapterList.splice(this.moveChapterIdx, 1);
        item.splice(moveTargetChapterIdx, 0, targetInLocalStorage);
        item.splice(this.moveChapterIdx, 1);
      }
      else {
        copyOfChapterList.splice(this.moveChapterIdx, 1);
        copyOfChapterList.splice(moveTargetChapterIdx, 0, target);
        item.splice(this.moveChapterIdx, 1);
        item.splice(moveTargetChapterIdx, 0, targetInLocalStorage);
      }

      this.chapterList = copyOfChapterList;
      localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(item));
    }

    this.moveChapterIdx = '';
  },
  /* 
    - search 관련
    - 방 바꼈을 때 변수 init 필요
    - 검색 후 방 바뀌었을 때 변수 init이 안됨
  */
  initSearchVar() {
    this.setIsSearching(false);
    this.setIsTagSearching(false);
    this.setSearchResult({});
    this.setSearchStr("");
  },
  /*
    태그와 챕터리스트 isSearching이 다름
    chapterStore에서 isSearching은 검색 시작 ~ 검색 결과나온 후 더는 안 보려고 결과 초기화하는 동작까지임
    태그는 sortedTagList란 변수 하나로 검색 결과까지 출력해서 
    isSearching이 검색 시작 ~ 검색 결과 출력전까지임
  */
  async fetchSearchResult() {
    this.setIsSearching(true); // 검색 결과 출력 종료까지임
    await this.getSearchResult();
  },
  async getSearchResult() {
    this.setSearchResult({});
    const chapterList = await this.getChapterList();// searchResult 만들기
    let resultChapterArr = [], resultPageArr = [];
    chapterList.map((chapter) => {
      // chapter 저장
      if (chapter.text.includes(this.searchStr)) {
        resultChapterArr.push({
          id: chapter.id,
          title: chapter.text,
          color: chapter.color,
          // 클릭하면 setCurrentPageId 해야해서 필요
          firstPageId: (chapter.children.length > 0 ? chapter.children[0].id : null)
        })
      }
      // page 저장
      chapter.children.map((page) => {
        if (page.text.includes(this.searchStr)) {
          resultPageArr.push({
            chapterId: chapter.id,
            chapterTitle: chapter.text,
            id: page.id,
            title: page.text
          })
        }
      })
    })

    this.setSearchResult({
      chapter: resultChapterArr,
      page: resultPageArr
    });
  },

  async createShareChapter(targetList) {
    const {
      data: { dto }
    } = await NoteRepository.createShareChapter(targetList);
    return dto;
  },

  createNoteShareChapter(targetRoomId, targetChId, sharedRoomName, targetChapterList) {
    if (!targetChapterList) return;
    
    const targetList = targetChapterList.map(chapter => {
      return ({
        id: chapter.id,
        ws_id: NoteRepository.WS_ID,
        note_channel_id: NoteRepository.chId,
        text: chapter.text,
        USER_ID: NoteRepository.USER_ID,
        shared_user_id: NoteRepository.USER_ID,
        shared_room_name: sharedRoomName,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId
      });
    });

    this.createShareChapter(targetList).then(() => this.getNoteChapterList());
  },
});

export default ChapterStore;
