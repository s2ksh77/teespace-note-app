import { API } from 'teespace-core';
import { CHAPTER_TYPE } from '../GlobalVariable';
import NoteStore from './noteStore';
import PageStore from './pageStore';

const { default: axios } = require('axios');

class NoteRepository {
  URL = 'http://222.122.67.176:8080/CMS/Note';

  FILE_URL = process.env.REACT_APP_DEV_SERVICE_DOMAIN;

  WS_ID = '';
  CH_TYPE = 'CHN0003';
  USER_ID = '';
  chId = '';
  USER_NAME = '';
  USER_EMAIL = '';

  // WS_ID = 'e4920305-cc0b-45ea-85ba-79e0b8514491';

  // CH_TYPE = 'CHN0003';

  // USER_ID = 'd9f5eda3-6cc1-4bed-b727-bdf43bbae2b7';

  constructor(url) {
    this.URL = url || process.env.REACT_APP_DEV_SERVICE_DOMAIN;
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

  setUserEmail(targetUserEmail) {
    this.USER_EMAIL = targetUserEmail;
  }

  getChannelId() {
    return this.chId;
  }

  async getChapterList(chId) {
    try {
      return await API.get(`note-api/noteChapter?action=List&note_channel_id=${chId}`);
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
      `note-api/tagSort?action=List&note_channel_id=${
        this.chId
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
    return API.Get(`note-api/chaptershare?action=List&id=${chapterId}`);
  }

  getChapterColor(chapterId) {
    return API.get(`note-api/chaptershare?action=List&id=${chapterId}`);
  }
  async updateChapterColor(chapterId, targetColor) {
    try {
      const { data } = await API.put(`note-api/notebooks?action=Update`, {
        dto: {
          id: chapterId,
          ws_id: this.WS_ID,
          color: targetColor,
        },
      });
      return data;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  getChapterText(chapterId) {
    return API.get(`note-api/chaptershare?action=List&id=${chapterId}`);
  }

  async createChapter(chapterTitle, chapterColor) {
    try {
      const { data } = await API.post(
        `note-api/langauge/${NoteStore.i18nLanguage}/notebooks`,
        {
          dto: {
            id: '',
            ws_id: this.WS_ID,
            note_channel_id: this.chId,
            text: chapterTitle,
            children: [],
            type: CHAPTER_TYPE.NOTEBOOK,
            USER_ID: this.USER_ID,
            user_name: this.USER_NAME,
            color: chapterColor,
          },
        },
      );
      return data;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async createRestoreChapter(chapterTitle, chapterColor) {
    try {
      const { data } = await API.post(`note-api/children/${'none'}/notebooks`, {
        dto: {
          id: '',
          ws_id: this.WS_ID,
          note_channel_id: this.chId,
          text: chapterTitle,
          children: [],
          type: CHAPTER_TYPE.NOTEBOOK,
          USER_ID: this.USER_ID,
          user_name: this.USER_NAME,
          color: chapterColor,
        },
      });
      return data;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async deleteChapter(chapterList) {
    chapterList.forEach(chapter => {
      chapter.USER_ID = this.USER_ID;
      chapter.ws_id = this.WS_ID;
      chapter.note_channel_id = this.chId;
    });
    try {
      const { data } = await API.post(`note-api/notebook?action=Delete`, {
        dto: {
          notbookList: chapterList,
        },
      });
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
          ws_id: this.WS_ID,
          note_channel_id: this.chId,
          parent_notebook: '',
          text: chapterTitle,
          user_name: this.USER_NAME,
        },
      });
      return data;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async createPage(pageName, pageContent, chapterId) {
    try {
      const today = new Date();
      return API.Post(`note-api/note`, {
        dto: {
          WS_ID: this.WS_ID,
          CH_TYPE: 'CHN0003',
          modified_date: `${today.getFullYear()}.${
            today.getMonth() + 1
          }.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`,
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
    pageList.forEach(page => {
      page.USER_ID = this.USER_ID;
      page.WS_ID = this.WS_ID;
      page.note_channel_id = this.chId;
      page.user_name = this.USER_NAME;
    });
    try {
      return await API.Post(`note-api/note?action=Delete`, {
        dto: {
          noteList: pageList,
        },
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
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async movePage(pageId, chapterId) {
    try {
      return await API.Put(`note-api/note?action=Update`, {
        dto: {
          WS_ID: this.WS_ID,
          CH_TYPE: 'CHN0003',
          note_id: pageId,
          parent_notebook: chapterId,
          user_name: this.USER_NAME,
          USER_ID: this.USER_ID,
          TYPE: 'MOVE',
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
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
    const today = new Date();
    updateDto.dto.WS_ID = this.WS_ID;
    updateDto.dto.note_channel_id = this.chId;
    updateDto.dto.USER_ID = this.USER_ID;
    updateDto.dto.CH_TYPE = this.CH_TYPE;
    updateDto.dto.user_name = this.USER_NAME;
    updateDto.dto.modified_date = `${today.getFullYear()}.${
      today.getMonth() + 1
    }.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
    try {
      return await API.post(`note-api/note?action=Update`, updateDto);
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async nonEdit(noteId, chapterId) {
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
          user_name: this.USER_NAME,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
  async createTag(targetList) {
    try {
      return await API.post(`note-api/tag`, {
        dto: {
          tagList: targetList,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
  async deleteTag(targetList) {
    try {
      return await API.post(`note-api/tag?action=Delete`, {
        dto: {
          tagList: targetList,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
  async updateTag(targetList) {
    try {
      return await API.post(`note-api/tag?action=Update`, {
        dto: {
          tagList: targetList,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async storageFileDeepCopy(fileId) {
    const targetSRC = `Storage/StorageFile?action=Copy&Type=Deep`;
    try {
      return await API.put(targetSRC, {
        dto: {
          workspace_id: this.WS_ID,
          channel_id: this.chId,
          storageFileInfo: {
            user_id: this.USER_ID,
            file_id: fileId,
          },
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async createUploadMeta(dto) {
    try {
      return await API.post('note-api/noteFile', dto);
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
  async createUploadStorage(fileId, file, onUploadProgress) {
    try {
      return await API.post(
        `Storage/StorageFile?action=Create&fileID=` +
          fileId +
          '&workspaceID=' +
          this.WS_ID +
          '&channelID=' +
          this.chId +
          '&userID=' +
          this.USER_ID,
        file,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
          xhrFields: {
            withCredentials: true,
          },
          onUploadProgress,
        },
      );
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  /**
   *
   * @param {*} file
   * @param {*} fileName
   * @param {*} fileExtension
   * @param {*} onUploadProgress
   * @param {*} cancelSource
   */

  async uploadFileGW(
    file,
    fileName,
    fileExtension,
    location,
    onUploadProgress,
    cancelSource,
  ) {
    const uploadFile = new File([file], `${fileName}.${fileExtension}`);

    return await API.post(
      `/gateway-api/upload?channel=` +
        this.chId +
        '&name=' +
        fileName +
        '&ext=' +
        fileExtension +
        '&location=' +
        location +
        '&dir=' +
        `${PageStore.pageInfo.id}`,
      uploadFile,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
        xhrFields: {
          withCredentials: true,
        },
        onUploadProgress,
        cancelToken: cancelSource.token,
      },
    );
  }

  async deleteFile(deleteFileId) {
    try {
      return await API.post(`note-api/noteFile?action=Delete`, {
        dto: {
          type: 'hard',
          file: [
            {
              channel: this.chId,
              file_parent_id: this.chId,
              file_id: deleteFileId,
              is_folder: 'N',
            },
          ],
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  deleteAllFile(fileList) {
    let deleteFileList = [];
    if (fileList) {
      fileList.map(file => {
        deleteFileList.push({
          channel: this.chId,
          file_parent_id: this.chId,
          file_id: file.file_id,
          is_folder: 'N',
        });
      });
      return API.post(`drive-api/files?action=Delete`, {
        dto: {
          type: 'hard',
          file: deleteFileList,
        },
      });
    } else {
      return Promise.resolve();
    }
  }

  createShareChapter(chapterList) {
    return API.post(`note-api/chaptershare`, {
      dto: {
        notbookList: chapterList,
      },
    });
  }
  createSharePage(pageList) {
    return API.post(`note-api/noteshare`, {
      dto: {
        noteList: pageList,
      },
    });
  }
  async getSearchList(searchKey) {
    try {
      return await API.post(`note-api/noteSearch?action=List`, {
        dto: {
          note_channel_id: this.chId,
          text: searchKey,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
  async createFileMeta(targetList) {
    return await API.post(`note-api/noteFileMeta`, {
      dto: {
        fileList: targetList,
      },
    });
  }

  async throwPage(pageList) {
    // pageList -> pageId 리스트
    pageList.forEach(page => {
      page.USER_ID = this.USER_ID;
      page.WS_ID = this.WS_ID;
      page.note_channel_id = this.chId;
      page.parent_notebook = null;
    });
    try {
      return await API.post(`note-api/noteRecycleBin?action=Update`, {
        dto: {
          noteList: pageList,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async restorePage(pageList) {
    // pageList -> pageId 리스트, chapterId 리스트
    // [{note_id: asdf, parent_notebook : asdf} ... ]
    pageList.forEach(page => {
      page.note_channel_id = this.chId;
      page.USER_ID = this.USER_ID;
      page.WS_ID = this.WS_ID;
    });
    try {
      return await API.post(`note-api/noteRecycleBin?action=Update`, {
        dto: {
          noteList: pageList,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getStorageVolume() {
    try {
      return await API.get(`/Storage/StorageVolumeDomain`);
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getDuflicateFile(fileName, fileExt) {
    let query = `/drive-api/files/${PageStore.pageInfo.id}?`;
    query += `type=0`;
    query += `&name=${fileName}`;
    if (fileExt) query += `&ext=${fileExt}`;
    try {
      return await API.get(query);
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
  async getRecycleBinAllFile() {
    try {
      return await API.get(
        `note-api/noteRecycleBinFile?action=List&note_channel_id=${this.chId}`,
      );
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async bookmarkPage(pageId) {
    try {
      return await API.post(`note-api/bookmark`, {
        dto: {
          note_id: pageId,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async unbookmarkPage(pageId) {
    try {
      return await API.post(`note-api/bookmark?action=Delete`, {
        dto: {
          note_id: pageId,
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
}

export default new NoteRepository();
