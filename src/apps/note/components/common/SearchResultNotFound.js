import React from 'react';
import {
  SearchResultNotFoundCover,
  SearchKeyword,
  NoSearchResultTitle,
  NoSearchResultImg
} from '../../styles/commonStyle';
import noSearchResultImg from '../../assets/no_search_result.png';

const SearchResultNotFound = ({searchStr}) => {
  return (
    <>
      <SearchResultNotFoundCover>
        <SearchKeyword>'{searchStr}'</SearchKeyword>
        <NoSearchResultTitle>검색 결과가 없습니다.</NoSearchResultTitle>
        <NoSearchResultImg src={noSearchResultImg} />
      </SearchResultNotFoundCover>
    </>
  );
}

export default SearchResultNotFound;