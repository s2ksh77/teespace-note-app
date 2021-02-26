import React from 'react';
import {
  SearchLoadingContainer,
  SearchLoadingTxt,
  SearchLoadingImg
} from '../../styles/commonStyle';
import loadingImg from '../../assets/search_loading.svg';
import useNoteStore from '../../store/useStore';

const SearchingImg = () => {
  const { NoteStore } = useNoteStore();
  return (
    <>
      <SearchLoadingContainer>
        <SearchLoadingTxt>{NoteStore.getI18n('searching')}</SearchLoadingTxt>
        <SearchLoadingImg src={loadingImg} />
      </SearchLoadingContainer>
    </>
  );
}

export default SearchingImg;