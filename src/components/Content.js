import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../stores/useNoteStore';

import { ContentContainer } from '../styles/EditorStyle';
import LoadingContent from './common/LoadingContent';
import NoContent from './common/NoContent';
import PageContent from './pageContent/PageContent';
import TagContent from './tagContent/TagContent';

const Content = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const renderContent = (() => {
    // if (ChapterStore.loadingPageInfo) return <LoadingContent />;
    // if (ChapterStore.currentChapterId) {
    //   if (PageStore.currentPageId) return <PageContent />;
    //   return <NoContent />; // chapter 하위 page가 없을 때
    // }
    // return <NoContent />;
  })();

  const RenderContent = () => {
    // 임시로 PageContent 띄우기. 이름도 다시 생각해보기!
    return <PageContent />;
  };

  return useObserver(() => (
    <ContentContainer
      show={!NoteStore.isCollapsed || NoteStore.isTargetLayout('content')}
    >
      <RenderContent />
    </ContentContainer>
  ));
};

export default Content;
