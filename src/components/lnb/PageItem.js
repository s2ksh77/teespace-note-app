import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const PageItem = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> PageItem </div>
    </>
  ));
};

export default PageItem;
