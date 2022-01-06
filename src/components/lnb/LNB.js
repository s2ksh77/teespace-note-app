import React, { useState } from 'react';
import useNoteStore from '../../store/useStore';

import { LNBWrapper } from '../../style/LNBStyle';
import LNBItem from './LNBItem';

const LNB = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const items = ['내 노트', '톡 노트', '공유 노트', '최근', '즐겨찾기'];

  return (
    <LNBWrapper>
      {items.map(title => (
        <LNBItem
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          title={title}
        />
      ))}
    </LNBWrapper>
  );
};

export default LNB;
