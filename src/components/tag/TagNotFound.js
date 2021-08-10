import React from 'react';
import useNoteStore from '../../store/useStore';
import noPageImage from '../../assets/no_contents.svg';
import {
  NoneContainer,
  NoneTitle,
  NoneText,
  NoneImg,
  ContentBodyCover,
} from '../../styles/commonStyle';
import { useTranslation } from 'react-i18next';

// 페이지가 존재하지 않습니다
const TagNotFound = () => {
  const { t } = useTranslation();

  return (
    <>
      <ContentBodyCover>
        <NoneContainer>
          <NoneTitle>{t('NOTE_TAG_NO_CONTENTS_01')}</NoneTitle>
          <NoneText>{t('NOTE_TAG_NO_CONTENTS_02')}</NoneText>
          <NoneImg src={noPageImage} alt="tag_not_found" />
        </NoneContainer>
      </ContentBodyCover>
    </>
  );
};

export default TagNotFound;
