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
  isSearching: false,
  isTagSearching: false,//tag chip 클릭해서 tag chip 띄울 때 씀
  targetSearchTagName: '',
  inputValue: "", // lnb title 영역 input창 value
  searchStr: "",
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
  getCurrentChapterId() {
    return this.currentChapterId;
  },
  setCurrentChapterId(chapterId) {
    this.currentChapterId = chapterId;
  },
  setDeleteChapterId(chapterId) {
    this.deleteChapterId = chapterId;
  },
  setNextSelectableChapterId(chapterId) {
    this.nextSelectableChapterId = chapterId;
  },
  setRenameChapterId(chapterId) {
    this.renameChapterId = chapterId;
  },
  getRenameChapterId() {
    return this.renameChapterId;
  },
  setRenameChapterText(chapterText) {
    this.renameChapterText = chapterText;
  },
  setAllDeleted(allDeleted) {
    this.allDeleted = allDeleted;
  },
  setIsMovingChapter(isMoving) {
    this.isMovingChapter = isMoving;
  },
  setMoveChapterIdx(chapterIdx) {
    this.moveChapterIdx = chapterIdx;
  },
  setDragEnterChapterIdx(chapterIdx) {
    this.dragEnterChapterIdx = chapterIdx;
  },

  createMap(notebookList) {
    this.chapterMap.clear();
    this.pageMap.clear();

    notebookList.forEach((chapter, i) => {
      if (chapter.type !== 'notebook') return;

      this.chapterMap.set(chapter.id, i);
      chapter.children.forEach((page, j) => {
        this.pageMap.set(page.id, { parent: chapter.id, idx: j });
      });
    });
  },

  getSharedList(notebookList) {
    const sharedList = [];
    notebookList.forEach((chapter, idx) => {
      if (chapter.type === 'notebook') return;
      if (chapter.type === 'shared_page') sharedList.splice(0, 0, notebookList[idx]);
      else if (chapter.type === 'shared') sharedList.push(notebookList[idx]);
    });

    return sharedList;
  },

  setLocalStorageItem(targetChannelId) {
    const item = [];
    this.chapterList.forEach((chapter) => {
      if (chapter.type !== 'notebook') return;

      const children = [];
      chapter.children.forEach((page) => children.push(page.id));
      item.push({ id: chapter.id, children: children });
    });

    localStorage.setItem('NoteSortData_' + targetChannelId, JSON.stringify(item));
  },

  applyDifference(targetChannelId, notebookList) {
    var item = JSON.parse(localStorage.getItem('NoteSortData_' + targetChannelId));

    // 로컬 스토리지에 없는 챕터/페이지가 있는지 확인한다.
    const createdChapterIds = [];
    let chapterIds = item.map((chapter) => chapter.id);
    notebookList.forEach((chapter) => {
      if (chapter.type !== 'notebook') return;

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
  getChapterChildren(chapterId) {
    this.chapterChildren = this.chapterList.filter(chapter => chapter.id === chapterId)[0].children;
    return this.chapterChildren;
  },
  async fetchChapterList() {
    if (this.chapterList.length !== 0) return;
    await this.getChapterList();
    if (this.chapterList.length === 0) {
      NoteStore.setShowPage(false);
    } else {
      NoteStore.setShowPage(true);
      const chapterId = this.chapterList[0].id;
      const pageId = this.chapterList[0].children?.[0]?.id;
      this.setCurrentChapterId(chapterId);
      await PageStore.setCurrentPageId(pageId);
    }
  },
  // (posco)
  async _getChapterList() {
    const res = await NoteRepository.getChapterList(NoteStore.getChannelId());
    return res.data.dto.notbookList;
  },

  async getChapterList() {
    const notbookList = await this._getChapterList();
    this.createMap(notbookList);
    const sharedList = this.getSharedList(notbookList);
    this.sharedCnt = sharedList.length;

    if (!localStorage.getItem('NoteSortData_' + NoteStore.getChannelId())) {
      this.chapterList = notbookList.filter((chapter) => chapter.type === 'notebook');
      this.setLocalStorageItem(NoteStore.getChannelId());
    }
    else {
      this.applyDifference(NoteStore.getChannelId(), notbookList);
      this.chapterList = this.getLocalStorageItem(NoteStore.getChannelId(), notbookList);
    }
    this.chapterList = this.chapterList.concat(sharedList);
    return this.chapterList;
  },
  async createChapter(chapterTitle, chapterColor) {
    await NoteRepository.createChapter(chapterTitle, chapterColor).then(
      (response) => {
        if (response.status === 200) {
          const {
            data: { dto: notbookList },
          } = response;
          this.getChapterList();
          this.setCurrentChapterId(notbookList.id);
          PageStore.setCurrentPageId(notbookList.children[0].id);
          this.setChapterTempUl(false);
          this.setAllDeleted(false);
        }
      }
    );
  },
  async deleteChapter() {
    await NoteRepository.deleteChapter(this.deleteChapterId).then(
      (response) => {
        if (response.status === 200) {
          if (this.currentChapterId === this.deleteChapterId) {
            this.setCurrentChapterId(this.nextSelectableChapterId);
            PageStore.setCurrentPageId(PageStore.nextSelectablePageId ? PageStore.nextSelectablePageId : '');
            if (!this.nextSelectableChapterId) this.setAllDeleted(true);
          }
          this.getChapterList();
          if (this.allDeleted) NoteStore.setShowPage(false);
          this.deleteChapterId = '';
          NoteStore.setShowModal(false);
        }
      }
    );
  },
  async renameChapter(color) {
    await NoteRepository.renameChapter(this.renameChapterId, this.renameChapterText, color).then(
      (response) => {
        if (response.status === 200) {
          this.getChapterList();
        }
      }
    );
  },

  moveChapter(moveTargetChapterIdx) {
    if (this.moveChapterIdx !== moveTargetChapterIdx
      && this.moveChapterIdx + 1 !== moveTargetChapterIdx) {
      const item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));
      const curChapterList = [];
      const curItem = [];

      // Update chapterList & localStorage
      this.chapterList.forEach((chapter, idx) => {
        if (idx === this.moveChapterIdx) return false;

        if (idx === moveTargetChapterIdx) {
          curChapterList.push(this.chapterList[this.moveChapterIdx]);
          curItem.push(item[this.moveChapterIdx]);
        }
        curChapterList.push(chapter);
        if (chapter.type === 'notebook') curItem.push(item[idx]);
      })

      if (curChapterList.length !== this.chapterList.length) {
        curChapterList.push(this.chapterList[this.moveChapterIdx]);
        curItem.push(item[this.moveChapterIdx]);
      }

      this.chapterList = curChapterList;
      localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(curItem));
    }

    this.moveChapterIdx = '';
  },

  changePageList(chapterIdx, pageList) {
    this.chapterList[chapterIdx].children = pageList;
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
  },
  getChapterColor(chapterId) {
    const { value } = NoteRepository.getChapterColor(chapterId);
    return value;
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
    if (!isSearching) {
      this.searchResult = {};
      this.searchStr = '';
      this.inputValue = '';
    }
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
    let resultChapterArr = [], resultPageArr = [];
    this.chapterList.map((chapter) => {
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

    this.searchResult = {
      chapter: resultChapterArr,
      page: resultPageArr
    }
  },
  getSearchResult() {
    return this.searchResult;
  },
  // 태그칩 선택시 사용 목적 : 해당 태그가 들어있는 페이지 리스트 보여주기
  // tagStore에서 setSearchResult({chapter:[],page:[page1,page2..]})
  setSearchResult(result) {
    this.searchResult = result;
  },
  // 태그칩 클릭해서 lnblist 띄우기
  getTargetSearchTagName() {
    return this.targetSearchTagName;
  },
  setTargetSearchTagName(str) {
    this.targetSearchTagName = str;
  },
  getIsTagSearching() {
    return this.isTagSearching;
  },
  setIsTagSearching(isSearching) {
    this.isTagSearching = isSearching;
    if (!isSearching) {
      this.targetSearchTagName = '';
      this.searchResult = {};
      // this.inputValue ='';//필요 없을 것 같다
    }
  },

  isValidChapterText(targetText) {
    const isExist = this.chapterList.find((chapter) => {
      return chapter.text === targetText;
    });

    if (isExist) return false;
    else return true;
  },
  async createShareChapter(shareTargetRoomId, shareTargetList) {
    const targetList = [];
    // const shareTargetChId = roomStore.getChannelIds(shareTargetRoomId);
    // const shareTargetRoomName = roomStore.getRoomName(shareTargetRoomId);

    // if (shareTargetList) {
    //   shareTargetList.map(chapter => {
    //     targetList.push(
    //       {
    //         id: chapter.id,
    //         ws_id: NoteRepository.WS_ID,
    //         note_channel_id: NoteRepository.chId,
    //         text: chapter.text,
    //         USER_ID: NoteRepository.USER_ID,
    //         shared_user_id: NoteRepository.USER_ID,
    //         shared_room_name: shareTargetRoomName,
    //         target_workspace_id: shareTargetRoomId,
    //         target_channel_id: shareTargetChId
    //       }
    //     )
    //   })
    // }
    // await NoteRepository.createShareChapter(targetList).then(
    //   (response) => {
    //     if (response.status === 200) {
    //       const {
    //         data: { dto: notbookList },
    //       } = response;
    //     }
    //   }
    // );
  },
  setExportId(chapterId) {
    this.exportChapterId = chapterId;
    this.exportChapterData();
  },
  setExportTitle(chapterTitle) {
    this.exportChapterTitle = chapterTitle;
  },
  async exportChapterData() {
    let returnData = '';
    await NoteRepository.getChapterChildren(this.exportChapterId).then((response) => {
      const {
        data: { dto: { noteList } },
      } = response;
      if (noteList.length > 0) {
        noteList.forEach((page, idx) => {
          returnData += `<span style="font-size:24px;">제목 : ${page.note_title}</span><br>${page.note_content}<span class=${idx === (noteList.length - 1) ? '' : "afterClass"}></span>`
        })
      } else return alert('하위에 속한 페이지가 없습니다.');
      PageStore.makeExportElement(returnData, 'chapter');
    })
  }
});

export default ChapterStore;
