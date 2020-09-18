import React from 'react';
import useStore from "../../store/useStore";
import {
  SearchResultNotFoundCover,
  SearchKeyword,
  NoSearchResultTitle,
  NoSearchResultImg
} from '../../styles/commonStyle';
import noSearchResultImg from '../../assets/no_search_result.png';

const SearchResultNotFound = () => {
  const { TagStore } = useStore();

  return (
    <>
      <SearchResultNotFoundCover>
        <SearchKeyword>'{TagStore.searchString}'</SearchKeyword>
        <NoSearchResultTitle>검색 결과가 없습니다.</NoSearchResultTitle>
        <NoSearchResultImg src={noSearchResultImg} />
      </SearchResultNotFoundCover>
    </>
  );
}

export default SearchResultNotFound;