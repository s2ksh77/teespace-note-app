import { observable, toJS } from 'mobx';
import NoteRepository from './noteRepository'
import { API } from 'teespace-core';

const EditorStore = observable({
  contents: '',
  tinymce: null,
  uploadFile: "",
  imgElement: '',
  isFile: false,
  selectFileIdx: '',
  selectFileElement: '',
  fileList: [],
  fileLayoutList: [],
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
  },
  //storagemanager 없어서 임시
  downloadFile(fileId) {
    let a = document.createElement("a");
    document.body.appendChild(a);

    a.style = "display: none";
    a.href = NoteRepository.FILE_URL + "Storage/StorageFile?action=Download" + "&fileID=" + fileId + "&workspaceID=" + NoteRepository.WS_ID +
      "&channelID=" + NoteRepository.chId + "&userID=" + NoteRepository.USER_ID;
    a.download = "download";
    a.click();
    document.body.removeChild(a);
  },
  setFileList(fileList) {
    this.fileList = fileList;
    this.checkFile();
  },
  getFileList() {
    return this.fileList;
  },
  setFileArray(filelayoutlist) {
    this.fileLayoutList = filelayoutlist;
  },
  setIsFile(flag) {
    this.isFile = flag;
  },
  // not image 파일 첨부 영역을 위함
  checkFile() {
    let ImageExt = ['jpg', 'gif', 'jpeg', 'jfif', 'tiff', 'bmp', 'bpg', 'png']
    let checkFile
    if (this.fileList) {
      checkFile = this.fileList.filter(file => !ImageExt.includes(file.file_extension))
    }
    if (checkFile === undefined) return this.setIsFile(false);
    else if (checkFile !== undefined && checkFile.length === 0) return this.setIsFile(false)
    else {
      this.setIsFile(true);
      this.setFileArray(checkFile);
    };
  },
  uploadFileIsImage(ext) {
    let ImageExt = ['jpg', 'gif', 'jpeg', 'jfif', 'tiff', 'bmp', 'bpg', 'png']
    return ImageExt.includes(ext)
  },
  setFileIndex(idx) {
    this.selectFileIdx = idx;
  },
  setFileElement(element) {
    this.selectFileElement = element
  }
});

export default EditorStore;