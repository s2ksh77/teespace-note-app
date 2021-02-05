import { observable, toJS } from "mobx";
import NoteRepository from "./noteRepository";
import NoteStore from "./noteStore";
import PageStore from "./pageStore";
import { checkNotDuplicate } from '../components/common/validators';
import { ThemeConsumer } from "styled-components";

const ChapterStore = observable({
  chapterColor: "",
  loadingPageInfo: false, // 2panel(pageContainer용)
  chapterList: [],
  sortedChapterList: {
    roomChapterList: [],
    sharedPageList: [],
    sharedChapterList: []
  },
  currentChapterId: "",
  chapterNewTitle: "",
  isNewChapterColor: "",
  isNewChapter: false,
  colorArray: {
    1: "#C84847",
    2: "#F29274",
    3: "#F6C750",
    4: "#77B69B",
    5: "#679886",
    6: "#3A7973",
    7: "#77BED3",
    8: "#5C83DA",
    9: "#8F91E7",
    10: "#DF97AA",
    11: "#CA6D6D",
  },
  // 검색 실행 화면 필요
  isLoadingSearchResult: false,
  isSearching: false,
  isTagSearching: false,//tag chip 클릭해서 tag chip 띄울 때 씀
  searchingTagName: '',
  searchStr: "", // <LNBSearchResultNotFound /> component에 넘겨줘야해서 필요
  searchResult: {}, // {chapter:[], page:[]} 형태
  deleteChapterId: '',
  selectableChapterId: '',
  renameChapterId: '',
  renameChapterPrevText: '',
  renameChapterText: '',
  isMovingChapter: false,
  moveInfoMap: new Map(),
  isCtrlKeyDown: false,
  dragEnterChapterIdx: '',
  chapterMap: new Map(),
  pageMap: new Map(),
  chapterChildren: [],
  exportChapterId: '',
  exportChapterTitle: '',
  sharedCnt: 0,
  scrollIntoViewId: '',
  getLoadingPageInfo() {
    return this.loadingPageInfo;
  },
  setLoadingPageInfo(isLoading) {
    this.loadingPageInfo = isLoading;
  },
  getCurrentChapterId() {
    return this.currentChapterId;
  },
  setCurrentChapterId(chapterId) {
    this.currentChapterId = chapterId;
  },
  getDeleteChapterId() {
    return this.deleteChapterId;
  },
  setDeleteChapterId(chapter) {
    this.deleteChapterId = chapter;
  },
  getSelectableChapterId() {
    return this.selectableChapterId;
  },
  setSelectableChapterId(chapterId) {
    this.selectableChapterId = chapterId;
  },
  getRenameChapterId() {
    return this.renameChapterId;
  },
  setRenameChapterId(chapterId) {
    this.renameChapterId = chapterId;
  },
  getRenameChapterPrevText() {
    return this.renameChapterPrevText;
  },
  setRenameChapterPrevText(chapterText) {
    this.renameChapterPrevText = chapterText;
  },
  getRenameChapterText() {
    return this.renameChapterText;
  },
  setRenameChapterText(chapterText) {
    this.renameChapterText = chapterText;
  },
  getIsMovingChapter() {
    return this.isMovingChapter;
  },
  setIsMovingChapter(isMoving) {
    this.isMovingChapter = isMoving;
  },
  getMoveInfoMap() {
    return this.moveInfoMap;
  },
  setMoveInfoMap(moveInfoMap) {
    this.moveInfoMap = moveInfoMap;
  },
  appendMoveInfoMap(key, value) {
    this.moveInfoMap.set(key, value);
  },
  deleteMoveInfoMap(key) {
    this.moveInfoMap.delete(key);
  },
  setIsCtrlKeyDown(flag) {
    this.isCtrlKeyDown = flag;
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
  // 웹에서 더이상 안씀!
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
  async getChapterColor(chapterId) {
    const {
      data: { dto }
    } = await NoteRepository.getChapterColor(chapterId);
    return dto.color;
  },
  async getChapterName(chapterId) {
    const {
      data: { dto }
    } = await NoteRepository.getChapterText(chapterId);
    return dto.text;
  },
  getIsLoadingSearchResult() {
    return this.isLoadingSearching;
  },
  setIsLoadingSearchResult(isLoadingSearchResult) {
    this.isLoadingSearchResult = isLoadingSearchResult;
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
  async getSearchList() {
    const {
      data: { dto },
    } = await NoteRepository.getSearchList(ChapterStore.searchStr);
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
        chapter.children.slice().reverse().forEach((page) => {
          if (!item[chapterIdx].children.includes(page.id)) {
            createdPageIds.push(page.id);
          }
        })

        item[chapterIdx].children = item[chapterIdx].children.concat(createdPageIds);
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

  async checkDefaultChapterColor(notbookList) {
    const idx = notbookList.findIndex(chapter => chapter.type === "default");
    if (idx === -1) return notbookList;

    const defaultChapter = notbookList.splice(idx, 1);
    if (defaultChapter[0]?.color === null) {
      const { color } = await this.updateChapterColor(defaultChapter[0].id);
      defaultChapter[0].color = color;
    }
    return notbookList.concat(defaultChapter);
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
    return this.chapterList;
  },

  sortChapterList(chapterList) {
    let _roomChapterList = [], _sharedPageList = [], _sharedChapterList = [];

    const sortedChapterList = chapterList.map((chapter, idx) => {
      if (chapter.type === "shared_page") _sharedPageList.push(chapter);
      else if (chapter.type === 'shared') _sharedChapterList.push(chapter);
      else _roomChapterList.push(chapter);

      if (!idx) {
        chapter.selectableChapterId = chapterList[1]?.id;
        chapter.selectablePageId = chapterList[1]?.children[0]?.id;
      } else {
        chapter.selectableChapterId = chapterList[idx - 1].id;
        chapter.selectablePageId = chapterList[idx - 1].children[0]?.id;
      }
      return chapter;
    })

    this.setSortedChapterList({
      roomChapterList: _roomChapterList,
      sharedPageList: _sharedPageList,
      sharedChapterList: _sharedChapterList
    })

    return sortedChapterList;
  },

  async createNoteChapter(chapterTitle, chapterColor) {
    const notbookList = await this.createChapter(chapterTitle, chapterColor);
    this.getNoteChapterList();
    this.setCurrentChapterId(notbookList.id);
    PageStore.setCurrentPageId(notbookList.children[0].id);
    PageStore.fetchCurrentPageData(notbookList.children[0].id);
    this.setChapterTempUl(false);
  },
  deleteNoteChapter() {
    this.deleteChapter(this.deleteChapterId).then(() => {
      this.getNoteChapterList();
      if (this.currentChapterId === this.deleteChapterId) {
        this.setCurrentChapterId(this.selectableChapterId);
        PageStore.setCurrentPageId(PageStore.selectablePageId);
        PageStore.fetchCurrentPageData(PageStore.selectablePageId);
      }
      this.deleteChapterId = '';
      NoteStore.setShowModal(false);
    });
  },

  renameNoteChapter(color) {
    this.renameChapter(this.renameChapterId, this.renameChapterText, color).then(dto => {
      if (this.moveInfoMap.get(dto.id)) this.moveInfoMap.get(dto.id).item.text = dto.text;
      this.getNoteChapterList();
    });
  },

  createMoveInfo(chapterId) {
    const chapterIdx = this.chapterList.findIndex(chapter => chapter.id === chapterId);
    return {
      item: this.chapterList[chapterIdx],
      chapterIdx: chapterIdx,
    };
  },

  handleClickOutside() {
    this.setIsCtrlKeyDown(false);
    if (!this.currentChapterId) {
      this.moveInfoMap.clear();
      return;
    }
    let currentMoveInfo = this.moveInfoMap.get(this.currentChapterId);
    if (!currentMoveInfo) currentMoveInfo = this.createMoveInfo(this.currentChapterId);
    this.setMoveInfoMap(new Map([[this.currentChapterId, currentMoveInfo]]));
  },

  getSortedMoveInfoList() {
    const moveInfoList = [...this.moveInfoMap].map(keyValue => keyValue[1]);
    return moveInfoList.sort((a, b) => a.chapterIdx - b.chapterIdx);
  },

  moveChapter(moveTargetChapterIdx) {
    const item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));

    const sortedMoveInfoList = this.getSortedMoveInfoList();
    const sortedMoveChapters = sortedMoveInfoList.map(moveInfo => item[moveInfo.chapterIdx]);

    const chapters = [];
    item.forEach((chapter, idx) => {
      if (idx === moveTargetChapterIdx) chapters.push(...sortedMoveChapters);
      if (!this.moveInfoMap.get(chapter.id)) chapters.push(chapter);
    });
    if (moveTargetChapterIdx >= chapters.length) chapters.push(...sortedMoveChapters);

    let moveCnt = 0;
    const startIdx = chapters.findIndex(chapter => chapter.id === sortedMoveInfoList[0].item.id);
    sortedMoveInfoList.forEach((moveInfo, idx) => {
      if (moveInfo.chapterIdx !== startIdx + idx) moveCnt++;
      this.moveInfoMap.set(moveInfo.item.id, {
        item: moveInfo.item,
        chapterIdx: startIdx + idx,
      })
    });

    if (moveCnt > 0) {
      localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(chapters));
      this.getNoteChapterList().then(() => {
        if (!this.currentChapterId) this.handleClickOutside();
        NoteStore.setToastText(`${moveCnt}개의 챕터가 이동하였습니다.`);
        NoteStore.setIsVisibleToast(true);
        NoteStore.setIsDragging(false);
      });
    } else {
      this.handleClickOutside();
      NoteStore.setIsDragging(false);
    }
  },
  /* 
    - search 관련
    - 방 바꼈을 때 변수 init 필요
    - 검색 후 방 바뀌었을 때 변수 init이 안됨
  */
  initSearchVar() {
    this.setIsLoadingSearchResult(false);
    this.setIsSearching(false);
    this.setIsTagSearching(false);
    this.setSearchResult({});
    this.setSearchStr("");
  },
  async getChapterFirstPage(targetId) {
    this.getChapterList().then(chapterList => {
      const targetChapter = chapterList.filter(chapter => chapter.id === targetId)[0];
      if (targetChapter.children.length > 0) {
        PageStore.setCurrentPageId(targetChapter.children[0].id);
        PageStore.fetchCurrentPageData(targetChapter.children[0].id);
      } else PageStore.setCurrentPageId('');
    })
  },
  /*
    태그와 챕터리스트 isSearching이 다름
    chapterStore에서 isSearching은 검색 시작 ~ 검색 결과나온 후 더는 안 보려고 결과 초기화하는 동작까지임
    태그는 sortedTagList란 변수 하나로 검색 결과까지 출력해서 
    isSearching이 검색 시작 ~ 검색 결과 출력전까지임
  */
  async getSearchResult() { // 모바일 안정화 이후로 (fetchSearchResult) 대신 바꿀 예정 
    this.setIsSearching(true);
    this.setIsLoadingSearchResult(true);
    this.getSearchList().then(dto => {
      this.setSearchResult({
        chapter: dto.chapterList,
        page: dto.pageList
      });
      this.setIsLoadingSearchResult(false);
    })
  },

  async fetchSearchResult() {
    this.setIsSearching(true); // 검색 결과 출력 종료까지임
    this.setIsLoadingSearchResult(true); // 검색 실행 중 화면
    // await this.getSearchResult();
    this.getSearchList().then(dto => {
      if (dto.pageList && dto.pageList.length > 0) {
        dto.pageList.map(page => {
          this.getChapterInfoList(page.parent_notebook).then(dto => {
            page.parentColor = dto.color;
            page.parentText = dto.text;
          }).then(() => {
            this.setSearchResult({
              chapter: dto.chapterList,
              page: dto.pageList
            });
            this.setIsLoadingSearchResult(false);
          })
        })
      } else {
        this.setSearchResult({
          chapter: dto.chapterList,
          page: dto.pageList
        });
        this.setIsLoadingSearchResult(false);
      }
    })
  },

  async createShareChapter(targetList) {
    const {
      data: { dto }
    } = await NoteRepository.createShareChapter(targetList);
    return dto;
  },

  createNoteShareChapter(targetRoomId, targetChapterList) {
    if (!targetChapterList) return;

    const targetChId = NoteStore.getTargetChId(targetRoomId);
    const targetList = targetChapterList.map(chapter => {
      return ({
        id: chapter.id,
        ws_id: NoteRepository.WS_ID,
        note_channel_id: NoteRepository.chId,
        text: chapter.text,
        USER_ID: NoteRepository.USER_ID,
        shared_user_id: NoteRepository.USER_ID,
        shared_room_name: NoteRepository.WS_ID,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId
      });
    });

    this.createShareChapter(targetList).then(() => {
      this.getNoteChapterList();
      NoteStore.setIsDragging(false);
    });
  },
  getFirstRenderedChapter() {
    if (this.chapterList.length > 0) return this.chapterList[0];
    return null;
  },

  setFirstMoveInfoMap(targetChapter) {
    this.setMoveInfoMap(new Map([[targetChapter.id, {
      item: targetChapter,
      chapterIdx: 0,
    }]]));

    if (targetChapter.children.length > 0) {
      const targetPage = targetChapter.children[0];
      PageStore.setMoveInfoMap(new Map([[targetPage.id, {
        item: targetPage,
        pageIdx: 0,
        chapterId: targetChapter.id,
        chapterIdx: 0,
      }]]));
    }
  },

  async setFirstNoteInfo() {
    const targetChapter = this.getFirstRenderedChapter();
    if (!targetChapter) {
      this.setCurrentChapterId('');
      PageStore.setCurrentPageId('');
      return;
    }
    this.setFirstMoveInfoMap(targetChapter);
    const chapterId = targetChapter.id;
    const pageId = targetChapter.children.length > 0 ? targetChapter.children[0].id : '';
    // setCurrentPageId는 fetchNoetInfoList에서
    await PageStore.fetchCurrentPageData(pageId);
    // pageContainer에서 currentChapterId만 있고 pageId가 없으면 render pageNotFound component
    // fetch page data 끝날 때까지 loading img 띄우도록 나중에 set chapter id
    this.setCurrentChapterId(chapterId);
  },
  /*
    loading true->false가 들어간 함수
  */
  // 처음 축소 상태에서 확대 상태로 바꿀 때
  async fetchFirstNote() {
    ChapterStore.setLoadingPageInfo(true);
    await ChapterStore.setFirstNoteInfo();
    ChapterStore.setLoadingPageInfo(false);
  },
  // chapterList 가져와서 첫 번째 노트 set해주고 보여주기
  async fetchChapterList() {
    this.setLoadingPageInfo(true);
    await this.getNoteChapterList();

    if (this.chapterList.length > 0) {
      await this.setFirstNoteInfo();
    }
    this.setLoadingPageInfo(false);
  },
});

export default ChapterStore;
