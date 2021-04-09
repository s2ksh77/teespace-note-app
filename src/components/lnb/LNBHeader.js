import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import {
  LNBHeaderContainer,
  BackButton,
  NewChapterButton,
  LNBSearchBar,
  LNBSearchInput,
  SearchCancelButton,
} from '../../styles/HeaderStyle';
import { TagItem, TagText, TagCancelButton, } from '../../styles/TagStyle';
import LayoutStateButton from '../common/LayoutStateButton';

const LNBHeader = () => {
  const { NoteStore, ChapterStore } = useNoteStore();

  return useObserver(() => (
    <LNBHeaderContainer>
      <BackButton />
      <NewChapterButton />
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
      <LayoutStateButton />
    </LNBHeaderContainer>
  ));
};

export default LNBHeader;
