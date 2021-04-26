import { observable, action, set, computed } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class TagModel {
  @observable
  id: string;

  @observable
  text: string;

  @observable
  noteId: string;

  constructor(data: Object) {
    this.setValues(data);
  }

  @action
  setValues(data: Object) {
    set(this, data);
  }

  @action
  setid(data: string) {
    this.id = data;
  }

  @action
  setTagText(data: string) {
    this.text = data;
  }

  @action
  setNoteId(data: string) {
    this.noteId = data;
  }
}

export default TagModel;

/**
 * @param ServerObj to PageTag mapping
 * @returns TagModel
 */
// export const convertTagObjToModel = (
//   obj: $Shape<TagInfo>,
// ): ?$Shape<TagInfo> => {
//   if (obj.note_id) {
//     return {
//       noteId: obj.note_id,
//     };
//   }
//   if (obj.tag_id) {
//     return {
//       id: obj.tag_id,
//     };
//   }
//   if (obj.text) {
//     return {
//       name: obj.text,
//     };
//   }
//   return '';
// };

/**
 * @param TagModel to ServerObj mapping
 * @returns ServerObj
 */
// export const convertTagModelToObj = (
//   obj: $Shape<TagInfo>,
// ): ?$Shape<TagInfoDto> => {
//   if (obj.noteId) {
//     return {
//       note_id: obj.noteId,
//     };
//   }
//   if (obj.id) {
//     return {
//       tag_id: obj.id,
//     };
//   }
//   if (obj.name) {
//     return {
//       text: obj.name,
//     };
//   }
//   return '';
// };
