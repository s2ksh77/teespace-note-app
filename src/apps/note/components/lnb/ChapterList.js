import React, { useEffect } from 'react';
import useNoteStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import Chapter from '../chapter/Chapter';

const ChapterList = ({ type }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  useEffect(() => {
    ChapterStore.fetchChapterList();
  });

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
