import React from 'react';
import useStore from '../../store/useStore';
import { observer } from 'mobx-react';
import EditorContainer from '../editor/EditorContainer';
import '../../styles/note.css';
import LoadingImgContainer from '../common/loadingImg';
import PageNotFound from './PageNotFound';

const { ChapterStore, PageStore } = useStore();

// 페이지 보여줄 때
const PageContainer = observer(() => {
  const target = () => {
    if (ChapterStore.currentChapterId && PageStore.currentPageId) return <EditorContainer />;
    else if (ChapterStore.currentChapterId && !PageStore.currentPageId) return <PageNotFound />;
    else return <LoadingImgContainer />
  }

  return target()
})

export default PageContainer;
