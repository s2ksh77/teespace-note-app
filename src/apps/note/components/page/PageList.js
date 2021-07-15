import React, { useCallback } from 'react';
import { Observer } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import PageItem from './PageItem';
import { NewPage, NewPageBtn, PageMargin } from '../../styles/pageStyle';
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

  const handleSelectPage = useCallback(async (id, type) => {
    await PageStore.fetchCurrentPageData(id);
    PageStore.setIsRecycleBin(type === 'recycle' ? true : false)
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
            <PageItem
              key={item.id}
              page={item}
              index={index}
              chapter={chapter}
              chapterIdx={chapterIdx}
              onClick={handleSelectPage.bind(null,item.id, item.type)}
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
        show={showNewPage && authStore.hasPermission('notePage', 'C')}
      >
        <PageMargin />
        <NewPageBtn onClick={handleNewBtnClick(chapter.id)}>
          + {t('NOTE_PAGE_LIST_CMPNT_DEF_04')}
        </NewPageBtn>
      </NewPage>
    </>
  )
};

export default PageList;
