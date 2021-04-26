import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { TagContainer } from '../../styles/TagStyle';
import TagHeader from './TagHeader';
import TagBody from './TagBody';
import SearchingContent from '../common/SearchingContent';
import TagSearchResult from './TagSearchResult';
import NoContent from '../common/NoContent';
import LoadingContent from '../common/LoadingContent';

const TagContent = () => {
  const { TagStore } = useNoteStore();
  useEffect(() => {
    TagStore.getTagCategory();
  }, []);

  const RenderBody = () => {
    if (TagStore.isSearchLoading) return <SearchingContent />;
    if (TagStore.isSearching) return <TagSearchResult />;
    if (TagStore.isLoading) return <LoadingContent />;
    if (TagStore.isNoTag) return <NoContent />;
    return <TagBody />;
  };
  return useObserver(() => (
    <TagContainer>
      <TagHeader />
      {RenderBody()}
    </TagContainer>
  ));
};

export default TagContent;
