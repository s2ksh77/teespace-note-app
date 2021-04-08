import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const PageBody = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> PageBody </div>
    </>
  ));
};

export default PageBody;
