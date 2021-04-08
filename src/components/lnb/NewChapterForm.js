import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

const NewChaperForm = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div> NewChaperForm </div>
    </>
  ));
};

export default NewChaperForm;
