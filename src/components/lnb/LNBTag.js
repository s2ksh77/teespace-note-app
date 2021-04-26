import React from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';

import { LNBTagWrapper, LNBTagIcon, LNBTagText } from '../../styles/LNBStyle';
import tagIcon from '../../assets/add_tag.svg';

const LNBTag = () => {
  const { NoteStore, PageStore } = useNoteStore();
  const { t } = useTranslation();

  const handleClick = () => {
    if (!PageStore.pageModel.isReadMode) return;
    NoteStore.setIsPageContent(false);

    if (NoteStore.layoutState === 'collapse')
      NoteStore.setTargetLayout('content');
  };

  return useObserver(() => (
    <LNBTagWrapper
      className={
        !NoteStore.isPageContent ? 'selectedMenu' : ''
        // +
        // (ChapterStore.dragEnterChapterIdx ===
        // ChapterStore.chapterList.length - ChapterStore.sharedCnt
        //   ? ' tagBorderTopLine'
        //   : '')
      }
      onClick={handleClick}
    >
      <LNBTagIcon src={tagIcon} alt="tagImg" />
      <LNBTagText>{t('NOTE_PAGE_LIST_CMPNT_DEF_06')}</LNBTagText>
    </LNBTagWrapper>
  ));
};

export default LNBTag;
