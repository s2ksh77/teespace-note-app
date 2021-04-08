import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const TagSearchResult = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> TagSearchResult </div>
    </>
  ));
};

export default TagSearchResult;
