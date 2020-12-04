import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import ChapterStore from './chapterStore';
import PageStore from './pageStore';
import TagStore from './tagStore';
import NoteMeta from './NoteMeta';
import { WWMS, UserStore } from 'teespace-core';
import { handleWebsocket } from '../components/common/Websocket';

const NoteStore = observable({
  workspaceId: '',
  notechannel_id: '',
  user_id: '',
  noteFileList: [],
  showPage: true, // editor 보고 있는지 태그 보고 있는지
  layoutState: '',
  targetLayout: null,
  isContentExpanded: false,
  showModal: false,
  modalInfo: {},
  LNBChapterCoverRef: '',
  isDragging: false,
  draggedType: '',
  draggedTitle: '',
  draggedOffset: {},
  sharedInfo: {},
  initVariables() {
    // A방에서 lnb 검색 후 B방으로 이동했을 때 init 필요
    ChapterStore.initSearchVar();
    if (this.layoutState === "collapse") this.setTargetLayout('LNB');
  },
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
  setUserName(userName) {
    NoteRepository.setUserName(userName);
    this.userName = userName;
  },
  getUserId() {
    return this.user_id;
  },
  init(roomId, channelId, userId, userName, callback) {
    NoteStore.setWsId(roomId);
    NoteStore.setChannelId(channelId);
    NoteStore.setUserName(userName);
    NoteStore.setUserId(userId);
    if (typeof callback === 'function') callback();
  },
  addWWMSHandler() {
    if (WWMS.handlers.get('CHN0003') === undefined) WWMS.addHandler('CHN0003', handleWebsocket);
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
      PageStore.setIsEdit('');
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
  toggleIsContentExpanded() {
    this.isContentExpanded = !this.isContentExpanded;
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
      case 'sharedInfo':
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

  async handleSharedInfo(type, id) {
    const noteInfo =
      type === 'chapter'
        ? await ChapterStore.getChapterInfoList(id)
        : await PageStore.getNoteInfoList(id)
    const sharedUser = await UserStore.getProfile({ userId: noteInfo.shared_user_id });

    this.sharedInfo = {
      sharedRoomName: noteInfo.shared_room_name,
      sharedUserName: sharedUser.name,
      sharedDate: (
        !noteInfo.created_date
          ? PageStore.modifiedDateFormatting(noteInfo.shared_date)
          : PageStore.modifiedDateFormatting(noteInfo.created_date)
      )
    };

    this.setModalInfo('sharedInfo');
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
  async getSearchList(searchKey) {
    const {
      data: { dto }
    } = await NoteRepository.getSearchList(searchKey);

    return dto;
  }
});

export default NoteStore;
