import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';
import ShareNoteMessageContent from './ShareNoteMessageContent';

// @flow
type Props = {
  roomId: string,
  noteId: string,
  noteTitle: string,
};

export default function ShareNoteMessage(props: Props) {
  const { roomId, noteId, noteTitle } = props;
  return (
    <I18nextProvider i18n={i18n}>
      <ShareNoteMessageContent
        roomId={roomId}
        noteId={noteId}
        noteTitle={noteTitle}
      />
    </I18nextProvider>
  );
}
