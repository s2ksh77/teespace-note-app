import React, { useCallback } from 'react';
import { Observer, useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import Page from './Page';
import { NewPage, NewPageBtn, NewPageText } from '../../styles/pageStyle';
import { handleLinkListener } from '../common/NoteFile';

const PageList = ({ showNewPage, children, chapterId, chapterIdx, type }) => {
  const { NoteStore, PageStore, ChapterStore, EditorStore } = useNoteStore();

  const [, drop] = useDrop({
    accept: 'page',
    drop: () => {
      PageStore.movePage(chapterId, chapterIdx, children, children.length);
    },
    hover() {
      if (PageStore.dragEnterChapterIdx !== chapterIdx)
        PageStore.setDragEnterChapterIdx(chapterIdx);
      if (PageStore.dragEnterPageIdx !== children.length)
        PageStore.setDragEnterPageIdx(children.length);
    },
  });

  const handleNewBtnClick = targetId => async () => {
    PageStore.setCreatePageParent(targetId);
    PageStore.setCreatePageParentIdx(chapterIdx);
    await PageStore.createNotePage();
    NoteStore.setTargetLayout('Content');
    NoteStore.setShowPage(true);
  };

  const handleSelectPage = useCallback(async (id, e) => {
    if (PageStore.isEdit) {
      // NoteApp에 있는 handleClickOutsideEditor 함수 안타게 하기
      if (PageStore.currentPageId === id) e.stopPropagation();
      return;
    }
    NoteStore.setShowPage(true);
    ChapterStore.setCurrentChapterId(chapterId);
    PageStore.setCurrentPageId(id);    
    PageStore.fetchCurrentPageData(id);
    handleLinkListener();
    if (NoteStore.layoutState === 'collapse')
      NoteStore.setTargetLayout('Content');
    EditorStore.tinymce?.undoManager.clear();
  }, []);

  return (
    <>
      <Observer>
        {() =>
          children.map((item, index) => (
            <Page
              key={item.id}
              page={item}
              index={index}
              children={children}
              chapterId={chapterId}
              chapterIdx={chapterIdx}
              type={type}
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
                PageStore.dragEnterPageIdx === children.length
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
        <NewPageBtn onClick={handleNewBtnClick(chapterId)}>
          <NewPageText>+ 새 페이지 추가</NewPageText>
        </NewPageBtn>
      </NewPage>
    </>
  )
};

export default PageList;
