import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const ViewInfoModal = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> ViewInfoModal </div>
    </>
  ));
};

export default ViewInfoModal;
