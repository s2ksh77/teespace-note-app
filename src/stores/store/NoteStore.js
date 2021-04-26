import { observable, action, computed } from 'mobx';
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
}

export default new NoteStore();
