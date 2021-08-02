import React, { useEffect } from 'react';
import useNoteStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import TagContentContainer from './TagContentContainer';
import { ContentBodyCover } from '../../styles/commonStyle';
import TagHeader from './TagHeader';
import TagNotFound from './TagNotFound'
import LoadingImgContainer from '../common/LoadingImgContainer';
import SearchingImg from '../common/SearchingImg';
import SearchResultNotFound from '../common/SearchResultNotFound';
import { TagContainerCover } from '../../styles/tagStyle';
import styled from 'styled-components';

const StyledContentCover = styled(ContentBodyCover)`
  padding: 0rem 0.75rem;
`;

const TagContainer = () => {
  const { NoteStore, TagStore } = useNoteStore();

  useEffect(() => {
    if (!NoteStore.showPage) TagStore.fetchTagData();
  }, [NoteStore.showPage]);

  const renderContent = () => {
    if (TagStore.tagPanelLoading) return <div />; // 태그 데이터 가져오는 동안 흰 화면만 띄우기
    // 검색 관련 rendering
    if (TagStore.isSearching) {
      if (TagStore.isSearchLoading) return <SearchingImg />;
      // search는 검색 결과 없으면 KOR, ENG, NUM, ETC property가 없음
      if (Object.keys(TagStore.sortedTagList).length > 0) return <TagContentContainer />;
      // 태그 선택 결과 없는 경우
      return <SearchResultNotFound searchStr={TagStore.searchStr} />
    } 
    // 초기 태그 화면 rendering
    else if (TagStore.allSortedTagList.length > 0) return <TagContentContainer />;
    return <TagNotFound />;
  }

  return useObserver(() => (
    <TagContainerCover
      style={NoteStore.showPage ? { display: 'none' } : { display: 'flex' }}
    >
      <TagHeader />
      <StyledContentCover>
        {renderContent()}
      </StyledContentCover>
    </TagContainerCover>
  ));
};

export default TagContainer;
