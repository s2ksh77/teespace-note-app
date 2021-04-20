import { action, computed, observable } from 'mobx';
import PageModel from '../model/PageModel';
import TagModel from '../model/TagModel';
import NoteRepository from '../repository/NoteRepository';
import ChapterStore from './ChapterStore';
import NoteStore from './NoteStore';
// @flow
class PageStore {
  @observable
  isLoading: Boolean = false;

  @observable
  pageModel: $Shape<PageModel> = '';

  @observable
  tagModel: $Shape<TagModel> = '';

  setIsLoading(isLoading: Boolean) {
    this.isLoading = isLoading;
  }

  @action
  async fetchNoteInfoList(pageId: string) {
    const res = await NoteRepository.getNoteInfoList(pageId);
    this.pageModel = new PageModel(res);
    console.log(this.pageModel);
  }

  @action
  async fetchNoteTagList() {
    const res = await NoteRepository.fetchNoteTagList();
    this.tagModel = res.map(tag => new TagModel(tag));
    console.log(this.tagModel);
  }

  @action
  async createPage(pageName: string, pageContent: string, chapterId: string) {
    const res = await NoteRepository.createPage({
      pageName,
      pageContent,
      chapterId,
    });
    if (res) {
      await ChapterStore.fetchChapterList();
      if (NoteStore.isCollapsed) NoteStore.setTargetLayout('content');
    }
    this.pageModel = new PageModel(res);
    return this.pageModel;
  }

  @action
  async deletePage(pageList: Array<PageInfo>) {
    const res = await NoteRepository.deletepage(pageList);
    if (res) {
      await ChapterStore.fetchChapterList();
    }
    return new PageModel(res);
  }

  @action
  async renamePage(pageId: string, pageTitle: string, chapterId: string) {
    const res = await NoteRepository.renamePage({
      pageId,
      pageTitle,
      chapterId,
    });
    if (res) {
      await ChapterStore.fetchChapterList();
    }
    return new PageModel(res);
  }

  @action
  async movePage(pageId: String, chapterId: string) {
    const res = await NoteRepository.movePage({
      pageId,
      chapterId,
    });
    return new PageModel(res);
  }

  @action
  async editStart(pageId: String, chapterId: string) {
    const res = await NoteRepository.editStart({
      pageId,
      chapterId,
    });
    return new PageModel(res);
  }

  @action
  async editDone(updateModel: PageModel) {
    const res = await NoteRepository.editStart(updateModel);
    return new PageModel(res);
  }
}

export default new PageStore();
