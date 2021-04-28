import { action, computed, flow, observable } from 'mobx';
import PageModel from '../model/PageModel';
import TagModel from '../model/TagModel';
import NoteRepository from '../repository/NoteRepository';
import ChapterStore from './ChapterStore';
import NoteStore from './NoteStore';

// @flow
class PageStore {
  @observable
  isLoading: boolean = false;

  @observable
  pageModel: $Shape<PageModel> = '';

  @observable
  tagList: Array<$Shape<TagModel>> = [];

  dragData: Map<string, object> = new Map();

  isCtrlKeyDown: boolean = false;

  @action
  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @action
  setPageModel(data) {
    this.pageModel = new PageModel(data);
  }

  getDragData() {
    return this.dragData;
  }

  setDragData(dragData: Map<string, object>) {
    this.dragData = dragData;
  }

  appendDragData(key: string, value: object) {
    this.dragData.set(key, value);
  }

  deleteDragData(key: string) {
    this.dragData.delete(key);
  }

  clearDragData() {
    this.dragData.clear();
  }

  setIsCtrlKeyDown(isCtrlKeyDown) {
    this.isCtrlKeyDown = isCtrlKeyDown;
  }

  @action
  async fetchNoteInfoList(pageId: string) {
    const res = await NoteRepository.getNoteInfoList(pageId);
    this.pageModel = new PageModel(res);
    console.log(this.pageModel);
  }

  @action
  async fetchNoteTagList(pageId: string) {
    const res = await NoteRepository.fetchNoteTagList(pageId);
    this.tagList = res.map(tag => new TagModel(tag));
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

  deletePage = flow(function* deletePage(pageList: Array<PageInfo>) {
    const res = yield NoteRepository.deletePage(pageList);
    if (res) {
      yield ChapterStore.fetchChapterList();
    }
    return new PageModel(res);
  });

  renamePage = flow(function* renamePage({
    pageId,
    pageTitle,
    chapterId,
  }: {
    pageId: string,
    pageTitle: string,
    chapterId: string,
  }) {
    const res = yield NoteRepository.renamePage({
      pageId,
      pageTitle,
      chapterId,
    });
    if (res) {
      yield ChapterStore.fetchChapterList();
    }
    return new PageModel(res);
  });

  @action
  async movePage(pageId: String, chapterId: string) {
    const res = await NoteRepository.movePage({
      pageId,
      chapterId,
    });
    return new PageModel(res);
  }

  @action
  async editStart(pageId: string, chapterId: string) {
    const res = await NoteRepository.editStart({
      pageId,
      chapterId,
      title: this.pageModel.name,
      content: this.pageModel.content,
      textContent: this.pageModel.textContent,
    });
    if (res) this.pageModel = new PageModel(res);
    return this.pageModel;
  }

  @action
  async editDone(dto: object) {
    const res = await NoteRepository.editDone(dto);
    if (res) this.pageModel = new PageModel(res);
    return this.pageModel;
  }
}

export default new PageStore();
