import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';
import { HeaderContainer } from '../../styles/HeaderStyle';

const TagHeader = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <HeaderContainer> TagHeader </HeaderContainer>
    </>
  ));
};

export default TagHeader;
