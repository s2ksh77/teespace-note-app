/* eslint-disable import/no-cycle */
import { action, computed, observable } from 'mobx';
import i18n from '../../i18n/i18n';
import ChapterModel from '../model/ChapterModel';
import NoteRepository from '../repository/NoteRepository';
// @flow
class ChapterStore {
  @observable
  chapterList: $Shape<Array<ChapterModel>> = [];

  @observable
  newChapterVisible: Boolean = false;

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
    if (!chapterTitle) chapterTitle = i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_01');
    const res = await NoteRepository.createChapter({
      chapterTitle,
      chapterColor,
    });
    if (res) {
      await this.fetchChapterList();
    }
    return new ChapterModel(res);
  }

  @action
  async updateChapterColor(chapterId: string, chapterColor: string) {
    const res = await NoteRepository.updateChapterColor({
      chapterId,
      chapterColor,
    });
    if (res) {
      await this.fetchChapterList();
    }
    return new ChapterModel(res);
  }

  @action
  async deleteChapter(chapterId: string) {
    const res = await NoteRepository.deleteChapter(chapterId);
    if (res) {
      await this.fetchChapterList();
    }
    return new ChapterModel(res);
  }

  @action
  async renameChapter(chapterId: string, chapterTitle: string, color: string) {
    const res = await NoteRepository.renameChapter({
      chapterId,
      chapterTitle,
      chapterColor,
    });
    if (res) {
      await this.fetchChapterList();
    }
    return new ChapterModel(res);
  }

  @action
  setNewChapterVisible(bool: Boolean) {
    this.newChapterVisible = bool;
  }
}

export default new ChapterStore();
