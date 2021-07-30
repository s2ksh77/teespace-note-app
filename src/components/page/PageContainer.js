import React from 'react';
import useNoteStore from '../../store/useStore';
import { observer } from 'mobx-react';
import EditorContainer from '../editor/EditorContainer';
import LoadingImgContainer from '../common/LoadingImgContainer';
import PageNotFound from './PageNotFound';
import { PageContainerCover } from '../../styles/pageStyle';

// 페이지 보여줄 때
const PageContainer = observer(() => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const renderContent = (() => {
    if (ChapterStore.loadingPageInfo) return <LoadingImgContainer />
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
