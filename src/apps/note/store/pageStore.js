import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import NoteStore from './noteStore';
import ChapterStore from './chapterStore';
import TagStore from './tagStore';
import EditorStore from './editorStore';
import { isFilled } from '../components/common/validators';

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
  renamePageText: '',
  isMovingPage: false,
  moveInfoList: [],
  isCtrlKeyDown: false,
  movePageId: '', // 이동을 원하는 page의 id
  movePageIdx: '', // 이동을 원하는 page의 index
  moveChapterId: '', // 이동을 원하는 page가 속한 chapter의 id
  moveChapterIdx: '',
  dragEnterPageIdx: '',
  dragEnterChapterIdx: '',
  modifiedDate: '',
  prevModifiedUserName: '',
  isNewPage: false,
  exportPageId: '',
  exportPageTitle: '',
  editingUserID: '',
  editingUserName: '',

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
    else if (this.is_edit !== null && NoteRepository.USER_ID === PageStore.getCurrentPageData().is_edit) {
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
  getMoveInfoList() {
    return this.moveInfoList;
  },
  setMoveInfoList(moveInfoList) {
    this.moveInfoList = moveInfoList;
  },
  appendMoveInfoList(moveInfo) {
    this.moveInfoList.push(moveInfo);
  },
  removeMoveInfoList(idx) {
    this.moveInfoList.splice(idx, 1);
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
  getMovePageIdx() {
    return this.movePageIdx;
  },
  setMovePageIdx(pageIdx) {
    this.movePageIdx = pageIdx;
  },
  getMoveChapterId() {
    return this.moveChapterId;
  },
  setMoveChapterId(chapterId) {
    this.moveChapterId = chapterId;
  },
  getMoveChapterIdx() {
    return this.moveChapterIdx;
  },
  setMoveChapterIdx(chapterIdx) {
    this.moveChapterIdx = chapterIdx;
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

  createNotePage() {
    this.createPage('(제목 없음)', null, this.createParent).then(dto => {
      this.currentPageData = dto;
      ChapterStore.getNoteChapterList();
      this.setIsEdit(dto.is_edit);
      this.noteTitle = '';
      ChapterStore.setCurrentChapterId(dto.parent_notebook);
      this.createPageId = dto.note_id;
      this.currentPageId = dto.note_id;
      this.isNewPage = true;
      NoteStore.setTargetLayout('Content');
      NoteStore.setShowPage(true);
      TagStore.setNoteTagList(dto.tagList);
      EditorStore.setFileList(
        dto.fileList,
      );
    });
  },

  deleteNotePage() {
    this.deletePage(this.deletePageList).then(() => {
      if (this.currentPageId === this.deletePageList[0].note_id) {
        this.setCurrentPageId(this.nextSelectablePageId);
        this.fetchCurrentPageData(this.nextSelectablePageId)
      }
      if (this.isNewPage) {
        ChapterStore.getNoteChapterList().then(chapterList => {
          const currentChapter = chapterList.filter(chapter => chapter.id === this.createParent)[0];
          ChapterStore.setCurrentChapterId(this.createParent);
          if (currentChapter.children.length >= 1) {
            const pageId = currentChapter.children[0].id
            this.isNewPage = false;
            this.createPageId = '';
            this.setCurrentPageId(pageId);
            this.fetchCurrentPageData(pageId);
          }
        })
      } else ChapterStore.getNoteChapterList();
      NoteStore.setShowModal(false);
    });
  },

  renameNotePage(chapterId) {
    this.renamePage(this.renamePageId, this.renamePageText, chapterId).then(dto => {
      this.fetchNoteInfoList(dto.note_id);
      ChapterStore.getNoteChapterList();
    });
  },

  async movePage(movePageId, moveTargetChapterId) {
    const {
      data: { dto },
    } = await NoteRepository.movePage(movePageId, moveTargetChapterId);
    return dto;
  },

  async moveNotePage(moveTargetChapterId, moveTargetChapterIdx, moveTargetPageIdx) {
    const item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));

    // Step1. moveInfoList를 오름차순으로 정렬
    const sortedMoveInfoList = this.moveInfoList.slice().sort((a, b) => {
      if (a.chapterIdx === b.chapterIdx) return a.pageIdx - b.pageIdx;
      return a.chapterIdx - b.chapterIdx;
    });

    // Step2. LocalStorage에서 삭제 / 서비스 호출
    await Promise.all(sortedMoveInfoList.slice().reverse().map(moveInfo => {
      if (moveInfo.chapterId === moveTargetChapterId
        && moveInfo.pageIdx < moveTargetPageIdx) return;

      item[moveInfo.chapterIdx].children.splice(moveInfo.pageIdx, 1);
      if (moveInfo.chapterId !== moveTargetChapterId)
        return this.movePage(moveInfo.pageId, moveTargetChapterId);
    }));

    // Step3. LocalStorage에 추가
    const pageIds = sortedMoveInfoList.map(moveInfo => moveInfo.pageId);
    item[moveTargetChapterIdx].children.splice(moveTargetPageIdx, 0, ...pageIds);

    // Step4. LocalStorage에서 삭제
    sortedMoveInfoList.slice().reverse().forEach(moveInfo => {
      if (moveInfo.chapterId !== moveTargetChapterId
        || moveInfo.pageIdx >= moveTargetPageIdx) return;

      item[moveTargetChapterIdx].children.splice(moveInfo.pageIdx, 1);
    });

    // Step5. moveInfoList 업데이트
    const startIdx = item[moveTargetChapterIdx].children.findIndex(pageId => pageId === sortedMoveInfoList[0].pageId);
    this.moveInfoList = sortedMoveInfoList.map((moveInfo, idx) => {
      return {
        pageId: moveInfo.pageId,
        pageIdx: startIdx + idx,
        chapterId: moveTargetChapterId,
        chapterIdx: moveTargetChapterIdx,
        shareData: moveInfo.shareData,
      };
    });

    localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(item));
    ChapterStore.getNoteChapterList();
    this.setCurrentPageId(this.movePageId);
    this.fetchCurrentPageData(this.movePageId);
    ChapterStore.setCurrentChapterId(moveTargetChapterId);
  },

  modifiedDateFormatting(date) {
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
      && mYear === curDate.getFullYear()) { // 같은 해
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
    this.noteInfoList = dto;
    this.currentPageData = dto;
    this.isEdit = dto.is_edit;
    this.noteTitle = dto.note_title;
    this.modifiedDate = this.modifiedDateFormatting(this.currentPageData.modified_date);
    EditorStore.setFileList(
      dto.fileList,
    );
  },

  async fetchCurrentPageData(pageId) {
    if (pageId) {
      await this.fetchNoteInfoList(pageId);
      await TagStore.fetchNoteTagList(pageId); // tagList
    } else this.setIsEdit('');
  },

  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  noteEditStart(noteId) {
    this.prevModifiedUserName = this.currentPageData.user_name;
    this.editStart(noteId, this.currentPageData.parent_notebook).then(dto => {
      this.fetchNoteInfoList(dto.note_id);
      EditorStore.tinymce.focus();
      EditorStore.tinymce.selection.setCursorLocation();
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
          this.setTitle(EditorStore.tempFileLayoutList[0].file_name);
        } else if (EditorStore.fileLayoutList.length > 0) {
          this.setTitle(EditorStore.fileLayoutList[0].file_name);
        }
      } else this.setTitle('(제목 없음)');
    }
    const updateDTO = {
      dto: {
        note_id: this.currentPageData.note_id,
        note_title: this.noteTitle,
        note_content: this.noteContent ? this.noteContent : '<p><br></p>',
        parent_notebook: this.currentPageData.parent_notebook,
        is_edit: '',
        TYPE: 'EDIT_DONE',
      },
    };
    this.noteEditDone(updateDTO);
    if (TagStore.removeTagList.length > 0) TagStore.deleteTag(TagStore.removeTagList, PageStore.currentPageId);
    if (TagStore.addTagList.length > 0) TagStore.createTag(TagStore.addTagList, PageStore.currentPageId);
    if (TagStore.updateTagList.length > 0) TagStore.updateTag(TagStore.updateTagList);
    if (EditorStore.tempFileLayoutList.length > 0) EditorStore.tempFileLayoutList = [];
    NoteStore.setShowModal(false);
    EditorStore.setIsAttatch(false);
    EditorStore.tinymce?.selection.setCursorLocation();
    EditorStore.tinymce?.undoManager.clear();
    this.isNewPage = false;
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
        if (contentList[i].tagName === 'P') {
          if (contentList[i].getElementsByTagName('img').length > 0) {
            return contentList[i].getElementsByTagName('img')[0].dataset.name;
          } else if (!!contentList[i].textContent) return contentList[i].textContent;
        } else if (contentList[i].tagName === 'TABLE') {
          const tdList = contentList[i].getElementsByTagName('td');
          for (let tdIndex = 0; tdIndex < tdList.length; tdIndex++) {
            var tableTitle = this._getTableTitle(tdList[tdIndex].childNodes);
            if (tableTitle !== undefined) return tableTitle;
          }
          if (i === contentList.length - 1) return '(표)';
        } else if (contentList[i].tagName === 'IMG') {
          if (!!contentList[i].dataset.name) return contentList[i].dataset.name;
        } else if (contentList[i].nodeName === 'STRONG' || contentList[i].nodeName === 'BLOCKQUOTE' || contentList[i].nodeName === 'EM' || contentList[i].nodeName === 'H2' || contentList[i].nodeName === 'H3') {
          if (!!contentList[i].textContent) return contentList[i].textContent;
        } else if (contentList[i].nodeName === 'OL' || contentList[i].nodeName === 'UL') {
          if (!!contentList[i].children[0].textContent) return contentList[i].children[0].textContent;
        }
      }
    }
  },
  _getTableTitle(td) {
    if (td) {
      for (let j = 0; j < td.length; j++) {
        if (td[j].nodeName === '#text') {
          return td[j].textContent;
        } else if (td[j].nodeName === 'STRONG' || td[j].nodeName === 'BLOCKQUOTE' || td[j].nodeName === 'EM' || td[j].nodeName === 'H2' || td[j].nodeName === 'H3') {
          if (!!td[j].textContent) return td[j].textContent;
        } else if (td[j].nodeName === 'OL' || td[j].nodeName === 'UL') {
          if (!!td[j].children[0].textContent) return td[j].children[0].textContent;
        } else if (td[j].nodeName === 'IMG') {
          return td[j].dataset.name;
        } else if (td[j].nodeName === 'TABLE') { // 두번 루프
          const tdList = td[j].getElementsByTagName('td');
          for (let tdIndex = 0; tdIndex < tdList.length; tdIndex++) {
            var tableTitle = this._getTableTitle(tdList[tdIndex].childNodes);
            if (tableTitle !== undefined) return tableTitle;
          }
        }
      }
    }
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
    const sharedRoomName = NoteStore.getSharedRoomName();
    const targetList = targetPageList.map(page => {
      return ({
        WS_ID: NoteRepository.WS_ID,
        note_id: (page.note_id || page.id),
        note_channel_id: NoteRepository.chId,
        USER_ID: NoteRepository.USER_ID,
        shared_user_id: NoteRepository.USER_ID,
        shared_room_name: sharedRoomName,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId
      });
    });

    this.createSharePage(targetList).then(() => ChapterStore.getNoteChapterList());;
  },
})

export default PageStore;
