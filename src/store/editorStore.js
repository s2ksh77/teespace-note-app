import { observable, toJS } from 'mobx';
import NoteRepository from './noteRepository';
import { API } from 'teespace-core';
import ChapterStore from './chapterStore';
import PageStore from './pageStore';
import TagStore from './tagStore';
import NoteStore from './noteStore';
import NoteUtil from '../NoteUtil';
import GlobalVariable from '../GlobalVariable';

const EditorStore = observable({
  contents: '',
  tinymce: null,
  editor: null,
  uploadFile: '',
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
  fileName: '',
  fileSize: '',
  fileExtension: '',
  uploadLength: '',
  totalUploadLength: '',
  isFileFilteredByNameLen: false,
  processLength: 0,
  processCount: 0,
  failCount: 0,
  searchResultState: false,
  searchCurrentCount: 1,
  searchTotalCount: 0,
  searchValue: '',
  isUploading: false,
  uploaderRef: '',
  uploaderType: '',
  visiblityState: '',
  uploadFileCancelStatus: false,
  totalUsage: 0,
  spaceTotalVolume: 0,
  isTagEditPage: false,

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
    return this.editor;
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
    };
    this.saveDriveMeta = saveMeta;
  },
  setIsAttatch(flag) {
    this.isAttatch = flag;
  },
  setIsPreview(flag) {
    this.isPreview = flag;
  },
  setInitialSearchState() {
    this.isSearch = false; // ???????????? initialSearch??? ????????? ?????????
    this.setSearchResultState(false);
    this.setSearchValue('');
    this.setSearchTotalCount(0);
    this.setSearchCurrentCount(0);
  },
  setIsSearch(flag) {
    this.isSearch = flag;
  },
  setSearchValue(value) {
    this.searchValue = value;
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
  setProcessLength(len) {
    this.processLength = len;
  },
  setProcessCount(count) {
    this.processCount = count;
  },
  setFailCount(count) {
    this.failCount = count;
  },
  setIsUploading(isUploading) {
    this.isUploading = isUploading;
  },
  setUploaderType(type) {
    this.uploaderType = type;
  },
  setUploaderRef(ref) {
    this.uploaderRef = ref;
  },
  setVisiblityState(flag) {
    this.visiblityState = flag;
  },

  setIsTagEditPage(flag) {
    this.isTagEditPage = flag;
  },

  // meta:{dto:{channel_id, storageFileInfo:{user_context_1:note_id ??????}, workspace_id}}, type="file"
  async createUploadMeta(meta, type) {
    const {
      data: { dto },
    } = await NoteRepository.createUploadMeta(meta);
    // log_file_id??? note_id??? ??????
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

  async uploadFileGW(
    file,
    file_name,
    file_extension,
    location,
    handleProcess,
    cancelSource,
  ) {
    const {
      data: { dto },
    } = await NoteRepository.uploadFileGW(
      file,
      file_name,
      file_extension,
      location,
      handleProcess,
      cancelSource,
    );
    return dto;
  },

  async deleteFile(deleteId) {
    const {
      data: { dto },
    } = await NoteRepository.deleteFile(deleteId);
    return dto;
  },

  async deleteAllFile(fileList) {
    await NoteRepository.deleteAllFile(fileList ? fileList : this.fileList).then(
      response => {
        const {
          data: { dto },
        } = response;
        if (dto.resultMsg === 'Success') {
          ChapterStore.getNoteChapterList();
        }
      },
    );
  },

  async getStorageVolume() {
    const {
      data: { dto },
    } = await NoteRepository.getStorageVolume();

    if (dto.resultMsg === 'Success') {
      this.totalUsage = dto.volumeInfoList[0].total_usage;
      this.spaceTotalVolume = dto.volumeInfoList[0].space_max_volume;
    }
  },

  /**
   * drive?????? ?????? file_id ?????? array
   * @param {*} fileArray
   */
  async createFileMeta(fileArray, noteId) {
    const createCopyArray = [];
    fileArray.forEach(file => {
      createCopyArray.push({
        note_id: noteId,
        file_id: file,
        WS_ID: NoteRepository.WS_ID,
      });
    });
    const {
      data: { dto },
    } = await NoteRepository.createFileMeta(createCopyArray);
    return dto;
  },

  async storageFileDeepCopy(fileId, type) {
    const {
      data: { dto },
    } = await NoteRepository.storageFileDeepCopy(fileId);
    if (dto.resultMsg === 'Success') {
      const {
        file_id,
        file_name,
        file_extension,
        file_updated_at,
        file_size,
      } = dto.storageFileInfoList[0];
      const isImage = type === 'image' ? true : false;
      const tempMeta = {
        user_id: NoteRepository.USER_ID,
        file_last_update_user_id: NoteRepository.USER_ID,
        file_id: file_id,
        file_name: file_name,
        file_extension: file_extension,
        file_created_at: '',
        file_updated_at: file_updated_at,
        file_size: file_size,
        user_context_1: '',
        user_context_2: '',
        user_context_3: '',
        progress: 0,
        type: isImage ? 'image' : 'file',
        error: false,
      };
      this.addFileList(tempMeta);
      if (isImage)
        EditorStore.createDriveElement(
          'image',
          file_id,
          file_name + '.' + file_extension,
        );
      return { id: file_id, type: type };
    } else {
      EditorStore.failCount++;
    }
  },

  async getDuflicateFile(fileName, fileExt, pageId = PageStore.pageInfo.id) {
    const {
      data: { dto },
    } = await NoteRepository.getDuflicateFile(fileName, fileExt, pageId);
    if (dto.result === 'Y') {
      return dto.file[0]?.user_context_1;
    }
  },

  async getRecycleBinAllFile() {
    const {
      data: { dto },
    } = await NoteRepository.getRecycleBinAllFile();
    return dto;
  },

  setSaveFileMeta(fileId, fileExt, fileName) {
    this.saveFileId = fileId;
    this.saveFileExt = fileExt;
    this.saveFileName = fileName;
  },

  addDriveFileList(fileInfo) {
    this.driveFileList.push(fileInfo);
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
  removeFileList(fileId) {
    this.fileList = this.fileList.filter(file => file.file_id !== fileId);
  },
  // not image ?????? ?????? ????????? ??????
  checkFile() {
    let ImageExt = ['jpg', 'gif', 'jpeg', 'jfif', 'tiff', 'bmp', 'bpg', 'png'];
    let checkFile;
    if (this.fileList) {
      checkFile = this.fileList.filter(
        file =>
          !file.file_extension || !ImageExt.includes(file.file_extension.toLowerCase()),
      );
    }
    if (checkFile === undefined) {
      this.setIsFile(false);
      this.setFileArray([]);
    } else if (checkFile !== undefined && checkFile.length === 0) {
      this.setIsFile(false);
      this.setFileArray([]);
    } else {
      this.setIsFile(true);
      const { getUnixTime } = NoteUtil;
      // ????????? 'file_updated_at'??? ??? str??? ?????? ??????????????? ???????????? ??????
      checkFile.sort(
        (a, b) => getUnixTime(b['created_at']) - getUnixTime(a['created_at']),
      );
      this.setFileArray(checkFile);
    }
  },
  isFileLength() {
    const temp = this.tempFileLayoutList.filter(file => file.type === 'file').length;
    const uploaded = this.fileLayoutList.length;
    const totalLength = temp + uploaded;
    if (totalLength === 0) this.setIsFile(false);
  },
  uploadFileIsImage(ext) {
    let ImageExt = ['jpg', 'gif', 'jpeg', 'jfif', 'tiff', 'bmp', 'bpg', 'png'];
    return ImageExt.includes(ext.toLowerCase());
  },

  getFileInfo(file) {
    const lastDotIdx = file.name.lastIndexOf('.');
    return {
      fileName: lastDotIdx < 0 ? file.name : file.name.slice(0, lastDotIdx),
      fileExtension: lastDotIdx < 0 ? '' : file.name.slice(lastDotIdx + 1),
      fileSize: file.size,
    };
  },

  setFileIndex(idx) {
    this.selectFileIdx = idx;
  },

  setFileElement(element) {
    this.selectFileElement = element;
  },

  setUploadFileDTO(model, file, type, cancelSource) {
    this.uploadDTO.push({
      model,
      file,
      type,
      cancelSource,
    });
    this.setPageFileList(model, file.uid, type, cancelSource);
  },

  setPageFileList(model, uid, type, cancelSource) {
    const obj = {
      file_id: uid,
      file_name: model.storageFileInfo.file_name,
      file_extension: model.storageFileInfo.file_extension,
      file_size: model.storageFileInfo.file_size,
      user_id: model.storageFileInfo.user_id,
      progress: 0,
      type: type,
      error: false,
      cancelSource,
    };
    if (type !== 'image') {
      this.addFileList(obj);
    }
  },

  setUploadDTO(meta) {
    this.uploadDTO.push(meta);
  },

  addFileList(target) {
    if (this.processCount !== this.uploadLength) {
      this.fileLayoutList.unshift(target);
      this.processCount++;
    } else this.processCount = 0;
    if (!this.isFile) this.setIsFile(true);
  },

  setFileLength(length) {
    this.uploadLength = length;
  },

  setTotalUploadLength(length) {
    this.totalUploadLength = length;
  },

  checkUploadUsage(fileSize) {
    return this.totalUsage + fileSize < this.spaceTotalVolume;
  },

  convertFileSize(bytes) {
    if (bytes == 0) return '0 Bytes';
    let k = 1000,
      dm = 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  deleteImage() {
    const parent = this.tinymce.selection.getNode().parentNode;
    this.tinymce.selection.setContent('');
    if (!parent.hasChildNodes()) parent.innerHTML = '<br>';
    this.tinymce.focus();
    EditorStore.tinymce?.undoManager?.add();
    NoteStore.setModalInfo(null);
  },

  createDriveElement(type, fileId, fileName) {
    const targetSRC = `../../CMS/Storage/StorageFile?action=Download&fileID=${fileId}&workspaceID=${NoteRepository.WS_ID}&channelID=${NoteRepository.chId}&userID=${NoteRepository.USER_ID}`;
    switch (type) {
      case 'image':
        EditorStore.tinymce.execCommand(
          'mceInsertContent',
          false,
          '<img id="' +
            fileId +
            '" src="' +
            targetSRC +
            '" data-name="' +
            fileName +
            '"crossorigin="' +
            '*' +
            '"/>',
        );
        break;
      case 'video':
        EditorStore.tinymce.insertContent(
          `<p>
            <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src='' data-mce-html="%20">
              <video width="400" controls>
                <source src=${targetSRC} />
              </video>
            </span>
          </p>`,
        );
        break;
      default:
        break;
    }
  },

  async uploadingFileallCancel() {
    await Promise.all(
      this.uploadDTO.map((file, idx) => {
        if (file.type !== 'image') {
          if (this.fileLayoutList[idx].status === 'pending') {
            this.fileLayoutList[idx].deleted = true;
            return file?.cancelSource?.cancel();
          }
        } else file?.cancelSource?.cancel();
      }),
    ).then(() => {
      this.uploadFileCancelStatus = true;
      this.setIsUploading(false);
      NoteStore.setModalInfo(null);
      PageStore.handleSave();
      this.uploadDTO = [];
    });
  },

  isEditCancelOpen() {
    const { isEmpty } = NoteUtil;
    if (
      PageStore.isNewPage &&
      (!this.tinymce?.undoManager?.hasUndo() || !PageStore.noteContent) &&
      isEmpty(TagStore.notetagList || []) &&
      isEmpty(this.tempFileLayoutList || []) &&
      isEmpty(this.fileLayoutList || [])
    )
      return false;
    return true;
  },
  handleMenuHidden(inEditor = false) {
    const floatingMenu = GlobalVariable.editorWrapper.querySelector(
      '.tox-tbtn[aria-owns]',
    );
    if (floatingMenu !== null) {
      floatingMenu?.click();
      if (inEditor) EditorStore.tinymce.focus();
    }
  },
});

export default EditorStore;
