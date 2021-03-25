import { observable } from 'mobx';
import NoteRepository from './noteRepository';
import ChapterStore from './chapterStore';
import PageStore from './pageStore';
import TagStore from './tagStore';
import NoteMeta from '../NoteMeta';
import { WWMS, UserStore, RoomStore } from 'teespace-core';
import { handleWebsocket } from '../components/common/Websocket';

const NoteStore = observable({
  noteIdFromTalk: '',
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
  isShared: false,
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
  getNoteIdFromTalk() {
    return this.noteIdFromTalk;
  },
  setNoteIdFromTalk(noteId) {
    this.noteIdFromTalk = noteId;
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
  initVariables() {
    // A방에서 lnb 검색 후 B방으로 이동했을 때 init 필요
    ChapterStore.initSearchVar();
    ChapterStore.setCurrentChapterId('');
    PageStore.setCurrentPageId('');
    ChapterStore.setChapterList([]);
    TagStore.setNoteTagList([]);
    TagStore.setTagPanelLoading(true); // 처음에 '태그 없습니다' 페이지가 보이지 않아야 함!
    // 룸 변경시 전에 방문했던 룸의 태그를 잠깐 보여줘서 init
    TagStore.setAllSortedTagList([]);
    TagStore.setSortedTagList([]);
    this.setShowPage(true);
    this.setIsMailShare(false);
  },
  setI18nLanguage(lang) {
    this.i18nLanguage = lang;
  },
  addWWMSHandler(isWeb = true) {
    if (WWMS.handlers.get('CHN0003') === undefined) WWMS.addHandler('CHN0003', 'NoteWWMSHandler', handleWebsocket(isWeb));
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
  setIsShared(flag) {
    this.isShared = flag;
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
  setModalInfo(modalType) {
    switch (modalType) {
      // AntdModal로 연다
      case 'viewInfo':
      case 'forward':
        this.modalInfo = NoteMeta.openModal(modalType);
        this.setShowModal(true);
        break;
      case 'chapterconfirm':
      case 'confirm':
      case 'chapter':
      case 'page':
      case 'editCancel':
      case 'titleDuplicate':
      case 'duplicateTagName':
      case 'editingPage':
      case 'multiFileSomeFail':
      case 'failUpload':
      case 'sizefailUpload':
      case 'failUploadByFileNameLen':
      case 'uploadingFiles': // todo
        this.modalInfo = NoteMeta.openMessage(modalType);
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
    const sharedRoom = RoomStore.getRoom(noteInfo.shared_room_name);
    const { name, nick } = await UserStore.getProfile({ userId: noteInfo.shared_user_id });

    this.sharedInfo = {
      sharedRoomName: (
        sharedRoom
          ? (sharedRoom.isMyRoom
            ? (nick ? nick : name)
            : sharedRoom.name)
          : (nick ? nick : name) // 내가 속하지 않은 방에서 전달받은 경우 룸이름 요청하는 서비스콜 기다리는 중
      ),
      sharedUserName: nick ? nick : name,
      sharedDate: (
        !noteInfo.created_date
          ? PageStore.modifiedDateFormatting(noteInfo.shared_date, true)
          : PageStore.modifiedDateFormatting(noteInfo.created_date, true)
      )
    };

    this.setModalInfo('viewInfo');
  },

  getTargetChId(targetRoomId, chType) {
    return RoomStore.getChannelIds({ roomId: targetRoomId })[chType ? chType : NoteRepository.CH_TYPE];
  },

  getSharedRoomName() {
    return (
      RoomStore.getRoom(NoteRepository.WS_ID).isMyRoom
        ? this.userName
        : RoomStore.getRoom(NoteRepository.WS_ID).name
    );
  },

  shareNote() {
    this.shareArrays.userArray.forEach(async user => {
      const friendId = user.friendId ? user.friendId : user.id;
      const res = await RoomStore.createRoom({
        creatorId: this.user_id,
        userList: [{ userId: friendId }]
      });

      if (this.shareNoteType === 'chapter')
        ChapterStore.createNoteShareChapter(res.roomId, [this.shareContent,]);
      else if (this.shareNoteType === 'page')
        PageStore.createNoteSharePage(res.roomId, [this.shareContent,]);
    })

    this.shareArrays.roomArray.forEach(room => {
      if (!room.isVisible) {
        RoomStore.activateRoom({
          roomId: room.id,
          myUserId: NoteRepository.USER_ID
        });
      }

      if (this.shareNoteType === 'chapter')
        ChapterStore.createNoteShareChapter(room.id, [this.shareContent,]);
      else if (this.shareNoteType === 'page')
        PageStore.createNoteSharePage(room.id, [this.shareContent,]);
    })
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
      data: { dto }
    } = await NoteRepository.getSearchList(searchKey);

    return dto;
  },
  async openNote(noteId) {
    this.setLoadingNoteApp(true);
    this.setShowPage(true);
    this.setTargetLayout('Content');
    await PageStore.fetchCurrentPageData(noteId);
    this.setLoadingNoteApp(false);
    this.setNoteIdFromTalk("");
  }
});

export default NoteStore;
