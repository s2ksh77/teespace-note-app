// @flow
declare type PageTag = {
  noteId: string,
  id: string,
  text: string,
};

declare type CreateTagDto = {
  WS_ID: string,
  note_id: string,
  text: string,
};

declare type UpdateTagInput = {
  id: string,
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

declare type TagListDto = Array<KeyTagListDto>;

declare type KeyTagListDto = {
  KEY: String,
  tag_indexdto: {
    tagList: Array<TagDtoItem>,
  },
};

declare type TagDtoItem = {
  note_id: String,
  tag_id: String,
  text: String,
};

declare type TagListObj = {
  KOR?: Array<KeyTagList>,
  ENG?: Array<KeyTagList>,
  NUM?: Array<KeyTagList>,
  ETC?: Array<KeyTagList>,
};
declare type KeyTagList = {
  key: string,
  tagList: Array<RoomTagItem>,
};

declare type RoomTagItem = {
  id: string,
  text: string,
  noteList: Array<string>,
};
