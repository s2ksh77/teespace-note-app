import { API } from 'teespace-core';

const { default: axios } = require('axios');

class NoteRepository {
  URL = 'http://222.122.67.176:8080/CMS/Note';

  FILE_URL = process.env.REACT_APP_SERVICE_URL;

  WS_ID = '';
  CH_TYPE = 'CHN0003';
  USER_ID = '';
  chId = '';
  USER_NAME = '';

  // WS_ID = 'e4920305-cc0b-45ea-85ba-79e0b8514491';

  // CH_TYPE = 'CHN0003';

  // USER_ID = 'd9f5eda3-6cc1-4bed-b727-bdf43bbae2b7';

  constructor(url) {
    this.URL = url || process.env.REACT_APP_SERVICE_URL + '/Note';
  }

  setWsId(targetWsId) {
    this.WS_ID = targetWsId;
  }

  setChannelId(targetchId) {
    this.chId = targetchId;
  }

  setUserId(targetUserId) {
    this.USER_ID = targetUserId;
  }

  setUserName(targetUserName) {
    this.USER_NAME = targetUserName;
  }

  getChannelId() {
    return this.chId;
  }

  async getChapterList(chId) {
    try {
      return await API.get(
        `note-api/noteChapter?action=List&note_channel_id=${chId}`,
      );
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getNoteInfoList(noteId) {
    try {
      return await API.Get(
        `note-api/noteinfo?action=List&note_id=${noteId}&note_channel_id=${this.chId}`,
      );
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  getNoteTagList(noteId) {
    return API.Get(
      `note-api/tag?action=List&note_id=${noteId}&t=${new Date().getTime().toString()}`,
    );
  }

  // 태그 컨텐츠 관련
  // getAllTagList() {
  //   return API.Get(
  //     `note-api/alltag?action=List&note_channel_id=${this.chId}`
  //   )
  // }
  async getAllSortedTagList() {
    return await API.Get(
      `note-api/tagSort?action=List&note_channel_id=${this.chId
      }&t=${new Date().getTime().toString()}`,
    );
  }

  getTagNoteList(tagId) {
    return API.Get(
      `note-api/tagnote?action=List&tag_id=${tagId}&USER_ID=${this.USER_ID}
      &note_channel_id=${this.chId}`,
    );
  }

  async getChapterChildren(chapterId) {
    try {
      return await API.Get(
        `note-api/note?action=List&note_channel_id=${this.chId}&parent_notebook=${chapterId}`,
      );
    } catch (e) {
      throw Error(JSON.stringify(e));
    }

  }

  getChapterInfoList(chapterId) {
    return API.Get(
      `note-api/chaptershare?action=List&id=${chapterId}`,
    );
  }

  getChapterColor(chapterId) {
    const { data } = API.Get(
      `note-api/chaptershare?action=List&id=${chapterId}`,
    );
    return data.color;
  }

  getChapterText(chapterId) {
    const { data } = API.Get(
      `note-api/chaptershare?action=List&id=${chapterId}`,
    );
    return data.text;
  }

  async createChapter(chapterTitle, chapterColor) {
    try {
      const { data } = await API.post(`note-api/notebooks`, {
        dto: {
          id: '',
          note_channel_id: this.chId,
          text: chapterTitle,
          children: [],
          type: 'notebook',
          USER_ID: this.USER_ID,
          user_name: this.USER_NAME,
          color: chapterColor,
        },
      })
      return data;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async deleteChapter(chapterId) {
    try {
      const { data } = await API.delete(`note-api/notebook?action=Delete&id=${chapterId}&note_channel_id=${this.chId}&USER_ID=${this.USER_ID}`);
      return data;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }

  }

  async renameChapter(chapterId, chapterTitle, color) {
    try {
      const { data } = await API.put(`note-api/notebooks?action=Update`, {
        dto: {
          USER_ID: this.USER_ID,
          color: color,
          id: chapterId,
          note_channel_id: this.chId,
          parent_notebook: '',
          text: chapterTitle,
          user_name: this.USER_NAME,
        }
      })
      return data;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async createPage(pageName, pageContent, chapterId) {
    try {
      return API.Post(`note-api/note`, {
        dto: {
          WS_ID: this.WS_ID,
          CH_TYPE: 'CHN0003',
          USER_ID: this.USER_ID,
          note_channel_id: this.chId,
          user_name: this.USER_NAME,
          note_title: pageName,
          note_content: pageContent ? pageContent : '',
          is_edit: this.USER_ID,
          parent_notebook: chapterId,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async deletePage(pageList) {
    pageList.forEach((page) => {
      page.USER_ID = this.USER_ID;
      page.WS_ID = this.WS_ID;
      page.note_channel_id = this.chId;
      page.user_name = this.USER_NAME;
    });
    try {
      return await API.Post(`note-api/note?action=Delete`, {
        dto: {
          noteList: pageList,
        }
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async renamePage(pageId, pageTitle, chapterId) {
    try {
      return await API.Put(`note-api/note?action=Update`, {
        dto: {
          CH_TYPE: 'CHN0003',
          TYPE: 'RENAME',
          USER_ID: this.USER_ID,
          WS_ID: this.WS_ID,
          note_channel_id: this.chId,
          note_id: pageId,
          note_title: pageTitle,
          parent_notebook: chapterId,
        }
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  movePage(pageId, chapterId) {
    return API.Put(`note-api/note?action=Update`, {
      dto: {
        WS_ID: this.WS_ID,
        CH_TYPE: 'CHN0003',
        note_id: pageId,
        parent_notebook: chapterId,
        user_name: this.USER_NAME,
        USER_ID: this.USER_ID,
        TYPE: 'MOVE',
      }
    })
  }

  async editStart(noteId, chapterId) {
    try {
      return await API.post(`note-api/note?action=Update`, {
        dto: {
          WS_ID: this.WS_ID,
          CH_TYPE: 'CHN0003',
          USER_ID: this.USER_ID,
          note_channel_id: this.chId,
          user_name: this.USER_NAME,
          note_id: noteId,
          is_edit: this.USER_ID,
          parent_notebook: chapterId,
          TYPE: 'EDIT_START',
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async editDone(updateDto) {
    updateDto.dto.WS_ID = this.WS_ID;
    updateDto.dto.note_channel_id = this.chId;
    updateDto.dto.USER_ID = this.USER_ID;
    updateDto.dto.CH_TYPE = this.CH_TYPE;
    updateDto.dto.user_name = this.USER_NAME;
    try {
      return await API.post(`note-api/note?action=Update`, updateDto);
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async nonEdit(noteId, chapterId, userName) {
    try {
      return await API.post(`note-api/note?action=Update`, {
        dto: {
          WS_ID: this.WS_ID,
          CH_TYPE: 'CHN0003',
          USER_ID: this.USER_ID,
          note_channel_id: this.chId,
          note_id: noteId,
          is_edit: '',
          parent_notebook: chapterId,
          TYPE: 'NONEDIT',
          user_name: userName,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async createTag(tagText, noteId) {
    try {
      return await API.post(`note-api/tag`, {
        dto: {
          text: tagText,
          note_id: noteId,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async deleteTag(tagId, noteId) {
    try {
      return await API.post(`note-api/tag?action=Delete`, {
        dto: {
          tag_id: tagId,
          note_id: noteId,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async updateTag(tagId, tagText) {
    try {
      return await API.post(`note-api/tag?action=Update`, {
        dto: {
          tag_id: tagId,
          text: tagText,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  deleteFile(deleteFileId) {
    return API.put(`note-api/noteFile?action=Delete`, {
      dto: {
        workspace_id: this.WS_ID,
        channel_id: this.chId,
        storageFileInfo: {
          user_id: '',
          file_last_update_user_id: '',
          file_id: deleteFileId,
          file_name: '',
          file_extension: '',
          file_created_at: '',
          file_updated_at: '',
          user_context_1: '',
          user_context_2: '',
          user_context_3: ''
        }
      }
    })
  }

  deleteAllFile(fileList) {
    let deleteFileList = [];
    if (fileList) {
      fileList.map(file => deleteFileList.push(file.file_id));
      return API.put(`${this.FILE_URL}Storage/StorageFile?action=MultiDelete`, {
        dto: {
          workspace_id: this.WS_ID,
          channel_id: this.chId,
          file_id: deleteFileList,
          user_id: this.USER_ID
        }
      })
    } else {
      return Promise.resolve();
    }
  }

  createShareChapter(chapterList) {
    return API.post(`note-api/chaptershare`, {
      dto: {
        notbookList: chapterList
      }
    });
  }
  createSharePage(pageList) {
    return API.post(`note-api/noteshare`, {
      dto: {
        noteList: pageList
      }
    });
  }
}

export default new NoteRepository();
