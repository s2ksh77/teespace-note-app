import React, { useEffect } from 'react';
import PageStore from '../../store/pageStore';
import useNoteStore from '../../store/useStore';
import Chapter from '../chapter/Chapter';

// ChapterStore.chapterList가 바뀌면 상위 component인 LNBContainer가 다시 그려지니까 observer 뺌
const ChapterList = ({ type, isShared }) => {
  const { ChapterStore } = useNoteStore();

  const handleClickOutside = e => {
    if (!e.target.closest('.chapter-div') && ChapterStore.dragData.size > 1) {
      ChapterStore.handleClickOutside();
    }
    if (!e.target.closest('.page-li') && PageStore.dragData.size > 1) {
      PageStore.handleClickOutside();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);

  return (
    <>
      {ChapterStore.sortedChapterList[type].map((item, index) => (
        <Chapter key={item.id} chapter={item} index={index} isShared={isShared}/>
      ))}
    </>
  );
};
export default ChapterList;
