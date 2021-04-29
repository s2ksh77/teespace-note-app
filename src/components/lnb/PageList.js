import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';
import PageItem from './PageItem';
import { NewPageButton } from '../../styles/PageStyle';

const PageList = ({ page, chapter, chapterIdx }) => {
  const { authStore } = useCoreStores();
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { t } = useTranslation();

  const handleNewBtnClick = async () => {
    try {
      if (ChapterStore.newChapterVisible) return;

      const result = await PageStore.createPage(
        t('NOTE_PAGE_LIST_CMPNT_DEF_03'),
        null,
        chapter.id,
      );
    } catch (error) {
      console.error(`Page Create :: Error is ${error}`);
    }
  };

  return useObserver(() => (
    <>
      {page.map((item, index) => (
        <PageItem
          key={item.id}
          page={item}
          pageIdx={index}
          chapter={chapter}
          chapterIdx={chapterIdx}
        />
      ))}
      {page.type !== 'shared' || page.type !== 'shared_page' ? (
        <NewPageButton
          key={chapter.id}
          active={!!authStore.hasPermission('notePage', 'C')}
          onClick={
            authStore.hasPermission('notePage', 'C') ? handleNewBtnClick : null
          }
        >
          + {t('NOTE_PAGE_LIST_CMPNT_DEF_04')}
        </NewPageButton>
      ) : null}
    </>
  ));
};

export default PageList;
