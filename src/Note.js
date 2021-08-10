import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { NoteApp as Note } from './NoteApp';
import i18n from './i18n/i18n';

const NoteApp = ({ layoutState, roomId, channelId, language, appType = 'wapl' }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Note
        layoutState={layoutState}
        roomId={roomId}
        channelId={channelId}
        language={language}
        appType={appType}
      />
    </I18nextProvider>
  );
};

export default NoteApp;
