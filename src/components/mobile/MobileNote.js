import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { WWMS, useCoreStores, Toast, ComponentStore } from 'teespace-core';
import { useObserver } from 'mobx-react';
import i18n from '../../i18n/i18n';
import useNoteStore from '../../store/useStore';

import { LNBWrapper as Wrapper } from '../../styles/lnbStyle';
import LNBContainer from './lnb/LNBContainer';
import ListViewContainer from './listview/ListViewContainer';
import SearchContainer from './lnb/SearchContainer';
import ContentContainer from './content/ContentContainer';

const NoteApp = ({ layoutState, roomId, channelId, language, appType = 'wapl' }) => {
  const { NoteStore, ChapterStore, EditorStore, PageStore } = useNoteStore();
  const { userStore, spaceStore, authStore, configStore } = useCoreStores();
  const { id: userId, name: userName, email: userEmail } = userStore.myProfile;

  const Container = ({ targetLayout }) => {
    switch (targetLayout) {
      case 'List':
        return <ListViewContainer />;
      case 'Search':
        return <SearchContainer />;
      case 'Editor':
      case 'Tag':
        return <ContentContainer />;
      default:
        return <LNBContainer />;
    }
  };

  const fetchData = async () => {
    await ChapterStore.getChapterList();
  };

  useEffect(() => {
    if (!channelId) return;
    NoteStore.init(
      roomId,
      channelId,
      userId,
      userName,
      userEmail,
      NoteStore.addWWMSHandler(authStore.sessionInfo.deviceType === 'PC'),
    );
    fetchData();
    PageStore.checkEditingPage();

    return () => {
      EditorStore.setInitialSearchState();
      NoteStore.initVariables();
      WWMS.removeHandler('CHN0003', 'NoteWWMSHandler');
      NoteStore.setTargetLayout('LNB');
    };
  }, [roomId, channelId]);

  useEffect(() => {
    if (!language) return;
    const editorLanguage = language === 'en' ? language : 'ko_KR';
    NoteStore.setI18nLanguage(editorLanguage);
    if (EditorStore.tinymce)
      EditorStore.tinymce.editorManager.i18n.setCode(editorLanguage);
  }, [language]);

  useEffect(() => {
    NoteStore.setLayoutState(layoutState);
  }, [layoutState]);

  return useObserver(() => (
    <I18nextProvider i18n={i18n}>
      <Wrapper>
        <Container targetLayout={NoteStore.targetLayout} />
      </Wrapper>
    </I18nextProvider>
  ));
};

export default NoteApp;
