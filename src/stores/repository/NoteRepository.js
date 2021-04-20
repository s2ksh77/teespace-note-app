import { API } from 'teespace-core';
import ChapterModel, {
  convertChapterObjToModel as chapterConverter,
} from '../model/ChapterModel';
import { convertPageObjToModel as pageConverter } from '../model/PageModel';
import NoteStore from '../store/NoteStore';
import { convertServerTagList } from './convert';
// @flow
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

const convertChapterObj = (dtoObj: ChapterInfoDTO): ChapterInfo => {
  const result: $Shape<ChapterInfo> = {};

  Object.keys(dtoObj).forEach(key => {
    if ({}.hasOwnProperty.call(dtoObj, key)) {
      const obj = {};
      obj[key] = dtoObj[key];
      Object.assign(result, chapterConverter({ ...obj }));
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
      Object.assign(result, pageConverter({ ...obj }));
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

  async fetchNoteTagList(noteId: string): Promise<any> {
    const response = await API.Get(
      `note-api/tag?action=List&note_id=${noteId}&t=${new Date()
        .getTime()
        .toString()}`,
    );
    return response ? convertTagObj(response.data.dto.tagList) : [];
  }

  // 태그 컨텐츠 관련
  // getAllTagList() {
  //   return API.Get(
  //     `note-api/alltag?action=List&note_channel_id=${this.chId}`
  //   )
  // }
  async getAllTagObj() {
    const response = await API.Get(
      `note-api/tagSort?action=List&note_channel_id=${
        NoteStore.chId
      }&t=${new Date().getTime().toString()}`,
    );

    return response?.data?.dto?.tag_index_list_dto
      ? convertServerTagList(response.data.dto.tag_index_list_dto)
      : {};
  }

  async fetchTagNoteList({
    USER_ID,
    tagId,
    chId,
  }: {
    USER_ID: string,
    tagId: string,
    chId: string,
  }): Promise<any> {
    const response = await API.Get(
      `note-api/tagnote?action=List&tag_id=${tagId}&USER_ID=${USER_ID}
        &note_channel_id=${this.chId}`,
    );
    return response ? convertPageObj(response.data.dto.noteList) : [];
  }

  async getChapterChildren(chapterId: string): Promise<String> {
    try {
      const response = await API.Get(
        `note-api/note?action=List&note_channel_id=${this.chId}&parent_notebook=${chapterId}`,
      );
      return response ? convertChapterObj(response.data.dto) : [];
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getChapterInfoList(chapterId: string): Promise<String> {
    const response = await API.Get(
      `note-api/chaptershare?action=List&id=${chapterId}`,
    );
    return response ? convertChapterObj(response.data.dto) : [];
  }

  async getChapterColor(chapterId: string): Promise<String> {
    const response = await API.get(
      `note-api/chaptershare?action=List&id=${chapterId}`,
    );
    return response ? convertChapterObj(response.data.dto) : [];
  }

  async updateChapterColor({
    chapterId,
    targetColor,
  }: {
    chapterId: string,
    targetColor: string,
  }): Promise<any> {
    try {
      const response = await API.put(`note-api/notebooks?action=Update`, {
        dto: {
          id: chapterId,
          ws_id: this.WS_ID,
          color: targetColor,
        },
      });
      return response ? convertChapterObj(response.data.dto) : [];
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  getChapterText(chapterId: string): Promise<String> {
    const response = API.get(
      `note-api/chaptershare?action=List&id=${chapterId}`,
    );
    return response;
  }

  async createChapter({
    chapterTitle,
    chapterColor,
  }: {
    chapterTitle: string,
    chapterColor: string,
  }): Promise<any> {
    try {
      const response = await API.post(`note-api/notebooks`, {
        dto: {
          id: '',
          ws_id: NoteStore.roomId,
          note_channel_id: NoteStore.chId,
          text: chapterTitle,
          children: [],
          type: 'notebook',
          USER_ID: NoteStore.userId,
          user_name: NoteStore.userName,
          color: chapterColor,
        },
      });
      return response ? convertChapterObj(response.data.dto) : [];
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async deleteChapter(chapterId: string): Promise<String> {
    try {
      const response = await API.delete(
        `note-api/notebook?action=Delete&id=${chapterId}&note_channel_id=${this.chId}&USER_ID=${this.USER_ID}&ws_id=${this.WS_ID}`,
      );
      return response ? convertChapterObj(response.data.dto) : [];
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
      const response = await API.put(`note-api/notebooks?action=Update`, {
        dto: {
          USER_ID: this.USER_ID,
          color,
          id: chapterId,
          ws_id: this.WS_ID,
          note_channel_id: this.chId,
          parent_notebook: '',
          text: chapterTitle,
          user_name: this.USER_NAME,
        },
      });
      return response ? convertChapterObj(response.data.dto) : [];
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
      const response = await API.Post(`note-api/note`, {
        dto: {
          WS_ID: NoteStore.roomId,
          CH_TYPE: 'CHN0003',
          modified_date: `${today.getFullYear()}.${
            today.getMonth() + 1
          }.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`,
          USER_ID: NoteStore.userId,
          note_channel_id: NoteStore.chId,
          user_name: NoteStore.userName,
          note_title: pageName,
          note_content: pageContent || '',
          is_edit: NoteStore.userId,
          parent_notebook: chapterId,
        },
      });
      return response ? convertPageObj(response.data.dto) : '';
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
      const response = await API.Post(`note-api/note?action=Delete`, {
        dto: {
          noteList: pageList,
        },
      });
      return response ? convertPageObj(response.data.dto) : '';
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
      const response = await API.Put(`note-api/note?action=Update`, {
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
      return response ? convertPageObj(response.data.dto) : '';
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
      const response = await API.Put(`note-api/note?action=Update`, {
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
      return response ? convertPageObj(response.data.dto) : '';
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
      const response = await API.post(`note-api/note?action=Update`, {
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
      return response ? convertPageObj(response.data.dto) : '';
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
      const response = await API.post(`note-api/note?action=Update`, updateDto);
      return response ? convertPageObj(response.data.dto) : '';
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
      const response = await API.post(`note-api/note?action=Update`, {
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
      return response ? convertPageObj(response.data.dto) : '';
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async createTag(targetList: Array<String>): Promise<Array<String>> {
    try {
      const response = await API.post(`note-api/tag`, {
        dto: {
          tagList: targetList,
        },
      });
      return response ? convertTagObj(response.data.dto) : '';
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async deleteTag(targetList: Array<String>): Promise<Array<String>> {
    try {
      const response = await API.post(`note-api/tag?action=Delete`, {
        dto: {
          tagList: targetList,
        },
      });
      return response ? convertTagObj(response.data.dto) : '';
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async updateTag(targetList: Array<String>): Promise<Array<String>> {
    try {
      const response = await API.post(`note-api/tag?action=Update`, {
        dto: {
          tagList: targetList,
        },
      });
      return response ? convertTagObj(response.data.dto) : '';
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async storageFileDeepCopy(fileId: string): Promise<any> {
    const targetSRC = `Storage/StorageFile?action=Copy&Type=Deep`;
    try {
      const response = await API.put(targetSRC, {
        dto: {
          workspace_id: this.WS_ID,
          channel_id: this.chId,
          storageFileInfo: {
            user_id: this.USER_ID,
            file_id: fileId,
          },
        },
      });
      return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async createUploadMeta(dto: Object): Promise<Object> {
    try {
      const response = await API.post('note-api/noteFile', dto);
      return response;
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
      `/gateway-api/upload?user_id=${this.USER_ID}&ws_id=${this.WS_ID}&ch_id=${this.chId}&file_name=${fileName}&file_extension=${fileExtension}`,
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
    const deleteFileList = [];
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
    }
    return Promise.resolve();
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
