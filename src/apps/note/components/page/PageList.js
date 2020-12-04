import React, { useCallback } from 'react';
import { Observer, useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import Page from './Page';
import { NewPage, NewPageBtn, NewPageText } from '../../styles/pageStyle';

const PageList = ({ showNewPage, chapter, chapterIdx }) => {
  const { NoteStore, PageStore, ChapterStore, EditorStore } = useNoteStore();

  const [, drop] = useDrop({
    accept: 'page',
    drop: () => {
      PageStore.movePage(chapter.id, chapterIdx, chapter.children, chapter.children.length);
    },
    hover() {
      if (PageStore.dragEnterChapterIdx !== chapterIdx)
        PageStore.setDragEnterChapterIdx(chapterIdx);
      if (PageStore.dragEnterPageIdx !== chapter.children.length)
        PageStore.setDragEnterPageIdx(chapter.children.length);
    },
  });

  const handleNewBtnClick = targetId => () => {
    PageStore.setCreatePageParent(targetId);
    PageStore.setCreatePageParentIdx(chapterIdx);
    PageStore.createNotePage();
  };

  const handleSelectPage = useCallback(async (id, e) => {
    if (PageStore.isEdit) {
      // NoteApp에 있는 handleClickOutsideEditor 함수 안타게 하기
      if (PageStore.currentPageId === id) e.stopPropagation();
      return;
    }
    NoteStore.setShowPage(true);
    ChapterStore.setCurrentChapterId(chapter.id);
    PageStore.setCurrentPageId(id);
    PageStore.fetchCurrentPageData(id);
    if (NoteStore.layoutState === 'collapse')
      NoteStore.setTargetLayout('Content');
    EditorStore.tinymce?.undoManager.clear();
  }, []);

  return (
    <>
      <Observer>
        {() =>
          chapter.children.map((item, index) => (
            <Page
              key={item.id}
              page={item}
              index={index}
              chapter={chapter}
              chapterIdx={chapterIdx}
              onClick={handleSelectPage}
            />
          ))
        }
      </Observer>
      <Observer>
        {() =>
          <div style={{ height: '0px', marginLeft: '1.875rem' }}
            className={
              PageStore.dragEnterChapterIdx === chapterIdx &&
                PageStore.dragEnterPageIdx === chapter.children.length
                ? 'borderTopLine'
                : ''
            }
          />
        }
      </Observer>
      <NewPage
        ref={drop}
        className={'page-li'}
        show={showNewPage}
      >
        <NewPageBtn onClick={handleNewBtnClick(chapter.id)}>
          <NewPageText>+ 새 페이지 추가</NewPageText>
        </NewPageBtn>
      </NewPage>
    </>
  )
};

export default PageList;
