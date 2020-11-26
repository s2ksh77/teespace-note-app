import React, { useCallback } from 'react';
import useNoteStore from '../../store/useStore';
import { observer } from 'mobx-react';
import Chapter from '../chapter/Chapter';

const ChapterList = observer(({ type }) => {
  const { ChapterStore, NoteStore, PageStore } = useNoteStore();

  let targetList;
  switch (type) {
    case "shared_page":
      targetList = ChapterStore.chapterList.filter((chapter) => chapter.type === "shared_page");
      break;
    case "shared":
      targetList = ChapterStore.chapterList.filter((chapter) => chapter.type === "shared");
      break;
    default:
      targetList = ChapterStore.chapterList.filter((chapter) => !['shared', 'shared_page'].includes(chapter.type));
      break;
  }

  return (
    <>
      {targetList.length > 0 &&
        targetList.map((item, index) => (
          <Chapter key={item.id} chapter={item} index={index} />
        ))}
    </>
  );
});
export default ChapterList;
