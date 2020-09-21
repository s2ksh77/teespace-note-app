import { API } from 'teespace-core';

const { default: axios } = require('axios');

class NoteRepository {
  URL = 'http://222.122.67.176:8080/CMS/Note';

  WS_ID = '8050f1ba-0b42-4fe1-a3e4-c0647a47d019';

  CH_TYPE = 'CHN0003';

  USER_ID = '431ef2dd-08fd-495d-b192-db6ecd899496';

  constructor(url) {
    this.URL = url || this.URL;
  }

  setChannelId(targetchId) {
    this.chId = targetchId;
  }

  getChannelId() {
    return this.chId;
  }

  getChapterList(chId) {
    return API.Get(
      `${this.URL}/noteChapter?action=List&note_channel_id=${chId}`,
    );
  }

  getNoteInfoList(noteId) {
    return API.Get(
      `${this.URL}/noteinfo?action=List&note_id=${noteId}&note_channel_id=${this.chId}`,
    );
  }

  getNoteTagList(noteId) {
    return API.Get(
      `${
        this.URL
      }/tag?action=List&note_id=${noteId}&t=${new Date().getTime().toString()}`,
    );
  }

  // 태그 컨텐츠 관련
  // getAllTagList() {
  //   return API.Get(
  //     `${this.URL}/alltag?action=List&note_channel_id=${this.chId}`
  //   )
  // }
  getAllSortedTagList() {
    return API.Get(
      `${this.URL}/tagSort?action=List&note_channel_id=${
        this.chId
      }&t=${new Date().getTime().toString()}`,
    );
  }

  getChapterColor(chapterId) {
    const { data } = API.Get(
      `${this.URL}/notebook?action=List&note_channel_id=${this.chId}&id=${chapterId}`,
    );
    return data.color;
  }

  getChapterText(chapterId) {
    const { data } = API.Get(
      `${this.URL}/notebook?action=List&note_channel_id=${this.chId}&id=${chapterId}`,
    );
    return data.text;
  }

  createChapter(chapterTitle, chapterColor) {
    return API.Post(`${this.URL}/notebooks`, {
      dto: {
        id: '',
        note_channel_id: this.chId,
        text: chapterTitle,
        children: [],
        type: 'notebook',
        USER_ID: this.USER_ID,
        user_name: '김수현B',
        color: chapterColor,
      },
    });
  }

  createPage(pageName, chapterId) {
    return API.Post(`${this.URL}/note`, {
      dto: {
        WS_ID: '8050f1ba-0b42-4fe1-a3e4-c0647a47d019',
        CH_TYPE: 'CHN0003',
        USER_ID: '431ef2dd-08fd-495d-b192-db6ecd899496',
        note_channel_id: this.chId,
        user_name: '김수현B',
        note_title: pageName,
        is_edit: '431ef2dd-08fd-495d-b192-db6ecd899496',
        parent_notebook: chapterId,
      },
    });
  }

  editStart(noteId, chapterId) {
    return API.Post(`${this.URL}/note?action=Update`, {
      dto: {
        WS_ID: '8050f1ba-0b42-4fe1-a3e4-c0647a47d019',
        CH_TYPE: 'CHN0003',
        USER_ID: '431ef2dd-08fd-495d-b192-db6ecd899496',
        note_channel_id: this.chId,
        user_name: '김수현b',
        note_id: noteId,
        is_edit: '431ef2dd-08fd-495d-b192-db6ecd899496',
        parent_notebook: chapterId,
        TYPE: 'EDIT_START',
      },
    });
  }

  editDone(updateDto) {
    updateDto.dto.WS_ID = this.WS_ID;
    updateDto.dto.note_channel_id = this.chId;
    updateDto.dto.USER_ID = this.USER_ID;
    updateDto.dto.CH_TYPE = this.CH_TYPE;
    updateDto.dto.user_name = '김수현B';
    console.log(updateDto);
    return API.Post(`${this.URL}/note?action=Update`, updateDto);
  }

  nonEdit(noteId, chapterId) {
    return API.Post(`${this.URL}/note?action=Update`, {
      dto: {
        WS_ID: '8050f1ba-0b42-4fe1-a3e4-c0647a47d019',
        CH_TYPE: 'CHN0003',
        USER_ID: '431ef2dd-08fd-495d-b192-db6ecd899496',
        note_channel_id: this.chId,
        note_id: noteId,
        is_edit: '',
        parent_notebook: chapterId,
        TYPE: 'NONEDIT',
      },
    });
  }

  createTag(tagText, noteId) {
    return API.Post(`${this.URL}/tag`, {
      dto: {
        text: tagText,
        note_id: noteId,
      },
    });
  }

  deleteTag(tagId, noteId) {
    return API.Post(`${this.URL}/tag?action=Delete`, {
      dto: {
        tag_id: tagId,
        note_id: noteId,
      },
    });
  }

  updateTag(tagId, tagText) {
    return API.Post(`${this.URL}/tag?action=Update`, {
      dto: {
        tag_id: tagId,
        text: tagText,
      },
    });
  }
}

export default new NoteRepository();
