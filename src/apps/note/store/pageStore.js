/* eslint-disable no-underscore-dangle */
import { observable, action } from 'mobx';
import { UserStore } from 'teespace-core';
import NoteRepository from './noteRepository';
import NoteStore from './noteStore';
import ChapterStore from './chapterStore';
import TagStore from './tagStore';
import EditorStore from './editorStore';
import { isFilled } from '../components/common/validators';
import GlobalVariable from '../GlobalVariable';
import NoteUtil, { get12HourFormat } from '../NoteUtil';
import i18n from '../i18n/i18n';

const PageStore = observable({
  noteInfoList: [],
  currentPageData: {},
  saveStatus:{saving : false, saved:false},
  displayName: '',
  otherEdit: false,
  noteContent: '',
  noteTitle: '',
  currentPageId: '',
  createParent: '',
  createParentIdx: '',
  deletePageList: [],
  selectablePageId: '',
  lastSharedPageParentId: '',
  renameId: '',
  renamePrevText: '',
  renameText: '',
  isMovingPage: false,
  dragData: new Map(),
  isCtrlKeyDown: false,
  movePageId: '', // 이동을 원하는 page의 id
  dragEnterPageIdx: '',
  dragEnterChapterIdx: '',
  modifiedDate: '',
  deletedDate: '',
  isNewPage: false,
  exportPageId: '',
  exportPageTitle: '',
  editingUserID: '',
  editingUserName: '',
  editingUserCount: '',
  restorePageId: '',
  isRecycleBin: false,
  recoverInfo:{}, // 복원 팝업에서 '복구'클릭시 필요
  setRecoverInfo(info) { // parentId, id, note_content
    this.recoverInfo = info;
  },
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
  // {user_name, modified_date,USER_ID}
  set_CurrentPageData(noteInfo) {
    this.currentPageData = { ...this.currentPageData, ...noteInfo };
  },

  // 함수 호출시 3가지 상태 중 true인거 하나만 넣어주기 : ex. {saving:true}
  setSaveStatus({saving=false,saved=false}) {
    this.saveStatus.saving = saving;
    this.saveStatus.saved = saved;
  },

  /**
   * [임시]
   * 본인 또는 다른 사람이 해당 페이지를 수정하고 있는지 확인한다.
   * @returns 해당 페이지에 대한 자신의 읽기모드 여부
   */
  isReadMode() {
    if (!this.currentPageData.is_edit) {
      this.setOtherEdit(false);
      return true;
    }
    if (NoteRepository.USER_ID === this.currentPageData.is_edit) {
      this.setOtherEdit(false);
      return false;
    }
    this.setEditingUserID(this.currentPageData.is_edit);
    this.setOtherEdit(true);
    return true;
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
    this.noteTitle = [].filter
      .call(title.slice(0, 200), c => c.charCodeAt(0) !== 65279)
      .join('');
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
  setDeletePageList(deletePageList) {
    this.deletePageList = deletePageList;
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
  setRestorePageId(pageId){
    this.restorePageId = pageId
  },
  setIsRecycleBin(flag){
    this.isRecycleBin = flag;
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

  async noneEdit(noteId, parentNotebook) {
    const {
      data: { dto: returnData },
    } = await NoteRepository.nonEdit(noteId, parentNotebook)

    return returnData;
  },

  async throwPage(pageList) {
    const {
      data: { dto },
    } = await NoteRepository.throwPage(pageList);
    if(dto.resultMsg === 'Success'){
      return dto;
    }
  },

  async restorePage(pageId, chapterId) {
    const pageList = [];
    pageList.push({note_id: pageId, parent_notebook : chapterId })
    const {
      data: { dto },
    } = await NoteRepository.restorePage(pageList);
    if(dto.resultMsg === 'Success'){
      return dto;
    }
  },

  /**
   * 에디터의 텍스트/배경 색상을 초기화한다.
   */
  initializeBoxColor() {
    document.getElementById('tox-icon-text-color__color')?.removeAttribute('fill');
    document.getElementById('tox-icon-text-color__color')?.removeAttribute('stroke');
    document.getElementById('tox-icon-highlight-bg-color__color')?.removeAttribute('fill');
    document.getElementById('tox-icon-highlight-bg-color__color')?.removeAttribute('stroke');
  },

  async createNotePage() {
    const dto = await this.createPage(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'), null, this.createParent);
    this.currentPageData = {
      ...dto,
      note_content: NoteUtil.decodeStr('<p><br></p>'),
      note_title: '',
    };

    this.setIsNewPage(true);
    EditorStore.setIsSearch(false);

    ChapterStore.getNoteChapterList();
    ChapterStore.setCurrentChapterInfo(dto.parent_notebook, false);
    this.currentPageId = dto.note_id;
    TagStore.setNoteTagList(dto.tagList); // []
    EditorStore.setFileList(dto.fileList); // null
    this.noteTitle = '';
    this.modifiedDate = get12HourFormat(dto.modified_date);

    NoteStore.setTargetLayout('Content');
    NoteStore.setShowPage(true);

    // initialize editor properties
    this.initializeBoxColor();
    EditorStore.tinymce?.undoManager?.clear();
    if (EditorStore.tinymce?.selection) EditorStore.tinymce.focus();
  },

  /**
   * It throw away pages in recycle bin.
   * NOTE: If you want to delete 'New Page', you should 'deleteNotePage'!
   */
  async throwNotePage(isDnd) {
    await this.throwPage(this.deletePageList);
    await ChapterStore.getNoteChapterList();
    if (this.deletePageList.find(page => page.note_id === this.currentPageId)) {
      const pageId = isDnd
        ? ChapterStore.chapterList[0]?.children[0]?.id
        : this.selectablePageId;
      this.setCurrentPageId(pageId);
      await this.fetchCurrentPageData(pageId);
      
      ChapterStore.setDragData(new Map([[ChapterStore.currentChapterId, ChapterStore.createDragData(ChapterStore.currentChapterId)]]));
      this.setDragData(new Map([[this.currentPageId, this.createDragData(this.currentPageId, ChapterStore.currentChapterId)]]));
      ChapterStore.setIsCtrlKeyDown(false);
      this.setIsCtrlKeyDown(false);
    }

    NoteStore.setIsDragging(false);
    const num = this.deletePageList.length;
    NoteStore.setToastText(num > 1 ? i18n.t('NOTE_BIN_03', { num: num }) : i18n.t('NOTE_BIN_02'));
    NoteStore.setIsVisibleToast(true);
    NoteStore.setShowModal(false);
  },

  deleteNotePage() {
    this.deletePage(this.deletePageList).then(() => {
      if (!this.isNewPage) {
        if (this.currentPageId === this.deletePageList[0].note_id) {
          this.setCurrentPageId(this.selectablePageId);
          this.fetchCurrentPageData(this.selectablePageId)
        }
      } else {
        if (NoteStore.layoutState === "collapse") {
          NoteStore.setTargetLayout('LNB');
          this.setIsNewPage(false);
          this.fetchCurrentPageData('');
          ChapterStore.setCurrentChapterInfo('', false); // chapterId='', isRecycleBin=false
        } else {
          const currentChapter = ChapterStore.chapterList.find(chapter => chapter.id === this.createParent);
          if (currentChapter.children.length > 1) {
            const pageId = currentChapter.children[currentChapter.children.length - 2].id;
            this.setCurrentPageId(pageId);
            this.fetchCurrentPageData(pageId);
          } else {
            this.fetchCurrentPageData('');
          }
        }
      }
      ChapterStore.getNoteChapterList();
      NoteStore.setShowModal(false);
    });
  },

  renameNotePage(chapterId) {
    this.renamePage(this.renameId, this.renameText.trim(), chapterId).then(dto => {
      if (this.dragData.get(dto.note_id)) {
        this.dragData.get(dto.note_id).item.text = dto.note_title;
      }
      this.fetchNoteInfoList(dto.note_id);
      ChapterStore.getNoteChapterList();
    });
  },

  createDragData(pageId, chapterId) {
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
      this.clearDragData();
      return;
    }
    const currentDragData =
      this.dragData.get(this.currentPageId) ||
      this.createDragData(this.currentPageId, ChapterStore.currentChapterId);
    this.setDragData(new Map([[this.currentPageId, currentDragData]]));
  },

  async movePage(movePageId, moveTargetChapterId) {
    const {
      data: { dto },
    } = await NoteRepository.movePage(movePageId, moveTargetChapterId);
    return dto;
  },

  getSortedDragDataList() {
    const dragDataList = [...this.dragData].map(keyValue => keyValue[1]);
    return dragDataList.sort((a, b) => {
      if (a.chapterIdx === b.chapterIdx) return a.pageIdx - b.pageIdx;
      return a.chapterIdx - b.chapterIdx;
    });
  },

  async moveNotePage(moveTargetChapterId, moveTargetChapterIdx, moveTargetPageIdx) {
    const item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));

    const sortedDragDataList = this.getSortedDragDataList();
    const sortedMovePages = sortedDragDataList.map(data => item[data.chapterIdx].children[data.pageIdx]);

    const pageIds = []; // 갈아 끼울 페이지 아이디 리스트
    item[moveTargetChapterIdx].children.forEach((pageId, idx) => {
      if (idx === moveTargetPageIdx) pageIds.push(...sortedMovePages);
      if (!this.dragData.get(pageId)) pageIds.push(pageId);
    });
    if (moveTargetPageIdx >= pageIds.length) pageIds.push(...sortedMovePages);

    await Promise.all(sortedDragDataList.slice().reverse().map(data => {
      if (data.chapterId !== moveTargetChapterId && ChapterStore.pageMap.get(data.item.id)) {
        item[data.chapterIdx].children.splice(data.pageIdx, 1);
        return this.movePage(data.item.id, moveTargetChapterId);
      }
    }));

    item[moveTargetChapterIdx].children = pageIds;

    let moveCntInSameChapter = 0;
    let moveCntToAnotherChapter = 0;
    const startIdx = item[moveTargetChapterIdx].children.findIndex(pageId => pageId === sortedDragDataList[0].item.id);
    sortedDragDataList.map((data, idx) => {
      if (data.chapterId !== moveTargetChapterId) moveCntToAnotherChapter++;
      else if (data.pageIdx !== startIdx + idx) moveCntInSameChapter++;
      this.dragData.set(data.item.id, {
        item: data.item,
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
        ChapterStore.setDragData(new Map([[moveTargetChapterId, ChapterStore.createDragData(moveTargetChapterId)]]));
        NoteStore.setToastText(i18n.t('NOTE_PAGE_LIST_MOVE_PGE_CHPT_01', { moveCnt: moveCnt, targetPage: ChapterStore.chapterList[moveTargetChapterIdx].text }));
      }
      NoteStore.setIsVisibleToast(true);
    } else { // 이동한 페이지가 없는 경우: 기존 선택되어 있던 페이지 select
      this.handleClickOutside();
    }

    NoteStore.setIsDragging(false);
  },

  async fetchNoteInfoList(noteId) {
    const dto = await this.getNoteInfoList(noteId);
    if (!isFilled(dto.note_id)) {
      if (this.currentPageId === noteId) this.currentPageId = '';
      return;
    }

    if (dto.USER_ID) {
      const userProfile = await UserStore.getProfile(dto.USER_ID);
      this.displayName =
        userProfile?.displayName || i18n.t('NOTE_EDIT_PAGE_WORK_AREA_DEF_01');
    } else {
      this.displayName = '';
    }
    this.setCurrentPageId(dto.note_id);
    ChapterStore.setCurrentChapterInfo(dto.parent_notebook);
    this.currentPageData = dto;
    this.noteTitle = dto.note_title;
    this.modifiedDate = get12HourFormat(this.currentPageData.modified_date);
    EditorStore.setFileList(dto.fileList);
    TagStore.setNoteTagList(dto.tagList);

    if (this.isNewPage) {
      ChapterStore.setDragData(new Map([[ChapterStore.currentChapterId, ChapterStore.createDragData(ChapterStore.currentChapterId)]]));
      this.setDragData(new Map([[this.currentPageId, this.createDragData(this.currentPageId, ChapterStore.currentChapterId)]]));
      this.dragData.get(dto.note_id).item.text = dto.note_title;

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
    } else {
      this.currentPageData = {};
      this.setCurrentPageId('');
    }
  },
  // 저장 후 지우기
  removeLocalContent() {
    if (!NoteStore.notechannel_id || !this.currentPageId) return;
    localStorage.removeItem(`Note_autosave_${NoteStore.notechannel_id}_${this.currentPageId}`);
  },

  // 노트앱 진입시 수정중인 노트 확인하기
  async checkEditingPage() {
    try {
      if (!NoteStore.notechannel_id || !NoteStore.user_id) return;
      
      // 수정 중인 노트 하나만 찾는다, Note_autosave_625be3d3-ca73-429a-8f87-34936d31e9a4_ee884b85-3c77-43f2-8c93-c2c10eccb5fa
      const target = Object.keys(localStorage).find(key => key.replace(/^(Note_autosave_)(.+)_(.+)$/,"$2") === NoteStore.notechannel_id);
      if (!target) return;
      const noteId = target.replace(/^(Note_autosave_)(.+)_(.+)$/,"$3");
      
      /**
       * 챕터, 페이지 선택이 됐다가 풀려야할 때(확인했더니 is_edit이 아닌 경우)
       * 페이지 선택 효과가 깜빡이게 돼 fetchCurrentPageData 쓸 수 없음
       */
      const dto = await this.getNoteInfoList(noteId);
       
      if (dto?.is_edit === NoteStore.user_id) {
        this.setRecoverInfo({parentId: dto.parent_notebook, id:noteId, note_content:localStorage.getItem(target)});
        NoteStore.setModalInfo('recover');        
      } else { // 수정 중인 상태 아니면 스토리지에서 지우기
        this.setRecoverInfo({});
        localStorage.removeItem(target);
      }
    } catch(err) {
      console.log('checkEditingPage, 노트 진입시 수정 중인 노트 확인하기');
    }
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditStart(noteId) {
    this.editStart(noteId, this.currentPageData.parent_notebook).then(dto => {
      this.fetchNoteInfoList(dto.note_id);
      // focus에서 getRng error가 나서 selection부터 체크
      if (EditorStore.tinymce?.selection) {
        EditorStore.tinymce.focus();
        EditorStore.tinymce.selection.setCursorLocation();
        EditorStore.tinymce?.setContent(this.currentPageData.note_content);
      }
      this.initializeBoxColor();
    });
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditDone(updateDto) {
    this.editDone(updateDto).then(dto => {      
      this.removeLocalContent();
      if (this.dragData.get(dto.note_id)) {
        this.dragData.get(dto.note_id).item.text = dto.note_title;
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
    ).then(
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
    this.removeLocalContent(); // 로컬 스토리지에서 내용도 지워야
    if (this.isNewPage) {
      this.setDeletePageList([{ note_id: this.currentPageId }]);
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
        is_edit: isAutoSave ? this.currentPageData.is_edit : '',
        TYPE: 'EDIT_DONE',
      }
    }
  },

  // 자동저장, 저장 버튼 포함, isAutoSave default는 false(원래 함수 고치지 않기 위해)
  handleSave(isAutoSave=false) {
    if (!this.noteTitle || this.noteTitle === i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03'))
      this.setTitle(this.getTitleFromPageContent());
    const updateDTO = this.getSaveDto(isAutoSave);
    
    if (isAutoSave) this.handleAutoSave(updateDTO);
    else this.handleSaveBtn(updateDTO);
  },

  handleAutoSave(updateDTO) {
    // currentPageData 갱신
    this.setSaveStatus({saving:true});
    this.editDone(updateDTO)
      .then((dto) => {        
        this.removeLocalContent();
        this.setSaveStatus({saved:true});
        const {user_name, modified_date,USER_ID} = dto;
        this.set_CurrentPageData({user_name, modified_date,USER_ID});
        this.modifiedDate = get12HourFormat(modified_date);        
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

    /**
     * 페이지 제목이 입력되지 않은 경우,
     * page content(페이지 내용 및 파일)에 존재하는 가장 첫 노드의 속성에 따라 적합한 제목을 반환한다.
     * 노드가 없는 경우에는 language에 따라 (제목 없음) 또는 (Untitled) 를 반환한다.
     * @returns 입력 개체에 따른 제목
     */
    getTitleFromPageContent() {
      return (
        this._getTitleFromEditor() ||
        this._getTitleFromFiles() ||
        i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_03')
      );
    },

    _getTitleFromEditor() {
      for (const node of EditorStore.tinymce.getBody().children) {
        if (node.tagName === 'TABLE') return this._getTitleFromTable(node);
        if (
          !node.textContent &&
          node.nodeName !== 'IMG' &&
          !node.getElementsByTagName('IMG').length
        )
          continue;
        const title = this._getTitleByTagName(node);
        if (title) return title;
      }
      return;
    },

    /**
     * 테이블 셀을 순서대로 탐색하면서 가장 처음 발견되는 노드의 title을 반환한다.
     * 테이블에 입력한 개체가 없는 경우에는 (표) 를 반환한다.
     * @param {element} node 
     * @returns 테이블로부터 추출된 title
     */
    _getTitleFromTable(node) {
      for(const td of node.getElementsByTagName('td')) {
        for(const node of td.childNodes) {
          const title = this._getTitleByTagName(node);
          if (title) return title;
        }
      }
      return `(${i18n.t('NOTE_EDIT_PAGE_MENUBAR_21')})`;
    },

    _getTitleFromFiles() {
      if (!EditorStore.tempFileLayoutList.length && !EditorStore.fileLayoutList.length) return;
      const firstFile =
        EditorStore.tempFileLayoutList.length > 0
          ? EditorStore.tempFileLayoutList[0]
          : EditorStore.fileLayoutList[0];
      return firstFile.file_name + (firstFile.file_extension ? `.${firstFile.file_extension}` : '');
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
        let tableTitle = this._getTitleFromTable(node);
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
        TYPE: page.type,
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
  /**
   * NoteMeta에서도 쓰이고, context menu에서 복구할 챕터가 없을 때도 필요해서 store로 옮김
   * 나중에 필요한 인자가 더 생길까 대비해 object로 인자 받음
   */
  async restorePageLogic({chapterId, pageId, toastTxt}) {
    const res = await this.restorePage(
      pageId,
      chapterId,
    );
    if (res.resultMsg === 'Success') {
      NoteStore.setModalInfo(null);
      await ChapterStore.getNoteChapterList();
      if (this.currentPageId === pageId) {
        ChapterStore.setCurrentChapterInfo(chapterId, false);
        this.setCurrentPageId(pageId);
      }
      NoteStore.setToastText(toastTxt);
      NoteStore.setIsVisibleToast(true);
    }
  },

  editCancel(){
    if (EditorStore.isSearch) {
      const instance = new Mark(EditorStore.tinymce?.getBody());
      instance.unmark();
    }
    if(EditorStore.isUploading) {
      EditorStore.uploadingFileallCancel();
      return;
    }
    this.handleSave();
    import('teespace-core')
      .then(module => {
        try {
          const { logEvent } = module;
          logEvent('note', 'clickModifyBtn')
        } catch (e) {
          console.error(e);
        }
      })
      .catch(e => console.error(e));
    NoteStore.setToastText(i18n.t('NOTE_SAVE_PAGE'));
    NoteStore.setIsVisibleToast(true);
  }  
});

export default PageStore;
