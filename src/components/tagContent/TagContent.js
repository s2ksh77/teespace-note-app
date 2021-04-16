import React, { useEffect } from 'react';
import { useObserver, observer } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { TagContainer } from '../../styles/TagStyle';
import TagHeader from './TagHeader';
import TagBody from './TagBody';
import SearchingContent from '../common/SearchingContent';
import TagSearchResult from './TagSearchResult';
import NoContent from '../common/NoContent';
import LoadingContent from '../common/LoadingContent';

const TagContent = () => {
  const { NoteStore, TagStore } = useNoteStore();
  useEffect(() => {
    TagStore.getTagCategory();
  }, []);

  const RenderBody = () => {
    console.log('TagStore.isLoading', TagStore.isLoading);
    if (TagStore.isLoading) return <LoadingContent />;
    // if (TagStore.isSearching) {
    // }
    if (TagStore.isNoTag) return <NoContent />;
    return <TagBody />;
    // if (TagStore.tagPanelLoading) return <div />; // 태그 데이터 가져오는 동안 흰 화면만 띄우기
    // // 검색 관련 rendering
    // if (TagStore.isSearching) {
    //   if (TagStore.isSearchLoading) return <SearchingImg />;
    //   // search는 검색 결과 없으면 KOR, ENG, NUM, ETC property가 없음
    //   if (Object.keys(TagStore.sortedTagList).length > 0)
    //     return <TagContentContainer />;
    //   // 태그 선택 결과 없는 경우
    //   return <SearchResultNotFound searchStr={TagStore.searchStr} />;
    // }
  };
  return useObserver(() => (
    <TagContainer>
      <TagHeader />
      {RenderBody()}
    </TagContainer>
  ));
};

export default TagContent;
