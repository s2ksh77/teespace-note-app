import { action, observable } from 'mobx';
import PageModel from '../model/PageModel';
import NoteRepository from '../repository/NoteRepository';
// @flow
class PageStore {
  @observable
  pageModel: $Shape<PageModel> = '';

  @action
  async fetchNoteInfoList() {
    const res = await NoteRepository.fetchNoteInfoList();
    this.pageModel = new PageModel(res);
    console.log(this.pageModel);
  }
}

export default new PageStore();
