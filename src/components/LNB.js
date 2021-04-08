import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../stores/useNoteStore';

const LNB = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> LNB </div>
    </>
  ));
};

export default LNB;
