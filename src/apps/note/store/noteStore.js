import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import ChapterStore from './chapterStore';
import PageStore from './pageStore';
import TagStore from './tagStore';

const NoteStore = observable({
  workspaceId: '',
  notechannel_id: '',
  user_id: '',
  noteFileList: [],
  showPage: true, // editor 보고 있는지 태그 보고 있는지
  isMaximumSize: true,
  layoutState: '',
  targetLayout: null,
  isExpanded: false,
  setWsId(wsId) {
    NoteRepository.setWsId(wsId);
    this.workspaceId = wsId;
  },
  getWsId() {
    return this.workspaceId;
  },
  setChannelId(chId) {
    NoteRepository.setChannelId(chId);
    this.notechannel_id = chId;
  },
  getChannelId() {
    return this.notechannel_id;
  },
  setUserId(userId) {
    NoteRepository.setUserId(userId);
    this.user_id = userId;
  },
  getUserId() {
    return this.user_id;
  },
  getNoteFileList() {
    return this.noteFileList;
  },
  setShowPage(showPage) {
    // true or false
    this.showPage = showPage;
    if (showPage === false) {
      ChapterStore.setCurrentChapterId("");
      PageStore.setCurrentPageId("");
    }
    // [TODO] 혹시 몰라서 넣음, 뺄까?
    else {
      TagStore.setIsSearching(false);
    }
  },
  getShowPage() {
    return this.showPage;
  },
  getIsMaximumSize() {
    return this.isMaximumSize;
  },
  setIsMaximumSize(isMaximum) {
    this.isMaximumSize = isMaximum;
  },
  setLayoutState(state) {
    this.layoutState = state;
    if (state !== "collapse") this.targetLayout = null;
  },
  // lnb, content 중 하나
  setTargetLayout(target) {
    this.targetLayout = target;
  },
  setIsExpanded() {
    this.isExpanded = !this.isExpanded;
  },
});

export default NoteStore;
