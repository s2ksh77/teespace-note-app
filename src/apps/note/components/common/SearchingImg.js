import React from 'react';
import {
  SearchLoadingContainer,
  SearchLoadingTxt,
  SearchLoadingImg
} from '../../styles/commonStyle';
import loadingImg from '../../assets/search_loading.svg';
import { useTranslation } from 'react-i18next';

const SearchingImg = () => {
  const { t } = useTranslation();
  return (
    <>
      <SearchLoadingContainer>
        <SearchLoadingTxt>{t('searching')}</SearchLoadingTxt>
        <SearchLoadingImg src={loadingImg} />
      </SearchLoadingContainer>
    </>
  );
}

export default SearchingImg;