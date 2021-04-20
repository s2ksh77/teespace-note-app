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
  const { NoteStore, PageStore, EditorStore } = useNoteStore();

  return useObserver(() => (
    <PageBodyContainer
      isReadMode={PageStore.pageModel.isReadMode}
      isSearching={EditorStore.isSearching}
    >
      <PageSubHeader />
      <Editor />
      {/* <PageFileList /> */}
      <PageTagList />
    </PageBodyContainer>
  ));
};

export default PageBody;
