import { ComponentStore, EventBus } from 'teespace-core';
import ShareNoteMessage from './components/common/ShareNoteMessage';
import SlashCmdNote from './components/common/SlashCmdNote';

const initApp = () => {
  ComponentStore.register('Note:ShareNoteMessage', ShareNoteMessage);
  EventBus.on('onSlashCreateNote', SlashCmdNote);
}

export default initApp;