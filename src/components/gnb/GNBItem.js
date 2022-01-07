import React from 'react';
import useNoteStore from '../../store/useStore';

import { MENU_TYPE } from '../../GlobalVariable';
import { Item, ItemTitle } from '../../style/GNBStyle';
import { MyNoteIcon } from '../icons';
import { getMenuTitle } from '../../NoteUtil';

const GNBItem = ({ selectedMenu, setSelectedMenu, type }) => {
  const handleItemClick = () => {
    setSelectedMenu(type);
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
