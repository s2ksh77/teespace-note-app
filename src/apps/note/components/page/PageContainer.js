import React from 'react';
import useNoteStore from '../../store/useStore';
import { observer } from 'mobx-react';
import EditorContainer from '../editor/EditorContainer';
import LoadingImgContainer from '../common/LoadingImgContainer';
import PageNotFound from './PageNotFound';

const { ChapterStore, PageStore } = useNoteStore();

// 페이지 보여줄 때
const PageContainer = observer(() => {
  const el = (() => {
    if (ChapterStore.loadingPageInfo) return <LoadingImgContainer />
    if (ChapterStore.currentChapterId) {
      if (PageStore.currentPageId) return <EditorContainer />;
      else return <PageNotFound type={"page"} />; // chapter 하위 page가 없을 때
    }
    return <PageNotFound type={"chapter"} />
  })();
  return el;
})

export default PageContainer;
