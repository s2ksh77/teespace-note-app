import React, { useEffect, useState } from 'react';
import {
  SearchResultNotFoundCover,
  SearchKeyword,
  NoSearchResultTitle,
  NoSearchResultImg
} from '../../styles/commonStyle';
import noSearchResultImg from '../../assets/no_result.svg';

const SearchResultNotFound = ({ searchStr }) => {
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    setSearchText(searchStr);
  }, [searchText]);

  return (
    <>
      <SearchResultNotFoundCover>
        <SearchKeyword>'{searchText}'</SearchKeyword>
        <NoSearchResultTitle>검색 결과가 없습니다.</NoSearchResultTitle>
        <NoSearchResultImg src={noSearchResultImg} />
      </SearchResultNotFoundCover>
    </>
  );
}

export default SearchResultNotFound;