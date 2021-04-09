import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { TagContainer } from '../../styles/TagStyle';
import TagHeader from './TagHeader';
import SearchingContent from '../common/SearchingContent';
import TagSearchResult from './TagSearchResult';
import NoContent from '../common/NoContent';
import TagBody from './TagBody';

const TagContent = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <TagContainer>
      <TagHeader />
      <TagBody />
    </TagContainer>
  ));
};

export default TagContent;
