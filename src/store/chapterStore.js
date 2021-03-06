import { observable } from 'mobx';
import ChapterModel from './model/ChapterModel';
import NoteRepository from './noteRepository';
import NoteStore from './noteStore';
import PageStore from './pageStore';
import { checkNotDuplicate } from '../components/common/validators';
import { CHAPTER_TYPE, DRAG_TYPE } from '../GlobalVariable';
import NoteUtil from '../NoteUtil';
import i18n from '../i18n/i18n';

const ChapterStore = observable({
  chapterInfo: new ChapterModel({}),
  loadingPageInfo: false, // 2panel(pageContainer용)
  chapterList: [],
  currentChapterId: '',
  chapterNewTitle: '',
  isNewChapterColor: '',
  isNewChapter: false,
  colorArray: {
    1: '#C84847',
    2: '#F29274',
    3: '#F6C750',
    4: '#77B69B',
    5: '#679886',
    6: '#3A7973',
    7: '#77BED3',
    8: '#5C83DA',
    9: '#8F91E7',
    10: '#DF97AA',
    11: '#CA6D6D',
  },
  // 검색 실행 화면 필요
  isLoadingSearchResult: false,
  isSearching: false,
  isTagSearching: false, //tag chip 클릭해서 tag chip 띄울 때 씀
  searchingTagName: '',
  searchStr: '', // <LNBSearchResultNotFound /> component에 넘겨줘야해서 필요
  searchResult: {}, // {chapter:[], page:[]} 형태
  renameId: '',
  dragData: new Map(),
  isCtrlKeyDown: false,
  dragEnterChapterIdx: '',
  chapterMap: new Map(),
  pageMap: new Map(),
  chapterChildren: [],
  exportChapterTitle: '',
  sharedCnt: 0,
  scrollIntoViewId: '',
  chapterName: '',
  selectedChapters: new Map(),
  chapterType: '',

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
  getRenameId() {
    return this.renameId;
  },
  setRenameId(chapterId) {
    this.renameId = chapterId;
  },
  getIsMovingChapter() {
    return this.isMovingChapter;
  },
  setIsMovingChapter(isMoving) {
    this.isMovingChapter = isMoving;
  },
  getDragData() {
    return this.dragData;
  },
  setDragData(dragData) {
    this.dragData = dragData;
  },
  appendDragData(key, value) {
    this.dragData.set(key, value);
  },
  deleteDragData(key) {
    this.dragData.delete(key);
  },
  clearDragData() {
    this.dragData.clear();
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
    this.chapterChildren = this.chapterList.filter(
      chapter => chapter.id === chapterId,
    )[0].children;
  },
  setChapterTempUl(flag) {
    this.isNewChapter = flag;
    if (flag === false) this.setChapterTitle('');
  },
  setChapterTitle(title) {
    this.chapterNewTitle = title;
  },
  setChapterName(title) {
    this.chapterName = title;
  },
  getChapterId(e) {
    const {
      target: { id },
    } = e;
    return id;
  },
  setChapterType(type) {
    this.chapterType = type;
  },
  getChapterRandomColor() {
    const COLOR_ARRAY = Object.values(this.colorArray);
    this.isNewChapterColor = COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)];
    return this.isNewChapterColor;
  },
  async getChapterColor(chapterId) {
    const {
      data: { dto },
    } = await NoteRepository.getChapterColor(chapterId);
    return dto.color;
  },
  async getChapterName(chapterId) {
    const {
      data: { dto },
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
      data: {
        dto: { notbookList },
      },
    } = await NoteRepository.getChapterList(NoteStore.getChannelId());

    this.setChapterList(notbookList);
    return notbookList;
  },
  setChapterList(chapterList) {
    this.chapterList = chapterList;
  },

  async createChapter(chapterTitle, chapterColor) {
    const { dto } = await NoteRepository.createChapter(chapterTitle, chapterColor);
    return dto;
  },
  // 휴지통에 있는 페이지 복구할 때 페이지 없는 챕터 생성용
  async createRestoreChapter(chapterTitle, chapterColor) {
    const { dto } = await NoteRepository.createRestoreChapter(chapterTitle, chapterColor);
    return dto;
  },
  async deleteChapter(chapterList) {
    const { dto } = await NoteRepository.deleteChapter(chapterList);
    return dto;
  },
  async renameChapter(id, title, color) {
    const { dto } = await NoteRepository.renameChapter(id, title, color);
    return dto;
  },
  async updateChapterColor(chapterId) {
    const targetColor = this.getChapterRandomColor();
    const { dto } = await NoteRepository.updateChapterColor(chapterId, targetColor);
    return dto;
  },
  async getChapterChildren(chapterId) {
    const {
      data: { dto },
    } = await NoteRepository.getChapterChildren(chapterId);
    return dto;
  },
  async getChapterInfoList(chapterId) {
    const {
      data: { dto },
    } = await NoteRepository.getChapterInfoList(chapterId);
    return dto !== undefined ? dto : { id: '' };
  },
  async getSearchList(searchStr) {
    const {
      data: { dto },
    } = await NoteRepository.getSearchList(searchStr || this.searchStr);
    return dto;
  },

  /**
   * ChapterStore Business Logic in NoteApp
   */
  // normalChapters = type이 defualt, notebook인 chapter
  createMap(normalChapters) {
    // chapterMap: {key: chapterId, value: chapterIndex on server}
    // pageMap: {key: pageId, value: {parent: chapterId, idx: pageIndex on server}}
    this.chapterMap.clear();
    this.pageMap.clear();

    normalChapters.forEach((chapter, i) => {
      this.chapterMap.set(chapter.id, i);
      chapter.children.forEach((page, j) => {
        this.pageMap.set(page.id, { parent: chapter.id, idx: j });
      });
    });
  },

  setLocalStorageItem(targetChannelId, normalChapters) {
    // normalChapters: includes only [chapterType: notebook, default]
    const newChapters = normalChapters.map(chapter => {
      chapter.isFolded = false;
      return {
        id: chapter.id,
        children: chapter.children
          .slice()
          .reverse()
          .map(page => page.id),
        isFolded: false,
      };
    });
    localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(newChapters));
  },

  // notebookList의 chapter.type은 default, notebook만 있음
  applyDifference(targetChannelId, normalChapters) {
    let item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));

    // 로컬 스토리지에 없는 챕터/페이지가 있는지 확인한다. (생성된 챕터/페이지 확인)
    const createdChapterIds = [];
    let chapterIdxMap = item.reduce(
      (m, chapter, idx) => m.set(chapter.id, idx),
      new Map(),
    );
    normalChapters.forEach(chapter => {
      if (!chapterIdxMap.has(chapter.id)) {
        createdChapterIds.push({
          id: chapter.id,
          children: chapter.children.map(page => page.id),
          isFolded: false,
        });
      } else {
        const createdPageIds = [];
        const chapterIdx = chapterIdxMap.get(chapter.id);
        chapter.children
          .slice()
          .reverse()
          .forEach(page => {
            if (!item[chapterIdx].children.includes(page.id)) {
              createdPageIds.push(page.id);
            }
          });
        item[chapterIdx].children = item[chapterIdx].children.concat(createdPageIds);
      }
    });
    item = createdChapterIds.concat(item);

    // 서버에 없는 챕터/페이지가 있는지 확인한다. (삭제된 챕터/페이지 확인)
    item.slice().forEach(chapter => {
      chapterIdxMap = item.reduce((m, chapter, idx) => m.set(chapter.id, idx), new Map());
      if (this.chapterMap.get(chapter.id) === undefined) {
        item.splice(chapterIdxMap.get(chapter.id), 1);
      } else {
        chapter.children.slice().forEach(pageId => {
          const pageIds = chapter.children;
          if (
            this.pageMap.get(pageId) === undefined ||
            this.pageMap.get(pageId).parent !== chapter.id
          ) {
            chapter.children.splice(pageIds.indexOf(pageId), 1);
          }
        });
      }
    });

    localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(item));
  },

  getLocalOrderChapterList(targetChannelId, normalChapters) {
    const item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));

    return item.map(chapter => {
      const chapterIdx = this.chapterMap.get(chapter.id);
      return {
        ...normalChapters[chapterIdx],
        children: chapter.children.map(
          pageId => normalChapters[chapterIdx].children[this.pageMap.get(pageId).idx],
        ),
        isFolded: chapter.isFolded ? chapter.isFolded : false,
      };
    });
  },

  getLocalOrderPageList(targetChannelId, chapterId, pageList) {
    if (!this.chapterMap.get(chapterId)) return pageList;
    const item = JSON.parse(localStorage.getItem(`NoteSortData_${targetChannelId}`));
    const chapterIdx = this.chapterMap.get(chapterId);
    return item[chapterIdx].children.map(
      pageId => pageList[this.pageMap.get(pageId).idx],
    );
  },

  async checkDefaultChapterColor(notebookList) {
    if (notebookList.length === 0) return notebookList;
    if (notebookList[0].color === null && notebookList[0].id) {
      const { color } = await this.updateChapterColor(notebookList[0].id);
      notebookList[0].color = color;
    }
    return notebookList;
  },

  // type : defalut, notebook, shared_page, shared
  // default chapterColor도 null이면 update 해준다
  async sortServerChapterList(notebookList) {
    let normalChapters = [],
      sharedChapters = [];
    if (notebookList.length === 0) return { normalChapters, sharedChapters };
    const { getChapterNumType } = NoteUtil;
    // type : defalut(0), notebook(1), shared_page, shared, recycle_bin 순으로 sort된다
    notebookList.sort((a, b) => getChapterNumType(a.type) - getChapterNumType(b.type));

    notebookList = await this.checkDefaultChapterColor(notebookList);
    const firstSharedIdx = notebookList.findIndex(chapter =>
      [CHAPTER_TYPE.SHARED_PAGE, CHAPTER_TYPE.SHARED, CHAPTER_TYPE.RECYCLE_BIN].includes(
        chapter.type,
      ),
    );

    switch (firstSharedIdx) {
      case 0: // 전달만 있는 경우
        sharedChapters = notebookList.slice(0);
        break;
      case -1: // 전달 챕터/페이지, 휴지통 없는 경우
        normalChapters = notebookList.slice(0);
        break;
      default:
        // 전달인거, 아닌거 다 있는 경우
        normalChapters = notebookList.slice(0, firstSharedIdx);
        sharedChapters = notebookList.slice(firstSharedIdx);
        break;
    }
    return { normalChapters, sharedChapters };
  },

  async getNoteChapterList(isInit = false) {
    const {
      data: {
        dto: { notbookList },
      },
    } = await NoteRepository.getChapterList(NoteStore.getChannelId());
    // type순 정렬 및 반환
    let { normalChapters, sharedChapters } = await this.sortServerChapterList(
      notbookList,
    );
    this.createMap(normalChapters);
    this.sharedCnt = sharedChapters.length;

    if (!localStorage.getItem('NoteSortData_' + NoteStore.getChannelId())) {
      // 비순수함수... normalChapter에 변경이 일어남(isFolded: false 추가)
      this.setLocalStorageItem(NoteStore.getChannelId(), normalChapters);
      return this.getNoteChapterList(true);
    } else {
      this.applyDifference(NoteStore.getChannelId(), normalChapters);
      // isFolded state 추가
      normalChapters = this.getLocalOrderChapterList(
        NoteStore.getChannelId(),
        normalChapters,
      );
    }
    // sharedChapters = shared, recylce_bin
    sharedChapters = this.getTheRestFoldedState(isInit, sharedChapters);

    this.setChapterList(normalChapters.concat(sharedChapters));
    return this.chapterList;
  },

  getTheRestFoldedState(isInit, sharedChapters) {
    if (sharedChapters.length === 0) return sharedChapters;

    let item = localStorage.getItem(`Note_sharedFoldedState_${NoteStore.notechannel_id}`);
    const newFoldedMap = new Map();
    if (!item) {
      // sharedChapters의 foldedState는 false로
      sharedChapters.forEach(chapter => {
        newFoldedMap.set(chapter.id, false);
        chapter.isFolded = false;
      });
    } else {
      item = JSON.parse(item, NoteUtil.reviver);
      sharedChapters.forEach(chapter => {
        let value = item.get(chapter.id) ? item.get(chapter.id) : false;
        if (isInit && chapter.type === CHAPTER_TYPE.RECYCLE_BIN) value = true;
        newFoldedMap.set(chapter.id, value);
        chapter.isFolded = value;
      });
    }

    localStorage.setItem(
      `Note_sharedFoldedState_${NoteStore.notechannel_id}`,
      JSON.stringify(newFoldedMap, NoteUtil.replacer),
    );
    return sharedChapters;
  },

  async createNoteChapter(title = this.chapterNewTitle.trim()) {
    const { children, id } = await this.createChapter(
      title || i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_01'),
      this.isNewChapterColor,
    );
    await this.getNoteChapterList();
    this.setChapterTempUl(false);
    await PageStore.fetchCurrentPageData(children[0].id);

    return {
      chapterId: id,
      pageId: PageStore.pageInfo?.id,
    };
  },

  async deleteNoteChapter({ chapterList, selectablePageId, isDnd }) {
    await this.deleteChapter(chapterList);
    await this.getNoteChapterList();
    if (chapterList.find(chapter => chapter.id === this.currentChapterId)) {
      const pageId =
        isDnd || this.chapterList[0]?.type === CHAPTER_TYPE.RECYCLE_BIN
          ? this.chapterList[0]?.children[0]?.id
          : selectablePageId;
      await PageStore.fetchCurrentPageData(pageId);
      ChapterStore.setIsCtrlKeyDown(false);
      this.setIsCtrlKeyDown(false);
    }
    NoteStore.setIsDragging(false);
    NoteStore.setShowModal(false);
    NoteStore.setToastText(i18n.t('NOTE_BIN_04'));
    NoteStore.setIsVisibleToast(true);
    // 위에는 좀 더 보고 분리
    return {
      chapterId: this.currentChapterId,
      pageId: PageStore.currentPageId,
    };
  },

  async renameNoteChapter({ id, title, color }) {
    const { text } = await this.renameChapter(id, title.trim(), color);
    if (this.dragData.get(id)) this.dragData.get(id).item.text = text;
    await this.getNoteChapterList();
  },

  createDragData(chapterId) {
    const chapterIdx = this.chapterList.findIndex(chapter => chapter.id === chapterId);
    if (chapterIdx < 0) return;
    return {
      item: this.chapterList[chapterIdx],
      chapterIdx: chapterIdx,
    };
  },

  getSortedDragDataList() {
    const dragDataList = [...this.dragData].map(keyValue => keyValue[1]);
    return dragDataList.sort((a, b) => a.chapterIdx - b.chapterIdx);
  },

  moveChapter() {
    const item = JSON.parse(
      localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()),
    );

    const sortedDragDataList = this.getSortedDragDataList();
    const sortedMoveChapters = sortedDragDataList.map(data => item[data.chapterIdx]);

    const chapters = [];
    item.forEach((chapter, idx) => {
      if (idx === this.dragEnterChapterIdx) chapters.push(...sortedMoveChapters);
      if (!this.dragData.get(chapter.id)) chapters.push(chapter);
    });
    if (this.dragEnterChapterIdx >= chapters.length) chapters.push(...sortedMoveChapters);

    let moveCnt = 0;
    const startIdx = chapters.findIndex(
      chapter => chapter.id === sortedDragDataList[0].item.id,
    );
    sortedDragDataList.forEach((data, idx) => {
      if (data.chapterIdx !== startIdx + idx) moveCnt++;
      this.dragData.set(data.item.id, {
        item: data.item,
        chapterIdx: startIdx + idx,
      });
    });

    if (moveCnt > 0) {
      localStorage.setItem(
        'NoteSortData_' + NoteStore.getChannelId(),
        JSON.stringify(chapters),
      );
      this.getNoteChapterList().then(() => {
        this.currentChapterId = sortedMoveChapters[0].id;
        PageStore.currentPageId = sortedMoveChapters[0].children[0];
        NoteStore.setIsDragging(false);
        if (!PageStore.currentPageId) PageStore.clearDragData();
        else
          PageStore.setDragData(
            new Map([
              [
                PageStore.currentPageId,
                PageStore.createDragData(PageStore.currentPageId, this.currentChapterId),
              ],
            ]),
          );
        PageStore.fetchCurrentPageData(sortedMoveChapters[0].children[0]).then(() => {
          NoteStore.setToastText(
            i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_02', { moveCnt: moveCnt }),
          );
          NoteStore.setIsVisibleToast(true);
        });
      });
    } else {
      NoteStore.handleClickOutside('Chapter');
      NoteStore.setIsDragging(false);
    }
  },

  async fetchChapterInfo(id) {
    const dto = await this.getChapterInfoList(id);
    this.chapterInfo = new ChapterModel(dto);
    return this.chapterInfo;
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
    this.setSearchStr('');
  },
  async getChapterFirstPage(targetId) {
    this.getChapterList().then(chapterList => {
      const targetChapter = chapterList.filter(chapter => chapter.id === targetId)[0];
      if (targetChapter.children.length > 0) {
        PageStore.setCurrentPageId(targetChapter.children[0].id);
        PageStore.fetchCurrentPageData(targetChapter.children[0].id);
      } else PageStore.fetchCurrentPageData('');
    });
  },

  async getSearchResult(keyword = this.searchStr.trim(), chapterId) {
    this.setIsSearching(true);

    this.setIsLoadingSearchResult(true);
    const dto = await this.getSearchList(keyword);
    const filtered = dto.chapterList?.filter(
      chapter => chapter.type !== CHAPTER_TYPE.RECYCLE_BIN,
    );
    this.searchResult = {
      keyword,
      chapter: filtered?.length > 0 ? filtered : null,
      page: this.preProcessPageList(
        chapterId
          ? dto.pageList?.filter(page => page.parent_notebook === chapterId)
          : dto.pageList,
        keyword,
      ),
      tag: dto.tagList,
    };
    this.setIsLoadingSearchResult(false);

    return this.searchResult;
  },

  preProcessPageList(pageList, keyword) {
    if (pageList) {
      pageList.forEach(page => {
        if (page.text_content.includes(keyword))
          page.contentPreview = this.getContentPreview(page.text_content, keyword);
      });
    }

    return pageList?.length ? pageList : null;
  },

  getContentPreview(content, keyword) {
    const result = content.substring(content.indexOf(keyword) - 10);
    return content.length === result.length ? result : `...${result}`;
  },

  async createShareChapter(targetList) {
    const {
      data: { dto },
    } = await NoteRepository.createShareChapter(targetList);
    return dto;
  },

  createNoteShareChapter(targetRoomId, targetChapterList) {
    if (!targetChapterList) return;

    const targetChId = NoteStore.getTargetChId(targetRoomId);
    const targetTalkChId = NoteStore.getTargetChId(targetRoomId, 'CHN0001');
    const targetList = targetChapterList.map(chapter => {
      return {
        id: chapter.id,
        ws_id: NoteRepository.WS_ID,
        note_channel_id: NoteRepository.chId,
        text: chapter.text,
        color: chapter.color,
        type:
          chapter.type === CHAPTER_TYPE.SHARED_PAGE ||
          chapter.type === CHAPTER_TYPE.SHARED
            ? DRAG_TYPE.SHARED_CHAPTER
            : DRAG_TYPE.CHAPTER,
        USER_ID: NoteRepository.USER_ID,
        shared_user_id: NoteRepository.USER_ID,
        shared_room_name: NoteRepository.WS_ID,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId,
        messenger_id: targetTalkChId,
      };
    });

    this.createShareChapter(targetList).then(() => {
      this.getNoteChapterList();
      NoteStore.setIsDragging(false);
    });
  },

  setFirstDragData(targetChapter) {
    this.setDragData(
      new Map([
        [
          targetChapter.id,
          {
            item: targetChapter,
            chapterIdx: 0,
          },
        ],
      ]),
    );

    if (targetChapter.children.length > 0) {
      const targetPage = targetChapter.children[0];
      PageStore.setDragData(
        new Map([
          [
            targetPage.id,
            {
              item: targetPage,
              pageIdx: 0,
              chapterId: targetChapter.id,
              chapterIdx: 0,
            },
          ],
        ]),
      );
    }
  },

  async setFirstNoteInfo() {
    const targetChapter = this.chapterList.length > 0 ? this.chapterList[0] : null;
    if (!targetChapter) {
      this.setCurrentChapterInfo('', false); //chapterId='', isRecycleBin=false
      PageStore.fetchCurrentPageData('');
      return;
    }
    this.setFirstDragData(targetChapter);
    const pageId = targetChapter.children.length > 0 ? targetChapter.children[0].id : '';
    // pageContainer에서 currentChapterId만 있고 pageId가 없으면 render pageNotFound component
    // fetch page data 끝날 때까지 loading img 띄우도록 나중에 set chapter id
    if (pageId) await PageStore.fetchCurrentPageData(pageId);
    else {
      this.setCurrentChapterInfo(
        targetChapter.id,
        targetChapter.type === CHAPTER_TYPE.RECYCLE_BIN ? true : false,
      );
    }
  },
  /*
    loading true->false가 들어간 함수
  */
  // 처음 축소 상태에서 확대 상태로 바꿀 때
  async fetchFirstNote() {
    this.setLoadingPageInfo(true);
    await this.setFirstNoteInfo();
    this.setLoadingPageInfo(false);
  },
  // chapterList 가져와서 첫 번째 노트 set해주고 보여주기
  async fetchChapterList(isInit = false) {
    // 한 군데에서만 부르긴하지만 일단 param 추가
    this.setLoadingPageInfo(true);
    await this.getNoteChapterList(isInit);

    if (this.chapterList.length > 0) {
      await this.setFirstNoteInfo();
    }
    this.setLoadingPageInfo(false);
  },

  // localStorage에서 page 얻기
  getChapterFirstPageId(chapterId) {
    const chapter = this.chapterList.find(chapter => chapter.id === chapterId);
    if (!chapter || chapter.children.length === 0) return null;
    return chapter.children[0]?.id;
  },
  /**
   * isRecycleBin인지 항상 같이 set해줘야해서 만든 함수
   * computed 기능용으로 만듦
   * param: 1st.chapterId, 2nd. isRecycleBin값(안 넘기면 recycleBin 찾아서 비교함)
   * chapterId 없으면 isRecycleBin은 false로 세팅함
   */
  setCurrentChapterInfo(chapterId, isRecycleBin) {
    this.setCurrentChapterId(chapterId);
    if (typeof isRecycleBin === 'boolean') {
      PageStore.setIsRecycleBin(isRecycleBin);
      return;
    }
    if (!chapterId) {
      PageStore.setIsRecycleBin(false);
      return;
    }
    const recycleBin = this.chapterList.find(
      chapter => chapter.type === CHAPTER_TYPE.RECYCLE_BIN,
    );
    if (recycleBin && recycleBin.id === chapterId) PageStore.setIsRecycleBin(true);
    else PageStore.setIsRecycleBin(false);
  },

  async openNote() {
    try {
      switch (NoteStore.metaTagInfo.type) {
        case 'chapter': // chapter, page 선택
          NoteStore.setTargetLayout('LNB');
          this.setScrollIntoViewId(NoteStore.metaTagInfo.id);
          await this.getNoteChapterList();
          // 혹시 휴지통이 챕터 메타태그로 공유되었을 경우 대비
          this.setCurrentChapterInfo(NoteStore.metaTagInfo.id);
          const pageId = this.getChapterFirstPageId(NoteStore.metaTagInfo.id);
          /**
           * 현재 챕터 클릭 로직과 동일하게 함
           * lnb만 보이고 있어도 선택효과 주기 위해 noteInfo를 이때 가져옴
           * 확대버튼 눌렀을 때 다시 getNoteInfo 하지 않음
           */
          await PageStore.fetchCurrentPageData(pageId ? pageId : '');
          break;
        case 'page':
          await PageStore.fetchCurrentPageData(NoteStore.metaTagInfo.id);
          NoteStore.setTargetLayout('Content'); // 챕터 없습니다 페이지 나오지 않게 하기
          break;
      }
    } catch (e) {
      console.log('e', e);
    }
    NoteStore.setMetaTagInfo({ isOpen: false, type: '', id: '' });
  },

  getRoomChapterList() {
    const roomChapterList = this.chapterList.filter(
      chapter =>
        chapter.type === CHAPTER_TYPE.NOTEBOOK || chapter.type === CHAPTER_TYPE.DEFAULT,
    );
    return roomChapterList;
  },
});

export default ChapterStore;
