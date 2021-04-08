import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const SearchingImg = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> SearchingImg </div>
    </>
  ));
};

export default SearchingImg;
