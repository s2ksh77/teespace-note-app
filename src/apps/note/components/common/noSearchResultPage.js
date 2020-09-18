import React from 'react';
import useStore from "../../store/useStore";
import {
  NoSearchResultPageCover,
  SearchKeyword,
  NoSearchResultTitle,
  NoSearchResultImg
} from '../../styles/commonStyle';
import noSearchResultImg from '../../assets/no_search_result.png';

const NoSearchResultPage = () => {
  const {TagStore} = useStore();

  return (
    <>
      <NoSearchResultPageCover>
        <SearchKeyword>'{TagStore.searchString}'</SearchKeyword>
        <NoSearchResultTitle>검색 결과가 없습니다.</NoSearchResultTitle>
        <NoSearchResultImg src={noSearchResultImg} />
      </NoSearchResultPageCover>
    </>
  );
}

export default NoSearchResultPage;