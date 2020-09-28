import { observable } from 'mobx';
import NoteRepository from './noteRepository'
import { API } from 'teespace-core';

const EditorStore = observable({
  contents: '',
  tinymce: null,
  uploadFile: "",
  fileName: "",
  fileSize: "",
  fileExtension: "",
  setContents(content) {
    this.contents = content;
  },
  getContents() {
    return this.contents;
  },
  setEditor(instance) {
    this.tinymce = instance;
  },
  getEditor() {
    return this.tinymce;
  }
});

export default EditorStore;

const tempStorageManager = {

  uploadFile: async function (file, resp, successCallback, errorCallback, isImage) {
    console.log('receive file -->', file)
    if (!isImage) {
      await API.Post(`http://222.122.67.176:8080/CMS/Storage/StorageFile?action=Create&fileID=` + resp.file_id + '&workspaceID=' + NoteRepository.WS_ID + '&channelID=' + resp.ch_id + '&userID=' + NoteRepository.USER_ID, file, { headers: { 'Content-Type': 'multipart/form-data' } }).then(data => {
        const { data: { dto } } = data
        if (dto.resultMsg === "Success") {
          if (typeof successCallback === "function") successCallback(dto);
        } else {
          if (typeof errorCallback === "function") errorCallback(dto)
        }
      }).catch(error => {
        console.log(error)
      })
    } else {
      await API.Post(NoteRepository.URL + "/noteFile", JSON.stringify(resp), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(async data => {
        console.log(data)
        // await API.Post(`http://222.122.67.176:8080/CMS/Storage/StorageFile?action=Create&fileID=` + data.file_id + '&workspaceID=' + NoteRepository.WS_ID + '&channelID=' + data.ch_id + '&userID=' + NoteRepository.USER_ID, file, { headers: { 'Content-Type': 'multipart/form-data' } }).then(data => {
        //   const { data: { dto } } = data
        //   if (dto.resultMsg === "Success") {
        //     if (typeof successCallback === "function") successCallback(dto);
        //   } else {
        //     if (typeof errorCallback === "function") errorCallback(dto)
        //   }
        // }).catch(error => {
        //   console.log(error)
        // })
      })

    }
  }

}

