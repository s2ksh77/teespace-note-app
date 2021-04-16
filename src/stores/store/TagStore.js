import { action, computed, flow, observable } from 'mobx';
import NoteRepository from '../repository/NoteRepository';

// @flow
class TagStore {
  @observable
  isLoading: Boolean = true;

  @observable
  tagCategory = { KOR: {}, ENG: {}, NUM: {}, ETC: {} };

  @computed
  get isNoTag(): Boolean {
    return (
      Object.keys(this.tagCategory.ENG).length === 0 &&
      Object.keys(this.tagCategory.KOR).length === 0 &&
      Object.keys(this.tagCategory.NUM).length === 0 &&
      Object.keys(this.tagCategory.ETC).length === 0
    );
  }

  /**
   * fetches all Tags with category from the server
   * RoomTagModel : class { tagId, text, noteList }
   * TagKeyModel : class { key, tags:Array<RoomTagModel> }
   */
  @action
  getTagCategory = flow(function* getTagCategory() {
    this.isLoading = true;
    this.tagCategory = yield NoteRepository.getAllTagObj();
    this.isLoading = false;
  });
}

export default new TagStore();
