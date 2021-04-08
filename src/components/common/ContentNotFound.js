import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const ContentNotFound = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> ContentNotFound </div>
    </>
  ));
};

export default ContentNotFound;
