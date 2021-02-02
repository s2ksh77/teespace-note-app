import { observable, toJS } from 'mobx';
import NoteRepository from './noteRepository'
import { API } from 'teespace-core';
import ChapterStore from './chapterStore';
import PageStore from './pageStore';
import NoteStore from './noteStore';

const EditorStore = observable({
  tempTinymce: null,
  contents: '',
  tinymce: null,
  editor: null,
  uploadFile: "",
  imgElement: '',
  isFile: false,
  isDrive: false,
  isAttatch: false,
  isPreview: false,
  isSaveDrive: false,
  isSearch: false,
  previewFileMeta: {},
  selectFileIdx: '',
  selectFileElement: '',
  downloadFileId: '',
  deleteFileId: '',
  deleteFileName: '',
  deleteFileIndex: '',
  uploadDTO: [],
  uploadFileList: [],
  deleteFileList: [],
  tempFileList: [],
  fileMetaList: [],
  fileList: [],
  fileLayoutList: [],
  tempArray: [],
  tempFileLayoutList: [],
  notSaveFileList: [],
  driveFileList: [],
  saveFileId: '',
  saveFileExt: '',
  saveFileName: '',
  fileName: "",
  fileSize: "",
  fileExtension: "",
  uploadLength: '',
  processLength: 0,
  processCount: 0,
  failCount: 0,
  searchResultState: false,
  searchCurrentCount: 1,
  searchTotalCount: 0,
  searchValue: '',
  getTempTinymce() {
    return this.tempTinymce
  },
  setTempTinymce(editor) {
    this.tempTinymce = editor;
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
  setEditorDOM(el) {
    this.editor = el;
  },
  getEditorDOM() {
    return this.editor
  },
  setImgElement(element) {
    this.imgElement = element;
  },
  getImgElement() {
    return this.imgElement;
  },
  setIsDrive(flag) {
    this.isDrive = flag;
  },
  setIsSaveDrive(flag) {
    this.isSaveDrive = flag;
  },
  setSaveDriveMeta() {
    const saveMeta = {
      file_id: this.saveFileId,
      file_extension: this.saveFileExt,
      file_name: this.saveFileName,
    }
    this.saveDriveMeta = saveMeta;
  },
  setIsAttatch(flag) {
    this.isAttatch = flag;
  },
  setIsPreview(flag) {
    this.isPreview = flag;
  },
  setInitialSearchState() {
    this.isSearch = false;
    this.searchResultState = false;
    this.searchValue = '';
  },
  setIsSearch(flag) {
    this.isSearch = flag;
  },
  setSearchValue(value) {
    this.searchValue = value
  },
  setSearchTotalCount(count) {
    this.searchTotalCount = count;
  },
  setSearchCurrentCount(count) {
    this.searchCurrentCount = count;
  },
  setSearchResultState(flag) {
    this.searchResultState = flag;
  },
  setPreviewFileMeta(fileMeta) {
    this.previewFileMeta = fileMeta;
  },
  async createUploadMeta(meta, type) {
    const {
      data: { dto },
    } = await NoteRepository.createUploadMeta(meta);
    if (dto.log_file_id) {
      return { id: dto.log_file_id, type: type };
    }
  },
  async createUploadStorage(fileId, file, handleProcess) {
    const {
      data: { dto },
    } = await NoteRepository.createUploadStorage(fileId, file, handleProcess);
    return dto;
  },
  uploadFile: async function (dto, file, index) {
    this.createUploadMeta(dto).then(dto => {
      if (dto.log_file_id) {
        this.createUploadStorage(dto.log_file_id, file).then(dto => {
          if (dto.resultMsg === "Success") {
            const returnID = dto.storageFileInfoList[0].file_id;
            const returnIndex = index;
            return returnID;
          } else {

          }
        })
      }
    })
  },
  //storagemanager 없어서 임시
  setDownLoadFileId(fileId) {
    this.downloadFileId = fileId
  },
  setSaveFileMeta(fileId, fileExt, fileName) {
    this.saveFileId = fileId;
    this.saveFileExt = fileExt;
    this.saveFileName = fileName;
  },
  tempDeleteFile() {
    this.fileLayoutList.splice(this.deleteFileIndex, 1);
    if (this.fileLayoutList.length === 0) this.setIsFile(false);
  },
  addDriveFileList(fileInfo) {
    this.driveFileList.push(fileInfo);
  },
  async deleteFile(deleteId) {
    const {
      data: { dto },
    } = await NoteRepository.deleteFile(deleteId)
    return dto;
  },
  async deleteAllFile() {
    await NoteRepository.deleteAllFile(this.fileList).then(response => {
      const { data: { dto } } = response;
      if (dto.resultMsg === 'Success') {
        ChapterStore.getNoteChapterList();
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
      checkFile = this.fileList.filter(file => !file.file_extension || !ImageExt.includes(file.file_extension.toLowerCase()))
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
  isFileLength() {
    const temp = this.tempFileLayoutList.filter(file => file.type === 'file').length;
    const uploaded = this.fileLayoutList.length;
    const totalLength = temp + uploaded;
    if (totalLength === 0) this.setIsFile(false);
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
  setUploadFileDTO(config, file, type) {
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
    };
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
      "user_context_2": '',
      "user_context_3": '',
      "progress": 0,
      "type": type,
      "error": false
    }
    this.setTempFileList(tempMeta)
    const uploadArr = {
      uploadMeta,
      file,
      type
    };
    this.setUploadDTO(uploadArr);
  },
  setUploadDTO(meta) {
    this.uploadDTO.push(meta);
  },
  setTempFileList(target) {
    if (this.processCount !== this.uploadLength) {
      this.tempFileLayoutList.unshift(target);
      this.processCount++
    } else this.processCount = 0;
    if (!this.isFile) this.setIsFile(true);
  },
  setFileLength(length) {
    this.uploadLength = length;
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
  convertFileSize(bytes) {
    if (bytes == 0) return '0 Bytes';
    let k = 1000, dm = 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
  deleteImage() {
    const parent = this.tinymce.selection.getNode().parentNode;
    this.tinymce.selection.setContent('');
    if (!parent.hasChildNodes()) parent.innerHTML = '<br>';
    this.tinymce.focus();
    NoteStore.setModalInfo(null);
  },
  /**
   * drive에서 받은 file_id 들의 array
   * @param {*} fileArray 
  */
  async createFileMeta(fileArray, noteId) {
    const createCopyArray = [];
    fileArray.forEach(file => {
      createCopyArray.push({
        note_id: noteId,
        file_id: file,
      })
    })
    const {
      data: { dto },
    } = await NoteRepository.createFileMeta(createCopyArray);
    return dto;
  },
  async storageFileDeepCopy(fileId, type) {
    const {
      data: { dto }
    } = await NoteRepository.storageFileDeepCopy(fileId);
    if (dto.resultMsg === 'Success') {
      const { file_id, file_name, file_extension, file_updated_at, file_size } = dto.storageFileInfoList[0];
      const isImage = (type === 'image') ? true : false;
      const tempMeta = {
        "user_id": NoteRepository.USER_ID,
        "file_last_update_user_id": NoteRepository.USER_ID,
        "file_id": file_id,
        "file_name": file_name,
        "file_extension": file_extension,
        "file_created_at": '',
        "file_updated_at": file_updated_at,
        "file_size": file_size,
        "user_context_1": '',
        "user_context_2": '',
        "user_context_3": '',
        "progress": 0,
        "type": isImage ? 'image' : 'file',
        "error": false
      }
      this.setTempFileList(tempMeta);
      if (isImage) EditorStore.createDriveElement('image', file_id, file_name + '.' + file_extension);
      return { id: file_id, type: type };
    } else {
      EditorStore.failCount++;
    };
  },
  createDriveElement(type, fileId, fileName) {
    const targetSRC = `${API.baseURL}/Storage/StorageFile?action=Download&fileID=${fileId}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;
    switch (type) {
      case 'image':
        EditorStore.tinymce.execCommand('mceInsertContent', false, '<img id="' + fileId + '" src="' + targetSRC + '" data-name="' + fileName + '"data-mce-src="' + targetSRC + '"/>');
        break;
      case 'video':
        EditorStore.tinymce.insertContent(
          `<p>
            <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src='' data-mce-html="%20">
              <video width="400" controls>
                <source src=${targetSRC} />
              </video>
            </span>
          </p>`
        );
        break;
      default:
        break;
    }
  },
  async notSaveFileDelete() {
    let deleteArr = [];
    if (EditorStore.notSaveFileList.length > 0) {
      deleteArr = toJS(EditorStore.notSaveFileList).map(item => {
        return EditorStore.deleteFile(item.file_id)
      })
      try {
        await Promise.all(deleteArr).then(() => {
          EditorStore.notSaveFileList = [];
          if (EditorStore.tempFileLayoutList.length > 0) EditorStore.tempFileLayoutList = [];
        })
      } catch (e) {

      } finally {

      }
    }
  }
});

export default EditorStore;