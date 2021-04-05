import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';
import ShareNoteMessageContent from './ShareNoteMessageContent.js';

export default function ShareNoteMessage({ roomId, noteId, noteTitle }) {
    return (
        <I18nextProvider i18n={i18n}>
            {/* <ShareNoteMessageContent
                roomId={roomId}
                noteId={noteId}
                noteTitle={noteTitle}
            /> */}
        </I18nextProvider>
    )
}
