import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';

import { TagContainerCover } from '../../styles/tagStyle';
import { ContentBodyWrapper as TagBodyWrapper } from '../../styles/commonStyle';
import TagHeader from './TagHeader';
import TagContentContainer from './TagContentContainer';
import NoContent from '../common/NoContent';
import MainHeader from '../mobile/lnb/MainHeader';

const TagContainer = ({ isWeb = true }) => {
  const { NoteStore, TagStore } = useNoteStore();

  useEffect(() => {
    if (!NoteStore.showPage) TagStore.fetchTagData();
  }, [NoteStore.showPage]);

  const renderContent = () => {
    if (TagStore.tagPanelLoading) return <div />; // 태그 데이터 가져오는 동안 흰 화면만 띄우기
    // 검색 관련 rendering
    if (TagStore.isSearching) {
      if (TagStore.isSearchLoading) return <NoContent content="searching" />;
      // search는 검색 결과 없으면 KOR, ENG, NUM, ETC property가 없음
      if (Object.keys(TagStore.sortedTagList).length > 0)
        return <TagContentContainer isWeb={isWeb} />;
      // 태그 선택 결과 없는 경우
      return <NoContent content="search" value={TagStore.searchStr} />;
    }
    // 초기 태그 화면 rendering
    if (TagStore.allSortedTagList.length > 0)
      return <TagContentContainer isWeb={isWeb} />;
    return <NoContent content="tag" />;
  };

  const handleBackButtonClick = () => NoteStore.setTargetLayout('LNB');

  return useObserver(() => (
    <TagContainerCover
      style={NoteStore.showPage ? { display: 'none' } : { display: 'flex' }}
    >
      {isWeb ? (
        <TagHeader />
      ) : (
        <MainHeader
          leftButtons={[{ type: 'icon', action: 'back', onClick: handleBackButtonClick }]}
          title="태그"
          rightButtons={[
            { type: 'icon', action: 'search' },
            { type: 'text', text: '🎅🏻' },
          ]}
        />
      )}
      <TagBodyWrapper style={isWeb ? { padding: '0.25rem 1rem' } : { padding: '0rem' }}>
        {renderContent()}
      </TagBodyWrapper>
    </TagContainerCover>
  ));
};

export default React.memo(TagContainer);
