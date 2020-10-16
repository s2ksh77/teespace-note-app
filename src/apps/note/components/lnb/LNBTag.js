import React, { memo } from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react';
import tagImg from '../../assets/ts_tag@3x.png';
import useStore from '../../store/useStore';
import { LnbTagContainer, TagImg, TagTxt } from '../../styles/tagStyle';

const filterColor =
  'invert(43%) sepia(30%) saturate(7449%) hue-rotate(174deg) brightness(93%) contrast(101%)';

const LNBTag = memo(() => {
  const { NoteStore, ChapterStore } = useStore();

  const onClickTagMenuBtn = () => {
    NoteStore.setShowPage(false);
    if (NoteStore.layoutState === 'collapse') {
      NoteStore.setTargetLayout('Content');
    }
  };

  const onDragEnterTag = () => {
    if (ChapterStore.moveChapterIdx === '') return;

    ChapterStore.setDragEnterChapterIdx(ChapterStore.chapterList.length);
  };

  return useObserver(() => (
    <>
      <LnbTagContainer
        className={
          (!NoteStore.showPage ? 'selectedMenu' : '')
          + (ChapterStore.dragEnterChapterIdx === ChapterStore.chapterList.length ? 'tagBorderTopLine' : '')
        }
        onClick={onClickTagMenuBtn}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={onDragEnterTag.bind(null)}
        onDrop={() => ChapterStore.moveChapter(ChapterStore.chapterList.length)}
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
