import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import NoteStore from './noteStore';
import ChapterStore from './chapterStore';
import TagStore from './tagStore';
import EditorStore from './editorStore';
import { isFilled } from '../components/common/validators';
import GlobalVariable from '../GlobalVariable';
import NoteUtil from '../NoteUtil';
import { useCoreStores } from 'teespace-core';

const PageStore = observable({
  noteInfoList: [],
  currentPageData: [],
  isEdit: '',
  otherEdit: false,
  noteContent: '',
  noteTitle: '',
  currentPageId: '',
  createPageId: '',
  createParent: '',
  createParentIdx: '',
  deletePageList: [],
  deleteParentIdx: '',
  nextSelectablePageId: '',
  isRename: false,
  renamePageId: '',
  renamePagePrevText: '',
  renamePageText: '',
  isMovingPage: false,
  moveInfoMap: new Map(),
  isCtrlKeyDown: false,
  movePageId: '', // 이동을 원하는 page의 id
  dragEnterPageIdx: '',
  dragEnterChapterIdx: '',
  modifiedDate: '',
  prevModifiedUserName: '',
  isNewPage: false,
  exportPageId: '',
  exportPageTitle: '',
  editingUserID: '',
  editingUserName: '',
  editingUserCount: '',

  setNoteInfoList(infoList) {
    this.noteInfoList = infoList;
  },
  getCurrentPageData() {
    return this.currentPageData;
  },
  setCurrentPageData(pageData) {
    this.currentPageData = pageData;
  },
  getIsEdit() {
    return this.isEdit;
  },
  setIsEdit(id) {
    this.isEdit = id;
  },
  isReadMode() {
    if (this.isEdit === null || this.isEdit === '') {
      this.setOtherEdit(false);
      return true;
    }
    // createNotePage에서 createPage 하고 EditorContainer.js의 setNoteEditor-initialMode한 후 getNoteInfoList에서 currentPageData를 set한다.
    // 그래서 getCurrentPageData().is_edit으로 확인하면 initialMode에서 isReadMode() === true가 된다.
    // this.isEdit으로 수정
    else if (this.isEdit !== null && NoteRepository.USER_ID === this.isEdit) {
      this.setOtherEdit(false);
      return false;
    }
    else {
      this.setEditingUserID(PageStore.getCurrentPageData().is_edit);
      this.setOtherEdit(true);
      return true;
    };
  },
  setOtherEdit(flag) {
    this.otherEdit = flag;
  },
  setEditingUserID(targetID) {
    this.editingUserID = targetID;
  },
  getEditingUserID() {
    return this.editingUserID;
  },
  setEditingUserName(targetName) {
    this.editingUserName = targetName;
  },
  getEditingUserName() {
    return this.editingUserName;
  },
  setEditingUserCount(count) {
    this.editingUserCount = count;
  },
  getEditingUserCount() {
    return this.editingUserCount;
  },
  getContent() {
    return this.noteContent;
  },
  setContent(content) {
    this.noteContent = content;
  },
  getTitle() {
    return this.noteTitle;
  },
  setTitle(title) {
    if (title.length > 256) title = title.substring(0, 256);
    this.noteTitle = title;
  },

  getCurrentPageId() {
    return this.currentPageId;
  },
  setCurrentPageId(pageId) {
    this.currentPageId = pageId;
  },

  getCreatePageParent() {
    return this.createParent;
  },
  setCreatePageParent(chapterId) {
    this.createParent = chapterId;
  },
  getCreatePageParentIdx() {
    return this.createParentIdx;
  },
  setCreatePageParentIdx(chapterIdx) {
    this.createParentIdx = chapterIdx;
  },

  getDeletePageList() {
    return this.deletePageList;
  },
  setDeletePageList(page) {
    this.deletePageList = [];
    this.deletePageList.push(page);
  },
  getDeleteParentIdx() {
    return this.deleteParentIdx;
  },
  setDeleteParentIdx(chapterIdx) {
    this.deleteParentIdx = chapterIdx;
  },
  getNextSelectablePageId() {
    return this.nextSelectablePageId;
  },
  setNextSelectablePageId(pageId) {
    this.nextSelectablePageId = pageId;
  },

  getIsRename() {
    return this.isRename;
  },
  setIsRename(flag) {
    this.isRename = flag;
  },
  getRenamePageId() {
    return this.renamePageId;
  },
  setRenamePageId(pageId) {
    this.renamePageId = pageId;
  },
  getRenamePagePrevText() {
    return this.renamePagePrevText;
  },
  setRenamePagePrevText(pageText) {
    this.renamePagePrevText = pageText;
  },
  getRenamePageText() {
    return this.renamePageText;
  },
  setRenamePageText(pageText) {
    this.renamePageText = pageText;
  },

  getIsMovingPage() {
    return this.isMovingPage;
  },
  setIsMovingPage(isMoving) {
    this.isMovingPage = isMoving;
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
  getMovePageId() {
    return this.movePageId;
  },
  setMovePageId(pageId) {
    this.movePageId = pageId;
  },
  getDragEnterPageIdx() {
    return this.dragEnterPageIdx;
  },
  setDragEnterPageIdx(pageIdx) {
    this.dragEnterPageIdx = pageIdx;
  },
  getDragEnterChapterIdx() {
    return this.dragEnterChapterIdx;
  },
  setDragEnterChapterIdx(chapterIdx) {
    this.dragEnterChapterIdx = chapterIdx;
  },

  getModifiedDate() {
    return this.modifiedDate;
  },
  setModifiedDate(date) {
    this.modifiedDate = date;
  },
  getPrevModifiedUserName() {
    return this.prevModifiedUserName;
  },
  setPrevModifiedUserName(userName) {
    this.prevModifiedUserName = userName;
  },
  getIsNewPage() {
    return this.isNewPage;
  },
  setIsNewPage(isNew) {
    this.isNewPage = isNew;
  },

  getExportTitle() {
    return this.exportPageTitle;
  },
  setExportTitle(pageTitle) {
    this.exportPageTitle = pageTitle;
  },
  getExportId() {
    return this.exportPageId;
  },
  setExportId(pageId) {
    this.exportPageId = pageId;
  },

  async getNoteInfoList(noteId) {
    const {
      data: { dto },
    } = await NoteRepository.getNoteInfoList(noteId);
    return dto;
  },

  async createPage(title, content, parent) {
    const {
      data: { dto },
    } = await NoteRepository.createPage(title, content, parent);
    return dto;
  },

  async deletePage(pageList) {
    const {
      data: { dto },
    } = await NoteRepository.deletePage(pageList);
    return dto;
  },

  async renamePage(pageId, pageTitle, chapterId, callback) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.renamePage(pageId, pageTitle, chapterId);
    return returnData;
  },

  async editStart(noteId, parentNotebook) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.editStart(noteId, parentNotebook)
    return returnData;
  },

  async editDone(updateDTO) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.editDone(updateDTO);
    return returnData;
  },

  async noneEdit(noteId, parentNotebook, prevModifiedUserName, callback) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.nonEdit(noteId, parentNotebook, prevModifiedUserName)

    return returnData;
  },
  // note 처음 진입해서 축소 상태에서 새 페이지 추가 버튼 누르면 없다
  initializeBoxColor() {
    document.getElementById('tox-icon-text-color__color')?.removeAttribute('fill');
    document.getElementById('tox-icon-text-color__color')?.removeAttribute('stroke');
    document.getElementById('tox-icon-highlight-bg-color__color')?.removeAttribute('fill');
    document.getElementById('tox-icon-highlight-bg-color__color')?.removeAttribute('stroke');
  },

  createNotePage() {
    this.createPage('(제목 없음)', null, this.createParent).then(dto => {
      EditorStore.setIsSearch(false);
      this.setIsEdit(dto.is_edit);
      ChapterStore.getNoteChapterList();
      ChapterStore.setCurrentChapterId(dto.parent_notebook);
      this.createPageId = dto.note_id;
      this.currentPageId = dto.note_id;
      this.isNewPage = true;
      TagStore.setNoteTagList(dto.tagList);
      EditorStore.setFileList(dto.fileList);
      this.initializeBoxColor();

      dto.note_content = NoteUtil.decodeStr('<p><br></p>');
      dto.note_title = NoteUtil.decodeStr('(제목 없음)');
      this.currentPageData = dto;
      this.noteTitle = '';
      this.prevModifiedUserName = this.currentPageData.user_name;
      this.modifiedDate = this.modifiedDateFormatting(this.currentPageData.modified_date, false);

      NoteStore.setTargetLayout('Content');
      NoteStore.setShowPage(true);
      EditorStore.tinymce?.undoManager?.clear();
      EditorStore.tinymce?.focus();
    });
  },

  deleteNotePage() {
    this.deletePage(this.deletePageList).then(() => {
      if (this.currentPageId === this.deletePageList[0].note_id) {
        this.setCurrentPageId(this.nextSelectablePageId);
        this.fetchCurrentPageData(this.nextSelectablePageId)
      }
      if (this.isNewPage) {
        if (NoteStore.layoutState === "collapse") {
          NoteStore.setTargetLayout('LNB');
          this.isNewPage = false;
          this.createPageId = '';
          this.setCurrentPageId('');
          ChapterStore.setCurrentChapterId('');
          ChapterStore.getNoteChapterList();
        } else {
          const currentChapter = ChapterStore.chapterList.find(chapter => chapter.id === this.createParent);
          if (currentChapter.children.length > 1) {
            const pageId = currentChapter.children[1].id
            this.createPageId = '';
            this.setCurrentPageId(pageId);
            this.fetchCurrentPageData(pageId);
          }
          ChapterStore.getNoteChapterList();
        }
      } else {
        ChapterStore.getNoteChapterList().then(() => {
          if (this.deletePageList[0].type === 'shared' && ChapterStore.sortedChapterList.sharedPageList[0]?.children.length === 0) ChapterStore.fetchFirstNote();
        });
      }
      NoteStore.setShowModal(false);
    });
  },

  renameNotePage(chapterId) {
    this.renamePage(this.renamePageId, this.renamePageText, chapterId).then(dto => {
      this.fetchNoteInfoList(dto.note_id);
      ChapterStore.getNoteChapterList();
    });
  },

  createMoveInfo(pageData) {
    const pageId = pageData.note_id;
    const chapterId = pageData.parent_notebook;
    const chapterIdx = ChapterStore.chapterList.findIndex(chapter => chapter.id === chapterId);
    const pageIdx = ChapterStore.chapterList[chapterIdx].children.findIndex(page => page.id === pageId);
    return {
      item: ChapterStore.chapterList[chapterIdx].children[pageIdx],
      pageIdx: pageIdx,
      chapterId: chapterId,
      chapterIdx: chapterIdx,
    }
  },

  handleClickOutside() {
    this.setIsCtrlKeyDown(false);
    if (!this.currentPageId) {
      this.moveInfoMap.clear();
      return;
    }
    let currentMoveInfo = this.moveInfoMap.get(this.currentPageId);
    if (!currentMoveInfo) currentMoveInfo = this.createMoveInfo(this.currentPageData);
    this.setMoveInfoMap(new Map([[this.currentPageId, currentMoveInfo]]));
  },

  async movePage(movePageId, moveTargetChapterId) {
    const {
      data: { dto },
    } = await NoteRepository.movePage(movePageId, moveTargetChapterId);
    return dto;
  },

  getSortedMoveInfoList() {
    const moveInfoList = [...this.moveInfoMap].map(keyValue => keyValue[1]);
    return moveInfoList.sort((a, b) => {
      if (a.chapterIdx === b.chapterIdx) return a.pageIdx - b.pageIdx;
      return a.chapterIdx - b.chapterIdx;
    });
  },

  async moveNotePage(moveTargetChapterId, moveTargetChapterIdx, moveTargetPageIdx) {
    const item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));

    const sortedMoveInfoList = this.getSortedMoveInfoList();
    const sortedMovePages = sortedMoveInfoList.map(moveInfo => item[moveInfo.chapterIdx].children[moveInfo.pageIdx]);

    const pageIds = []; // 갈아 끼울 페이지 아이디 리스트
    item[moveTargetChapterIdx].children.forEach((pageId, idx) => {
      if (idx === moveTargetPageIdx) pageIds.push(...sortedMovePages);
      if (!this.moveInfoMap.get(pageId)) pageIds.push(pageId);
    });
    if (moveTargetPageIdx >= pageIds.length) pageIds.push(...sortedMovePages);

    await Promise.all(sortedMoveInfoList.slice().reverse().map(moveInfo => {
      if (moveInfo.chapterId !== moveTargetChapterId && ChapterStore.pageMap.get(moveInfo.item.id)) {
        item[moveInfo.chapterIdx].children.splice(moveInfo.pageIdx, 1);
        return this.movePage(moveInfo.item.id, moveTargetChapterId);
      }
    }));

    item[moveTargetChapterIdx].children = pageIds;

    let moveCntInSameChapter = 0;
    let moveCntToAnotherChapter = 0;
    const startIdx = item[moveTargetChapterIdx].children.findIndex(pageId => pageId === sortedMoveInfoList[0].item.id);
    sortedMoveInfoList.map((moveInfo, idx) => {
      if (moveInfo.chapterId !== moveTargetChapterId) moveCntToAnotherChapter++;
      else if (moveInfo.pageIdx !== startIdx + idx) moveCntInSameChapter++;
      this.moveInfoMap.set(moveInfo.item.id, {
        item: moveInfo.item,
        pageIdx: startIdx + idx,
        chapterId: moveTargetChapterId,
        chapterIdx: moveTargetChapterIdx,
      })
    });

    const moveCnt = moveCntInSameChapter + moveCntToAnotherChapter;
    if (moveCnt > 0) {
      localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(item));
      await ChapterStore.getNoteChapterList();
      if (ChapterStore.currentChapterId) await this.fetchCurrentPageData(sortedMovePages[0]);
      else this.handleClickOutside();

      if (!moveCntToAnotherChapter) {
        NoteStore.setToastText(`${moveCntInSameChapter}개의 페이지가 이동하였습니다.`);
      } else {
        NoteStore.setToastText(`${moveCnt}개의 페이지를 ${ChapterStore.chapterList[moveTargetChapterIdx].text}으로 이동하였습니다.`);
      }
      NoteStore.setIsVisibleToast(true);
    } else { // 이동한 페이지가 없는 경우: 기존 선택되어 있던 페이지 select
      this.handleClickOutside();
    }

    NoteStore.setIsDragging(false);
  },

  modifiedDateFormatting(date, isSharedInfo) {
    const mDate = date.split(' ')[0];
    const mTime = date.split(' ')[1];
    const mYear = parseInt(mDate.split('.')[0]);
    const mMonth = parseInt(mDate.split('.')[1]);
    const mDay = parseInt(mDate.split('.')[2]);
    let mHour = parseInt(mTime.split(':')[0]);
    const mMinute = parseInt(mTime.split(':')[1]);
    const meridiem = mHour < 12 ? '오전' : '오후';
    const curDate = new Date();
    const convertTwoDigit = (digit) => ('0' + digit).slice(-2);

    if (mHour > 12) mHour = mHour - 12;
    const basicDate = meridiem + ' ' + convertTwoDigit(mHour) + ':' + convertTwoDigit(mMinute);

    if (date === this.currentPageData.modified_date
      && mYear === curDate.getFullYear()
      && !isSharedInfo) { // 같은 해
      if (mMonth === curDate.getMonth() + 1 && mDay === curDate.getDate()) return basicDate; // 같은 날
      else return convertTwoDigit(mMonth) + '.' + convertTwoDigit(mDay) + ' ' + basicDate; // 다른 날
    }
    else { // 다른 해, 정보 보기
      return mYear + '.' + convertTwoDigit(mMonth) + '.' + convertTwoDigit(mDay) + ' ' + basicDate;
    }
  },

  async fetchNoteInfoList(noteId) {
    const dto = await this.getNoteInfoList(noteId);
    // 없는 노트일 때 && 가져오려했던 noteId가 currentPageId일 때 초기화하기
    if (!isFilled(dto.note_id)) {
      if (this.currentPageId === noteId) this.currentPageId = '';
      return;
    }
    this.setCurrentPageId(dto.note_id);
    ChapterStore.setCurrentChapterId(dto.parent_notebook);
    dto.note_content = NoteUtil.decodeStr(dto.note_content);
    dto.note_title = NoteUtil.decodeStr(dto.note_title);
    this.noteInfoList = dto;
    this.currentPageData = dto;
    this.isEdit = dto.is_edit;
    this.noteTitle = dto.note_title;
    this.modifiedDate = this.modifiedDateFormatting(this.currentPageData.modified_date);
    EditorStore.setFileList(
      dto.fileList,
    );
    if (this.isNewPage) {
      ChapterStore.setMoveInfoMap(new Map([[ChapterStore.currentChapterId, ChapterStore.createMoveInfo(ChapterStore.currentChapterId)]]));
      this.setMoveInfoMap(new Map([[this.currentPageId, this.createMoveInfo(this.currentPageData)]]));
      this.isNewPage = false;
    }
  },

  async fetchCurrentPageData(pageId) {
    if (pageId) {
      await this.fetchNoteInfoList(pageId);
      await TagStore.fetchNoteTagList(pageId); // tagList
    } else {
      this.setIsEdit('');
      this.setCurrentPageId('');
    }
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditStart(noteId) {
    this.prevModifiedUserName = this.currentPageData.user_name;
    this.editStart(noteId, this.currentPageData.parent_notebook).then(dto => {
      this.fetchNoteInfoList(dto.note_id);
      EditorStore.tinymce?.focus();
      EditorStore.tinymce?.selection.setCursorLocation();
      this.initializeBoxColor();
    });
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditDone(updateDto) {
    this.editDone(updateDto).then(dto => {
      this.fetchNoteInfoList(dto.note_id);
      ChapterStore.getNoteChapterList();
    });
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteNoneEdit(noteId) {
    this.noneEdit(
      noteId,
      this.currentPageData.parent_notebook,
      this.prevModifiedUserName).then(
        (dto) => {
          this.fetchNoteInfoList(dto.note_id);
          EditorStore.tinymce?.setContent(this.currentPageData.note_content);
          NoteStore.setShowModal(false);
          EditorStore.setIsSearch(false);
        }
      );
  },

  async handleNoneEdit() {
    if (this.isNewPage) {
      this.setDeletePageList({ note_id: this.createPageId });
      this.deleteParentIdx = this.createParentIdx;
      this.deleteNotePage();
    } else {
      if (this.otherEdit) return;
      else this.noteNoneEdit(this.currentPageId);
    }
  },

  handleSave() {
    if (this.noteTitle === '' || this.noteTitle === '(제목 없음)') {
      if (this.getTitle() !== undefined) PageStore.setTitle(this.getTitle());
      else if (this.getTitle() === undefined && (EditorStore.tempFileLayoutList.length > 0 || EditorStore.fileLayoutList.length > 0)) {
        if (EditorStore.tempFileLayoutList.length > 0) {
          this.setTitle(EditorStore.tempFileLayoutList[0].file_name
            + (EditorStore.tempFileLayoutList[0].file_extension ? '.' + EditorStore.tempFileLayoutList[0].file_extension : ''));
        } else if (EditorStore.fileLayoutList.length > 0) {
          this.setTitle(EditorStore.fileLayoutList[0].file_name
            + (EditorStore.fileLayoutList[0].file_extension ? '.' + EditorStore.fileLayoutList[0].file_extension : ''));
        }
      } else this.setTitle('(제목 없음)');
    }
    this.noteTitle = [].filter.call(this.noteTitle, function (c) {
      return c.charCodeAt(0) !== 65279;
    }).join('');
    const updateDTO = {
      dto: {
        note_id: this.currentPageData.note_id,
        note_title: this.noteTitle,
        note_content: this.noteContent ? this.noteContent : '<p><br></p>',
        text_content: EditorStore.tinymce.getContent({ format: "text" }),
        parent_notebook: this.currentPageData.parent_notebook,
        is_edit: '',
        TYPE: 'EDIT_DONE',
      },
    };
    this.noteEditDone(updateDTO);
    if (TagStore.removeTagList.length > 0) TagStore.deleteTag(TagStore.removeTagList, PageStore.currentPageId);
    if (TagStore.addTagList.length > 0) TagStore.createTag(TagStore.addTagList, PageStore.currentPageId);
    if (TagStore.updateTagList.length > 0) TagStore.updateTag(TagStore.updateTagList);
    if (EditorStore.tempFileLayoutList.length > 0) {
      EditorStore.processCount = 0;
      EditorStore.tempFileLayoutList = [];
    }
    NoteStore.setShowModal(false);
    EditorStore.setIsAttatch(false);
    const floatingMenu = GlobalVariable.editorWrapper.querySelector('.tox-tbtn[aria-owns]');
    if (floatingMenu !== null) floatingMenu.click();
    EditorStore.tinymce?.selection.setCursorLocation();
    EditorStore.tinymce?.undoManager.clear();
  },
  setIsNewPage(isNew) {
    this.isNewPage = isNew;
  },
  getTitle() {
    const contentList = EditorStore.tinymce.getBody().children;
    return this._getTitle(contentList);
  },
  _getTitle(contentList) {
    if (contentList) {
      // forEach 는 항상 return 값 undefined
      for (let i = 0; i < contentList.length; i++) {
        // 표는 무조건 return
        if (contentList[i].tagName === 'TABLE') return this._getTableTitle(contentList[i]);
        // early return        
        if (!contentList[i].textContent && 
          (contentList[i].nodeName !== 'IMG' && contentList[i].getElementsByTagName('IMG').length===0)) continue;
        if (contentList[i].tagName === 'BR') continue; // getTitleByTagName에도 있지만 앞서 거르기

        // 표 제외, 이미지나 텍스트가 있을 때만 탄다
        let title = this._getTitleByTagName(contentList[i]);
        if (title !== undefined) return title;
      }
    }
  },
  // ims 250801 : 새 페이지 추가 후 표 삽입 -> 이미지 삽입 후 저장을 누르면 제목이 이미지명으로 표시되는 이슈
  _getTableTitle(node) {
    if (!node.textContent && node.getElementsByTagName('IMG').length===0) return '(표)';
    // td(표 셀 1개) 안에 <p></p>가 두 개이고, 첫 번째 p태그에 <br>등만 있고 아무것도 없는 경우 (제목 없음)이 출력돼서 수정
    const tdList = node.getElementsByTagName('td');    
    for (let tdIndex = 0; tdIndex < tdList.length; tdIndex++) {
      const tdChildren = tdList[tdIndex].childNodes;
      for (let j = 0; j < tdChildren.length; j++) {
        let title = this._getTitleByTagName(tdChildren[j]);
        if (title !== undefined) return title;
      }
    }
  },
  // div, pre, p 
  _searchInsideContainerTag(node) {
    if (!node.textContent && node.getElementsByTagName('IMG').length===0) return;
    // 명시적인 줄바꿈이 있는 경우
    const lineBreakIdx = node.textContent.indexOf('\n');
    if (lineBreakIdx !== -1) return node.textContent.slice(0, lineBreakIdx);

    // hasLineBreak가 true면 child별로 순회하며 getTitleByTagName 함수를 탄다
    // 즉 node 단위로 title을 뽑아낼 때
    let hasLineBreak = false;
    if (Array.from(node.childNodes).some(child => ['DIV', 'PRE', 'P', 'IMG', 'BR','OL','UL'].includes(child.nodeName))) hasLineBreak = true;
    // node 상관없이 title 뽑을 때 : 기사 내용은 줄바꿈없이 p태그 안에 span이나 strong 태그랑 #text만 있어
    if (!hasLineBreak) return node.textContent.slice(0, 200);

    for (let item of Array.from(node.childNodes)) {
      if (!item.textContent && (item.nodeName !== 'IMG' && item.getElementsByTagName('IMG').length===0)) continue;
      let title = this._getTitleByTagName(item);
      if (title !== undefined) return title;
    }
  },
  _getTitleByTagName(node) {
    switch (node.nodeName) {
      case 'BR':return;
      case 'IMG':
        return node.dataset.name ? node.dataset.name : node.src;
      case 'SPAN':case 'A':case '#text':
      case 'STRONG':case 'BLOCKQUOTE':case 'EM':case 'H1':case 'H2':case 'H3':case 'H4':case 'H5':case'H6':
        return node.textContent.slice(0, 200);
      case 'OL':case 'UL':
        return node.children[0].textContent;
      case 'TABLE':
        let tableTitle = this._getTableTitle(node);
        if (tableTitle !== undefined) return tableTitle;
      case 'DIV':case 'PRE':case "P":
        let title = this._searchInsideContainerTag(node);
        if (title !== undefined) return title;
      default:break;
    }
    if (node.textContent) return node.textContent.slice(0, 200);
  },
  async createSharePage(targetList) {
    const {
      data: { dto: { noteList } }
    } = await NoteRepository.createSharePage(targetList);
    return noteList;
  },

  createNoteSharePage(targetRoomId, targetPageList) {
    if (!targetPageList) return;

    const targetChId = NoteStore.getTargetChId(targetRoomId);
    const targetList = targetPageList.map(page => {
      return ({
        WS_ID: NoteRepository.WS_ID,
        note_id: (page.note_id || page.id),
        note_channel_id: NoteRepository.chId,
        USER_ID: NoteRepository.USER_ID,
        shared_user_id: NoteRepository.USER_ID,
        shared_room_name: NoteRepository.WS_ID,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId
      });
    });

    this.createSharePage(targetList).then(() => ChapterStore.getNoteChapterList());;
  },
})

export default PageStore;
