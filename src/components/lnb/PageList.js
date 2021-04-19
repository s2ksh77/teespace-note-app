import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';
import PageItem from './PageItem';
import { NewPageButton } from '../../styles/PageStyle';

const PageList = ({ page }) => {
  const { authStore } = useCoreStores();
  const { NoteStore, ChapterStore } = useNoteStore();
  const { t } = useTranslation();

  const handleNewBtnClick = () => {
    if (ChapterStore.newChapterVisible) return;
  };

  return useObserver(() => (
    <>
      {page.map((item, index) => (
        <PageItem key={item.id} page={item} />
      ))}
      <NewPageButton
        active={!!authStore.hasPermission('notePage', 'C')}
        onClick={
          authStore.hasPermission('notePage', 'C') ? handleNewBtnClick : null
        }
      >
        + {t('NOTE_PAGE_LIST_CMPNT_DEF_04')}
      </NewPageButton>
    </>
  ));
};

export default PageList;
