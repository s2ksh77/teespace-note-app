import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const ForwardModal = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> ForwardModal </div>
    </>
  ));
};

export default ForwardModal;
