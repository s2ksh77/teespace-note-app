import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';
import TagContentContainer from './TagContentContainer';
import { TagContentCover } from '../../styles/tagStyle';
import TagHeader from './TagHeader';
import TagNotFound from './TagNotFound'

const TagContainer = () => {

  useEffect(() => {
    TagStore.getAllSortedTagList();
  }, [])

  return useObserver(() => (
    <>
      <TagHeader />
      <TagContentCover>
        {(TagStore.hasTag) ? <TagContentContainer /> : <TagNotFound />}
      </TagContentCover>
    </>
  ));
};

export default TagContainer;
