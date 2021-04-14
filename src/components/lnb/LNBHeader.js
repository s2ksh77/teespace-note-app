import React from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';

import {
  LNBHeaderContainer,
  BackButton,
  NewChapterButton,
  LNBSearchBar,
  LNBSearchInput,
  SearchCancelButton,
} from '../../styles/HeaderStyle';
import { TagItem, TagText, TagCancelButton } from '../../styles/TagStyle';
import LayoutStateButton from '../common/LayoutStateButton';
import backBtn from '../../assets/arrow_back_1.svg';

const LNBHeader = () => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { t } = useTranslation();
  // Back Btn TODO
  return useObserver(() => (
    <LNBHeaderContainer>
      <BackButton src={backBtn} style={{ display: 'none' }} />
      <NewChapterButton>{t('NOTE_PAGE_LIST_CMPNT_DEF_01')}</NewChapterButton>
      <LNBSearchBar>
        {ChapterStore.isTagSearching ? (
          <TagItem>
            <TagText />
            <TagCancelButton />
          </TagItem>
        ) : (
          <LNBSearchInput />
        )}
        <SearchCancelButton />
      </LNBSearchBar>
      {NoteStore.layoutState === 'collapse' && <LayoutStateButton />}
    </LNBHeaderContainer>
  ));
};

export default LNBHeader;
