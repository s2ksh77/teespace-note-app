import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../stores/useNoteStore';

const Content = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> Content </div>
    </>
  ));
};

export default Content;
