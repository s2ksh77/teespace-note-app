import { observable } from 'mobx';
import NoteRepository from './noteRepository'
import { API } from 'teespace-core';
import PageStore from './pageStore';

const EditorStore = observable({
  contents: '',
  tinymce: null,
  uploadFile: "",
  imgElement: '',
  fileName: "",
  fileSize: "",
  fileExtension: "",
  uploadDTO: {
    "dto":
    {
      "workspace_id": NoteRepository.WS_ID,
      "channel_id": '',
      "storageFileInfo": {
        "user_id": NoteRepository.USER_ID,
        "file_last_update_user_id": NoteRepository.USER_ID,
        "file_id": '',
        "file_name": '',
        "file_extension": '',
        "file_created_at": '',
        "file_updated_at": '',
        "file_size": '',
        "user_context_1": '',
        "user_context_2": '',
        "user_context_3": ''
      }
    }
  },
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
  },
  setImgElement(element) {
    this.imgElement = element;
  },
  getImgElement() {
    return this.imgElement;
  },
  setUploadDTO(chId, pageId, fileName, fileExtenstion, fileSize) {
    this.uploadDTO.dto.channel_id = chId;
    this.uploadDTO.dto.storageFileInfo.user_context_1 = pageId;
    this.uploadDTO.dto.storageFileInfo.file_name = fileName;
    this.uploadDTO.dto.storageFileInfo.file_extension = fileExtenstion;
    this.uploadDTO.dto.storageFileInfo.file_size = fileSize;
  },
  getUploadDTO() {
    return this.uploadDTO;
  },
  uploadFile: async function (file, successCallback, errorCallback) {
    await API.Post(NoteRepository.URL + "/noteFile", JSON.stringify(this.uploadDTO), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(async data => {
      const { data: { dto } } = data;

      if (dto.file_id) {
        await API.Post(`http://222.122.67.176:8080/CMS/Storage/StorageFile?action=Create&fileID=` + dto.file_id + '&workspaceID=' + NoteRepository.WS_ID + '&channelID=' + dto.ch_id + '&userID=' + NoteRepository.USER_ID, file, { headers: { 'Content-Type': 'multipart/form-data' } }).then(data => {
          const { data: { dto } } = data
          if (dto.resultMsg === "Success") {
            if (typeof successCallback === "function") successCallback(dto);
          } else {
            if (typeof errorCallback === "function") errorCallback(dto)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    })
  }
});

export default EditorStore;