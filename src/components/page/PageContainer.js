import React from 'react';
import useNoteStore from '../../store/useStore';
import { observer } from 'mobx-react';
import EditorContainer from '../editor/EditorContainer';
import PageNotFound from './PageNotFound';

import { PageContainerCover } from '../../styles/pageStyle';
import LoadingContent from '../common/LoadingContent';

// 페이지 보여줄 때
const PageContainer = observer(() => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const renderContent = (() => {
    if (ChapterStore.loadingPageInfo) return <LoadingContent />;
    if (ChapterStore.currentChapterId) {
      if (PageStore.currentPageId) return <EditorContainer />;
      else return <PageNotFound type={"page"} />; // chapter 하위 page가 없을 때
    }
    return <PageNotFound type={"chapter"} />
  })();

  return (
    <PageContainerCover
      style={NoteStore.showPage ? { display: 'flex' } : { display: 'none' }}
    >
      {renderContent}
    </PageContainerCover>
  );
})

export default PageContainer;
