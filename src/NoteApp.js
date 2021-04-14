import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import useNoteStore from './stores/useNoteStore';

import LNB from './components/LNB';
import Content from './components/Content';
import { ContentWrapper, ContentFoldButton } from './styles/EditorStyle';

const NoteApp = ({ layoutState, roomId, channelId, language }) => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { userStore, spaceStore, authStore } = useCoreStores();
  const { id: userId, name: userName, email: userEmail } = userStore.myProfile;

  useEffect(() => {
    NoteStore.init({
      roomId,
      chId: channelId,
      userId,
      userName,
      userEmail,
    });
    ChapterStore.fetchChapterList();
  }, [roomId, channelId]);

  useEffect(() => {
    NoteStore.setLayoutState(layoutState);
  }, [layoutState]);

  return useObserver(() => (
    <>
      <LNB />
      <ContentWrapper show={layoutState === 'expand'}>
        <ContentFoldButton />
        <Content />
      </ContentWrapper>
    </>
  ));
};

export { NoteApp };
