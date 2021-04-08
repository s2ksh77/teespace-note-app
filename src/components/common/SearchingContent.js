import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const SearchingContent = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> SearchingContent </div>
    </>
  ));
};

export default SearchingContent;
