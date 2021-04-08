import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const PageTagList = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> PageTagList </div>
    </>
  ));
};

export default PageTagList;
