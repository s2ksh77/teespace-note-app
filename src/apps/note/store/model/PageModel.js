/* eslint-disable no-underscore-dangle */
import { get12HourFormat } from '../../NoteUtil';

// @flow
class PageModel {
  constructor(data: {}) {
    this._data = data;
  }

  get id() {
    return this._data.note_id;
  }

  get chapterId() {
    return this._data.parent_notebook;
  }

  get content() {
    return this._data.note_content;
  }

  get editingUserId() {
    return this._data.is_edit;
  }

  get modDate() {
    return get12HourFormat(this._data.modified_date);
  }
}

export default PageModel;
