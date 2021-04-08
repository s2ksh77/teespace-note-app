import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const ExportEditor = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> ExportEditor </div>
    </>
  ));
};

export default ExportEditor;
