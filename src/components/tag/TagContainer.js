import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';

import { TagContainerCover } from '../../styles/tagStyle';
import { ContentBodyWrapper as TagBodyWrapper } from '../../styles/commonStyle';
import TagHeader from './TagHeader';
import SearchingImg from '../common/SearchingImg';
import TagContentContainer from './TagContentContainer';
import SearchResultNotFound from '../common/SearchResultNotFound';
import NoTag from './NoTag';

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
      return <SearchResultNotFound searchStr={TagStore.searchStr} />;
    }
    // 초기 태그 화면 rendering
    if (TagStore.allSortedTagList.length > 0) return <TagContentContainer />;
    return <NoTag />;
  };

  return useObserver(() => (
    <TagContainerCover
      style={NoteStore.showPage ? { display: 'none' } : { display: 'flex' }}
    >
      <TagHeader />
      <TagBodyWrapper>{renderContent()}</TagBodyWrapper>
    </TagContainerCover>
  ));
};

export default TagContainer;
