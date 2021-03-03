import React from 'react';
import useNoteStore from '../../store/useStore';
import noPageImage from '../../assets/no_contents.svg';
import {
  NoneContainer,
  NoneTitle,
  NoneText,
  NoneImg
} from '../../styles/commonStyle';
import { useTranslation } from 'react-i18next';

// 페이지가 존재하지 않습니다
const TagNotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <NoneContainer>
        <NoneTitle>{t('noTagFound')}</NoneTitle>
        <NoneText>{t('notag')}</NoneText>
        <NoneImg src={noPageImage} alt="tag_not_found" />
      </NoneContainer>
    </>
  );
};

export default TagNotFound;