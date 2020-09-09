import { observable } from "mobx";
import NoteRepository from "./noteRepository";
import NoteStore from "./noteStore";

const TagStore = observable({
  notetagList: [],
  tagSortList: [],
  tagList: [],
  getChannelTagList() {
    return this.tagList;
  },
  getNoteTagList() {
    return this.notetagList;
  },
  getTagSortList() {
    return this.tagSortList;
  },
});

export default TagStore;
