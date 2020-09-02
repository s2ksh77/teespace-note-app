import React from 'react';
import LNBMenuContainer from './components/lnb';
import useStore from './store/useStore';
import { GlobalStyle, LNBContainer, ContentContainer } from './GlobalStyles';
import EditorMenuContainer from './components/editor';

const TeeNote = () => {
  const targetChId = '56ab0ee1-54df-456d-8100-3bc7ee7ca087';
  const { NoteStore } = useStore();
  NoteStore.setChannelId(targetChId);
  return (
    <>
      <GlobalStyle />
      <LNBContainer>
        <LNBMenuContainer />
      </LNBContainer>
      <ContentContainer>
        <EditorMenuContainer />
      </ContentContainer>
    </>
  );
};

export default TeeNote;
