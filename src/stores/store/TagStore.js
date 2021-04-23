import { action, computed, flow, observable } from 'mobx';
import NoteRepository from '../repository/NoteRepository';

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
    // 임시~~~~~~~~~~~ 일단 넣어놓음
    async createNoteTag(createTagList, noteId) {
      const createTagArr = createTagList.map(tagText => ({
        text: tagText,
        note_id: noteId,
        WS_ID: NoteRepository.WS_ID,
      }));
      const {
        data: { dto },
      } = await NoteRepository.createTag(createTagArr);
      await this.fetchNoteTagList(noteId);
      // 항상 태그 한 개만 생성할 때 기준 코드
      return { ...dto, text: createTagArr[0].text };
    },

    /**
     * updateTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
     */
    async updateNoteTag(updateTagList, noteId) {
      const updateTagArr = updateTagList.map(tag => ({
        tag_id: tag.tag_id,
        text: tag.text,
        WS_ID: NoteRepository.WS_ID,
      }));
      const {
        data: { dto },
      } = await NoteRepository.updateTag(updateTagArr);
      await this.fetchNoteTagList(noteId);
      return { ...dto, text: updateTagList[0].text };
    },

    /**
     * deleteTag 로직 바꾸면서 mobile, p-task용으로 원래 로직은 남겨둠
     */
    async deleteNoteTag(deleteTagList, noteId) {
      const deleteTagArray = deleteTagList.map(tag => ({
        tag_id: tag,
        note_id: noteId,
        WS_ID: NoteRepository.WS_ID,
      }));
      const {
        data: { dto },
      } = await NoteRepository.deleteTag(deleteTagArray);
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
