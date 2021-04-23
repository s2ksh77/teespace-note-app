import { observable, action, computed } from 'mobx';

// @flow
class EditorStore {
  @observable editor: object;

  @observable isSearching: Boolean = false;

  visibilityState: string;

  setEditor(editor: object) {
    this.editor = editor;
  }

  setIsSearching(isSearching: Boolean) {
    this.isSearching = isSearching;
  }

  setVisibilityState(visibilityState: string) {
    this.visibilityState = visibilityState;
  }
}

export default new EditorStore();
