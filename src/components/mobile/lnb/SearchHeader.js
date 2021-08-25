import React, { useState, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../../store/useStore';

import { MainHeaderWrapper as SearchHeaderWrapper } from '../styles/lnbStyles';
import {
  SearchBarWrapper,
  SearchBarInput,
  ButtonWrapper,
  TextButtonWrapper,
} from '../styles/commonStyles';
import { SearchIcon, CloseIcon } from '../../icons';

const SearchHeader = () => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = e => setSearchValue(e.target.value);

  const handleCloseButtonClick = () => setSearchValue('');

  const handleCancelButtonClick = () => {};

  return useObserver(() => (
    <SearchHeaderWrapper>
      <SearchBarWrapper>
        <SearchIcon width="1.25" height="1.25" color={themeContext.IconNormal2} />
        <SearchBarInput
          placeholder="노트 검색"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        {searchValue && (
          <ButtonWrapper onClick={handleCloseButtonClick}>
            <CloseIcon color={themeContext.IconNormal2} />
          </ButtonWrapper>
        )}
      </SearchBarWrapper>
      <TextButtonWrapper
        style={{ color: `${themeContext.TextSub3}` }}
        onClick={handleCancelButtonClick}
      >
        {t('NOTE_PAGE_LIST_DEL_PGE_CHPT_05')}
      </TextButtonWrapper>
    </SearchHeaderWrapper>
  ));
};
export default React.memo(SearchHeader);
