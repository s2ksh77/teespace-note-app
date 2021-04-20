import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { PageWrapper, PageTitle, PageTitleInput } from '../../styles/PageStyle';
import ContextMenu from './ContextMenu';

const PageItem = ({ page }) => {
  const { NoteStore, PageStore } = useNoteStore();

  const handlePageClick = () => {
    PageStore.fetchNoteInfoList(page.id);
    if (NoteStore.isCollapsed) NoteStore.setTargetLayout('content');
  };

  return useObserver(() => (
    <PageWrapper onClick={handlePageClick}>
      <PageTitle>{page.text}</PageTitle>
      <ContextMenu />
    </PageWrapper>
  ));
};

export default PageItem;
