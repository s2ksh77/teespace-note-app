import { observable, action, set, computed } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class ChapterModel {
  @observable
  USER_ID: string;

  @observable
  children: Array<String>;

  @observable
  color: string;

  @observable
  id: string;

  @observable
  modified_date: string;

  @observable
  note_channel_id: string;

  @observable
  shared_date: string;

  @observable
  shared_room_name: string;

  @observable
  shared_user_id: string;

  @observable
  target_channel_id: string;

  @observable
  target_workspace_id: string;

  @observable
  text: string;

  @observable
  type: string;

  @observable
  user_name: string;

  @observable
  ws_id: string;

  constructor(data: Object) {
    this.setValues(data);
  }

  @action
  setValues(data: Object) {
    set(this, data);
  }

  @action
  setRoomId(data: string) {
    this.ws_id = data;
  }

  @action
  setType(data: string) {
    this.type = data;
  }

  @action
  setUserId(data: string) {
    this.USER_ID = data;
  }

  @action
  setChildren(data: Array<String>) {
    this.children = data;
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
    this.modified_date = data;
  }

  @action
  setNoteChannelId(data: string) {
    this.note_channel_id = data;
  }

  @action
  setSharedDate(data: string) {
    this.shared_date = data;
  }

  @action
  setSharedRoomName(data: string) {
    this.shared_room_name = data;
  }

  @action
  setSharedUserId(data: string) {
    this.shared_user_id = data;
  }

  @action
  setTargetChId(data: string) {
    this.target_channel_id = data;
  }

  @action
  setTargetRoomId(data: string) {
    this.target_workspace_id = data;
  }

  @action
  setChapterText(data: string) {
    this.text = data;
  }

  @action
  setUserName(data: string) {
    this.user_name = data;
  }
}

export default ChapterModel;
