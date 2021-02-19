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

// 페이지가 존재하지 않습니다
const PageNotFound = ({ type }) => {
  const { NoteStore, ChapterStore } = useNoteStore();
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
              ? NoteStore.getI18n('noPage') 
              : NoteStore.getI18n('noChapter')}
          </NoneTitle>
          <NoneText>
            {isPage 
              ? NoteStore.getI18n('clickNewPage') 
              : NoteStore.getI18n('clickNewChapter')}
          </NoneText>
          <NoneImg src={noPageImage} alt="page_not_found" />
        </NoneContainer>
      </ContentBodyCover>
    </>
  );
};

export default PageNotFound;
