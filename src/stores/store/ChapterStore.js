import { action, computed, observable } from 'mobx';
import ChapterModel from '../model/ChapterModel';
import NoteRepository from '../repository/NoteRepository';
// @flow
class ChapterStore {
  chapterList: [];

  async fetchChapterList() {
    const {
      data: {
        dto: { notbookList },
      },
    } = await NoteRepository.getChapterList();
    console.log(notbookList);
    this.chapterList = notbookList.map(chapter => new ChapterModel(chapter));
    console.log(this.chapterList);
  }
}

export default new ChapterStore();
