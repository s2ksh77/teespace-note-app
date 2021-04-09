import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { PageContainer } from '../../styles/EditorStyle';
import PageHeader from './PageHeader';
import PageBody from './PageBody';

const PageContent = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <PageContainer>
      <PageHeader />
      <PageBody />
    </PageContainer>
  ));
};

export default PageContent;
