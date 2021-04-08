import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const ContextMenu = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> ContextMenu </div>
    </>
  ));
};

export default ContextMenu;
