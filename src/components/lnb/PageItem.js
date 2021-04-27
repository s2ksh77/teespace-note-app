import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { PageWrapper, PageTitle, PageTitleInput } from '../../styles/PageStyle';
import ContextMenu from './ContextMenu';

const PageItem = ({ page }) => {
  const { NoteStore, PageStore } = useNoteStore();

  const handlePageClick = async () => {
    await PageStore.fetchNoteInfoList(page.id);
    PageStore.fetchNoteTagList(page.id);
    NoteStore.setIsPageContent(true);
    if (NoteStore.isCollapsed) NoteStore.setTargetLayout('content');
  };

  return useObserver(() => (
    <PageWrapper
      className={
        NoteStore.isPageContent && PageStore.pageModel.id === page.id
          ? 'selected'
          : ''
      }
      onClick={handlePageClick}
    >
      <PageTitle>{page.text}</PageTitle>
      <ContextMenu />
    </PageWrapper>
  ));
};

export default PageItem;
