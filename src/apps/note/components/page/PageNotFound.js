import React from 'react';
import noPageImage from '../../assets/no_contents.svg';
import ContentHeader from '../common/ContentHeader';
import useNoteStore from '../../store/useStore';
import {
  ContentBodyCover,
  NoneContainer,
  NoneTitle,
  NoneText,
  NoneImg,
} from '../../styles/commonStyle';
import { useTranslation } from 'react-i18next';

// 페이지가 존재하지 않습니다
const PageNotFound = ({ type }) => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { t } = useTranslation();
  const isPage = type === 'page';

  // 뒤로 가기 버튼
  const handleLayoutBtn = () => {
    NoteStore.setTargetLayout('LNB');
    ChapterStore.getNoteChapterList();
  }
  return (
    <>
      <ContentHeader handleBackBtn={handleLayoutBtn} />
      <ContentBodyCover>
        <NoneContainer>
          <NoneTitle>
            {isPage
              ? t('noPage')
              : t('noChapter')}
          </NoneTitle>
          <NoneText>
            {isPage
              ? t('clickNewPage')
              : t('clickNewChapter')}
          </NoneText>
          <NoneImg src={noPageImage} alt="page_not_found" />
        </NoneContainer>
      </ContentBodyCover>
    </>
  );
};

export default PageNotFound;
