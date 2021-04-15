import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const Editor = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> Editor </div>
    </>
  ));
};

export default Editor;
