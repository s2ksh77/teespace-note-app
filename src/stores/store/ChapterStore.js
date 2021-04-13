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
  }

  @action
  async getChapterInfoList(chapterId: string) {
    const res = await NoteRepository.getChapterInfoList(chapterId);
    return new ChapterModel(res);
  }

  @action
  async createChapter(chapterTitle: string, chapterColor: string) {
    const res = await NoteRepository.createChapter({
      chapterTitle,
      chapterColor,
    });
    return new ChapterModel(res);
  }

  @action
  async updateChapterColor(chapterId: string, chapterColor: string) {
    const res = await NoteRepository.updateChapterColor({
      chapterId,
      chapterColor,
    });
    return new ChapterModel(res);
  }

  @action
  async deleteChapter(chapterId: string) {
    const res = await NoteRepository.deleteChapter(chapterId);
    return new ChapterModel(res);
  }

  @action
  async renameChapter(chapterId: string, chapterTitle: string, color: string) {
    const res = await NoteRepository.renameChapter({
      chapterId,
      chapterTitle,
      chapterColor,
    });
    return new ChapterModel(res);
  }
}

export default new ChapterStore();
