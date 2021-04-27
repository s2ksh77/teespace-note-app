import { observable, action, set, computed } from 'mobx';
import autobind from 'autobind-decorator';
import NoteStore from '../store/NoteStore';

// @flow
@autobind
class StorageModel {
  @observable
  workspace_id: string;

  @observable
  channel_id: string;

  @observable
  storageFileInfo: Object<$Shape<FileInfo>> = {};

  @observable
  progress: Number;

  @observable
  type: string;

  @observable
  error: string;

  constructor(data: Object) {
    this.setValues(data);
  }

  @action
  setValues(data: Object) {
    set(this, data);
  }

  @action
  setRoomId(data: string) {
    this.workspace_id = NoteStore.roomId;
  }

  @action
  setChId(data: string) {
    this.channel_id = NoteStore.chId;
  }

  @action
  setUserId(data: string) {
    this.storageFileInfo.user_id = NoteStore.userId;
  }

  @action
  setLastUpdateUserId(data: string) {
    this.storageFileInfo.file_last_update_user_id = NoteStore.userId;
  }

  @action
  setFileId(data: string) {
    this.storageFileInfo.file_id = data;
  }

  @action
  setFileName(data: string) {
    this.storageFileInfo.file_name = data;
  }

  @action
  setFileExtension(data: string) {
    this.storageFileInfo.file_extension = data;
  }

  @action
  setFileCreatedAt(data: string) {
    this.storageFileInfo.file_created_at = data;
  }

  @action
  setFileUpdatedAt(data: string) {
    this.storageFileInfo.file_updated_at = data;
  }

  @action
  setFileSize(data: string) {
    this.storageFileInfo.file_size = data;
  }

  @action
  setUserContext1(data: string) {
    this.storageFileInfo.user_context_1 = data;
  }

  @action
  setUserContext2(data: string) {
    this.storageFileInfo.user_context_2 = data;
  }

  @action
  setUserContext3(data: string) {
    this.storageFileInfo.user_context_3 = data;
  }
}

export default StorageModel;
