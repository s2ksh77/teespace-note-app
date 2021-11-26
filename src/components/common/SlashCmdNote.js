import React from 'react';
import i18n from '../../i18n/i18n';
import useNoteStore from '../../store/useStore';
import NoteStore from '../../store/noteStore';
import ChapterStore from '../../store/chapterStore';
import PageStore from '../../store/pageStore';
import { logEvent, AuthStore } from 'teespace-core';
import { CHAPTER_TYPE } from '../../GlobalVariable';

const SlashCmdNote = () => {
  let chapterId = '';

  const getFirstChapterInfo = async (chId = NoteStore.getChannelId()) => {
    const targetItem = JSON.parse(localStorage.getItem('NoteSortData_' + chId));
    // 챕터가 하나라도 있는 경우
    if (!targetItem) return false;
    if (targetItem.length !== 0) {
      // 전달된 챕터인지 확인
      const chapterInfo = await ChapterStore.getChapterInfoList(targetItem[0].id);
      if (
        chapterInfo.type !== CHAPTER_TYPE.SHARED_PAGE &&
        chapterInfo.type !== CHAPTER_TYPE.SHARED
      ) {
        chapterId = targetItem[0].id;
        return true;
      } else {
        // 전달 받은거 밖에 없을 경우
        return false;
      }
    }
  };

  const _newPage = () => {
    PageStore.setCreatePageParent(chapterId);
    PageStore.createNotePage();
    NoteStore.setTargetLayout('Content');
    NoteStore.setShowPage(true);
    logEvent('note', 'clickNewPageBtn');
  };

  const _newChapter = async () => {
    ChapterStore.setChapterTitle(i18n.t('NOTE_PAGE_LIST_CMPNT_DEF_01'));
    ChapterStore.getChapterRandomColor();
    const { chapterId, pageId } = await ChapterStore.createNoteChapter();
    NoteStore.updateDragData(chapterId, pageId);
    logEvent('note', 'clickNewChapterBtn');
  };

  const createTarget = async () => {
    const isNewPage = await getFirstChapterInfo();
    if (isNewPage && AuthStore.hasPermission('notePage', 'C')) _newPage();
    else if (!isNewPage && AuthStore.hasPermission('noteChapter', 'C')) _newChapter();
  };

  const slashCmdInit = () => {
    createTarget();
  };

  slashCmdInit();
};

export default SlashCmdNote;
