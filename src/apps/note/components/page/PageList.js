import React, { useCallback } from 'react';
import { Observer, useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import Page from './Page';
import { NewPage, NewPageBtn, PageMargin, NewPageText } from '../../styles/pageStyle';

const PageList = ({ showNewPage, chapter, chapterIdx }) => {
  const { NoteStore, PageStore, ChapterStore, EditorStore } = useNoteStore();

  const [, drop] = useDrop({
    accept: 'Item:Note:Pages',
    drop: () => {
      PageStore.moveNotePage(chapter.id, chapterIdx, chapter.children.length);
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

  const handleSelectPage = useCallback(async (id) => {
    await PageStore.fetchCurrentPageData(id);
    NoteStore.setShowPage(true);
    EditorStore.setIsSearch(false);
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
              PageStore.dragEnterChapterIdx === chapterIdx
                && PageStore.dragEnterPageIdx === chapter.children.length
                && chapter.type !== 'shared_page'
                && chapter.type !== 'shared'
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
        <PageMargin />
        <NewPageBtn onClick={handleNewBtnClick(chapter.id)}>
          <NewPageText>+ {NoteStore.getI18n('newPage')}</NewPageText>
        </NewPageBtn>
      </NewPage>
    </>
  )
};

export default PageList;
