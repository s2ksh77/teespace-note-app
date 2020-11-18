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

  getChapterList(chId) {
    return API.Get(
      `Note/noteChapter?action=List&note_channel_id=${chId}`,
    );
  }

  getNoteInfoList(noteId) {
    return API.Get(
      `Note/noteinfo?action=List&note_id=${noteId}&note_channel_id=${this.chId}`,
    );
  }

  getNoteTagList(noteId) {
    return API.Get(
      `${this.URL
      }/tag?action=List&note_id=${noteId}&t=${new Date().getTime().toString()}`,
    );
  }

  // 태그 컨텐츠 관련
  // getAllTagList() {
  //   return API.Get(
  //     `Note/alltag?action=List&note_channel_id=${this.chId}`
  //   )
  // }
  async getAllSortedTagList() {
    return await API.Get(
      `Note/tagSort?action=List&note_channel_id=${this.chId
      }&t=${new Date().getTime().toString()}`,
    );
  }

  getTagNoteList(tagId) {
    return API.Get(
      `Note/tagnote?action=List&tag_id=${tagId}&USER_ID=${this.USER_ID}
      &note_channel_id=${this.chId}`,
    );
  }

  getChapterChildren(chapterId) {
    return API.Get(
      `Note/note?action=List&note_channel_id=${this.chId}&parent_notebook=${chapterId}`,
    );
  }

  getChapterInfoList(chapterId) {
    return API.Get(
      `Note/chaptershare?action=List&id=${chapterId}`,
    );
  }

  getChapterColor(chapterId) {
    const { data } = API.Get(
      `Note/chaptershare?action=List&id=${chapterId}`,
    );
    return data.color;
  }

  getChapterText(chapterId) {
    const { data } = API.Get(
      `Note/chaptershare?action=List&id=${chapterId}`,
    );
    return data.text;
  }

  createChapter(chapterTitle, chapterColor) {
    return API.Post(`Note/notebooks`, {
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
    });
  }

  deleteChapter(chapterId) {
    return API.Delete(
      `Note/notebook?action=Delete&id=${chapterId}&note_channel_id=${this.chId}&USER_ID=${this.USER_ID}`,
    );
  }

  renameChapter(chapterId, chapterTitle, color) {
    return API.Put(`Note/notebooks?action=Update`, {
      dto: {
        USER_ID: this.USER_ID,
        color: color,
        id: chapterId,
        note_channel_id: this.chId,
        parent_notebook: '',
        text: chapterTitle,
        user_name: this.USER_NAME,
      }
    });
  }

  createPage(pageName, chapterId) {
    return API.Post(`Note/note`, {
      dto: {
        WS_ID: this.WS_ID,
        CH_TYPE: 'CHN0003',
        USER_ID: this.USER_ID,
        note_channel_id: this.chId,
        user_name: this.USER_NAME,
        note_title: pageName,
        is_edit: this.USER_ID,
        parent_notebook: chapterId,
      },
    });
  }

  deletePage(pageList) {
    pageList.forEach((page) => {
      page.USER_ID = this.USER_ID;
      page.WS_ID = this.WS_ID;
      page.note_channel_id = this.chId;
      page.user_name = this.USER_NAME;
    });
    return API.Post(`Note/note?action=Delete`, {
      dto: {
        noteList: pageList,
      }
    });
  }

  renamePage(pageId, pageTitle, chapterId) {
    return API.Put(`Note/note?action=Update`, {
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
  }

  movePage(pageId, chapterId) {
    return API.Put(`Note/note?action=Update`, {
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

  editStart(noteId, chapterId) {
    return API.Post(`Note/note?action=Update`, {
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
  }

  editDone(updateDto) {
    updateDto.dto.WS_ID = this.WS_ID;
    updateDto.dto.note_channel_id = this.chId;
    updateDto.dto.USER_ID = this.USER_ID;
    updateDto.dto.CH_TYPE = this.CH_TYPE;
    updateDto.dto.user_name = this.USER_NAME;
    console.log(updateDto);
    return API.Post(`Note/note?action=Update`, updateDto);
  }

  nonEdit(noteId, chapterId, userName) {
    return API.Post(`Note/note?action=Update`, {
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
  }

  createTag(tagText, noteId) {
    return API.Post(`Note/tag`, {
      dto: {
        text: tagText,
        note_id: noteId,
      },
    });
  }

  deleteTag(tagId, noteId) {
    return API.Post(`Note/tag?action=Delete`, {
      dto: {
        tag_id: tagId,
        note_id: noteId,
      },
    });
  }

  updateTag(tagId, tagText) {
    return API.Post(`Note/tag?action=Update`, {
      dto: {
        tag_id: tagId,
        text: tagText,
      },
    });
  }

  deleteFile(deleteFileId) {
    return API.put(`Note/noteFile?action=Delete`, {
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
    return API.post(`Note/chaptershare`, {
      dto: {
        notbookList: chapterList
      }
    });
  }
  createSharePage(pageList) {
    return API.post(`Note/noteshare`, {
      dto: {
        noteList: pageList
      }
    });
  }
}

export default new NoteRepository();
