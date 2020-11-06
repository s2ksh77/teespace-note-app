import React from 'react';
import useNoteStore from '../../store/useStore';
import { observer } from 'mobx-react';
import EditorContainer from '../editor/EditorContainer';
import '../../styles/note.css';
import LoadingImgContainer from '../common/LoadingImgContainer';
import PageNotFound from './PageNotFound';

const { ChapterStore, PageStore } = useNoteStore();

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
