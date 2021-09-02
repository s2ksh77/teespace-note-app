import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SearchResultNotFoundCover,
  SearchKeyword,
  NoSearchResultTitle,
  NoSearchResultImg,
} from '../../styles/commonStyle';
import noSearchResultImg from '../../assets/no_result.svg';

const SearchResultNotFound = ({ searchStr }) => {
  const { t } = useTranslation();

  return (
    <>
      <SearchResultNotFoundCover>
        <SearchKeyword>{`'${searchStr}'`}</SearchKeyword>
        <NoSearchResultTitle>{t('NOTE_EDIT_PAGE_SEARCH_01')}</NoSearchResultTitle>
        <NoSearchResultImg src={noSearchResultImg} />
      </SearchResultNotFoundCover>
    </>
  );
};

export default SearchResultNotFound;
