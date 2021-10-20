/* eslint-disable no-underscore-dangle */
class ChapterModel {
  constructor(data: {}) {
    this._data = data;
  }

  get id() {
    return this._data.id;
  }

  get children() {
    return this._data.children;
  }

  get title() {
    return this._data.text;
  }

  get type() {
    return this._data.type;
  }

  get color() {
    return this._data.color;
  }
}

export default ChapterModel;
