import { observable, action, set, computed } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class TagModel {
    @observable
    note_id : string;
  
    @observable
    tag_id : string;
  
    @observable
    text : string;

    constructor(data: Object) {
      this.setValues(data);
    }

    @action
    setValues(data: Object) {
      set(this, data);
    }

    @action
    setNoteId(data: string) {
      this.note_id = data;
    }
  
    @action
    setTagId(data: string) {
      this.tag_id = data;
    }

    @action
    setTagText(data: string) {
      this.text = data;
    }
}

export default TagModel;
