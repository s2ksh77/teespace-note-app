/* eslint-disable import/no-cycle */
import { action, observable } from 'mobx';
import ChapterModel from '../model/ChapterModel';
import NoteRepository from '../repository/NoteRepository';
// @flow
class ChapterStore {
  @observable
  chapterList: $Shape<Array<ChapterModel>> = [];

  @action
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
