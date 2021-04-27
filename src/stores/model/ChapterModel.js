import { observable, action, set } from 'mobx';
import autobind from 'autobind-decorator';
import { convertPageObjToModel } from './PageModel';
import NoteUtil from '../../utils/NoteUtil';

// @flow
@autobind
class ChapterModel {
  @observable
  userId: string;

  @observable
  pageList: Array<String>;

  @observable
  color: string;

  @observable
  id: string;

  @observable
  type: string;

  @observable
  modDate: string;

  @observable
  chId: string;

  @observable
  sharedDate: string;

  @observable
  shareRoomId: string;

  @observable
  shareUserId: string;

  @observable
  targetChId: string;

  @observable
  targetRoomId: string;

  @observable
  name: string;

  @observable
  userName: string;

  @observable
  roomId: string;

  @observable
  isFolded: Boolean;

  constructor(data: Object) {
    this.setValues(data);
    // boolean인지 확인, 이렇게 써도 될까요???????
    if (!!data.isFolded !== data.isFolded) this.setIsFolded(false);
  }

  @action
  setValues(data: Object) {
    set(this, data);
  }

  @action
  setRoomId(data: string) {
    this.roomId = data;
  }

  @action
  setType(data: string) {
    this.type = data;
  }

  @action
  setUserId(data: string) {
    this.userId = data;
  }

  @action
  setChildren(data: Array<String>) {
    this.pageList = data;
  }

  @action
  setColor(data: string) {
    this.color = data;
  }

  @action
  setChapterId(data: string) {
    this.id = data;
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
  setSharedDate(data: string) {
    this.sharedDate = data;
  }

  @action
  setSharedRoomName(data: string) {
    this.shareRoomId = data;
  }

  @action
  setSharedUserId(data: string) {
    this.shareUserId = data;
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
    this.name = data;
  }

  @action
  setUserName(data: string) {
    this.userName = data;
  }

  @action
  setIsFolded(isFolded: boolean) {
    this.isFolded = isFolded;
  }

  @action
  toggleIsFolded() {
    this.isFolded = !this.isFolded;
  }
}

export default ChapterModel;

/**
 * @param ServerObj to ChapterInfo mapping
 * @returns ChapterModel
 */
export const convertChapterObjToModel = (
  obj: $Shape<ChapterInfo>,
): ?$Shape<ChapterModel> => {
  if (obj.USER_ID) {
    return {
      userId: obj.USER_ID,
    };
  }
  if (obj.children) {
    return {
      pageList: obj.children,
    };
  }
  if (obj.color) {
    return {
      color: obj.color,
    };
  }
  if (obj.id) {
    return {
      id: obj.id,
    };
  }
  if (obj.type) {
    return {
      type: obj.type,
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
      name: obj.text,
    };
  }
  if (obj.user_name) {
    return {
      userName: obj.user_name,
    };
  }
  if (obj.ws_id) {
    return {
      roomId: obj.ws_id,
    };
  }
  return '';
};

/**
 * @param ChapterModel to ServerObj mapping
 * @returns ServerObj
 */
export const convertChapterModelToObj = (
  model: $Shape<ChapterInfo>,
): ?$Shape<ChapterInfoDto> => {
  if (model.userId) {
    return {
      USER_ID: model.userId,
    };
  }
  if (model.pageList) {
    return {
      children: model.pageList,
    };
  }
  if (model.color) {
    return {
      color: model.color,
    };
  }
  if (model.id) {
    return {
      id: model.id,
    };
  }
  if (model.type) {
    return {
      type: model.type,
    };
  }
  if (model.modDate) {
    return {
      modified_date: model.modDate,
    };
  }
  if (model.note_channel_id) {
    return {
      chId: model.note_channel_id,
    };
  }
  if (model.sharedDate) {
    return {
      shared_date: model.sharedDate,
    };
  }
  if (model.shareRoomId) {
    return {
      shared_room_name: model.shareRoomId,
    };
  }
  if (model.shareUserId) {
    return {
      shared_user_id: model.shareUserId,
    };
  }
  if (model.targetChId) {
    return {
      target_channel_id: model.targetChId,
    };
  }
  if (model.targetRoomId) {
    return {
      target_workspace_id: model.targetRoomId,
    };
  }
  if (model.name) {
    return {
      text: model.name,
    };
  }
  if (model.userName) {
    return {
      user_name: model.userName,
    };
  }
  if (model.roomId) {
    return {
      ws_id: model.roomId,
    };
  }
  return '';
};
