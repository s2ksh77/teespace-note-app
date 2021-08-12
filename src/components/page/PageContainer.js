import React from 'react';
import { observer } from 'mobx-react';
import useNoteStore from '../../store/useStore';

import { PageContainerCover } from '../../styles/pageStyle';
import EditorContainer from '../editor/EditorContainer';
import LoadingContent from '../common/LoadingContent';
import NoContent from './NoContent';

// 페이지 보여줄 때
const PageContainer = observer(() => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const renderContent = (() => {
    if (ChapterStore.loadingPageInfo) return <LoadingContent />;
    if (ChapterStore.currentChapterId) {
      if (PageStore.currentPageId) return <EditorContainer />;
      return <NoContent />;
    }
    return <NoContent isNoChapter />;
  })();

  return (
    <PageContainerCover
      style={NoteStore.showPage ? { display: 'flex' } : { display: 'none' }}
    >
      {renderContent}
    </PageContainerCover>
  );
});

export default PageContainer;
