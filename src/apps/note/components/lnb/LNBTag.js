import React, { memo } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import tagImg from '../../assets/ts_tag@3x.png';
import { LnbTagContainer, TagImg, TagTxt } from '../../styles/tagStyle';

const filterColor =
  'invert(43%) sepia(30%) saturate(7449%) hue-rotate(174deg) brightness(93%) contrast(101%)';

const LNBTag = memo(() => {
  const { NoteStore, ChapterStore } = useStore();

  const [, drop] = useDrop({
    accept: 'chapter',
    drop: () => {
      ChapterStore.moveChapter(ChapterStore.chapterList.length);
    },
    hover() {
      if (ChapterStore.dragEnterChapterIdx !== ChapterStore.chapterList.length)
        ChapterStore.setDragEnterChapterIdx(ChapterStore.chapterList.length);
    },
  });

  const onClickTagMenuBtn = () => {
    NoteStore.setShowPage(false);
    if (NoteStore.layoutState === 'collapse') {
      NoteStore.setTargetLayout('Content');
    }
  };

  return useObserver(() => (
    <>
      <LnbTagContainer
        ref={drop}
        className={
          (!NoteStore.showPage 
            ? 'selectedMenu' 
            : '')
          + (ChapterStore.dragEnterChapterIdx === ChapterStore.chapterList.length
            ? ' tagBorderTopLine'
            : '')
        }
        onClick={onClickTagMenuBtn}
      >
        <TagImg
          filter={!NoteStore.showPage ? filterColor : ''}
          src={tagImg}
          alt="tagImg"
        />
        <TagTxt>태그</TagTxt>
      </LnbTagContainer>
    </>
  ));
});

export default LNBTag;
