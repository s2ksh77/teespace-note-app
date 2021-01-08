import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import NoteStore from './noteStore';
import ChapterStore from './chapterStore';
import TagStore from './tagStore';
import EditorStore from './editorStore';
import { isFilled } from '../components/common/validators';
import GlobalVariable from '../GlobalVariable';

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

  initializeBoxColor() {
    document.getElementById('tox-icon-text-color__color').removeAttribute('fill');
    document.getElementById('tox-icon-text-color__color').removeAttribute('stroke');
    document.getElementById('tox-icon-highlight-bg-color__color').removeAttribute('fill');
    document.getElementById('tox-icon-highlight-bg-color__color').removeAttribute('stroke');
  },

  createNotePage() {
    this.createPage('(제목 없음)', null, this.createParent).then(dto => {
      ChapterStore.getNoteChapterList();
      this.setIsEdit(dto.is_edit);
      this.noteTitle = '';
      ChapterStore.setCurrentChapterId(dto.parent_notebook);
      this.createPageId = dto.note_id;
      this.currentPageId = dto.note_id;
      this.isNewPage = true;
      this.getNoteInfoList(dto.note_id).then(data => {
        this.currentPageData = data;
        this.prevModifiedUserName = this.currentPageData.user_name;
        this.modifiedDate = this.modifiedDateFormatting(this.currentPageData.modified_date, false)
        /* 
          ims 249802 : 태그탭 클릭 후 [새 페이지 추가] 버튼을 누르면 실행 취소 버튼이 활성화되어 있는 이슈
          createNotePage에서 showPage(true)로 Editor setup이 동작하는데, 아직 새 노트 info를 받아오지 못한 상태라 
          setup 안의 setNoteEditor에서 예전 노트 내용으로 setContent가 이루어진다
          이후 init을 타고,
          후에 currentPageData가 새 노트 info로 채워져 다시 setContent(새 노트 내용)이 동작한다 -> undoManager.data가 생김
        */
        EditorStore.tinymce.undoManager.clear();
      })
      NoteStore.setTargetLayout('Content');
      NoteStore.setShowPage(true);
      TagStore.setNoteTagList(dto.tagList);
      EditorStore.setFileList(
        dto.fileList,
      );
      EditorStore.tinymce?.undoManager.clear();
      EditorStore.tinymce?.focus();
      this.initializeBoxColor();
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
    return {
      pageId: pageId,
      pageIdx: ChapterStore.chapterList[chapterIdx].children.findIndex(page => page.id === pageId),
      chapterId: chapterId,
      chapterIdx: chapterIdx,
      shareData: {
        id: pageId,
        text: pageData.note_title,
        date: pageData.modified_date,
      },
    }
  },

  handleClickOutside() {
    this.setIsCtrlKeyDown(false);
    if (!this.currentPageId) {
      this.setMoveInfoList([]);
      return;
    }
    let currentMoveInfo = this.moveInfoList.find(moveInfo => moveInfo.pageId === this.currentPageId);
    if (!currentMoveInfo) currentMoveInfo = this.createMoveInfo(this.currentPageData);
    this.setMoveInfoList([currentMoveInfo]);
  },

  async movePage(movePageId, moveTargetChapterId) {
    const {
      data: { dto },
    } = await NoteRepository.movePage(movePageId, moveTargetChapterId);
    return dto;
  },

  getSortedMoveInfoList() {
    return this.moveInfoList.slice().sort((a, b) => {
      if (a.chapterIdx === b.chapterIdx) return a.pageIdx - b.pageIdx;
      return a.chapterIdx - b.chapterIdx;
    });
  },

  async moveNotePage(moveTargetChapterId, moveTargetChapterIdx, moveTargetPageIdx) {
    const item = JSON.parse(localStorage.getItem('NoteSortData_' + NoteStore.getChannelId()));

    // Step1. moveInfoList를 오름차순으로 정렬
    const sortedMoveInfoList = this.getSortedMoveInfoList();

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

    // Step5. 순서 이동 페이지 카운트 / moveInfoList 업데이트
    let moveCntInSameChapter = 0;
    let moveCntToAnotherChapter = 0;
    const startIdx = item[moveTargetChapterIdx].children.findIndex(pageId => pageId === sortedMoveInfoList[0].pageId);
    this.moveInfoList = sortedMoveInfoList.map((moveInfo, idx) => {
      if (moveInfo.chapterIdx !== moveTargetChapterIdx) moveCntToAnotherChapter++;
      else if (moveInfo.pageIdx !== startIdx + idx) moveCntInSameChapter++;
      return {
        pageId: moveInfo.pageId,
        pageIdx: startIdx + idx,
        chapterId: moveTargetChapterId,
        chapterIdx: moveTargetChapterIdx,
        shareData: moveInfo.shareData,
      };
    });

    const moveCnt = moveCntInSameChapter + moveCntToAnotherChapter;
    if (moveCnt > 0) {
      localStorage.setItem('NoteSortData_' + NoteStore.getChannelId(), JSON.stringify(item));
      await ChapterStore.getNoteChapterList();
      if (ChapterStore.currentChapterId) await this.fetchCurrentPageData(this.movePageId);
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
          if (contentList[i].textContent) {
            const temp = this._findFirstTextContent(contentList[i].children);
            if (temp) return temp;
          }
          if (contentList[i].getElementsByTagName('img').length > 0) {
            const imgName = contentList[i].getElementsByTagName('img')[0].dataset.name;
            return imgName ? imgName : contentList[i].getElementsByTagName('img')[0].src;
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
        // 복붙했는데 <div>태그 안에 <pre> 태그가 있는 경우가 있었음
        // 그냥 <pre> 태그만 있는 경우도 있음
        else if (contentList[i].textContent) {
          let temp = '';
          if (contentList[i].tagName === 'PRE') temp = this._getTitleFromPreTag(contentList[i])
          else temp = this._findFirstTextContent(contentList[i].children);

          if (temp) return temp;
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
  // el = pre tag, pre tag 안에 textContent있을 때 함수
  _getTitleFromPreTag(el) {
    const lineBreakIdx = el.textContent.indexOf('\n');
    // pre tag가 있을 때 명시적인 줄바꿈 태그가 없어도 \n만으로도 줄바꿈되어 보인다
    if (lineBreakIdx !== -1) return el.textContent.slice(0, lineBreakIdx);
    // <br>같은 줄바꿈 태그가 있는 경우는 안에 다른 태그들이 있는 것이므로 findFirstTextContent 함수를 타게 한다
    else if (el.getElementsByTagName('BR')) return this._findFirstTextContent(el.children);
  },
  _findFirstTextContent(htmlCollection) {
    try {
      for (let item of Array.from(htmlCollection)) {
        if (item.tagName === 'BR') continue;
        // todo : error 없으려나 테스트 필요
        if (item.tagName === 'SPAN' && item.textContent) return item.textContent;
        // depth가 더 있으면 들어간다
        if (item.children.length) return this._findFirstTextContent(item.children);
        // dataset.name 없으면 src 출력
        if (item.tagName === "IMG") return item.dataset.name ? item.dataset.name : item.src;
        if (item.tagName === 'PRE' && item.textContent) return this._getTitleFromPreTag(item);
        if (item.textContent) return item.textContent.slice(0, 200);
      }
    } catch (err) { return null };
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
