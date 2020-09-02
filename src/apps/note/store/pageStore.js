import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import NoteStore from "./noteStore";

const PageStore = observable({
  notechannel_id: "",
  noteInfoList: [],
  currentPageData: [],
  getPageId(e) {
    const {
      target: { id },
    } = e;
    return id;
  },
  getPageName(e) {
    const {
      target: { name },
    } = e;
    return name;
  },
  async getNoteInfoList(noteId) {
    await NoteRepository.getNoteInfoList(noteId).then((response) => {
      const {
        data: { dto: noteList },
      } = response;
      this.noteInfoList = noteList.noteList[0];
      this.currentPageData = noteList.noteList[0];
    });
    return this.noteInfoList;
  },
});

export default PageStore;
