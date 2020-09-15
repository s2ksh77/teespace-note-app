import React from 'react';
import useStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import EditorMenuContainer from '../editor/editor';
import TagPanelContainer from '../tag/tagMenu';
import '../../styles/note.css';
import noPageImage from '../../assets/no_file.png';

// 페이지 보여줄 때
const PageEditorContainer = () => {
  const { NoteStore, ChapterStore, PageStore } = useStore();
  const targetPageComponent = () => {
    if (ChapterStore.currentChapterId) {
      NoteStore.setShowPage(true);
      if (PageStore.currentPageId) return <EditorMenuContainer />;
      else return <ShowNoPage />;
    } else {
      NoteStore.setShowPage(false);
      return <TagPanelContainer />;
    }
  };

  return <>{targetPageComponent()}</>;
};
export default PageEditorContainer;

// 페이지가 존재하지 않습니다
export const ShowNoPage = () => {
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
