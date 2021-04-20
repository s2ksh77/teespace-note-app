import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../stores/useNoteStore';

import { LNBContainer } from '../styles/LNBStyle';
import LNBHeader from './lnb/LNBHeader';
import LNBBody from './lnb/LNBBody';

const LNB = () => {
  const { NoteStore } = useNoteStore();

  const isLNBVisible = () => {
    return (
      (NoteStore.isCollapsed && NoteStore.isTargetLayout('lnb')) ||
      (!NoteStore.isCollapsed && !NoteStore.isContentExpanded)
    );
  };

  return useObserver(() => (
    <LNBContainer
      isVisible={isLNBVisible()}
      isExpanded={!NoteStore.isCollapsed}
    >
      <LNBHeader />
      <LNBBody />
    </LNBContainer>
  ));
};

export default LNB;
