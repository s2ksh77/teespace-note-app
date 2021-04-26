import { observable, action, set } from 'mobx';
import autobind from 'autobind-decorator';
import PageModel from './PageModel';

// @flow
@autobind
class RoomTagModel {
  @observable
  id: String;

  @observable
  text: String;

  @observable
  noteList: Array<string>;

  @action
  setValues(data: Object) {
    set(this, data);
  }

  @action
  setTagId(data: string) {
    this.id = data;
  }

  @action
  setText(data: string) {
    this.text = data;
  }

  @action
  setNoteList(data: Array<PageModel>) {
    this.noteList = data;
  }
}

export default RoomTagModel;
