import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import NoteStore from './noteStore';
import ChapterStore from './chapterStore';
import TagStore from './tagStore';
import EditorStore from './editorStore';
import { isFilled } from '../components/common/validators';
import GlobalVariable from '../GlobalVariable';
import NoteUtil from '../NoteUtil';
import { UserStore } from 'teespace-core';
import i18n from '../i18n/i18n';

const PageStore = observable({
  noteInfoList: [],
  currentPageData: [],
  isEdit: '',
  saveStatus:{saving : false, saved:false},
  displayName: '',
  otherEdit: false,
  noteContent: '',
  noteTitle: '',
  currentPageId: '',
  createPageId: '', // web에서 안 씀
  createParent: '',
  createParentIdx: '',
  deletePageList: [],
  selectablePageId: '',
  lastSharedPageParentId: '',
  renameId: '',
  renamePrevText: '',
  renameText: '',
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
  // autoSave에서 넣으려고 나중에 만든 함수(2021.03.09)
  set_CurrentPageData({user_name, modified_date,USER_ID}) {   
    if (user_name) this.currentPageData.user_name = user_name;
    if (modified_date) this.currentPageData.modified_date = modified_date;
    if (USER_ID) this.currentPageData.USER_ID = USER_ID;
  },
  // 함수 호출시 3가지 상태 중 true인거 하나만 넣어주기 : ex. {saving:true}
  setSaveStatus({saving=false,saved=false}) {
    this.saveStatus.saving = saving;
    this.saveStatus.saved = saved;
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
  getSelectablePageId() {
    return this.selectablePageId;
  },
  setSelectablePageId(pageId) {
    this.selectablePageId = pageId;
  },
  getLastSharedPageParentId() {
    return this.lastSharedPageParentId;
  },
  setLastSharedPageParentId(chapterId) {
    this.lastSharedPageParentId = chapterId;
  },

  getRenameId() {
    return this.renameId;
  },
  setRenameId(pageId) {
    this.renameId = pageId;
  },
  getRenamePrevText() {
    return this.renamePrevText;
  },
  setRenamePrevText(pageText) {
    this.renamePrevText = pageText;
  },
  getRenameText() {
    return this.renameText;
  },
  setRenameText(pageText) {
    if (pageText.length > 256) pageText = pageText.substring(0, 256);
    this.renameText = pageText;
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
  clearMoveInfoMap() {
    this.moveInfoMap.clear();
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

  async noneEdit(noteId, parentNotebook, prevModifiedUserName, prevModifiedUserId, callback) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.nonEdit(noteId, parentNotebook, prevModifiedUserName, prevModifiedUserId)

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
    this.createPage(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'), null, this.createParent).then(dto => {
      EditorStore.setIsSearch(false);
      this.setIsEdit(dto.is_edit);
      ChapterStore.getNoteChapterList();
      ChapterStore.setCurrentChapterId(dto.parent_notebook);
      this.currentPageId = dto.note_id;
      this.setIsNewPage(true);
      TagStore.setNoteTagList(dto.tagList);
      EditorStore.setFileList(dto.fileList);
      this.initializeBoxColor();

      dto.note_content = NoteUtil.decodeStr('<p><br></p>');
      dto.note_title = NoteUtil.decodeStr(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'));
      this.currentPageData = dto;
      this.noteTitle = '';
      this.prevModifiedUserName = this.currentPageData.user_name;
      this.modifiedDate = this.modifiedDateFormatting(this.currentPageData.modified_date, false);

      NoteStore.setTargetLayout('Content');
      NoteStore.setShowPage(true);
      EditorStore.tinymce?.undoManager?.clear();
      // getRng error가 나서 selection부터 체크
      if (EditorStore.tinymce?.selection) EditorStore.tinymce.focus();
    });
  },

  deleteNotePage() {
    this.deletePage(this.deletePageList).then(() => {
      this.setIsEdit(null); // 축소모드에서 뒤로가기로 페이지 삭제한 후 isEdit이 갱신안되는 이슈 수정
      if (!this.isNewPage) {
        if (this.currentPageId === this.deletePageList[0].note_id) {
          this.setCurrentPageId(this.selectablePageId);
          this.fetchCurrentPageData(this.selectablePageId)
        }
      } else {
        if (NoteStore.layoutState === "collapse") {
          NoteStore.setTargetLayout('LNB');
          this.setIsNewPage(false);
          this.setCurrentPageId('');
          ChapterStore.setCurrentChapterId('');
        } else {
          const currentChapter = ChapterStore.chapterList.find(chapter => chapter.id === this.createParent);
          if (currentChapter.children.length > 1) {
            const pageId = currentChapter.children[currentChapter.children.length - 2].id;
            this.setCurrentPageId(pageId);
            this.fetchCurrentPageData(pageId);
          } else {
            this.setCurrentPageId('');
          }
        }
      }
      ChapterStore.getNoteChapterList();
      NoteStore.setShowModal(false);
    });
  },

  renameNotePage(chapterId) {
    this.renamePage(this.renameId, this.renameText.trim(), chapterId).then(dto => {
      if (this.moveInfoMap.get(dto.note_id)) {
        this.moveInfoMap.get(dto.note_id).item.text = dto.note_title;
      }
      this.fetchNoteInfoList(dto.note_id);
      ChapterStore.getNoteChapterList();
    });
  },

  createMoveInfo(pageId, chapterId) {
    const chapterIdx = ChapterStore.chapterList.findIndex(chapter => chapter.id === chapterId);
    if (chapterIdx < 0) return;
    const pageIdx = ChapterStore.chapterList[chapterIdx].children.findIndex(page => page.id === pageId);
    if (pageIdx < 0) return;
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
    if (!currentMoveInfo) currentMoveInfo = this.createMoveInfo(this.currentPageId, ChapterStore.currentChapterId);
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
      await this.fetchCurrentPageData(sortedMovePages[0]);

      if (!moveCntToAnotherChapter) {
        NoteStore.setToastText(i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_03', { moveCnt: moveCntInSameChapter }));
      } else {
        ChapterStore.setMoveInfoMap(new Map([[moveTargetChapterId, ChapterStore.createMoveInfo(moveTargetChapterId)]]));
        NoteStore.setToastText(i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_01', { moveCnt: moveCnt, targetPage: ChapterStore.chapterList[moveTargetChapterIdx].text }));
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
    const mHour = parseInt(mTime.split(':')[0]);
    const mMinute = parseInt(mTime.split(':')[1]);
    const curDate = new Date();
    const convertTwoDigit = (digit) => ('0' + digit).slice(-2);
    const m12Hour = mHour > 12 ? mHour - 12 : mHour;

    const hhmm = convertTwoDigit(m12Hour) + ':' + convertTwoDigit(mMinute);
    const basicDate = mHour < 12 ? i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_01', { time: hhmm }) : i18n.t('NOTE_EDIT_PAGE_UPDATE_TIME_02', { time: hhmm });

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

    if (dto.USER_ID) {
      const userProfile = await UserStore.getProfile(dto.USER_ID);
      if (userProfile) this.displayName = userProfile.displayName;
    }
    this.setCurrentPageId(dto.note_id);
    ChapterStore.setCurrentChapterId(dto.parent_notebook);
    dto.note_content = NoteUtil.decodeStr(dto.note_content);
    dto.note_title = NoteUtil.decodeStr(dto.note_title);
    this.currentPageData = dto;
    this.isEdit = dto.is_edit;
    this.noteTitle = dto.note_title;
    this.modifiedDate = this.modifiedDateFormatting(this.currentPageData.modified_date);
    EditorStore.setFileList(
      dto.fileList,
    );
    if (this.isNewPage) {
      ChapterStore.setMoveInfoMap(new Map([[ChapterStore.currentChapterId, ChapterStore.createMoveInfo(ChapterStore.currentChapterId)]]));
      this.setMoveInfoMap(new Map([[this.currentPageId, this.createMoveInfo(this.currentPageId, ChapterStore.currentChapterId)]]));

      import('teespace-core')
        .then(module => {
          try {
            const { logEvent } = module;
            logEvent('note', 'clickNoteBtn')
          } catch (e) {
            console.error(e);
          }
        })
        .catch(e => console.error(e));
      this.setIsNewPage(false);
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
    this.prevModifiedUserId = this.currentPageData.USER_ID;
    this.editStart(noteId, this.currentPageData.parent_notebook).then(dto => {
      this.fetchNoteInfoList(dto.note_id);
      // focus에서 getRng error가 나서 selection부터 체크
      if (EditorStore.tinymce?.selection) {
        EditorStore.tinymce.focus();
        EditorStore.tinymce.selection.setCursorLocation();
      }
      this.initializeBoxColor();
    });
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditDone(updateDto) {
    this.editDone(updateDto).then(dto => {
      if (this.moveInfoMap.get(dto.note_id)) {
        this.moveInfoMap.get(dto.note_id).item.text = dto.note_title;
      }
      this.fetchNoteInfoList(dto.note_id);
      ChapterStore.getNoteChapterList();
    });
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteNoneEdit(noteId) {
    this.noneEdit(
      noteId,
      this.currentPageData.parent_notebook,
      this.prevModifiedUserName,
      this.prevModifiedUserId).then(
        (dto) => {
          this.fetchCurrentPageData(dto.note_id);

          const floatingMenu = GlobalVariable.editorWrapper.querySelector('.tox-tbtn[aria-owns]');
          if (floatingMenu !== null) floatingMenu.click();
          EditorStore.tinymce?.setContent(this.currentPageData.note_content);
          NoteStore.setShowModal(false);
          EditorStore.setIsSearch(false);
        }
      );
  },

  async handleNoneEdit() {
    if (this.isNewPage) {
      this.setDeletePageList({ note_id: this.currentPageId });
      this.deleteNotePage();
    } else {
      if (this.otherEdit) return;
      else this.noteNoneEdit(this.currentPageId);
    }
  },

  getSaveDto(isAutoSave) {
    return {
      dto: {
        note_id: this.currentPageData.note_id,
        note_title: this.noteTitle.trim(),
        note_content: this.noteContent ? this.noteContent : '<p><br></p>',
        text_content: EditorStore.tinymce.getContent({ format: "text" }),
        parent_notebook: this.currentPageData.parent_notebook,
        is_edit: isAutoSave ? this.isEdit : '',
        TYPE: 'EDIT_DONE',
      }
    }
  },

  // 자동저장, 저장 버튼 포함, isAutoSave default는 false(원래 함수 고치지 않기 위해)
  handleSave(isAutoSave=false) {
    this.getNoteTitle();
    const updateDTO = this.getSaveDto(isAutoSave);

    if (TagStore.removeTagList.length > 0) TagStore.deleteTag(TagStore.removeTagList, PageStore.currentPageId);
    if (TagStore.addTagList.length > 0) TagStore.createTag(TagStore.addTagList, PageStore.currentPageId);
    if (TagStore.updateTagList.length > 0) TagStore.updateTag(TagStore.updateTagList);
    
    if (isAutoSave) this.handleAutoSave(updateDTO);
    else this.handleSaveBtn(updateDTO);
  },

  handleAutoSave(updateDTO) {
    // currentPageData 갱신
    this.setSaveStatus({saving:true});
    this.editDone(updateDTO)
      .then((dto) => {
        this.setSaveStatus({saved:true});
        const {user_name, modified_date,USER_ID} = dto;
        this.set_CurrentPageData({user_name, modified_date,USER_ID});
        this.modifiedDate = this.modifiedDateFormatting(modified_date);        
        // 2초 후 수정 중 인터렉션으로 바꾸기
        setTimeout(() => {
          this.setSaveStatus({});
        },2000);
      })
  },

  handleSaveBtn(updateDTO) {
    this.noteEditDone(updateDTO);
    
    if (EditorStore.tempFileLayoutList.length > 0) {
      EditorStore.setProcessCount(0);
      EditorStore.setTempFileLayoutList([]);
    }
    NoteStore.setShowModal(false);
    EditorStore.setIsAttatch(false);
    EditorStore.setInitialSearchState();
    const floatingMenu = GlobalVariable.editorWrapper.querySelector('.tox-tbtn[aria-owns]');
    if (floatingMenu !== null) floatingMenu.click();
    EditorStore.tinymce?.selection.setCursorLocation();
    EditorStore.tinymce?.undoManager.clear();
  },
    
  getNoteTitle() {
    if (this.noteTitle === '' || this.noteTitle === i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03')) {
      if (this.getTitle() !== undefined) PageStore.setTitle(this.getTitle());
      else if (this.getTitle() === undefined && (EditorStore.tempFileLayoutList.length > 0 || EditorStore.fileLayoutList.length > 0)) {
        if (EditorStore.tempFileLayoutList.length > 0) {
          this.setTitle(EditorStore.tempFileLayoutList[0].file_name
            + (EditorStore.tempFileLayoutList[0].file_extension ? '.' + EditorStore.tempFileLayoutList[0].file_extension : ''));
        } else if (EditorStore.fileLayoutList.length > 0) {
          this.setTitle(EditorStore.fileLayoutList[0].file_name
            + (EditorStore.fileLayoutList[0].file_extension ? '.' + EditorStore.fileLayoutList[0].file_extension : ''));
        }
      } else this.setTitle(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'));
    }
    this.noteTitle = [].filter.call(this.noteTitle, function (c) {
      return c.charCodeAt(0) !== 65279;
    }).join('');
    return this.noteTitle;
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
          (contentList[i].nodeName !== 'IMG' && contentList[i].getElementsByTagName('IMG').length === 0)) continue;
        if (contentList[i].tagName === 'BR') continue; // getTitleByTagName에도 있지만 앞서 거르기

        // 표 제외, 이미지나 텍스트가 있을 때만 탄다
        let title = this._getTitleByTagName(contentList[i]);
        if (title !== undefined) return title;
      }
    }
  },
  // ims 250801 : 새 페이지 추가 후 표 삽입 -> 이미지 삽입 후 저장을 누르면 제목이 이미지명으로 표시되는 이슈
  _getTableTitle(node) {
    if (!node.textContent && node.getElementsByTagName('IMG').length === 0) return `(${i18n.t('NOTE_EDIT_PAGE_MENUBAR_21')})`;
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
    if (!node.textContent && node.getElementsByTagName('IMG').length === 0) return;
    // 명시적인 줄바꿈이 있는 경우
    const lineBreakIdx = node.textContent.indexOf('\n');
    if (lineBreakIdx !== -1) return node.textContent.slice(0, lineBreakIdx);

    // hasLineBreak가 true면 child별로 순회하며 getTitleByTagName 함수를 탄다
    // 즉 node 단위로 title을 뽑아낼 때
    let hasLineBreak = false;
    if (Array.from(node.childNodes).some(child => ['DIV', 'PRE', 'P', 'IMG', 'BR', 'OL', 'UL'].includes(child.nodeName))) hasLineBreak = true;
    // node 상관없이 title 뽑을 때 : 기사 내용은 줄바꿈없이 p태그 안에 span이나 strong 태그랑 #text만 있어
    if (!hasLineBreak) return node.textContent.slice(0, 200);

    for (let item of Array.from(node.childNodes)) {
      if (!item.textContent && (item.nodeName !== 'IMG' && item.getElementsByTagName('IMG').length === 0)) continue;
      let title = this._getTitleByTagName(item);
      if (title !== undefined) return title;
    }
  },
  _getTitleByTagName(node) {
    switch (node.nodeName) {
      case 'BR': return;
      case 'IMG':
        return node.dataset.name ? node.dataset.name : node.src;
      case 'SPAN': case 'A': case '#text':
      case 'STRONG': case 'BLOCKQUOTE': case 'EM': case 'H1': case 'H2': case 'H3': case 'H4': case 'H5': case 'H6':
        return node.textContent.slice(0, 200);
      case 'OL': case 'UL':
        return node.children[0].textContent;
      case 'TABLE':
        let tableTitle = this._getTableTitle(node);
        if (tableTitle !== undefined) return tableTitle;
      case 'DIV': case 'PRE': case "P":
        let title = this._searchInsideContainerTag(node);
        if (title !== undefined) return title;
      default: break;
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
    const targetTalkChId = NoteStore.getTargetChId(targetRoomId, 'CHN0001');

    const targetList = targetPageList.map(page => {
      return ({
        WS_ID: NoteRepository.WS_ID,
        note_id: (page.note_id || page.id),
        note_title: page.text,
        modified_date: page.date,
        note_channel_id: NoteRepository.chId,
        USER_ID: NoteRepository.USER_ID,
        shared_user_id: NoteRepository.USER_ID,
        shared_room_name: NoteRepository.WS_ID,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId,
        messenger_id: targetTalkChId
      });
    });

    this.createSharePage(targetList).then(() => {
      ChapterStore.getNoteChapterList();
      NoteStore.setIsDragging(false);
    });
  },
})

export default PageStore;
