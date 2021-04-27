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

  // const renderContent = (() => {
  //   if (ChapterStore.loadingPageInfo) return <LoadingContent />;
  //   if (ChapterStore.currentChapterId) {
  //     if (PageStore.currentPageId) return <PageContent />;
  //     return <NoContent />; // chapter 하위 page가 없을 때
  //   }
  //   return <NoContent />;
  // })();

  const renderContent = () => {
    if (NoteStore.isPageContent) {
      if (PageStore.isLoading) return <LoadingContent />;
      if (ChapterStore.chapterList.length > 0) {
        if (PageStore.pageModel?.id) return <PageContent />;
        return <NoContent />;
      }
      return <NoContent isNoChapter />;
    }
    return <TagContent />;
  };

  return useObserver(() => (
    <ContentContainer
      show={!NoteStore.isCollapsed || NoteStore.isTargetLayout('content')}
    >
      {renderContent()}
    </ContentContainer>
  ));
};

export default Content;
