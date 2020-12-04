import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';
import TagContentContainer from './TagContentContainer';
import { ContentBodyCover } from '../../styles/commonStyle';
import TagHeader from './TagHeader';
import TagNotFound from './TagNotFound'
import LoadingImgContainer from '../common/LoadingImgContainer';
import SearchingImg from '../common/SearchingImg';
import SearchResultNotFound from '../common/SearchResultNotFound';

const TagContainer = () => {

  useEffect(() => {
    TagStore.fetchTagData();
  }, [])

  const renderContent = () => {
    if (TagStore.isSearchLoading) return <SearchingImg />;    
    if (TagStore.tagPanelLoading) return <LoadingImgContainer />;
    
    // display할 태그가 있을 때
    if (Object.keys(TagStore.sortedTagList).length > 0) return <TagContentContainer />;
    // 태그가 없는데 search중 아닐 때
    if (!TagStore.isSearching) return <TagNotFound />;
    // 태그 선택 결과 없는 경우
    return <SearchResultNotFound searchStr={TagStore.searchStr} />
  }

  return useObserver(() => (
    <>
      <TagHeader />
      <ContentBodyCover>
        {renderContent()}
      </ContentBodyCover>
    </>
  ));
};

export default TagContainer;
