import { observable } from 'mobx';

const EditorStore = observable({
  contents: '',
  jodit: null,
  setContents(content) {
    this.contents = content;
  },
  getContents() {
    return this.contents;
  },
  setEditor(instance) {
    this.jodit = instance;
  },
  getEditor() {
    return this.jodit;
  },
});

export default EditorStore;

export const config = {
  buttons: [
    'undo',
    'redo',
    '|',
    'bold',
    'strikethrough',
    'underline',
    'italic',
    'eraser',
    '|',
    'superscript',
    'subscript',
    '|',
    'ul',
    'ol',
    'hr',
    '|',
    'align',
    'outdent',
    'indent',
    '|',
    'font',
    'fontsize',
    'brush',
    'paragraph',
    '|',
    'image',
    'file',
    'table',
    'link',
    '|',
    'selectall',
    'cut',
    'copy',
    'paste',
    'copyformat',
    '|',
    'source',
    'preview',
    'find',
  ],
  uploader: {
    insertImageAsBase64URI: true,
  },
  placeholder: '',
  hotkeys: {
    redo: 'ctrl+z',
    undo: 'ctrl+y',
    indent: 'tab',
    outdent: 'shift+tab',
    bold: 'ctrl+b',
    italic: 'ctrl+i',
    removeFormat: 'ctrl+shift+m',
    insertOrderedList: 'ctrl+shift+7',
    insertUnorderedList: 'ctrl+shift+8',
    openSearchDialog: 'ctrl+f',
    openReplaceDialog: 'ctrl+r',
  },
};
