import { action, observable } from 'mobx';
import PageModel from '../model/PageModel';
import TagModel from '../model/TagModel';
import NoteRepository from '../repository/NoteRepository';
// @flow
class PageStore {
  @observable
  pageModel: $Shape<PageModel> = '';

  @observable
  tagModel: $Shape<TagModel> = '';

  @action
  async fetchNoteInfoList() {
    const res = await NoteRepository.fetchNoteInfoList();
    this.pageModel = new PageModel(res);
    console.log(this.pageModel);
  }

  @action
  async fetchNoteTagList() {
    const res = await NoteRepository.fetchNoteTagList();
    this.tagModel = res.map(tag => new TagModel(tag));
    console.log(this.tagModel);
  }
}

export default new PageStore();
