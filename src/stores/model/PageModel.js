import { observable, action, set, computed } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class PageModel {
  @observable
  chType: string;

  @observable
  type: string;

  @observable
  userId: string;

  @observable
  roomId: string;

  @observable
  chapterColor: string;

  @observable
  createDate: string;

  @observable
  deleteDate: string;

  @observable
  fileList: Array<FileInfo>;

  @observable
  file_deleted_at: string;

  @observable
  file_extension: string;

  @observable
  file_name: string;

  @observable
  file_size: string;

  @observable
  is_edit: string;

  @observable
  messengerId: string;

  @observable
  modDate: string;

  @observable
  chId: string;

  @observable
  content: string;

  @observable
  id: string;

  @observable
  name: string;

  @observable
  chapterId: string;

  @observable
  resultMsg: string;

  @observable
  shareRoomId: string;

  @observable
  shareUserId: string;

  @observable
  tagList: Array<TagInfo>;

  @observable
  targetChId: string;

  @observable
  targetRoomId: string;

  @observable
  chapterName: string;

  @observable
  textContent: string;

  @observable
  userName: string;

  constructor(data: Object) {
    this.setValues(data);
  }

  @action
  setValues(data: Object) {
    set(this, data);
  }

  @action
  setChType(data: string) {
    this.chType = data;
  }

  @action
  setType(data: string) {
    this.type = data;
  }

  @action
  setRoomId(data: string) {
    this.roomId = data;
  }

  @action
  setUserId(data: string) {
    this.userId = data;
  }

  @action
  setColor(data: string) {
    this.chapterColor = data;
  }
  @action
  setCreatedDate(data: string) {
    this.createDate = data;
  }
  @action
  setDeletedDate(data: string) {
    this.deleteDate = data;
  }
  @action
  setFileList(data: Array<FileInfo>) {
    this.fileList = data;
  }
  @action
  setFileDeletedAt(data: string) {
    this.file_deleted_at = data;
  }
  @action
  setFileExtension(data: string) {
    this.file_extension = data;
  }
  @action
  setFileName(data: string) {
    this.file_name = data;
  }
  @action
  setFileSize(data: string) {
    this.file_size = data;
  }
  @action
  // setFileUpdatedAt(data: string) {
  //   this.file_updated_at = data;
  // }
  @action
  setIsEdit(data: string) {
    this.is_edit = data;
  }
  @action
  setMessengerId(data: string) {
    this.messengerId = data;
  }
  @action
  setModifiedDate(data: string) {
    this.modDate = data;
  }
  @action
  setNoteChannelId(data: string) {
    this.chId = data;
  }
  @action
  setNoteContent(data: string) {
    this.content = data;
  }
  @action
  setNoteId(data: string) {
    this.id = data;
  }
  @action
  setNoteTitle(data: string) {
    this.name = data;
  }
  @action
  setChapterId(data: string) {
    this.chapterId = data;
  }
  @action
  setSharedRoomId(data: string) {
    this.shareRoomId = data;
  }
  @action
  setSharedUserId(data: string) {
    this.shareUserId = data;
  }
  @action
  setTagList(data: Array<TagInfo>) {
    this.tagList = data;
  }
  @action
  setTargetChId(data: string) {
    this.targetChId = data;
  }
  @action
  setTargetRoomId(data: string) {
    this.targetRoomId = data;
  }
  @action
  setChapterText(data: string) {
    this.chapterName = data;
  }
  @action
  setTextContent(data: string) {
    this.textContent = data;
  }
  @action
  setUserName(data: string) {
    this.userName = data;
  }
}

export default PageModel;

export const convertPageObjToModel = (
  obj: $Shape<PageInfo>,
): ?$Shape<PageInfo> => {
  if (obj.USER_ID) {
    return {
      userId: obj.USER_ID,
    };
  }
  if (obj.CH_TYPE) {
    return {
      chType: obj.CH_TYPE,
    };
  }
  if (obj.color) {
    return {
      chapterColor: obj.color,
    };
  }
  if (obj.note_id) {
    return {
      id: obj.note_id,
    };
  }
  if (obj.note_title) {
    return {
      name: obj.note_title,
    };
  }
  if (obj.note_content) {
    return {
      content: obj.note_content,
    };
  }
  if (obj.text_content) {
    return {
      textContent: obj.text_content,
    };
  }
  if (obj.parent_notebook) {
    return {
      chapterId: obj.parent_notebook,
    };
  }
  if (obj.is_edit) {
    return {
      is_edit: obj.is_edit,
    };
  }
  if (obj.fileList) {
    return {
      fileList: obj.fileList,
    };
  }
  if (obj.tagList) {
    return {
      tagList: obj.tagList,
    };
  }
  if (obj.messenger_id) {
    return {
      messengerId: obj.messenger_id,
    };
  }
  if (obj.modified_date) {
    return {
      modDate: obj.modified_date,
    };
  }
  if (obj.note_channel_id) {
    return {
      chId: obj.note_channel_id,
    };
  }
  if (obj.shared_date) {
    return {
      sharedDate: obj.shared_date,
    };
  }
  if (obj.shared_room_name) {
    return {
      shareRoomId: obj.shared_room_name,
    };
  }
  if (obj.shared_user_id) {
    return {
      shareUserId: obj.shared_user_id,
    };
  }
  if (obj.target_channel_id) {
    return {
      targetChId: obj.target_channel_id,
    };
  }
  if (obj.target_workspace_id) {
    return {
      targetRoomId: obj.target_workspace_id,
    };
  }
  if (obj.text) {
    return {
      chapterName: obj.text,
    };
  }
  if (obj.user_name) {
    return {
      userName: obj.user_name,
    };
  }
  if (obj.WS_ID) {
    return {
      roomId: obj.WS_ID,
    };
  }
  return '';
};
