import React from 'react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../store/useStore';

import {
  ContentBodyWrapper,
  CenterContainer as NoContentContainer,
  NoneTitle,
  NoneSubtitle,
  NoneImage,
} from '../../styles/commonStyle';
import ContentHeader from '../common/ContentHeader';
import noContentImage from '../../assets/no_contents.svg';

const NoContent = ({ isNoChapter, isWeb = true }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { t } = useTranslation();

  const handleBackBtnClick = () => {
    ChapterStore.getNoteChapterList();
    NoteStore.setTargetLayout('LNB');
  };

  return (
    <>
      {isWeb ? <ContentHeader handleBackBtn={handleBackBtnClick} /> : null}
      <ContentBodyWrapper>
        <NoContentContainer>
          <NoneTitle>
            {isNoChapter
              ? t('NOTE_PAGE_LIST_NO_CHPT_01')
              : t('NOTE_PAGE_LIST_NO_PGE_IN_CHPT_01')}
          </NoneTitle>
          {!PageStore.isRecycleBin && (
            <NoneSubtitle>
              {isNoChapter
                ? t('NOTE_PAGE_LIST_NO_CHPT_02')
                : t('NOTE_PAGE_LIST_NO_PGE_IN_CHPT_02')}
            </NoneSubtitle>
          )}
          <NoneImage src={noContentImage} alt="No content" />
        </NoContentContainer>
      </ContentBodyWrapper>
    </>
  );
};

export default NoContent;
