import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const NoteModal = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> NoteModal </div>
    </>
  ));
};

export default NoteModal;
