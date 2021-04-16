// @flow
declare type TagInfo = {
  note_id: string,
  tag_id: string,
  text: string,
};

declare type TagCategory = {
  KOR: Array<TagKeyInfo>,
  ENG: Array<TagKeyInfo>,
  NUM: Array<TagKeyInfo>,
  ETC: Array<TagKeyInfo>,
};
declare type TagKeyInfo = {
  key: String,
  tagList: Array<RoomTagInfo>,
};

declare type RoomTagInfo = {
  tagId: String,
  text: String,
  noteList: Array<string>,
};
