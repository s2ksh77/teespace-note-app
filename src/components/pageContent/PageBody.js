import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { PageSubHeader } from '../../styles/EditorStyle';
import NoteEditor from './NoteEditor';
import PageFileList from './PageFileList';
import PageTagList from './PageTagList';
import ExportEditor from './ExportEditor';

const PageBody = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <PageSubHeader />
      <NoteEditor />
      <PageFileList />
      <PageTagList />
    </>
  ));
};

export default PageBody;
