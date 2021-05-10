import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import { useDrop } from 'react-dnd';
import useNoteStore from '../../store/useStore';
import ChapterText from './ChapterText';
import PageList from '../page/PageList';
import {
  ChapterContainer,
  ChapterCover,
  ChapterShareIcon,
} from '../../styles/chpaterStyle';
import trashImg from '../../assets/trash.svg';
import { DRAG_TYPE } from '../../GlobalVariable';
import NoteUtil from '../../NoteUtil';

const RecycleBin = ({ chapter, index, flexOrder, isShared }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  // 주의: ChapterStore.chapterList의 isFolded는 getNoteChapterList때만 정확한 정보 담고 있음
  const [isFolded, setIsFolded] = useState(true);
  const { id, children } = chapter;

  // When chapters/pages are dropped on recycle bin area
  const [, drop] = useDrop({
    accept: [
      DRAG_TYPE.CHAPTER,
      DRAG_TYPE.PAGE,
      DRAG_TYPE.SHARED_CHAPTER,
      DRAG_TYPE.SHARED_PAGE,
    ],
    drop: () => {},
    hover() {
      if (ChapterStore.dragEnterChapterIdx !== index)
        ChapterStore.setDragEnterChapterIdx(index);
    },
  });

  const onClickRecycleBinBtn = () => {
    if (!PageStore.isReadMode()) return;

    PageStore.setIsRecycleBin(true);
    ChapterStore.clearMoveInfoMap();
    ChapterStore.setIsCtrlKeyDown(false);
    ChapterStore.setCurrentChapterId(id);
    const pageId = children.length > 0 ? children[0].id : '';
    PageStore.setCurrentPageId(pageId);
    NoteStore.setShowPage(true);
    PageStore.fetchCurrentPageData(pageId);
    if (pageId)
      PageStore.setMoveInfoMap(
        new Map([
          [
            pageId,
            {
              item: children[0],
              pageIdx: 0,
              chapterId: id,
              chapterIdx: index,
            },
          ],
        ]),
      );
    else PageStore.clearMoveInfoMap();
    PageStore.setIsCtrlKeyDown(false);
  };

  const handleFoldBtnClick = e => {
    e.stopPropagation();
    setIsFolded(!isFolded);
  };

  return useObserver(() => (
    <ChapterContainer
      ref={drop}
      className={isFolded ? 'folded ' : ''}
      key={id}
      order={flexOrder}
    >
      <ChapterCover
        className={`chapter-div${
          id === ChapterStore.currentChapterId ? ' selectedMenu' : ''
        }`}
        onClick={onClickRecycleBinBtn}
      >
        <ChapterShareIcon src={trashImg} />
        <ChapterText
          chapter={chapter}
          index={index}
          handleFoldBtnClick={handleFoldBtnClick}
          isFolded={isFolded}
        />
      </ChapterCover>
      <PageList showNewPage={false} chapter={chapter} chapterIdx={index} />
    </ChapterContainer>
  ));
};

export default RecycleBin;
