import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { PageFileListWrapper } from '../../styles/EditorStyle';

const PageFileList = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <PageFileListWrapper>PageFileList</PageFileListWrapper>
  ));
};

export default PageFileList;
