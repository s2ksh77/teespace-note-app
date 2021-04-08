import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const LoadingContent = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> LoadingContent </div>
    </>
  ));
};

export default LoadingContent;
