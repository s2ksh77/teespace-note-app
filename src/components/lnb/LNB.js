import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LNBWrapper, NoteTitle } from '../../style/LNBStyle';
import LNBItem from './LNBItem';

const LNB = () => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const { t } = useTranslation();
  const items = ['내 노트', '톡 노트', '공유 노트', '최근', '즐겨찾기'];

  return (
    <LNBWrapper>
      <NoteTitle>{t('NOTE_TITLE')}</NoteTitle>
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
