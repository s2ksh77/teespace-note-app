import { API } from 'teespace-core';
import ChapterModel, { convertChapterObjToModel } from '../model/ChapterModel';
import { convertPageObjToModel } from '../model/PageModel';
import NoteStore from '../store/NoteStore';
// @flow
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

const convertChapterObj = (dtoObj: ChapterInfoDTO): ChapterInfo => {
  const result: $Shape<ChapterInfo> = {};

  Object.keys(dtoObj).forEach(key => {
    if ({}.hasOwnProperty.call(dtoObj, key)) {
      const obj = {};
      obj[key] = dtoObj[key];
      Object.assign(result, convertChapterObjToModel({ ...obj }));
    }
  });
  return result;
};
const convertPageObj = (dtoObj: PageInfoDTO): PageInfo => {
  const result: $Shape<PageInfo> = {};

  Object.keys(dtoObj).forEach(key => {
    if ({}.hasOwnProperty.call(dtoObj, key)) {
      const obj = {};
      obj[key] = dtoObj[key];
      Object.assign(result, convertPageObjToModel({ ...obj }));
    }
  });
  return result;
};

class NoteRepository {
  async getChapterList(): Promise<?Array<$Shape<ChapterInfo>>> {
    try {
      const response = await API.get(
        `note-api/noteChapter?action=List&note_channel_id=${NoteStore.chId}`,
      );
      return response
        ? response.data.dto.notbookList.map(chapter =>
            convertChapterObj(chapter),
          )
        : [];
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getNoteInfoList(noteId: string): Promise<?Array<$Shape<PageInfo>>> {
    try {
      const response = await API.Get(
        `note-api/noteinfo?action=List&note_id=${noteId}&note_channel_id=${NoteStore.chId}`,
      );
      return response ? convertPageObj(response.data.dto) : [];
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  getNoteTagList(noteId: string): Promise<any> {
    return API.Get(
      `note-api/tag?action=List&note_id=${noteId}&t=${new Date()
        .getTime()
        .toString()}`,
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

  getTagNoteList({
    USER_ID,
    tagId,
    chId,
  }: {
    USER_ID: string,
    tagId: string,
    chId: string,
  }): Promise<any> {
    return API.Get(
      `note-api/tagnote?action=List&tag_id=${tagId}&USER_ID=${USER_ID}
        &note_channel_id=${this.chId}`,
    );
  }

  async getChapterChildren(chapterId: string): Promise<String> {
    try {
      return await API.Get(
        `note-api/note?action=List&note_channel_id=${this.chId}&parent_notebook=${chapterId}`,
      );
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  getChapterInfoList(chapterId: string): Promise<String> {
    return API.Get(`note-api/chaptershare?action=List&id=${chapterId}`);
  }

  getChapterColor(chapterId: string): Promise<String> {
    return API.get(`note-api/chaptershare?action=List&id=${chapterId}`);
  }
  async updateChapterColor({
    chapterId,
    targetColor,
  }: {
    chapterId: string,
    targetColor: string,
  }): Promise<any> {
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

  getChapterText(chapterId: string): Promise<String> {
    return API.get(`note-api/chaptershare?action=List&id=${chapterId}`);
  }

  async createChapter({
    chapterTitle,
    chapterColor,
  }: {
    chapterTitle: string,
    chapterColor: string,
  }): Promise<any> {
    try {
      const { data } = await API.post(`note-api/notebooks`, {
        dto: {
          id: '',
          ws_id: this.WS_ID,
          note_channel_id: this.chId,
          text: chapterTitle,
          children: [],
          type: 'notebook',
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

  async deleteChapter(chapterId: string): Promise<String> {
    try {
      const { data } = await API.delete(
        `note-api/notebook?action=Delete&id=${chapterId}&note_channel_id=${this.chId}&USER_ID=${this.USER_ID}&ws_id=${this.WS_ID}`,
      );
      return data;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async renameChapter({
    chapterId,
    chapterTitle,
    color,
  }: {
    chapterId: string,
    chapterTitle: string,
    color: string,
  }): Promise<any> {
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

  async createPage({
    pageName,
    pageContent,
    chapterId,
  }: {
    pageName: string,
    pageContent: string,
    chapterId: string,
  }): Promise<any> {
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

  async deletePage(pageList: Array<String>): Promise<Array<String>> {
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

  async renamePage({
    pageId,
    pageTitle,
    chapterId,
  }: {
    pageId: string,
    pageTitle: string,
    chapterId: string,
  }): Promise<any> {
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

  async movePage({
    pageId,
    chapterId,
  }: {
    pageId: string,
    chapterId: string,
  }): Promise<any> {
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

  async editStart({
    noteId,
    chapterId,
  }: {
    noteId: string,
    chapterId: string,
  }): Promise<any> {
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

  async editDone(updateDto: Object) {
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

  async nonEdit({
    noteId,
    chapterId,
    userName,
    userId,
  }: {
    noteId: string,
    chapterId: string,
    userName: string,
    userId: string,
  }): Promise<any> {
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
  async createTag(targetList: Array<String>): Promise<Array<String>> {
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
  async deleteTag(targetList: Array<String>): Promise<Array<String>> {
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
  async updateTag(targetList: Array<String>): Promise<Array<String>> {
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

  async storageFileDeepCopy(fileId: string): Promise<any> {
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

  async createUploadMeta(dto: Object): Promise<Object> {
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

  async uploadFileGW({
    file,
    fileName,
    fileExtension,
    onUploadProgress,
    cancelSource,
  }: {
    file: string,
    fileName: string,
    fileExtension: string,
    onUploadProgress: Func,
    cancelSource: any,
  }) {
    return await API.post(
      `/gateway-api/upload?user_id=` +
        this.USER_ID +
        '&ws_id=' +
        this.WS_ID +
        '&ch_id=' +
        this.chId +
        '&file_name=' +
        fileName +
        '&file_extension=' +
        fileExtension,
      file,
      {
        headers: {
          // pplication/x-www-form-urlencoded; charset=UTF-8
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

  async deleteFile(deleteFileId: string): Promise<string> {
    try {
      return await API.put(`note-api/noteFile?action=Delete`, {
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
            user_context_3: '',
          },
        },
      });
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  deleteAllFile(fileList: Array<String>): Promise<any> {
    let deleteFileList = [];
    if (fileList) {
      fileList.map(file => deleteFileList.push(file.file_id));
      return API.put(`Storage/StorageFile?action=MultiDelete`, {
        dto: {
          workspace_id: this.WS_ID,
          channel_id: this.chId,
          file_id: deleteFileList,
          user_id: this.USER_ID,
        },
      });
    } else {
      return Promise.resolve();
    }
  }

  createShareChapter(chapterList: Array<String>): Promise<Array<String>> {
    return API.post(`note-api/chaptershare`, {
      dto: {
        notbookList: chapterList,
      },
    });
  }
  createSharePage(pageList: Array<String>): Promise<Array<String>> {
    return API.post(`note-api/noteshare`, {
      dto: {
        noteList: pageList,
      },
    });
  }
  async getSearchList(searchKey: string): Promise<any> {
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
  async createFileMeta(targetList: Array<String>): Promise<Array<String>> {
    return await API.post(`note-api/noteFileMeta`, {
      dto: {
        fileList: targetList,
      },
    });
  }
}

export default new NoteRepository();
