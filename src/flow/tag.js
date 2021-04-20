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
  key: string,
  tagList: Array<RoomTagInfo>,
};

declare type RoomTagInfo = {
  tagId: string,
  text: string,
  noteList: Array<string>,
};
