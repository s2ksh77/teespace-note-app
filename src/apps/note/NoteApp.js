import React from 'react';
import LNBMenuContainer from './components/lnb';
import useStore from './store/useStore';
import { GlobalStyle, LNBContainer, ContentContainer } from './GlobalStyles';
import PageEditorContainer from './components/pageEditorContainer.js';
import TagMenuContainer from './components/tagMenu';
import { useObserver } from 'mobx-react';

const TeeNote = () => {
  const targetChId = '56ab0ee1-54df-456d-8100-3bc7ee7ca087';
  const { NoteStore } = useStore();
  NoteStore.setChannelId(targetChId);

  return useObserver(() => (
    <>
      <GlobalStyle />
      <LNBContainer>
        <LNBMenuContainer />
      </LNBContainer>
      <ContentContainer>
        {NoteStore.showPage ? <PageEditorContainer/> :<TagMenuContainer/>}
      </ContentContainer>
    </>
  ));
};

export default TeeNote;
