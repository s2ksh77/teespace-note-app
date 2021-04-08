import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const PageFileList = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> PageFileList </div>
    </>
  ));
};

export default PageFileList;
