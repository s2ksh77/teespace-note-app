import React, { useEffect, useState } from 'react';
import useNoteStore from '../../store/useStore';
import {
  SearchResultNotFoundCover,
  SearchKeyword,
  NoSearchResultTitle,
  NoSearchResultImg
} from '../../styles/commonStyle';
import noSearchResultImg from '../../assets/no_result.svg';

const SearchResultNotFound = ({ searchStr }) => {
  const { NoteStore } = useNoteStore();
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