import { observable, action, computed } from 'mobx';
import { RoomStore } from 'teespace-core';
import ChapterModel from '../model/ChapterModel';
import ChapterStore from './ChapterStore';
import NoteRepository from '../repository/NoteRepository';

// @flow
class NoteStore {
  roomId: '';

  chId: '';

  userId: '';

  userName: '';

  userEmail: '';

  metaTagNoteId: string;

  @observable
  layoutState: string = '';

  @observable
  targetLayout: string = 'lnb';

  @observable
  isContentExpanded: Boolean = false;

  @observable
  isPageContent: Boolean = true;

  @observable
  searchResult: Array<String> = [];

  @observable
  isSearch: Boolean = false;

  @observable
  searchStr: String = '';

  @observable
  isBasicPlan: boolean = false;

  @observable
  isMailApp: boolean = false;

  isDragging: boolean = false;

  draggedType: string;

  draggedItems: Array<object>;

  draggedOffset: object;

  /* init 관련 변수 Repo -> NoteStore */
  init(data: Object) {
    this.setRoomId(data.roomId);
    this.setUserId(data.userId);
    this.setChId(data.chId);
    this.setUserName(data.userName);
    this.setUserEmail(data.userEmail);
  }

  setRoomId(data: string) {
    this.roomId = data;
  }

  setUserId(data: string) {
    this.userId = data;
  }

  setChId(data: string) {
    this.chId = data;
  }

  setUserName(data: string) {
    this.userName = data;
  }

  setUserEmail(data: string) {
    this.userEmail = data;
  }

  setMetaTagNoteId(metaTagNoteId: string) {
    this.metaTagNoteId = metaTagNoteId;
  }

  setLayoutState(data: string) {
    this.layoutState = data;
  }

  setTargetLayout(data: string) {
    this.targetLayout = data;
  }

  setIsContentExpanded(isContentExpanded: boolean) {
    this.isContentExpanded = isContentExpanded;
  }

  setIsPageContent(isPageContent: boolean) {
    this.isPageContent = isPageContent;
  }

  setSearchResult(data: Array) {
    this.searchResult = data;
  }

  setIsSearch(data: Boolean) {
    this.isSearch = data;
  }

  setSearchStr(data: string) {
    this.searchStr = data;
  }

  setSearchInit() {
    this.searchStr = '';
    this.isSearch = false;
    this.searchResult = [];
  }

  @action
  setIsBasicPlan(isBasicPlan: boolean) {
    this.isBasicPlan = isBasicPlan;
  }

  @action
  setIsMailApp(isMailApp: boolean) {
    this.isMailApp = isMailApp;
  }

  @action
  toggleIsContentExpanded() {
    this.isContentExpanded = !this.isContentExpanded;
  }

  @computed
  get isCollapsed() {
    return this.layoutState === 'collapse';
  }

  @computed
  get isTargetLayout() {
    return (layout: string) => this.targetLayout === layout;
  }

  @action
  async getSearchList(searchKey: string) {
    const {
      data: { dto },
    } = await NoteRepository.getSearchList(searchKey);
    return dto;
  }

  setIsDragging(isDragging) {
    this.isDragging = isDragging;
  }

  setDraggedType(draggedType) {
    this.draggedType = draggedType;
  }

  setDraggedItems(draggedItems) {
    this.draggedItems = draggedItems;
  }

  setDraggedOffset(offset) {
    this.draggedOffset = offset;
  }

  getTargetChId(targetRoomId: string, chType: string) {
    return RoomStore.getChannelIds({ roomId: targetRoomId })[
      chType || 'CHN0003'
    ];
  }
}

export default new NoteStore();
