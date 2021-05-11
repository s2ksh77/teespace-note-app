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

const RecycleBin = ({ chapter, index, flexOrder }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  // 주의: ChapterStore.chapterList의 isFolded는 getNoteChapterList때만 정확한 정보 담고 있음
  const [isFolded, setIsFolded] = useState(true);
  const { id, children } = chapter;

  // When chapters/pages are dropped on recycle bin area
  const [, drop] = useDrop({
    accept: [],
    drop: () => {},
    hover() {
      if (ChapterStore.dragEnterChapterIdx !== index)
        ChapterStore.setDragEnterChapterIdx(index);
    },
  });

  const onClickRecycleBinBtn = () => {
    if (!PageStore.isReadMode()) return;

    ChapterStore.clearDragData();
    ChapterStore.setIsCtrlKeyDown(false);

    const pageId = children.length > 0 ? children[0].id : '';
    PageStore.setCurrentPageId(pageId);
    NoteStore.setShowPage(true);
    PageStore.fetchCurrentPageData(pageId);
    PageStore.clearDragData();
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
