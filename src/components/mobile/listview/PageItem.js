import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import {
  PageColor,
  PageContainer,
  PageContent,
  PageContentSpan,
  PageCover,
  PageTitle,
  PageTitleSpan,
} from '../styles/listviewStyles';

const PageItem = ({ page, index }) => {
  const { NoteStore, PageStore } = useNoteStore();

  const handlePageClick = async () => {
    try {
      await PageStore.fetchNoteInfoList(page._data.id);
      NoteStore.setTargetLayout('Editor');
    } catch (e) {
      console.warn('Fetch PageInfo error', e);
    }
  };

  return useObserver(() => (
    <>
      <PageCover onClick={handlePageClick}>
        <PageColor color={page._data.color} />
        <PageContainer>
          <PageTitle>
            <PageTitleSpan>{page._data.text}</PageTitleSpan>
          </PageTitle>
          <PageContent>
            <PageContentSpan>{page._data.text_content}</PageContentSpan>
          </PageContent>
        </PageContainer>
      </PageCover>
    </>
  ));
};

export default PageItem;
