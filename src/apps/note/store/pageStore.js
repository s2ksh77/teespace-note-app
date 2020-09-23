import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import ChapterStore from './chapterStore';
import TagStore from './tagStore';

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
  renamePageId: '',
  renamePageText: '',
  getPageId(e) {
    const {
      target: { id },
    } = e;
    return id;
  },
  setCurrentPageId(pageId) {
    this.currentPageId = pageId;
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
  setRenamePageId(pageId) {
    this.renamePageId = pageId;
  },
  getRenamePageId() {
    return this.renamePageId;
  },
  setRenamePageText(pageText) {
    this.renamePageText = pageText;
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

  async getNoteInfoList(noteId) {
    await NoteRepository.getNoteInfoList(noteId).then(response => {
      const {
        data: { dto: noteList },
      } = response;
      this.noteInfoList = noteList.noteList[0];
      this.currentPageData = noteList.noteList[0];
      this.isEdit = noteList.noteList[0].is_edit;
      this.noteTitle = noteList.noteList[0].note_title;
      this.currentPageId = noteList.noteList[0].note_id;
    });
    return this.noteInfoList;
  },
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
      }
    });
    return this.currentPageData;
  },
});

export default PageStore;
