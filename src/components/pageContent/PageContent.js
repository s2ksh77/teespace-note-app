import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import {
  PageContainer,
  ContentFoldButton,
  ContentFoldButtonIcon,
} from '../../styles/EditorStyle';
import foldIcon from '../../assets/arrow_back_1.svg';
import PageHeader from './PageHeader';
import PageBody from './PageBody';

const PageContent = () => {
  const { NoteStore } = useNoteStore();

  const handleFoldBtnClick = () => {
    NoteStore.toggleIsContentExpanded();
  };

  return useObserver(() => (
    <PageContainer>
      <ContentFoldButton
        show={!NoteStore.isCollapsed}
        onClick={handleFoldBtnClick}
        isContentExpanded={NoteStore.isContentExpanded}
      >
        <ContentFoldButtonIcon src={foldIcon} />
      </ContentFoldButton>
      <PageHeader />
      <PageBody />
    </PageContainer>
  ));
};

export default PageContent;
