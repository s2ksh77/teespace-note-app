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
    if (TagStore.tagPanelLoading) return <div />;
    if (TagStore.isSearchLoading) return <SearchingImg />;
    // display할 태그가 있을 때
    if (Object.keys(TagStore.sortedTagList).length > 0) return <TagContentContainer />;
    // 태그가 없는데 search중 아닐 때
    if (!TagStore.isSearching) return <TagNotFound />;
    // 태그 선택 결과 없는 경우
    return <SearchResultNotFound searchStr={TagStore.searchStr} />
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
