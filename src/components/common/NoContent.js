import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const NoContent = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> NoContent </div>
    </>
  ));
};

export default NoContent;
