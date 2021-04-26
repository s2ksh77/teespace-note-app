const test = {};
export default test;
// @flow
/**
 * 페이지 태그 관련
 */
export const convertToPageTag: Array<PageTag> = tagList => {
  // eslint-disable-next-line camelcase
  return tagList.map(({ note_id, tag_id, text }) => ({
    noteId: note_id,
    id: tag_id,
    text,
  }));
};
export const convertTagObj = dto => {
  return dto;
};

// createNoteTag
export const convertToCreateDto: Array<CreateTagDto> = ({
  tagList,
  noteId,
  wsId,
}) => {
  return tagList.map(text => ({
    WS_ID: wsId,
    note_id: noteId,
    text,
  }));
};

export const convertToUpdateDto: Array<UpdateTagDto> = (tagList, wsId) => {
  return tagList.map(({ id, text }) => ({
    WS_ID: wsId,
    tag_id: id,
    text,
  }));
};

export const convertToDeleteDto: Array<DeleteTagDto> = ({
  tagList,
  noteId,
  wsId,
}) => {
  return tagList.map(id => ({
    WS_ID: wsId,
    note_id: noteId,
    tag_id: id,
  }));
};
/**
 * tagKey의 category(KOR, ENG, NUM, ETC)를 반환한다.
 * @param {string} tagKey
 * @return category of tag
 */
const getKeyCategory: CategoryName = tagKey => {
  const charCode = tagKey.charCodeAt(0);
  if (charCode >= 12593 && charCode < 55203) return 'KOR';
  if (charCode > 64 && charCode < 123) return 'ENG';
  if (charCode >= 48 && charCode <= 57) return 'NUM';
  return 'ETC';
};
const compareFunc = (a, b) => {
  if (a.text.toUpperCase() > b.text.toUpperCase()) return 1;
  if (a.text.toUpperCase() < b.text.toUpperCase()) return -1;
  return 0;
};
const numCompare = (a, b) => a.text - b.text;

const createRoomTagInfo: Array<RoomTagInfo> = (isNum, data) => {
  const sorted = isNum ? data.sort(numCompare) : data.sort(compareFunc);
  const reduced = sorted.reduce((obj, tag) => {
    if (obj[tag.text]) {
      obj[tag.text].noteList.push(tag.note_id);
    } else {
      // eslint-disable-next-line no-param-reassign
      obj[tag.text] = {
        id: tag.tag_id,
        noteList: [tag.note_id],
      };
    }
    return obj;
  }, {});

  return Object.entries(reduced).map(([text, { id, noteList }]) => ({
    id,
    text,
    noteList,
  }));
};
/**
 *
 * @param {*} data
 * @returns
 */
const createTagKeyInfo: TagKeyInfo = data => ({
  key: data.KEY,
  tagList: createRoomTagInfo(
    getKeyCategory(data.KEY) === 'NUM',
    data.tag_indexdto.tagList,
  ),
});
const getSortedServerTagList = dto => {
  return dto.sort((a, b) => {
    if (a.KEY > b.KEY) return 1;
    if (a.KEY < b.KEY) return -1;
    return 0;
  });
};
const getTagCategory: TagCategory = keyList => {
  return keyList.reduce(
    (result, keyInfo) => {
      result[getKeyCategory(keyInfo.key)].push(keyInfo);
      return result;
    },
    { KOR: [], ENG: [], NUM: [], ETC: [] },
  );
};
/**
 * @param {*} dto
 * @return { KOR: [{key,tagList:[{id,text,noteList}]}], ENG: [], NUM: [], ETC: [] }
 */
export const convertServerTagList: TagCategory = dto => {
  const keyList = getSortedServerTagList(dto).map(createTagKeyInfo);
  return getTagCategory(keyList);
};
