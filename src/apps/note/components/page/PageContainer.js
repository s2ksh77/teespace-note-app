import React from 'react';
import useStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import EditorContainer from '../editor/EditorContainer';
import '../../styles/note.css';
import LoadingImgContainer from '../common/loadingImg';
import PageNotFound from './PageNotFound';

// 페이지 보여줄 때
const PageContainer = () => {
  const { ChapterStore, PageStore } = useStore();

  // useEffect(() => {
  //   console.log('바뀌나')
  //   console.log('15',ChapterStore.currentChapterId)
  // },[ChapterStore.currentChapterId, PageStore.currentPageId])

  return useObserver(() => (
    <>
      {(() => {
        if (ChapterStore.currentChapterId) {
          if (PageStore.currentPageId) return <><EditorContainer /></>;
          else return <><PageNotFound /></>;
        } else {
          return <LoadingImgContainer />;
        }
      })()}
    </>
  ));
};

export default PageContainer;