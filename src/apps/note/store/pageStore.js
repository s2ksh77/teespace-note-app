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
  isRename: false,
  renamePageId: '',
  renamePageText: '',
  movePageId: '', // 이동을 원하는 page의 id
  movePageIdx: '', // 이동을 원하는 page의 index
  moveChapterId: '', // 이동을 원하는 page가 속한 chapter의 id
  moveTargetPageList: [], // 이동을 원하는 페이지가 target으로 하는 page의 list
  moveTargetPageIdx: '', // 이동을 원하는 페이지가 target으로 하는 index
  modifiedDate: '',
  getPageId(e) {
    const {
      target: { id },
    } = e;
    return id;
  },
  async setCurrentPageId(pageId) {
    this.currentPageId = pageId;
    if (pageId) {
      await PageStore.getNoteInfoList(pageId);
      await TagStore.getNoteTagList(pageId); // tagList
    }
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
    this.deletePageList.push(page);
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
  setMovePageId(pageId) {
    this.movePageId = pageId;
  },
  setMovePageIdx(pageIdx) {
    this.movePageIdx = pageIdx;
  },
  setMoveChapterId(chapterId) {
    this.moveChapterId = chapterId;
  },
  setMoveTargetPageList(list) {
    this.moveTargetPageList = list;
  },
  setMoveTargetPageIdx(pageIdx) {
    this.moveTargetPageIdx = pageIdx;
  },

  clearMoveData() {
    this.movePageId = '';
    this.movePageIdx = '';
    this.moveChapterId = '';
    this.moveTargetPageList = [];
    this.moveTargetPageIdx = '';
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
          this.currentPageId = dto.note_id;
          TagStore.setNoteTagList(dto.tagList);
        }
      },
    );
  },

  async deletePage() {
    await NoteRepository.deletePage(this.deletePageList).then(
      (response) => {
        if (response.status === 200) {
          ChapterStore.getChapterList();
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

  async movePage(moveTargetChapterId, moveTargetChapterIdx) {
    if (this.moveChapterId === moveTargetChapterId) { // 같은 챕터 내에 있는 페이지를 이동하고자 하는 경우
      if (this.movePageIdx !== this.moveTargetPageIdx
        && this.movePageIdx + 1 !== this.moveTargetPageIdx) {
        const newPageList = [];

        this.moveTargetPageList.forEach((page, index) => {
          if (index === this.movePageIdx) return false;

          if (index === this.moveTargetPageIdx) newPageList.push(this.moveTargetPageList[this.movePageIdx]);
          newPageList.push(page);
        })

        if (this.moveTargetPageIdx === this.moveTargetPageList.length)
          newPageList.push(this.moveTargetPageList[this.movePageIdx]);

        ChapterStore.changePageList(moveTargetChapterIdx, newPageList);
      }

      this.clearMoveData();
    }
    else { // 페이지를 다른 챕터로 이동하고자 하는 경우
      await NoteRepository.movePage(this.movePageId, moveTargetChapterId).then(
        (response) => {
          if (response.status === 200) {
            this.clearMoveData();
            ChapterStore.getChapterList();
          }
        }
      )
    }
  },

  async getNoteInfoList(noteId) {
    await NoteRepository.getNoteInfoList(noteId).then(response => {
      const {
        data: { dto: noteList },
      } = response;
      this.noteInfoList = noteList.noteList[0];
      this.currentPageData = noteList.noteList[0];
      this.isEdit = noteList.noteList[0].is_edit;
      this.noteTitle = noteList.noteList[0].note_title;
      this.modifiedDate = this.modifiedDateFormatting();
      EditorStore.setFileList(
        noteList.noteList[0].fileList[0].storageFileInfoList,
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
  handleSave() {
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
  },
});

export default PageStore;
