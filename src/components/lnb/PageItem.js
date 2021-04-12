import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { PageWrapper, PageTitle, PageTitleInput } from '../../styles/PageStyle';
import ContextMenu from './ContextMenu';

const PageItem = ({ page }) => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <PageWrapper>
      <PageTitle>{page.text}</PageTitle>
      <ContextMenu />
    </PageWrapper>
  ));
};

export default PageItem;
