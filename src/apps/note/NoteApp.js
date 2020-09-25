import React from 'react';
import LNBContainer from './components/lnb/LNBContainer';
import useStore from './store/useStore';
import { GlobalStyle, LNB, Content } from './GlobalStyles';
import PageContainer from './components/page/PageContainer';
import TagContainer from './components/tag/TagContainer';
import { useObserver } from 'mobx-react';

const NoteApp = ({ layoutState }) => {
  const targetChId = 'c80a1e40-a699-40cb-b13c-e9ac702cc6d4';
  const { NoteStore } = useStore();
  NoteStore.setChannelId(targetChId);
  NoteStore.setLayoutState(layoutState)

  return useObserver(() => (
    <>
      <GlobalStyle />
      <LNB>
        <LNBContainer />
      </LNB>
      <Content>
        {NoteStore.showPage ? <PageContainer /> : <TagContainer />}
      </Content>
    </>
  ));
};

export default NoteApp;
