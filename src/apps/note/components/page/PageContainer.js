import React from 'react';
import useStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import EditorContainer from '../editor/EditorContainer';
import '../../styles/note.css';
import noPageImage from '../../assets/no_file.png';
import LoadingImgContainer from '../common/loadingImg';

// 페이지 보여줄 때
const PageContainer = () => {
  const { NoteStore, ChapterStore, PageStore } = useStore();

  // useEffect(() => {
  //   console.log('바뀌나')
  //   console.log('15',ChapterStore.currentChapterId)
  // },[ChapterStore.currentChapterId, PageStore.currentPageId])

  return useObserver(() => (
    <>
      {(() => {
        if (ChapterStore.currentChapterId) {
          NoteStore.setShowPage(true);
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

// 페이지가 존재하지 않습니다
export const PageNotFound = () => {
  return (
    <>
      <div className="note-editor_page-none">
        <div className="note-no_page_title">페이지가 없습니다.</div>
        <span className="note-no_page_text">
          시작하려면 "새 페이지 추가" 버튼을 클릭하세요.
        </span>
        <img className="note-no_page_image" src={noPageImage} />
      </div>
    </>
  );
};
