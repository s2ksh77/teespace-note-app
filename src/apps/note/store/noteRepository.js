const { default: axios } = require('axios');
const dotenv = require('dotenv');
dotenv.config();

class NoteRepository {
  URL = 'http://222.122.50.70:8080/CMS/Note';

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
      `${this.URL}/noteChapter?action=List&note_channel_id=${chId}`,
    );
  }
  getNoteInfoList(noteId) {
    return axios.get(
      `${this.URL}/noteinfo?action=List&note_id=${noteId}&note_channel_id=${this.chId}`,
    );
  }
  getChapterColor(chapterId) {
    const { data } = axios.get(
      `${this.URL}/notebook?action=List&note_channel_id=${this.chId}&id=${chapterId}`,
    );
    return data.color;
  }
  getChapterText(chapterId) {
    const { data } = axios.get(
      `${this.URL}/notebook?action=List&note_channel_id=${this.chId}&id=${chapterId}`,
    );
    return data.text;
  }
}

export default new NoteRepository();
