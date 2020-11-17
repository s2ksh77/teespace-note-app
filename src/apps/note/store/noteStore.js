import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import ChapterStore from './chapterStore';
import PageStore from './pageStore';
import TagStore from './tagStore';
import NoteMeta from './NoteMeta';
import { WWMS } from 'teespace-core';
import { handleWebsocket } from '../components/common/Websocket';

const NoteStore = observable({
  workspaceId: '',
  notechannel_id: '',
  user_id: '',
  noteFileList: [],
  showPage: true, // editor 보고 있는지 태그 보고 있는지
  layoutState: '',
  targetLayout: null,
  isExpanded: false,
  showModal: false,
  modalInfo: {},
  LNBChapterCoverRef: '',
  isDragging: false,
  draggedType: '',
  draggedTitle: '',
  draggedOffset: {},
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
    ChapterStore.getChapterList();
  },
  getChannelId() {
    return this.notechannel_id;
  },
  setUserId(userId) {
    NoteRepository.setUserId(userId);
    this.user_id = userId;
  },
  setUserName(userName) {
    NoteRepository.setUserName(userName);
    this.userName = userName;
  },
  getUserId() {
    return this.user_id;
  },
  init(roomId, channelId, userId, userName) {
    NoteStore.setWsId(roomId);
    NoteStore.setChannelId(channelId);
    NoteStore.setUserName(userName);
    NoteStore.setUserId(userId);

    WWMS.addHandler('CHN0003', handleWebsocket);
  },
  getNoteFileList() {
    return this.noteFileList;
  },
  setShowPage(showPage) {
    // true or false
    this.showPage = showPage;
    if (showPage === false) {
      ChapterStore.setCurrentChapterId('');
      PageStore.setCurrentPageId('');
      PageStore.isEdit('');
    }
  },
  setLayoutState(state) {
    this.layoutState = state;
    if (state !== 'collapse') this.targetLayout = null;
  },
  // lnb, content 중 하나
  setTargetLayout(target) {
    this.targetLayout = target;
  },
  setIsExpanded() {
    this.isExpanded = !this.isExpanded;
  },
  setShowModal(showModal) {
    this.showModal = showModal;
  },
  // { type, title, subTitle, buttons }
  setModalInfo(modalType) {
    switch (modalType) {
      case 'fileDelete':
      case 'chapter':
      case 'page':
      case 'editCancel':
      case 'titleDuplicate':
      case 'imageDelete':
        this.modalInfo = NoteMeta.openDialog(modalType);
        this.setShowModal(true);
        break;
      case null:
      default:
        this.modalInfo = {};
        this.setShowModal(false);
        break;
    }
  },
  setLNBChapterCoverRef(ref) {
    this.LNBChapterCoverRef = ref;
  },
  setIsDragging(isDragging) {
    this.isDragging = isDragging;
  },
  setDraggedType(type) {
    this.draggedType = type;
  },
  setDraggedTitle(title) {
    this.draggedTitle = title;
  },
  setDraggedOffset(offset) {
    this.draggedOffset = offset;
  },

  disableScroll(e) {
    e.preventDefault();
  },
});

export default NoteStore;
