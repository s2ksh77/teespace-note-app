import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';
import ShareNoteMessageContent from './ShareNoteMessageContent.js';

// props: { roomId, noteId, type, noteTitle }
export default function ShareNoteMessage(props) {
  return (
    <I18nextProvider i18n={i18n}>
      <ShareNoteMessageContent 
        {...props}
      />
    </I18nextProvider>
  )
}