import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import NoteStore from './noteStore';
import ChapterStore from './chapterStore';
import TagStore from './tagStore';
import EditorStore from './editorStore';

const PageStore = observable({
  notechannel_id: '',
  noteInfoList: [],
  currentPageData: [],
  returnData: [],
  isEdit: '',
  noteContent: '',
  noteTitle: '',
  currentPageId: '',
  createParent: '',
  deletePageList: [],
  nextSelectablePageId: '',
  isRename: false,
  renamePageId: '',
  renamePageText: '',
  isMovingPage: false,
  movePageId: '', // 이동을 원하는 page의 id
  movePageIdx: '', // 이동을 원하는 page의 index
  moveChapterId: '', // 이동을 원하는 page가 속한 chapter의 id
  dragEnterPageIdx: '',
  dragEnterChapterIdx: '',
  modifiedDate: '',
  isNewPage: false,
  getPageId(e) {
    const {
      target: { id },
    } = e;
    return id;
  },
  async setCurrentPageId(pageId) {
    this.currentPageId = pageId;
    if (pageId) {
      await this.getNoteInfoList(pageId);
      await TagStore.getNoteTagList(pageId); // tagList
    } else this.isEdit = '';
  },
  getPageName(e) {
    const {
      target: { name },
    } = e;
    return name;
  },
  isReadMode() {
    return this.isEdit === null || this.isEdit === '';
  },
  setContent(content) {
    this.noteContent = content;
  },
  setTitle(title) {
    this.noteTitle = title;
  },
  setCreatePageParent(chapterId) {
    this.createParent = chapterId;
  },
  getCreatePageParent() {
    return this.createParent;
  },
  setDeletePageList(page) {
    this.deletePageList = [];
    this.deletePageList.push(page);
  },
  setNextSelectablePageId(pageId) {
    this.nextSelectablePageId = pageId;
  },
  setIsRename(flag) {
    this.isRename = flag;
  },
  setRenamePageId(pageId) {
    this.renamePageId = pageId;
  },
  getRenamePageId() {
    return this.renamePageId;
  },
  setRenamePageText(pageText) {
    this.renamePageText = pageText;
  },
  setIsMovingPage(isMoving) {
    this.isMovingPage = isMoving;
  },
  setMovePageId(pageId) {
    this.movePageId = pageId;
  },
  setMovePageIdx(pageIdx) {
    this.movePageIdx = pageIdx;
  },
  setMoveChapterId(chapterId) {
    this.moveChapterId = chapterId;
  },
  setDragEnterPageIdx(pageIdx) {
    this.dragEnterPageIdx = pageIdx;
  },
  setDragEnterChapterIdx(chapterIdx) {
    this.dragEnterChapterIdx = chapterIdx;
  },

  clearMoveData() {
    this.movePageId = '';
    this.movePageIdx = '';
    this.moveChapterId = '';
  },

  modifiedDateFormatting() {
    const date = this.currentPageData.modified_date;
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

    if (mYear === curDate.getFullYear()) { // 같은 해
      if (mMonth === curDate.getMonth() + 1 && mDay === curDate.getDate()) return basicDate; // 같은 날
      else return convertTwoDigit(mMonth) + '.' + convertTwoDigit(mDay) + ' ' + basicDate; // 다른 날
    }
    else { // 다른 해
      return mYear + '.' + convertTwoDigit(mMonth) + '.' + convertTwoDigit(mDay) + basicDate;
    }
  },

  async createPage() {
    await NoteRepository.createPage('제목 없음', this.createParent).then(
      response => {
        if (response.status === 200) {
          const {
            data: { dto },
          } = response;
          this.currentPageData = dto;
          ChapterStore.getChapterList();
          this.isEdit = dto.is_edit;
          this.noteTitle = dto.note_title;
          ChapterStore.setCurrentChapterId(dto.parent_notebook);
          this.currentPageId = dto.note_id;
          this.isNewPage = true;
          TagStore.setNoteTagList(dto.tagList);
        }
      },
    );
  },

  async deletePage() {
    await NoteRepository.deletePage(this.deletePageList).then(
      (response) => {
        if (response.status === 200) {
          if (this.currentPageId === this.deletePageList[0].note_id) {
            this.setCurrentPageId(this.nextSelectablePageId);
          }

          ChapterStore.getChapterList();
          NoteStore.setShowModal(false);
        }
      }
    );
  },

  async renamePage(chapterId) {
    await NoteRepository.renamePage(this.renamePageId, this.renamePageText, chapterId).then(
      (response) => {
        if (response.status === 200) {
          ChapterStore.getChapterList();
        }
      }
    );
  },

  async movePage(moveTargetChapterId, moveTargetChapterIdx, moveTargetPageList, moveTargetPageIdx) {
    if (this.moveChapterId === moveTargetChapterId) { // 같은 챕터 내에 있는 페이지를 이동하고자 하는 경우
      if (this.movePageIdx !== moveTargetPageIdx
        && this.movePageIdx + 1 !== moveTargetPageIdx) {
        const newPageList = [];

        moveTargetPageList.forEach((page, index) => {
          if (index === this.movePageIdx) return false;

          if (index === moveTargetPageIdx) newPageList.push(moveTargetPageList[this.movePageIdx]);
          newPageList.push(page);
        })

        if (moveTargetPageIdx === moveTargetPageList.length)
          newPageList.push(moveTargetPageList[this.movePageIdx]);

        ChapterStore.changePageList(moveTargetChapterIdx, newPageList);
        this.setCurrentPageId(this.movePageId);
        ChapterStore.setCurrentChapterId(moveTargetChapterId);
      }

      this.clearMoveData();
    }
    else { // 페이지를 다른 챕터로 이동하고자 하는 경우
      await NoteRepository.movePage(this.movePageId, moveTargetChapterId).then(
        (response) => {
          if (response.status === 200) {
            ChapterStore.getChapterList();
            this.setCurrentPageId(this.movePageId);
            ChapterStore.setCurrentChapterId(moveTargetChapterId);
            this.clearMoveData();
          }
        }
      )
    }
  },

  async getNoteInfoList(noteId) {
    await NoteRepository.getNoteInfoList(noteId).then(response => {
      const {
        data: { dto: {noteList} },
      } = response;
      this.noteInfoList = noteList[0];
      this.currentPageData = noteList[0];
      this.isEdit = noteList[0].is_edit;
      this.noteTitle = noteList[0].note_title;
      this.modifiedDate = this.modifiedDateFormatting();
      EditorStore.setFileList(
        noteList[0].fileList[0].storageFileInfoList,
      );
      // this.currentPageId = noteList.noteList[0].note_id;
    });
    return this.noteInfoList;
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  async editStart(noteId) {
    await NoteRepository.editStart(
      noteId,
      this.currentPageData.parent_notebook,
    ).then(response => {
      if (response.status === 200) {
        const {
          data: { dto: returnData },
        } = response;
        this.getNoteInfoList(returnData.note_id);
      }
    });
    return this.currentPageData;
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  async editDone(updateDto) {
    await NoteRepository.editDone(updateDto).then(response => {
      if (response.status === 200) {
        const {
          data: { dto: returnData },
        } = response;
        this.getNoteInfoList(returnData.note_id);
        ChapterStore.getChapterList();
      }
    });
    return this.currentPageData;
  },
  // 이미 전에 currentPageID가 set되어 있을거라고 가정
  async noneEdit(noteId) {
    await NoteRepository.nonEdit(
      noteId,
      this.currentPageData.parent_notebook,
    ).then(response => {
      if (response.status === 200) {
        const {
          data: { dto: returnData },
        } = response;
        this.getNoteInfoList(returnData.note_id);
        NoteStore.setShowModal(false);
      }
    });
    return this.currentPageData;
  },

  async handleNoneEdit() {
    if (this.isNewPage) {
      this.setDeletePageList({ note_id: this.currentPageId });
      await this.deletePage();
      this.isNewPage = false;
    } else this.noneEdit(this.currentPageId);
  },

  handleSave() {
    if (this.noteTitle === '' || this.noteTitle === '제목 없음') {
      if (this.getTitle() !== undefined) PageStore.setTitle(this.getTitle());
    }
    const updateDTO = {
      dto: {
        note_id: this.currentPageData.note_id,
        note_title: this.noteTitle,
        note_content: this.noteContent,
        parent_notebook: this.currentPageData.parent_notebook,
        is_edit: '',
        TYPE: 'EDIT_DONE',
      },
    };
    this.editDone(updateDTO);
    if (TagStore.removeTagList) TagStore.deleteTag(TagStore.removeTagList);
    if (TagStore.addTagList) TagStore.createTag(TagStore.addTagList);
    if (TagStore.updateTagList) TagStore.updateTag(TagStore.updateTagList);
    NoteStore.setShowModal(false);
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

  }
});

export default PageStore;
