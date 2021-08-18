import { observable } from 'mobx';
import { WWMS, UserStore, RoomStore } from 'teespace-core';
import NoteRepository from './noteRepository';
import ChapterStore from './chapterStore';
import PageStore from './pageStore';
import TagStore from './tagStore';
import EditorStore from './editorStore';
import NoteMeta from '../NoteMeta';
import { handleWebsocket } from '../components/common/Websocket';
import i18n from '../i18n/i18n';
import { get12HourFormat } from '../NoteUtil';

const NoteStore = observable({
  metaTagInfo: { isOpen: false, type: '', id: '' },
  loadingNoteApp: true,
  workspaceId: '',
  notechannel_id: '',
  user_id: '',
  userName: '',
  userEmail: '',
  noteFileList: [],
  showPage: true, // editor 보고 있는지 태그 보고 있는지
  layoutState: '',
  targetLayout: null,
  isHoveredFoldBtnLine: false,
  isContentExpanded: false,
  showModal: false,
  modalInfo: {},
  LNBChapterCoverRef: '',
  isDragging: false,
  draggedType: '',
  draggedItems: [],
  draggedOffset: {},
  sharedInfo: {},
  shareNoteType: '',
  shareContent: '',
  shareArrays: {}, // { userArray, roomArray }
  isMailShare: false,
  mailShareFileObjs: [],
  mailReceiver: [],
  isVisibleToast: false,
  toastText: '',
  i18nLanguage: 'ko-KR',
  i18nKeyMap: '',
  isExporting: false,
  isSlashCmd: false,
  appType: 'wapl',

  setAppType(appType) {
    this.appType = appType;
  },
  setIsSlashCmd(flag) {
    this.isSlashCmd = flag;
  },
  setMetaTagInfo({ isOpen = false, type = '', id = '' }) {
    this.metaTagInfo = { isOpen, type, id };
  },
  getLoadingNoteApp() {
    return this.loadingNoteApp;
  },
  setLoadingNoteApp(isLoading) {
    this.loadingNoteApp = isLoading;
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
  setUserEmail(userEmail) {
    NoteRepository.setUserEmail(userEmail);
    this.userEmail = userEmail;
  },
  getUserId() {
    return this.user_id;
  },
  // todo : mobile이랑 ptask에 알리고 parameter를 객체로 바꾸기
  init(roomId, channelId, userId, userName, userEmail, callback) {
    this.setWsId(roomId);
    this.setChannelId(channelId);
    this.setUserId(userId);
    this.setUserName(userName);
    this.setUserEmail(userEmail);

    if (typeof callback === 'function') callback();
  },
  // metaTagInfo는 init하면 안 됨
  initVariables() {
    // A방에서 lnb 검색 후 B방으로 이동했을 때 init 필요
    ChapterStore.initSearchVar();
    ChapterStore.setCurrentChapterInfo('', false); //chapterId = '', isRecycleBin=false
    PageStore.fetchCurrentPageData('');
    ChapterStore.setChapterList([]);
    ChapterStore.setLnbBoundary({ beforeShared: false, beforeRecycleBin: false });
    TagStore.setNoteTagList([]);
    TagStore.setTagPanelLoading(true); // 처음에 '태그 없습니다' 페이지가 보이지 않아야 함!
    // 룸 변경시 전에 방문했던 룸의 태그를 잠깐 보여줘서 init
    TagStore.setAllSortedTagList([]);
    TagStore.setSortedTagList([]);
    EditorStore.setIsSearch(false);
    this.setShowPage(true);
    this.setIsMailShare(false);
  },
  setI18nLanguage(lang) {
    this.i18nLanguage = lang;
  },
  addWWMSHandler(isWeb = true) {
    if (WWMS.handlers.get('CHN0003') === undefined)
      WWMS.addHandler('CHN0003', 'NoteWWMSHandler', handleWebsocket);
  },
  getNoteFileList() {
    return this.noteFileList;
  },
  setShowPage(showPage) {
    // true or false
    this.showPage = showPage;
    if (showPage === false) {
      ChapterStore.setCurrentChapterInfo('', false); // chapterId='', isRecycleBin=false
      PageStore.fetchCurrentPageData('');
    }
  },
  setLayoutState(state) {
    this.layoutState = state;
  },
  // lnb, content 중 하나
  setTargetLayout(target) {
    this.targetLayout = target;
  },
  setIsHoveredFoldBtnLine(isHovered) {
    this.isHoveredFoldBtnLine = isHovered;
  },
  // [ims 249594] 에디터 full 화면 -> 축소 버튼 누르면, 현재 상태 체크하지 않고 무조건 false로 바꾸기
  setIsContentExpanded(isContentExpanded) {
    this.isContentExpanded = isContentExpanded;
  },
  toggleIsContentExpanded() {
    this.isContentExpanded = !this.isContentExpanded;
  },
  setShareNoteType(noteType) {
    this.shareNoteType = noteType;
  },
  setShareContent(content) {
    this.shareContent = content;
  },
  setShareArrays(arrs) {
    this.shareArrays = arrs;
  },
  setIsMailShare(isMailShare) {
    this.isMailShare = isMailShare;
  },
  setMailShareFileObjs(fileObjs) {
    this.mailShareFileObjs = fileObjs;
  },
  setMailReceiver(receivers) {
    this.mailReceiver = receivers;
  },
  setIsVisibleToast(isVisible) {
    this.isVisibleToast = isVisible;
  },
  setToastText(text) {
    this.toastText = text;
  },
  setShowModal(showModal) {
    this.showModal = showModal;
  },
  // { type, title, subTitle, buttons }
  setModalInfo(modalType, data) {
    if (modalType === ('viewInfo' && 'forward' && 'restore'))
      this.modalInfo = NoteMeta.openModal(modalType);
    else if (!modalType) this.modalInfo = {};
    else this.modalInfo = NoteMeta.openMessage(modalType, data);

    modalType === null ? this.setShowModal(false) : this.setShowModal(true);
  },

  async handleSharedInfo(type, id) {
    const noteInfo =
      type === 'chapter'
        ? await ChapterStore.getChapterInfoList(id)
        : await PageStore.getNoteInfoList(id);
    const sharedRoom = await RoomStore.fetchRoomForShare({
      roomId: noteInfo.shared_room_name,
    });
    const { displayName } = await UserStore.getProfile({
      userId: noteInfo.shared_user_id,
    });

    this.sharedInfo = {
      sharedRoomName: sharedRoom?.isMyRoom
        ? displayName
        : sharedRoom?.name || i18n.t('NOTE_EDIT_PAGE_WORK_AREA_DEF_01'),
      sharedUserName: displayName || i18n.t('NOTE_EDIT_PAGE_WORK_AREA_DEF_01'),
      sharedDate: !noteInfo.created_date
        ? get12HourFormat(noteInfo.shared_date, true)
        : get12HourFormat(noteInfo.created_date, true),
    };

    this.setModalInfo('viewInfo');
  },

  getTargetChId(targetRoomId, chType) {
    return RoomStore.getChannelIds({ roomId: targetRoomId })[
      chType ? chType : NoteRepository.CH_TYPE
    ];
  },

  getSharedRoomName() {
    return RoomStore.getRoom(NoteRepository.WS_ID).isMyRoom
      ? this.userName
      : RoomStore.getRoom(NoteRepository.WS_ID).name;
  },

  shareNote() {
    this.shareArrays.userArray.forEach(async user => {
      const friendId = user.friendId ? user.friendId : user.id;
      const res = await RoomStore.createRoom({
        creatorId: this.user_id,
        userList: [{ userId: friendId }],
      });

      if (this.shareNoteType === 'chapter')
        ChapterStore.createNoteShareChapter(res.roomId, [this.shareContent]);
      else if (this.shareNoteType === 'page')
        PageStore.createNoteSharePage(res.roomId, [this.shareContent]);
    });

    this.shareArrays.roomArray.forEach(room => {
      if (!room.isVisible) {
        RoomStore.activateRoom({
          roomId: room.id,
          myUserId: NoteRepository.USER_ID,
        });
      }

      if (this.shareNoteType === 'chapter')
        ChapterStore.createNoteShareChapter(room.id, [this.shareContent]);
      else if (this.shareNoteType === 'page')
        PageStore.createNoteSharePage(room.id, [this.shareContent]);
    });
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
  setDraggedItems(items) {
    this.draggedItems = items;
  },
  setDraggedOffset(offset) {
    this.draggedOffset = offset;
  },
  setIsExporting(isExporting) {
    this.isExporting = isExporting;
  },
  disableScroll(e) {
    e.preventDefault();
  },
  async getSearchList(searchKey) {
    const {
      data: { dto },
    } = await NoteRepository.getSearchList(searchKey);

    return dto;
  },

  floatToast(message) {
    this.setToastText(message);
    this.setIsVisibleToast(true);
  },
});

export default NoteStore;
