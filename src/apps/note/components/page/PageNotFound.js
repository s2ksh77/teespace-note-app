import React from 'react';
import noPageImage from '../../assets/no_file.png';
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
const PageNotFound = () => {  
  const { NoteStore, ChapterStore } = useNoteStore();
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
          <NoneTitle>페이지가 없습니다.</NoneTitle>
          <NoneText>
            시작하려면 "새 페이지 추가" 버튼을 클릭하세요.
          </NoneText>
          <NoneImg src={noPageImage} alt="page_not_found" />
        </NoneContainer>
      </ContentBodyCover>      
    </>
  );
};

export default PageNotFound;
