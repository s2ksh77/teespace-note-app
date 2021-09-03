import React, { useState, useContext, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components';
import useDebounce from '../../common/useDebounce';
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
  const { NoteStore, ChapterStore } = useNoteStore();
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 250);

  const handleSearchValueChange = e => setSearchValue(e.target.value);

  const handleCloseButtonClick = () => setSearchValue('');

  const handleCancelButtonClick = () => NoteStore.setTargetLayout('LNB');

  useEffect(() => {
    if (!debouncedSearchValue.trim()) {
      ChapterStore.setSearchResult({});
      return;
    }
    ChapterStore.getSearchResult(debouncedSearchValue.trim());
  }, [debouncedSearchValue]);

  return useObserver(() => (
    <SearchHeaderWrapper style={{ boxShadow: '0 3px 10px 0 rgba(0, 0, 0, 0.05)' }}>
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
