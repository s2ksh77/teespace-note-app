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

  dragEnterChapterIdx: number;

  dragEnterPageIdx: number;

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

  setDragEnterChapterIdx(dragEnterChapterIdx: number) {
    this.dragEnterChapterIdx = dragEnterChapterIdx;
  }

  setDragEnterPageIdx(dragEnterPageIdx: number) {
    this.dragEnterPageIdx = dragEnterPageIdx;
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

  @action
  getSortedDragDataList() {
    const dragDataList = [...this.dragData].map(keyValue => keyValue[1]);
    return dragDataList.sort((a, b) => {
      if (a.chapterIdx === b.chapterIdx) return a.pageIdx - b.pageIdx;
      return a.chapterIdx - b.chapterIdx;
    });
  }

  @action
  async movePage(
    targetChapterId: string,
    targetChapterIdx: number,
    targetPageIdx: number,
  ) {}

  @action
  // eslint-disable-next-line class-methods-use-this
  createSharePage(targetRoomId: string, targetPageList: Array<object>) {
    if (!targetPageList) return;

    const targetChId = NoteStore.getTargetChId(targetRoomId);
    const targetTalkChId = NoteStore.getTargetChId(targetRoomId, 'CHN0001');
    const targetList = targetPageList.map(page => {
      console.log(page);
      return {
        WS_ID: NoteStore.roomId,
        note_id: page.note_id || page.id,
        note_title: page.text,
        modified_date: page.date,
        note_channel_id: NoteStore.chId,
        USER_ID: NoteStore.userId,
        shared_user_id: NoteStore.userId,
        shared_room_name: NoteStore.roomId,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId,
        messenger_id: targetTalkChId,
      };
    });

    NoteRepository.createSharePage(targetList).then(() => {
      ChapterStore.fetchChapterList();
      NoteStore.setIsDragging(false);
    });
  }
}

export default new PageStore();
