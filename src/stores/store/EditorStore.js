import { observable, action, computed } from 'mobx';
import StorageModel from '../model/StorageModel';
import NoteRepository from '../repository/NoteRepository';
import NoteStore from './NoteStore';
import PageStore from './PageStore';

// @flow
class EditorStore {
  @observable editor: object;

  @observable isSearching: Boolean = false;

  @observable totalUploadLen: Number = 0;

  @observable validUploadLen: Number = 0;

  visibilityState: string;

  uploaderRef = '';

  @observable isFile: Boolean = false;

  @observable uploadDTO: Object = [];

  setEditor(editor: object) {
    this.editor = editor;
  }

  setIsSearching(isSearching: Boolean) {
    this.isSearching = isSearching;
  }

  setVisibilityState(visibilityState: string) {
    this.visibilityState = visibilityState;
  }

  setTotalUploadLength(num: Number) {
    this.totalUploadLen = num;
  }

  setValidUploadLength(num: Number) {
    this.validUploadLen = num;
  }
  setUploaderRef(ref) {
    this.uploaderRef = ref;
  }

  setIsFile(flag) {
    this.isFile = flag;
  }

  setUploadFileDTO(model: StorageModel, file, type: string, cancelSource) {
    this.uploadDTO.push({
      model,
      file,
      type,
      cancelSource,
    });
    console.log(file);
    this.setPageFileList(model, file.uid, type);
  }

  setPageFileList(model: StorageModel, uid: string, type: string) {
    const obj: $Shape<FileInfo> = {
      file_id: uid,
      file_name: model.storageFileInfo.file_name,
      file_extension: model.storageFileInfo.file_extension,
      file_size: model.storageFileInfo.file_size,
      user_id: model.storageFileInfo.user_id,
      progress: 0,
      type: type,
      error: false,
    };
    if (type !== 'image') {
      PageStore.pageModel.fileList.unshift(obj);
      PageStore.pageModel.isFile();
    }
  }

  @computed
  get isImage() {
    return (extension: string) => {
      const ImageExt = [
        'jpg',
        'gif',
        'jpeg',
        'jfif',
        'tiff',
        'bmp',
        'bpg',
        'png',
      ];
      return ImageExt.includes(extension.toLowerCase());
    };
  }

  async uploadFileGW(
    file,
    fileName,
    fileExtension,
    onUploadProgress,
    cancelSource,
  ) {
    const {
      data: { dto },
    } = await NoteRepository.uploadFileGW({
      file,
      fileName,
      fileExtension,
      onUploadProgress,
      cancelSource,
    });
    return dto;
  }

  async createFileMeta(fileArray, pageId) {
    const createCopyArray = [];
    fileArray.forEach(file => {
      createCopyArray.push({
        note_id: pageId,
        file_id: file,
        WS_ID: NoteStore.roomId,
      });
    });
    const {
      data: { dto },
    } = await NoteRepository.createFileMeta(createCopyArray);
    return dto;
  }

  async deleteFile(fileId: string) {
    const {
      data: { dto },
    } = await NoteRepository.deleteFile(fileId);
    return dto;
  }
}

export default new EditorStore();
