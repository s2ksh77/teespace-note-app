import React from 'react';
import { useCoreStores } from 'teespace-core';
import useNoteStore from '../../store/useStore';

import { MENU_TYPE } from '../../GlobalVariable';
import { Item, ItemTitle } from '../../style/GNBStyle';
import { MyNoteIcon } from '../icons';
import { getMenuTitle } from '../../NoteUtil';

const GNBItem = ({ selectedMenu, setSelectedMenu, type }) => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { roomStore } = useCoreStores();

  const handleItemClick = async () => {
    if (selectedMenu === type) return;
    setSelectedMenu(type);
    if (type === MENU_TYPE.MY) {
      const { myRoom } = roomStore;
      NoteStore.setWsId(myRoom.id);
      NoteStore.setChannelId(roomStore.getChannelIds(myRoom.id).CHN0003);
      NoteStore.setIsFetchingGNBContent(true);
      await ChapterStore.fetchChapterList(true);
      NoteStore.setIsFetchingGNBContent(false);
    }
  };

  const ItemIcon = () => {
    switch (type) {
      case MENU_TYPE.MY:
        return <MyNoteIcon />;
      // case MENU_TYPE.TALK:
      //   return <TalkNoteIcon />;
      // case MENU_TYPE.SHARED:
      //   return <SharedNoteIcon />;
      // case MENU_TYPE.RECENT:
      //   return <RecentIcon />;
      // case MENU_TYPE.BOOKMARK:
      //   return <BookmarkIcon />;
      default:
        return <MyNoteIcon />;
    }
  };

  return (
    <Item
      style={{ background: selectedMenu === type ? 'rgba(0, 0, 0, 0.03)' : 'initial' }}
      onClick={handleItemClick}
    >
      <ItemIcon />
      <ItemTitle style={{ marginLeft: '0.75rem' }}>{getMenuTitle(type)}</ItemTitle>
    </Item>
  );
};

export default GNBItem;
