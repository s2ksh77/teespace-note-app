import { observable, action, set, computed } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class PageModel {
    @observable
    CH_TYPE : string;
  
    @observable
    TYPE : string;
  
    @observable
    USER_ID : string;
  
    @observable
    WS_ID : string;
  
    @observable
    color : string;
  
    @observable
    created_date : string;
  
    @observable
    deleted_date : string;
  
    @observable
    fileList : Array<FileInfo>;
  
    @observable
    file_deleted_at : string;
  
    @observable
    file_extension : string;

    @observable
    file_name : string;

    @observable
    file_size : string;

    @observable
    is_edit : string;
    
    @observable
    messenger_id : string;
    
    @observable
    modified_date : string;
    
    @observable
    note_channel_id : string;
    
    @observable
    note_content : string;
    
    @observable
    note_id : string;
    
    @observable
    note_title : string;
    
    @observable
    parent_notebook : string;
    
    @observable
    resultMsg : string;
    
    @observable
    shared_room_name : string;
    
    @observable
    shared_user_id : string;
    
    @observable
    tagList : Array<TagInfo>;
    
    @observable
    target_channel_id : string;
    
    @observable
    target_workspace_id : string;
    
    @observable
    text : string;
    
    @observable
    text_content : string;

    @observable
    user_name : string;
  
    constructor(data: Object) {
      this.setValues(data);
    }

    @action
    setValues(data: Object) {
      set(this, data);
    }

    @action
    setChType(data: string) {
      this.CH_TYPE = data;
    }
  
    @action
    setType(data: string) {
      this.TYPE = data;
    }

    @action
    setRoomId(data: string) {
      this.WS_ID = data;
    }

    @action
    setUserId(data: string) {
      this.USER_ID = data;
    }

    @action
    setUserId(data: string) {
      this.USER_ID = data;
    }

    @action
    setColor(data: string) {
      this.color = data;
    }
    @action
    setCreatedDate(data: string) {
      this.created_date = data;
    }
    @action
    setDeletedDate(data: string) {
      this.deleted_date = data;
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
      this.messenger_id = data;
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
    setNoteContent(data: string) {
      this.note_content = data;
    }
    @action
    setNoteId(data: string) {
      this.note_id = data;
    }
    @action
    setNoteTitle(data: string) {
      this.note_title = data;
    }
    @action
    setChapterId(data: string) {
      this.parent_notebook = data;
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
    setTagList(data: Array<TagInfo>) {
      this.tagList = data;
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
    setTextContent(data: string) {
      this.text_content = data;
    }
    @action
    setUserName(data: string) {
      this.user_name = data;
    }
  
}

export default PageModel;
