import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const ChapterItem = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> ChapterItem </div>
    </>
  ));
};

export default ChapterItem;
