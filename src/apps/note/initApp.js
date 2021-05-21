import { ComponentStore, EventBus, i18nInit } from 'teespace-core';
import ShareNoteMessage from './components/common/ShareNoteMessage';
import SlashCmdNote from './components/common/SlashCmdNote';
import i18n from './i18n/i18n';

const initApp = () => {
  i18nInit(i18n);

  ComponentStore.register('Note:ShareNoteMessage', ShareNoteMessage);
  EventBus.on('onSlashCreateNote', SlashCmdNote);
}

export default initApp;