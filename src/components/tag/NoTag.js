import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  CenterContainer as NoTagContainer,
  NoneTitle,
  NoneSubtitle,
  NoneImage,
} from '../../styles/commonStyle';
import noContentImage from '../../assets/no_contents.svg';

const NoTag = () => {
  const { t } = useTranslation();

  return (
    <NoTagContainer>
      <NoneTitle>{t('NOTE_TAG_NO_CONTENTS_01')}</NoneTitle>
      <NoneSubtitle>{t('NOTE_TAG_NO_CONTENTS_02')}</NoneSubtitle>
      <NoneImage src={noContentImage} alt="No tag" />
    </NoTagContainer>
  );
};

export default NoTag;
