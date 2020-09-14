import React from 'react';
import LNBMenuContainer from './components/lnb/lnb';
import useStore from './store/useStore';
import { GlobalStyle, LNBContainer, ContentContainer } from './GlobalStyles';
import PageEditorContainer from './components/page/pageEditorContainer';
// import TagPanelContainer from './components/tag/tagMenu';
import TagMenuContainer from './components/tag/tagMenu';
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
        {/* {NoteStore.showPage ? <PageEditorContainer /> : <TagPanelContainer />} */}
         <PageEditorContainer /> 
      </ContentContainer>
    </>
  ));
};

export default TeeNote;
