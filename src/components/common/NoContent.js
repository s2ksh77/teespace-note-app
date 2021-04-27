import React from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';

import ContentHeader from './ContentHeader';
import {
  CenterContentWrapper as NoContentBodyWrapper,
  NoContentTitle,
  NoContentSubTitle,
  NoContentImg,
} from '../../styles/CommonStyle';
import noContentImg from '../../assets/no_contents.svg';

const NoContent = ({ isNoChapter }) => {
  const { NoteStore } = useNoteStore();
  const { t } = useTranslation();

  const handleBackBtnClick = () => {
    // 임시 로직
    NoteStore.setTargetLayout('lnb');
  };

  return useObserver(() => (
    <>
      <ContentHeader handleBackBtnClick={handleBackBtnClick}>
        <span style={{ width: '100%' }} />
      </ContentHeader>
      <NoContentBodyWrapper>
        <NoContentTitle>
          {isNoChapter
            ? t('NOTE_PAGE_LIST_NO_CHPT_01')
            : t('NOTE_PAGE_LIST_NO_PGE_IN_CHPT_01')}
        </NoContentTitle>
        <NoContentSubTitle>
          {isNoChapter
            ? t('NOTE_PAGE_LIST_NO_CHPT_02')
            : t('NOTE_PAGE_LIST_NO_PGE_IN_CHPT_02')}
        </NoContentSubTitle>
        <NoContentImg src={noContentImg} />
      </NoContentBodyWrapper>
    </>
  ));
};

export default NoContent;
