import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const TagBody = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> TagBody </div>
    </>
  ));
};

export default TagBody;
