import React, { useEffect, useState } from 'react';
import {
  SearchResultNotFoundCover,
  SearchKeyword,
  NoSearchResultTitle,
  NoSearchResultImg
} from '../../styles/commonStyle';
import noSearchResultImg from '../../assets/no_result.svg';
import { useTranslation } from 'react-i18next';

const SearchResultNotFound = ({ searchStr }) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    setSearchText(searchStr);
  }, [searchText]);

  return (
    <>
      <SearchResultNotFoundCover>
        <SearchKeyword>'{searchText}'</SearchKeyword>
        <NoSearchResultTitle>{t('NOTE_EDIT_PAGE_SEARCH_01')}</NoSearchResultTitle>
        <NoSearchResultImg src={noSearchResultImg} />
      </SearchResultNotFoundCover>
    </>
  );
}

export default SearchResultNotFound;