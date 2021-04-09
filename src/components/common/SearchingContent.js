import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SearchLoadingContainer,
  SearchLoadingTxt,
  SearchLoadingImg,
} from '../../styles/CommonStyle';
import loadingImg from '../../assets/search_loading.svg';

const SearchingContent = () => {
  const { t } = useTranslation();
  return (
    <>
      <SearchLoadingContainer>
        <SearchLoadingTxt>{t('NOTE_EDIT_PAGE_SEARCH_02')}</SearchLoadingTxt>
        <SearchLoadingImg src={loadingImg} />
      </SearchLoadingContainer>
    </>
  );
};

export default SearchingContent;
