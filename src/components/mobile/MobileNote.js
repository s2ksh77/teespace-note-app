import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { WWMS, useCoreStores, Toast, ComponentStore } from 'teespace-core';
import { Note } from './MobileNote';
import i18n from '../../i18n/i18n';
import LNBContainer from './lnb/LNBContainer';
import useNoteStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import ListViewContainer from './listview/ListViewContainer';
import ContentContainer from './content/ContentContainer';
import { LNBWrapper as Wrapper } from '../../styles/lnbStyle';

const NoteApp = ({ layoutState, roomId, channelId, language, appType = 'wapl' }) => {
  const { NoteStore, ChapterStore, EditorStore, PageStore } = useNoteStore();
  const { userStore, spaceStore, authStore, configStore } = useCoreStores();
  const { id: userId, name: userName, email: userEmail } = userStore.myProfile;

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
      NoteStore.addWWMSHandler(authStore.sessionInfo.deviceType === 'PC' ? true : false),
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
        {NoteStore.targetLayout === null || NoteStore.targetLayout === 'LNB' ? (
          <LNBContainer />
        ) : NoteStore.targetLayout === 'LIST' ? (
          <ListViewContainer />
        ) : (
          <ContentContainer />
        )}
      </Wrapper>
    </I18nextProvider>
  ));
};

export default NoteApp;
