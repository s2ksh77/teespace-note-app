import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const LNBSearchResult = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> LNBSearchResult </div>
    </>
  ));
};

export default LNBSearchResult;
