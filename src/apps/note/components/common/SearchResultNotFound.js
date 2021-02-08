import React, { useEffect, useState } from 'react';
import {
  SearchResultNotFoundCover,
  SearchKeyword,
  NoSearchResultTitle,
  NoSearchResultImg
} from '../../styles/commonStyle';
import noSearchResultImg from '../../assets/no_result.svg';
import NoteStore from '../../store/noteStore';

const SearchResultNotFound = ({ searchStr }) => {
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    setSearchText(searchStr);
  }, [searchText]);

  return (
    <>
      <SearchResultNotFoundCover>
        <SearchKeyword>'{searchText}'</SearchKeyword>
        <NoSearchResultTitle>{NoteStore.getI18n('noSearchResult')}</NoSearchResultTitle>
        <NoSearchResultImg src={noSearchResultImg} />
      </SearchResultNotFoundCover>
    </>
  );
}

export default SearchResultNotFound;