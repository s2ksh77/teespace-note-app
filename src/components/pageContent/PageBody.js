import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { PageBodyContainer } from '../../styles/EditorStyle';
import PageSubHeader from './PageSubHeader';
import Editor from './Editor';
import PageFileList from './PageFileList';
import PageTagList from './PageTagList';
import ExportEditor from './ExportEditor';

const PageBody = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <PageBodyContainer>
      <PageSubHeader />
      <Editor />
      <PageFileList />
      <PageTagList />
    </PageBodyContainer>
  ));
};

export default PageBody;
