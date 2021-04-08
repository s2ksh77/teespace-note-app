import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const TagHeader = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> TagHeader </div>
    </>
  ));
};

export default TagHeader;
