import { action, flow, observable, runInAction } from 'mobx';
import NoteRepository from '../repository/NoteRepository';

// @flow
class TagStore {
  tags = [];

  isloading = true;

  constructor() {}
  // async fetchNoteTagList(noteId) {
  //   await NoteRepository.getNoteTagList(noteId).then(response => {
  //     if (response.status === 200) {
  //       const {
  //         data: { dto: tagList },
  //       } = response;
  //       this.setNoteTagList(tagList.tagList);
  //     }
  //   });
  //   return this.notetagList;
  // },

  // fetches all Tags from the server
  @action
  fetchTagList = flow(function* fetchTagList() {
    this.isLoading = true;
    const tagList = yield NoteRepository.fetchTagSortedList();
    tagList.forEach(tag => convert);
    this.isLoading = false;
  });
}

export default new TagStore();
