import React from 'react';
import LNBContainer from './components/lnb/LNBContainer';
import useStore from './store/useStore';
import { GlobalStyle, LNB, Content } from './GlobalStyles';
import PageContainer from './components/page/PageContainer';
import TagContainer from './components/tag/TagContainer';
import { useObserver } from 'mobx-react';

const NoteApp = () => {
  const targetChId = '56ab0ee1-54df-456d-8100-3bc7ee7ca087';
  const { NoteStore } = useStore();
  NoteStore.setChannelId(targetChId);

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
