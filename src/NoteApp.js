import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import useNoteStore from './stores/useNoteStore';

import GlobalStyle from './GlobalStyles';
import GlobalVariable from './utils/GlobalVariable';
import LNB from './components/LNB';
import Content from './components/Content';

const NoteApp = ({ layoutState, roomId, channelId, language }) => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { userStore, spaceStore, configStore } = useCoreStores();
  const history = useHistory();

  useEffect(() => {
    if (NoteStore.roomId !== roomId) {
      const {
        id: userId,
        name: userName,
        email: userEmail,
      } = userStore.myProfile;
      const isBasicPlan = spaceStore.currentSpace?.plan === 'BASIC';

      NoteStore.init({
        roomId,
        chId: channelId,
        userId,
        userName,
        userEmail,
      });

      GlobalVariable.setIsBasicPlan(isBasicPlan);
      GlobalVariable.setIsMailApp(
        !isBasicPlan &&
          configStore.isActivateComponent('Note', 'customLink:openLink'),
      );
      // NoteStore.setLoadingNoteApp(false);
      // NoteStore.initVariables();

      if (!channelId) return;
      if (NoteStore.metaTagNoteId) {
        // NoteStore.openNote(NoteStore.metaTagNoteId);
      } else {
        ChapterStore.fetchChapterList();
        if (layoutState === 'collapse') NoteStore.setTargetLayout('lnb');
        else NoteStore.setTargetLayout('both');
      }
    }

    return () => {
      if (
        history.location.search.includes('note') &&
        history.location.pathname.includes(roomId)
      )
        return;
      NoteStore.setRoomId('');
      NoteStore.setChId('');
      NoteStore.setLayoutState('collapse');
      NoteStore.setIsContentExpanded(false);
    };
  }, [roomId, channelId]);

  useEffect(() => {
    NoteStore.setLayoutState(layoutState);
  }, [layoutState]);

  return useObserver(() => (
    <>
      <GlobalStyle />
      <LNB />
      <Content />
    </>
  ));
};

export { NoteApp };
