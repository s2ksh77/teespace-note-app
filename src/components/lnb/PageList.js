import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';
import PageItem from './PageItem';
import { NewPageButton } from '../../styles/PageStyle';

const PageList = ({ page, chapterId }) => {
  const { authStore } = useCoreStores();
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { t } = useTranslation();

  const handleNewBtnClick = async chapterId => {
    try {
      if (ChapterStore.newChapterVisible) return;

      const result = await PageStore.createPage(
        t('NOTE_PAGE_LIST_CMPNT_DEF_03'),
        null,
        chapterId,
      );
    } catch (error) {
      console.error(`Page Create :: Error is ${error}`);
    }
  };

  return useObserver(() => (
    <>
      {page.map((item, index) => (
        <PageItem key={item.id} page={item} />
      ))}
      <NewPageButton
        key={chapterId}
        active={!!authStore.hasPermission('notePage', 'C')}
        onClick={
          authStore.hasPermission('notePage', 'C')
            ? handleNewBtnClick.bind(null, chapterId)
            : null
        }
      >
        + {t('NOTE_PAGE_LIST_CMPNT_DEF_04')}
      </NewPageButton>
    </>
  ));
};

export default PageList;
