import { observable, action, computed } from 'mobx';

// @flow
class EditorStore {
  @observable editor: object = {};

  @observable isSearching: Boolean = false;

  setEditor(editor: object) {
    this.editor = editor;
  }

  setIsSearching(isSearching: Boolean) {
    this.isSearching = isSearching;
  }
}

export default new EditorStore();
