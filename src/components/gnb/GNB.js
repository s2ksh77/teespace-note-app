import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MENU_TYPE } from '../../GlobalVariable';
import { GNBWrapper, MenuTitle } from '../../style/GNBStyle';
import GNBItem from './GNBItem';

const GNB = ({ selectedMenu, setSelectedMenu }) => {
  const { t } = useTranslation();

  return (
    <GNBWrapper>
      <MenuTitle>{t('NOTE_TITLE')}</MenuTitle>
      {Object.values(MENU_TYPE).map(type => (
        <GNBItem
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          type={type}
        />
      ))}
    </GNBWrapper>
  );
};

export default GNB;
