import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const LayoutStateButton = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> LayoutStateButton </div>
    </>
  ));
};

export default LayoutStateButton;
