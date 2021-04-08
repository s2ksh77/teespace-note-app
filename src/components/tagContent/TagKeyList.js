import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const TagKeyList = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> TagKeyList </div>
    </>
  ));
};

export default TagKeyList;
