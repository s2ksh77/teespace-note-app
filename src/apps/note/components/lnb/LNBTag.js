import React, { memo } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import tagImg from '../../assets/add_tag.svg';
import { LnbTagContainer, TagImg, TagTxt } from '../../styles/tagStyle';
import { DRAG_TYPE } from '../../GlobalVariable';
import { useTranslation } from 'react-i18next';

const LNBTag = memo(({ flexOrder }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { t } = useTranslation();
  const [, drop] = useDrop({
    accept: DRAG_TYPE.CHAPTER,
    drop: () => {
      ChapterStore.moveChapter(ChapterStore.chapterList.length - ChapterStore.sharedCnt);
    },
    hover() {
      if (ChapterStore.dragEnterChapterIdx !== ChapterStore.chapterList.length - ChapterStore.sharedCnt)
        ChapterStore.setDragEnterChapterIdx(ChapterStore.chapterList.length - ChapterStore.sharedCnt);
    },
  });

  const onClickTagMenuBtn = () => {
    if (!PageStore.isReadMode()) return;
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
          + (ChapterStore.dragEnterChapterIdx === ChapterStore.chapterList.length - ChapterStore.sharedCnt
            ? ' tagBorderTopLine'
            : '')
        }
        order={flexOrder}
        onClick={onClickTagMenuBtn}
      >
        <TagImg
          showTag={!NoteStore.showPage}
          src={tagImg}
          alt="tagImg"
        />
        <TagTxt>{t('NOTE_PAGE_LIST_CMPNT_DEF_06')}</TagTxt>
      </LnbTagContainer>
    </>
  ));
});

export default LNBTag;
