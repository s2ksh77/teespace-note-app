import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const LNBHeader = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> LNBHeader </div>
    </>
  ));
};

export default LNBHeader;
