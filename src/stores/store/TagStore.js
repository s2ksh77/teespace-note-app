import { makeObservable, observable, action, flow, computed } from 'mobx';
import NoteRepository from '../repository/NoteRepository';
import {
  convertServerTagList,
  convertToCreateDto,
  convertToUpdateDto,
  convertToDeleteDto,
} from '../../utils/convert';
import NoteStore from './NoteStore';
import PageStore from './PageStore';

// @flow
class TagStore {
  @observable isLoading: boolean = true;

  @observable isSearchLoading: boolean = false;

  @observable isSearching: boolean = false;

  @observable searchStr: string = '';

  @observable roomTagListObj = { KOR: {}, ENG: {}, NUM: {}, ETC: {} };

  @observable searchResultListObj = {};

  @computed
  get tagListObj(): TagListObj {
    if (!this.isSearching) return this.roomTagListObj;
    return this.searchResultListObj;
  }

  /**
   * isSearching && isNoTag => 검색 결과 없습니다
   * !isSearching && isNoTag => 태그가 없습니다
   */
  @computed
  get isNoTag(): boolean {
    if (
      Object.keys(this.tagListObj)?.every(
        category => this.tagListObj[category].length === 0,
      )
    )
      return true;
    return false;
  }

  @action
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @action
  setIsSearchLoading(isSearchLoading: boolean) {
    this.isSearchLoading = isSearchLoading;
  }

  @action
  setIsSearching(isSearching: boolean) {
    this.isSearching = isSearching;
  }

  @action
  setSearchStr(str: string) {
    this.searchStr = str;
  }

  @action
  setRoomTagListObj(obj: TagListObj) {
    this.roomTagListObj = obj;
  }

  @action
  setSearchResultListObj(obj: TagListObj) {
    this.searchResultListObj = obj;
  }

  /**
   * fetches all Tags with category from the server
   * RoomTagModel : class { id, text, noteList }
   * TagKeyModel : class { key, tags:Array<RoomTagModel> }
   */
  getRoomTagListObj = flow(function* getRoomTagListObj() {
    // tagheader 수정 전 search test
    // yield this.getSearchResultListObj('1');
    this.setIsLoading(true);
    this.setRoomTagListObj(
      convertServerTagList({
        dto: yield NoteRepository.getAllTagObj(),
        isSearching: this.isSearching,
        searchStr: this.searchStr,
      }),
    );
    this.setIsLoading(false);
  });

  getSearchResultListObj = flow(function* getSearchResultListObj(str: string) {
    this.setIsSearchLoading(true);
    this.setIsSearching(true);
    this.setSearchStr(str);
    // search할 때마다 새로 데이터 받아오기
    this.setSearchResultListObj(
      convertServerTagList({
        dto: yield NoteRepository.getAllTagObj(),
        isSearching: this.isSearching,
        searchStr: this.searchStr,
      }),
    );
    this.setIsSearchLoading(false);
  });

  createNoteTag = flow(function* createNoteTag(
    tagList: Array<string>,
    noteId: string,
  ) {
    const dto = yield NoteRepository.createTag(
      convertToCreateDto({ tagList, noteId, wsId: NoteStore.roomId }),
    );
    yield PageStore.fetchNoteTagList(noteId);
    // 항상 태그 한 개만 생성할 때 기준 코드
    return { ...dto, text: tagList[0] };
  });

  /**
   * updateTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
   */
  updateNoteTag = flow(function* updateNoteTag(
    tagList: Array<UpdateTagInput>,
    noteId: string,
  ) {
    const dto = yield NoteRepository.updateTag(
      convertToUpdateDto(tagList, NoteStore.roomId),
    );
    yield PageStore.fetchNoteTagList(noteId);
    return { ...dto, text: tagList[0].text };
  });

  /**
   * deleteTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
   */
  deleteNoteTag = flow(function* deleteNoteTag(
    tagList: Array<string>,
    noteId: string,
  ) {
    const dto = yield NoteRepository.deleteTag(
      convertToDeleteDto({ tagList, noteId, wsId: NoteStore.roomId }),
    );
    // delete는 작업 완료 후 focus할 필요없어서 yield 안함
    PageStore.fetchNoteTagList(noteId);
    return dto;
  });
}

export default new TagStore();

// {
//   setIsLoading: action,
//   setIsSearchLoading: action,
//   setIsSearching: action,
//   setSearchStr: action,
//   setRoomTagListObj: action,
//   setSearchResultListObj: action,
//   getRoomTagListObj: flow,
//   getSearchResultListObj: flow,
//   createNoteTag: action,
//   updateNoteTag: action,
//   deleteNoteTag: action,
// },
// isLoading: Boolean = true;

// @observable
// tagCategory = { KOR: {}, ENG: {}, NUM: {}, ETC: {} };

// @computed
// get isNoTag(): Boolean {
//   return (
//     Object.keys(this.tagCategory.ENG).length === 0 &&
//     Object.keys(this.tagCategory.KOR).length === 0 &&
//     Object.keys(this.tagCategory.NUM).length === 0 &&
//     Object.keys(this.tagCategory.ETC).length === 0
//   );
// }

// /**
//  * fetches all Tags with category from the server
//  * RoomTagModel : class { id, text, noteList }
//  * TagKeyModel : class { key, tags:Array<RoomTagModel> }
//  */
// @action
// getTagCategory = flow(function* getTagCategory() {
//   this.isLoading = true;
//   this.tagCategory = yield NoteRepository.getAllTagObj();
//   this.isLoading = false;
// });

// @action
// createTag = flow(function* createTag(tagList) {
//   const {
//     data: { dto },
//   } = yield NoteRepository.createTag(tagList);
//   yield PageStore.fetchNoteTagList();
//   // return
// });
