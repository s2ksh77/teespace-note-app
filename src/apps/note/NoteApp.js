import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import LNBMenuContainer from './components/lnb/lnb';
import useStore from './store/useStore';
import { GlobalStyle, LNBContainer, ContentContainer } from './GlobalStyles';
import PageEditorContainer from './components/page/pageEditorContainer';
import TagPanelContainer from './components/tag/tagMenu';

import i18next from './i18n';
import { I18nextProvider } from 'react-i18next';

const TeeNote = ({ i18n }) => {
  const targetChId = '56ab0ee1-54df-456d-8100-3bc7ee7ca087';
  const { NoteStore } = useStore();
  NoteStore.setChannelId(targetChId);

  return useObserver(() => (
    <I18nextProvider i18n={i18n ? i18n : i18next}>
      <GlobalStyle />
      <LNBContainer>
        <LNBMenuContainer />
      </LNBContainer>
      <ContentContainer>
        {NoteStore.showPage ? <PageEditorContainer /> : <TagPanelContainer />}
      </ContentContainer>
    </I18nextProvider>
  ));
};

export default TeeNote;
