import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const LNBTag = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> LNBTag </div>
    </>
  ));
};

export default LNBTag;
