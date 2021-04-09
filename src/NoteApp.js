import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import NoteStore from './stores/store/NoteStore';
import { useCoreStores } from 'teespace-core';
import ChapterStore from './stores/store/ChapterStore';
import useNoteStore from './stores/useNoteStore';

import LNB from './components/LNB';
import Content from './components/Content';
import { ContentWrapper, ContentFoldButton } from './styles/EditorStyle';

const NoteApp = ({ layoutState, roomId, channelId, language }) => {
  const { NoteStore } = useNoteStore();
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

  return useObserver(() => (
    <>
      <LNB />
      <ContentWrapper>
        <ContentFoldButton />
        <Content />
      </ContentWrapper>
    </>
  ));
};

export { NoteApp };
