import { observable } from 'mobx';
import ChapterModel from '../model/ChapterModel';
import NoteRepository from '../repository/NoteRepository';

const ChapterStore = observable({
  chapterList: [],

  async fetchChapterList(chId: string) {
    console.log(chId);
    const {
      data: {
        dto: { notbookList },
      },
    } = await NoteRepository.getChapterList(chId);
    console.log(notbookList);
    this.chapterList = notbookList.map(chapter => new ChapterModel(chapter));

    console.log(this.chapterList);
  },
});

export default ChapterStore;
