import React, { memo } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import tagImg from '../../assets/ts_tag@3x.png';
import { LnbTagContainer, TagImg, TagTxt } from '../../styles/tagStyle';

const LNBTag = memo(() => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

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
    if (PageStore.isEdit) return;
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
          showTag={!NoteStore.showPage}
          src={tagImg}
          alt="tagImg"
        />
        <TagTxt>태그</TagTxt>
      </LnbTagContainer>
    </>
  ));
});

export default LNBTag;
