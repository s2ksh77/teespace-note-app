import React from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';

import ContentHeader from '../common/ContentHeader';
import {
  SearchBar,
  SearchBarIcon,
  SearchInput,
} from '../../styles/HeaderStyle';
import searchIcon from '../../assets/search.svg';

const TagHeader = () => {
  const { NoteStore } = useNoteStore();
  const { t } = useTranslation();

  const handleBackBtnClick = () => {
    // 임시 로직
    NoteStore.setTargetLayout('lnb');
  };

  const handleSearchSubmit = () => {};

  return useObserver(() => (
    <ContentHeader handleBackBtnClick={handleBackBtnClick}>
      <SearchBar isTagSearch onSubmit={handleSearchSubmit}>
        <SearchBarIcon
          type="image"
          src={searchIcon}
          // isSearch={!!(NoteStore.searchStr !== '' || NoteStore.isSearch)}
        />
        <SearchInput placeholder={t('NOTE_TAG_TAG_MENU_05')} />
      </SearchBar>
    </ContentHeader>
  ));
};

export default TagHeader;
