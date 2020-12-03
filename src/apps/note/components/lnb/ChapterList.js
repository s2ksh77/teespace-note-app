import React from 'react';
import useNoteStore from '../../store/useStore';
import Chapter from '../chapter/Chapter';

// ChapterStore.chapterList가 바뀌면 상위 component인 LNBContainer가 다시 그려지니까 observer 뺌
const ChapterList = ({ type, isShared }) => {
  const { ChapterStore } = useNoteStore();

  return (
    <>
      {ChapterStore.sortedChapterList[type].map((item, index) => (
        <Chapter key={item.id} chapter={item} index={index} isShared={isShared}/>
      ))}
    </>
  );
};
export default ChapterList;
