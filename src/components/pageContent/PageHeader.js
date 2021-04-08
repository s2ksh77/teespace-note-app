import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const PageHeader = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> PageHeader </div>
    </>
  ));
};

export default PageHeader;
