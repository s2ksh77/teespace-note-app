import { observable, action, set, computed } from 'mobx';
import autobind from 'autobind-decorator';
import PageModel from './PageModel';

// @flow
@autobind
class RoomTagModel {
  @observable
  noteList: Array<string>;

  @observable
  tagId: String;

  @observable
  text: String;

  @action
  setValues(data: Object) {
    set(this, data);
  }

  @action
  setNoteList(data: Array<PageModel>) {
    this.noteList = data;
  }

  @action
  setTagId(data: string) {
    this.tagId = data;
  }

  @action
  setText(data: string) {
    this.text = data;
  }
}

export default RoomTagModel;

/**
 * @param ServerObj to TagInfo mapping
 * @returns TagModel
 */
export const convertTagObjToModel = (obj): ?$Shape<RoomTagInfo> => {
  if (obj.noteList) {
    return {
      noteList: obj.note_id,
    };
  }
  if (obj.tag_id) {
    return {
      id: obj.tag_id,
    };
  }
  if (obj.text) {
    return {
      name: obj.text,
    };
  }
  return '';
};
