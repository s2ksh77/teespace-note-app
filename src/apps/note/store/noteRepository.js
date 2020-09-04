const { default: axios } = require("axios");
const dotenv = require("dotenv");
dotenv.config();

class NoteRepository {
  URL = "http://222.122.50.70:8080/CMS/Note";
  WS_ID = "8050f1ba-0b42-4fe1-a3e4-c0647a47d019";
  CH_TYPE = "CHN0003";
  USER_ID = "431ef2dd-08fd-495d-b192-db6ecd899496";

  constructor(url) {
    this.URL = url || this.URL;
  }
  setChannelId(targetchId) {
    this.chId = targetchId;
  }
  getChannelId() {
    return this.chId;
  }
  getChapterList(chId) {
    return axios.get(
      `${this.URL}/noteChapter?action=List&note_channel_id=${chId}`
    );
  }
  getNoteInfoList(noteId) {
    return axios.get(
      `${this.URL}/noteinfo?action=List&note_id=${noteId}&note_channel_id=${this.chId}`
    );
  }
  getChapterColor(chapterId) {
    const { data } = axios.get(
      `${this.URL}/notebook?action=List&note_channel_id=${this.chId}&id=${chapterId}`
    );
    return data.color;
  }
  getChapterText(chapterId) {
    const { data } = axios.get(
      `${this.URL}/notebook?action=List&note_channel_id=${this.chId}&id=${chapterId}`
    );
    return data.text;
  }

  createPage(pageName, chapterId) {
    return axios.post(`${this.URL}/note`, {
      dto: {
        WS_ID: "8050f1ba-0b42-4fe1-a3e4-c0647a47d019",
        CH_TYPE: "CHN0003",
        USER_ID: "431ef2dd-08fd-495d-b192-db6ecd899496",
        note_channel_id: this.chId,
        user_name: "김수현B",
        note_title: pageName,
        is_edit: "431ef2dd-08fd-495d-b192-db6ecd899496",
        parent_notebook: chapterId,
      },
    });
  }

  editStart(noteId, chapterId) {
    return axios.post(`${this.URL}/note?action=Update`, {
      dto: {
        WS_ID: "8050f1ba-0b42-4fe1-a3e4-c0647a47d019",
        CH_TYPE: "CHN0003",
        USER_ID: "431ef2dd-08fd-495d-b192-db6ecd899496",
        note_channel_id: this.chId,
        user_name: "김수현b",
        note_id: noteId,
        is_edit: "431ef2dd-08fd-495d-b192-db6ecd899496",
        parent_notebook: chapterId,
        TYPE: "EDIT_START",
      },
    });
  }
  editDone(updateDto) {
    updateDto.dto.WS_ID = this.WS_ID;
    updateDto.dto.note_channel_id = this.chId;
    updateDto.dto.USER_ID = this.USER_ID;
    updateDto.dto.CH_TYPE = this.CH_TYPE;
    updateDto.dto.user_name = "김수현B";
    console.log(updateDto);
    return axios.post(`${this.URL}/note?action=Update`, updateDto);
  }
  nonEdit(noteId, chapterId) {
    return axios.post(`${this.URL}/note?action=Update`, {
      dto: {
        WS_ID: "8050f1ba-0b42-4fe1-a3e4-c0647a47d019",
        CH_TYPE: "CHN0003",
        USER_ID: "431ef2dd-08fd-495d-b192-db6ecd899496",
        note_channel_id: this.chId,
        note_id: noteId,
        is_edit: "",
        parent_notebook: chapterId,
        TYPE: "NONEDIT",
      },
    });
  }
}

export default new NoteRepository();
