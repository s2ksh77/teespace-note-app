import React, { useCallback } from 'react';
import { Observer, useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import Page from './Page';
import { NewPage, NewPageBtn, NewPageText } from '../../styles/pageStyle';

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

  const handleNewBtnClick = targetId => async() => {
    PageStore.setCreatePageParent(targetId);
    PageStore.setCreatePageParentIdx(chapterIdx);
    await PageStore.createPage();
    NoteStore.setTargetLayout('Content');
    NoteStore.setShowPage(true);
  };

  const handleSelectPage = useCallback(async id => {
    if (PageStore.isEdit) return;
    NoteStore.setShowPage(true);
    ChapterStore.setCurrentChapterId(chapterId);
    await PageStore.setCurrentPageId(id);
    EditorStore.handleLinkListener();
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
