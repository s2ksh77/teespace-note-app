import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';
import TagContentContainer from './TagContentContainer';
import { TagContentCover } from '../../styles/tagStyle';
import TagHeader from './TagHeader';
import TagNotFound from './TagNotFound'
import LoadingImgContainer from '../common/LoadingImgContainer';
import SearchingImg from '../common/SearchingImg';

const TagContainer = () => {

  useEffect(() => {
    TagStore.fetchTagData();
  }, [])

  const renderContent = () => {
    if (TagStore.isSearching) return <SearchingImg />;
    else if (TagStore.tagPanelLoading) return <LoadingImgContainer />;
    else if (TagStore.hasTag) return <TagContentContainer />;
    else return <TagNotFound />;
  }

  return useObserver(() => (
    <>
      <TagHeader />
      <TagContentCover>
        {renderContent()}
      </TagContentCover>
    </>
  ));
};

export default TagContainer;
