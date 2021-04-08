import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const ShareNoteMessageContent = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> ShareNoteMessageContent </div>
    </>
  ));
};

export default ShareNoteMessageContent;
