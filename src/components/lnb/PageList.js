import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const PageList = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> PageList </div>
    </>
  ));
};

export default PageList;
