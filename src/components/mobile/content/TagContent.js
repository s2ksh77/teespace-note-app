import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import TagContainer from '../../tag/TagContainer';

const TagContent = () => {
  const { ChapterStore, PageStore } = useNoteStore();

  return useObserver(() => <TagContainer />);
};

export default TagContent;
