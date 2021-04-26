// @flow
declare type TagInfo = {
  noteId: string,
  tagId: string,
  text: string,
};

declare type CreateTagDto = {
  WS_ID: string,
  note_id: string,
  text: string,
};

declare type UpdateTagInput = {
  tagId: string,
  text: string,
};

declare type UpdateTagDto = {
  WS_ID: string,
  tag_id: string,
  text: string,
};

declare type DeleteTagDto = {
  WS_ID: string,
  tag_id: string,
  note_id: string,
};

declare type CategoryName = 'KOR' | 'ENG' | 'NUM' | 'ETC';

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
  id: string,
  text: string,
  noteList: Array<string>,
};
