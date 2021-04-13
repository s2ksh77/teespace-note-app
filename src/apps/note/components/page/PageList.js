import React, { useCallback } from 'react';
import { Observer } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import Page from './Page';
import { NewPage, NewPageBtn, PageMargin, NewPageText } from '../../styles/pageStyle';
import { logEvent } from 'teespace-core';
import { DRAG_TYPE } from '../../GlobalVariable';
import { useTranslation } from 'react-i18next';
import { useCoreStores } from 'teespace-core';

const PageList = ({ showNewPage, chapter, chapterIdx }) => {
  const { authStore } = useCoreStores();
  const { NoteStore, PageStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();
  const [, drop] = useDrop({
    accept: DRAG_TYPE.PAGE,
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
    logEvent('note', 'clickNewPageBtn');
  };

  const handleSelectPage = useCallback(async (id) => {
    await PageStore.fetchCurrentPageData(id);
    NoteStore.setShowPage(true);
    EditorStore.setIsSearch(false);
    if (NoteStore.layoutState === 'collapse')
      NoteStore.setTargetLayout('Content');
    EditorStore.tinymce?.undoManager?.clear();
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
        <NewPageBtn 
          active={authStore.hasPermission('notePage', 'C') ? true : false} 
          onClick={authStore.hasPermission('notePage', 'C') ? handleNewBtnClick(chapter.id) : null}
        >
          <NewPageText>+ {t('NOTE_PAGE_LIST_CMPNT_DEF_04')}</NewPageText>
        </NewPageBtn>
      </NewPage>
    </>
  )
};

export default PageList;
