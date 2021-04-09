import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const Overlay = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> Overlay </div>
    </>
  ));
};

export default Overlay;
