import { action, computed, flow, observable } from 'mobx';
import NoteRepository from '../repository/NoteRepository';
import {convertToCreateDto, convertToUpdateDto, convertToDeleteDto} from '../../utils/convert'
// @flow
const TagStore = observable(
  {
    isLoading: true,
    tagCategory: { KOR: {}, ENG: {}, NUM: {}, ETC: {} },
    isNoTag: true,
    /**
     * fetches all Tags with category from the server
     * RoomTagModel : class { tagId, text, noteList }
     * TagKeyModel : class { key, tags:Array<RoomTagModel> }
     */
    async getTagCategory() {
      this.isLoading = true;
      this.tagCategory = await NoteRepository.getAllTagObj();
      this.isLoading = false;
    },
     
    async createNoteTag(tagList:Array<string>, noteId:string) {
      const {
        data: { dto },
      } = await NoteRepository.createTag(
        convertToCreateDto({tagList,noteId,wsId:NoteRepository.WS_ID})
      );
      await this.fetchNoteTagList(noteId);
      // 항상 태그 한 개만 생성할 때 기준 코드
      return { ...dto, text: createTagArr[0].text };
    },

    /**
     * updateTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
     */
    async updateNoteTag(tagList:Array<UpdateTagInput>, noteId:string) {
      const {
        data: { dto },
      } = await NoteRepository.updateTag(
        convertToUpdateDto(tagList, NoteRepository.WS_ID)
      );
      await this.fetchNoteTagList(noteId);
      return { ...dto, text: updateTagList[0].text };
    },

    /**
     * deleteTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
     */
    async deleteNoteTag(tagList:Array<string>, noteId:string) {
      const {
        data: { dto },
      } = await NoteRepository.deleteTag(
        convertToDeleteDto({tagList, noteId, wsID})
      );
      this.fetchNoteTagList(noteId);
      return dto;
    },
  },
  {
    createNoteTag: action,
    updateNoteTag: action,
    deleteNoteTag: action,
  },
);

export default TagStore;

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
//  * RoomTagModel : class { tagId, text, noteList }
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
