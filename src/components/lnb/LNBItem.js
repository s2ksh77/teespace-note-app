import React from 'react';
import useNoteStore from '../../store/useStore';

import { Item, ItemTitle } from '../../style/LNBStyle';
import { SharedPageIcon } from '../icons';

const LNBItem = ({ selectedItems, setSelectedItems, title }) => {
  const handleItemClick = () => {
    setSelectedItems(() => new Set([title]));
  };

  return (
    <Item
      style={{ background: selectedItems.has(title) ? 'rgba(0, 0, 0, 0.03)' : 'initial' }}
      onClick={handleItemClick}
    >
      <SharedPageIcon isButton />
      <ItemTitle style={{ marginLeft: '0.75rem' }}>{title}</ItemTitle>
    </Item>
  );
};

export default LNBItem;
