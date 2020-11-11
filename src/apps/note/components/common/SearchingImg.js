import React from 'react';
import {
  SearchLoadingContainer,
  SearchLoadingTxt,
  SearchLoadingImg
} from '../../styles/commonStyle';
import loadingImg from '../../assets/loading_taka.gif';

const SearchingImg = () => {
  return (
    <>
      <SearchLoadingContainer>
        <SearchLoadingTxt>검색 실행중입니다.</SearchLoadingTxt>
        <SearchLoadingImg src={loadingImg}/>
      </SearchLoadingContainer>
    </>
  );
}

export default SearchingImg;