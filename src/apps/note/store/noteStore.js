import { observable } from 'mobx';
import NoteRepository from './noteRepository';

const NoteStore = observable({
  workspaceId:'',
  notechannel_id: '',
  noteFileList: [],
  showPage:true, // editor 보고 있는지 태그 보고 있는지
  editorButtonList: [
    [
      'undo',
      'redo',
      'font',
      'fontSize',
      'formatBlock',
      'bold',
      'underline',
      'italic',
      'strike',
      'subscript',
      'superscript',
      'fontColor',
      'hiliteColor',
      'textStyle',
      'removeFormat',
      'outdent',
      'indent',
      'align',
      'horizontalRule',
      'list',
      'lineHeight',
      'table',
      'link',
    ],
  ],
  setChannelId(chId) {
    NoteRepository.setChannelId(chId);
    this.notechannel_id = chId;
  },
  getChannelId() {
    return this.notechannel_id;
  },
  getNoteFileList() {
    return this.noteFileList;
  },
  setShowPage(showPage) { // true or false
    this.showPage = showPage;
  },
  getShowPage() {
    return this.showPage;
  }
});


export default NoteStore;
