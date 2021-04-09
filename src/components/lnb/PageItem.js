import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { PageWrapper, PageTitle, PageTitleInput } from '../../styles/PageStyle';
import ContextMenu from './Contextmenu';

const PageItem = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <PageWrapper>
      <PageTitle />
      <ContextMenu />
    </PageWrapper>
  ));
};

export default PageItem;
