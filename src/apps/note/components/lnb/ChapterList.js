import React, { useEffect } from 'react';
import useNoteStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import Chapter from '../chapter/Chapter';

const ChapterList = ({ type }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  useEffect(() => {
    (async () => {
      if (ChapterStore.chapterList.length === 0) {
        await ChapterStore.getChapterList();
        if (ChapterStore.chapterList.length === 0) {
          NoteStore.setShowPage(false);
          return null;
        }
        NoteStore.setShowPage(true);
        const chapterId = ChapterStore.chapterList[0]?.id;
        const pageId = ChapterStore.chapterList[0]?.children?.[0]?.id;
        ChapterStore.setCurrentChapterId(chapterId);
        await PageStore.setCurrentPageId(pageId);
      }
    })();
  }, []);

  return useObserver(() => (
    <>
      {ChapterStore.chapterList.length > 0 &&
        ChapterStore.chapterList.map((item, index) => (
          <Chapter key={item.id} chapter={item} index={index} />
        ))}
    </>
  ));
};
export default ChapterList;
