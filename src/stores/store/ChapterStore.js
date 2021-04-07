import { action, computed, observable } from 'mobx';
import ChapterModel, { convertModelToDto } from '../model/ChapterModel';
import PageModel from '../model/PageModel';
import NoteRepository from '../repository/NoteRepository';
// @flow
class ChapterStore {
  chapterList: [];

  async fetchChapterList() {
    const res = await NoteRepository.getChapterList();
    this.chapterList = res.map(chapter => new ChapterModel(chapter));
    console.log(this.chapterList);
    // 테스트용
    // const test = await NoteRepository.getNoteInfoList();
    // console.log(new PageModel(test));
  }
}

export default new ChapterStore();
