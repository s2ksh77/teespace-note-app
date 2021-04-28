/* eslint-disable import/no-cycle */
import { action, computed, observable } from 'mobx';
import i18n from '../../i18n/i18n';
import ChapterModel from '../model/ChapterModel';
import NoteRepository from '../repository/NoteRepository';
import NoteStore from './NoteStore';

// @flow
class ChapterStore {
  @observable
  chapterList: $Shape<Array<ChapterModel>> = [];

  @observable
  newChapterVisible: Boolean = false;

  @observable
  chapterMap: Map<String, $Shape<ChapterModel>> = {};

  dragData: Map<string, Object> = new Map();

  isCtrlKeyDown: boolean = false;

  dragEnterChapterIdx: number;

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

  setIsCtrlKeyDown(isCtrlKeyDown: boolean) {
    this.isCtrlKeyDown = isCtrlKeyDown;
  }

  setDragEnterChapterIdx(dragEnterChapterIdx: number) {
    this.dragEnterChapterIdx = dragEnterChapterIdx;
  }

  @action
  async fetchChapterList() {
    const res = await NoteRepository.getChapterList();
    this.chapterList = res.map(chapter => new ChapterModel(chapter));
    // Server Chapter Map
    this.chapterMap = this.chapterList.reduce(
      (acc, chapter, idx) => acc.set(chapter.id, chapter),
      new Map(),
    );
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

  @action
  getSortedDragDataList() {
    const dragDataList = [...this.dragData].map(keyValue => keyValue[1]);
    return dragDataList.sort((a, b) => a.chapterIdx - b.chapterIdx);
  }

  @action
  moveChapter(targetChapterIdx: number) {}

  @action
  createNoteShareChapter(targetRoomId, targetChapterList) {
    if (!targetChapterList) return;

    const targetChId = NoteStore.getTargetChId(targetRoomId);
    const targetList = targetChapterList.map(chapter => {
      return {
        id: chapter.id,
        ws_id: NoteStore.roomId,
        note_channel_id: NoteStore.chId,
        text: chapter.text,
        color: chapter.color,
        USER_ID: NoteStore.userId,
        shared_user_id: NoteStore.userId,
        shared_room_name: NoteStore.roomId,
        target_workspace_id: targetRoomId,
        target_channel_id: targetChId,
      };
    });

    NoteRepository.createShareChapter(targetList).then(() => {
      this.fetchChapterList();
      NoteStore.setIsDragging(false);
    });
  }
}

export default new ChapterStore();
