import { observable, toJS } from 'mobx';
import NoteRepository from './noteRepository'
import { API } from 'teespace-core';
import ChapterStore from './chapterStore';
import PageStore from './pageStore';
import NoteStore from './noteStore';
import { openLink } from '../components/editor/customLink'

const EditorStore = observable({
  contents: '',
  tinymce: null,
  uploadFile: "",
  imgElement: '',
  isFile: false,
  selectFileIdx: '',
  selectFileElement: '',
  downloadFileId: '',
  deleteFileId: '',
  deleteFileName: '',
  deleteFileIndex: '',
  uploadFileList: [],
  deleteFileList: [],
  tempFileList: [],
  fileMetaList: [],
  fileList: [],
  fileLayoutList: [],
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
  },
  setImgElement(element) {
    this.imgElement = element;
  },
  getImgElement() {
    return this.imgElement;
  },
  uploadFile: async function (dto, file, successCallback, errorCallback, index) {
    await API.Post(NoteRepository.URL + "/noteFile", JSON.stringify(dto), { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }).then(async data => {
      const { data: { dto } } = data;

      if (dto.file_id) {
        await API.Post(`http://222.122.67.176:8080/CMS/Storage/StorageFile?action=Create&fileID=` + dto.file_id + '&workspaceID=' + NoteRepository.WS_ID + '&channelID=' + dto.ch_id + '&userID=' + NoteRepository.USER_ID, file, { headers: { 'Content-Type': 'multipart/form-data' } }).then(data => {
          const { data: { dto } } = data
          if (dto.resultMsg === "Success") {
            if (typeof successCallback === "function") successCallback(dto, index);
          } else {
            if (typeof errorCallback === "function") errorCallback(dto, index)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    })
  },
  //storagemanager 없어서 임시
  setDownLoadFileId(fileId) {
    this.downloadFileId = fileId
  },
  downloadFile(fileId) {
    if (fileId) {
      window.open(NoteRepository.FILE_URL + "Storage/StorageFile?action=Download" + "&fileID=" + fileId + "&workspaceID=" + NoteRepository.WS_ID +
        "&channelID=" + NoteRepository.chId + "&userID=" + NoteRepository.USER_ID);
      return;
    }

    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = this.tinymce.selection.getNode().src;
    a.download = this.tinymce.selection.getNode().getAttribute('data-name');
    a.click();
    document.body.removeChild(a);
  },
  tempDeleteFile() {
    this.fileLayoutList.splice(this.deleteFileIndex, 1);
    if (this.fileLayoutList.length === 0) this.setIsFile(false);
  },
  async deleteFile(deleteId) {
    await NoteRepository.deleteFile(deleteId).then(response => {
      const { data: { dto } } = response;
    })
  },
  async deleteAllFile() {
    await NoteRepository.deleteAllFile(this.fileList).then(response => {
      const { data: { dto } } = response;
      if (dto.resultMsg === 'Success') {
        ChapterStore.getChapterList();
      }
    })
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
      checkFile = this.fileList.filter(file => !ImageExt.includes(file.file_extension.toLowerCase()))
    }
    if (checkFile === undefined) {
      this.setIsFile(false);
      this.setFileArray([]);
    } else if (checkFile !== undefined && checkFile.length === 0) {
      this.setIsFile(false);
      this.setFileArray([]);
    } else {
      this.setIsFile(true);
      this.setFileArray(checkFile);
    };
  },
  uploadFileIsImage(ext) {
    let ImageExt = ['jpg', 'gif', 'jpeg', 'jfif', 'tiff', 'bmp', 'bpg', 'png']
    return ImageExt.includes(ext.toLowerCase());
  },
  readerIsImage(type) {
    return type.includes('image/');
  },
  setFileIndex(idx) {
    this.selectFileIdx = idx;
  },
  setFileElement(element) {
    this.selectFileElement = element
  },
  setDeleteFileConfig(id, name, index) {
    this.deleteFileId = id;
    this.deleteFileName = name;
    this.deleteFileIndex = index;
  },
  setUploadFileMeta(type, tempId, config, file, element) {
    const { fileName, fileExtension, fileSize } = config;
    const uploadMeta = {
      "dto":
      {
        "workspace_id": NoteRepository.WS_ID,
        "channel_id": NoteRepository.chId,
        "storageFileInfo": {
          "user_id": NoteRepository.USER_ID,
          "file_last_update_user_id": NoteRepository.USER_ID,
          "file_id": '',
          "file_name": fileName,
          "file_extension": fileExtension,
          "file_created_at": '',
          "file_updated_at": '',
          "file_size": fileSize,
          "user_context_1": PageStore.currentPageId,
          "user_context_2": '',
          "user_context_3": ''
        }
      }
    }
    const uploadArr = {
      KEY: tempId,
      TYPE: type,
      uploadMeta,
      file,
      element
    }
    this.setFileMetaList(uploadArr);
  },
  setFileMetaList(fileMeta) {
    this.fileMetaList.push(fileMeta);
    console.log(toJS(this.fileMetaList))
  },
  getFileMetaList() {
    return this.fileMetaList;
  },
  // 하위 File Layout 에 Temp로 그리기 위한 용도
  getTempTimeFormat() {
    let date = new Date();
    let year = date.getFullYear();
    let month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + time;
  },
  setTempFileMeta(config) {
    const { tempId, fileName, fileExtension, fileSize } = config;
    const tempMeta = {
      "user_id": NoteRepository.USER_ID,
      "file_last_update_user_id": NoteRepository.USER_ID,
      "file_id": '',
      "file_name": fileName,
      "file_extension": fileExtension,
      "file_created_at": '',
      "file_updated_at": this.getTempTimeFormat(),
      "file_size": fileSize,
      "user_context_1": '',
      "user_context_2": tempId,
      "user_context_3": ''
    }
    this.setTempFileList(tempMeta);
  },
  setTempFileList(target) {
    this.fileLayoutList.push(target);
    if (!this.isFile) this.setIsFile(true);
  },
  async handleFileSync() {
    await this.handleFileUpload();
    await this.handleFileDelete();
  },
  async handleFileUpload() {
    const imgTarget = await EditorStore.tinymce.dom.doc.images;
    const fileTarget = document.querySelectorAll('div[temp-id]');
    const imgArray = [...imgTarget];
    const fileArray = [...fileTarget];
    let uploadArr = [];

    imgArray.forEach(img => {
      if (this.fileMetaList.filter(item => item.KEY === img.getAttribute('temp-id'))[0] !== undefined)
        this.uploadFileList.push(this.fileMetaList.filter(item => item.KEY === img.getAttribute('temp-id'))[0]);
    })
    fileArray.forEach(file => {
      if (this.fileMetaList.filter(item => item.KEY === file.getAttribute('temp-id'))[0] !== undefined)
        this.uploadFileList.push(this.fileMetaList.filter(item => item.KEY === file.getAttribute('temp-id'))[0]);
    })

    const _success = (data, index) => {
      if (data.resultMsg === 'Success') {
        this.uploadFileList[index].element.setAttribute('id', data.storageFileInfoList[0].file_id);
        this.uploadFileList[index].element.removeAttribute('temp-id');
        if (this.uploadFileList[index].element) {
          if (this.uploadFileList[index].element.getAttribute('src')) {
            const targetSRC = `${NoteRepository.FILE_URL}Storage/StorageFile?action=Download&fileID=${data.storageFileInfoList[0].file_id}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;
            this.uploadFileList[index].element.setAttribute('src', targetSRC);
          }
        }
      }
    }
    const _failure = e => {
      console.warn('error ---> ', e);
    };
    if (this.uploadFileList.length > 0) {
      if (this.uploadFileList[0] !== undefined) {
        uploadArr = toJS(this.uploadFileList).map((item, index) => {
          return this.uploadFile(item.uploadMeta, item.file, _success, _failure, index)
        })

        try {
          await Promise.all(uploadArr).then(() => {
            this.uploadFileList = [];
            this.fileMetaList = [];
            PageStore.setContent(EditorStore.tinymce.getContent());
          })
        } catch (e) {

        } finally {

        }
      }
    }
  },
  async handleFileDelete() {
    const imgTarget = await EditorStore.tinymce.dom.doc.images;
    const fileTarget = document.querySelectorAll('div #fileLayout [id]');
    const imgArray = [...imgTarget];
    const fileArray = [...fileTarget];

    let deleteArr = [];

    imgArray.forEach(img => this.tempFileList.push(img.getAttribute('id')));
    fileArray.forEach(file => this.tempFileList.push(file.getAttribute('id')));

    if (this.fileList) this.deleteFileList = this.fileList.filter(file => !this.tempFileList.includes(file.file_id))

    if (this.deleteFileList) {
      deleteArr = toJS(this.deleteFileList).map(item => {
        return this.deleteFile(item.file_id)
      })
      try {
        await Promise.all(deleteArr).then(() => {
          this.deleteFileList = [];
          this.tempFileList = [];
          PageStore.setContent(EditorStore.tinymce.getContent());
        })
      } catch (e) {

      } finally {

      }
    }
  },
  convertFileSize(bytes) {
    if (bytes == 0) return '0 Bytes';
    let k = 1000, dm = 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  handleClickLink(el) {
    const href = el.getAttribute('href');
    const target = el.getAttribute('target');
    openLink(href, target);
  },

  handleLinkListener() {
    if (EditorStore.tinymce) {
      const targetList = EditorStore.tinymce.getBody()?.querySelectorAll('a');
      if (targetList && targetList.length > 0) {
        Array.from(targetList).forEach((el) => {
          if (el.getAttribute('hasListener')) return;
          el.addEventListener('click', this.handleClickLink.bind(null, el));
          el.setAttribute('hasListener', true);
        });
      }
    }
  },

  deleteImage() {
    const parent = this.tinymce.selection.getNode().parentNode;
    this.tinymce.selection.setContent('');
    if (!parent.hasChildNodes()) parent.innerHTML = '<br>';
    this.tinymce.focus();
    NoteStore.setModalInfo(null);
  },
});

export default EditorStore;