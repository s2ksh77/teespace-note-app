import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const NoteEditor = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> NoteEditor </div>
    </>
  ));
};

export default NoteEditor;
