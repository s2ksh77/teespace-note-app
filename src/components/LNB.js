import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../stores/useNoteStore';

import { LNBContainer } from '../styles/LNBStyle';
import LNBHeader from './lnb/LNBHeader';
import LNBBody from './lnb/LNBBody';

const LNB = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <LNBContainer isExpanded={NoteStore.layoutState === 'expand'}>
      <LNBHeader />
      <LNBBody />
    </LNBContainer>
  ));
};

export default LNB;
