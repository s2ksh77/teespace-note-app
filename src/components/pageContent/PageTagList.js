import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { PageTagListWrapper } from '../../styles/TagStyle';

const PageTagList = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <PageTagListWrapper>PageTagList</PageTagListWrapper>
  ));
};

export default PageTagList;
