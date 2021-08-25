import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import {
  CheckBoxContainer,
  PageColor,
  PageContainer,
  PageContent,
  PageContentSpan,
  PageCover,
  PageItemContainer,
  PageTitle,
  PageTitleSpan,
} from '../styles/listviewStyles';
import { Checkbox } from 'teespace-core';

const PageItem = ({ page, index, isLongPress = false }) => {
  const { NoteStore, PageStore } = useNoteStore();

  const handlePageClick = async () => {
    if (isLongPress) {
      handleCheckBoxChange(PageStore.selectedPages.has(page._data.id));
      return;
    }
    const {
      _data: { id, type },
    } = page;

    try {
      await PageStore.fetchNoteInfoList(id);
      PageStore.setIsRecycleBin(type === 'recycle' ? true : false);
      NoteStore.setTargetLayout('Editor');
    } catch (e) {
      console.warn('Fetch PageInfo error', e);
    }
  };

  const handleCheckBoxChange = e => {
    if (typeof e === 'boolean' && !e) {
      PageStore.selectedPages.set(page._data.id, page._data);
    } else if (typeof e === 'boolean' && e) {
      PageStore.selectedPages.delete(page._data.id);
    } else {
      if (e.target.checked) {
        PageStore.selectedPages.set(page._data.id, page._data);
      } else {
        PageStore.selectedPages.delete(page._data.id);
      }
    }
  };

  return useObserver(() => (
    <PageItemContainer>
      {isLongPress && (
        <CheckBoxContainer>
          <Checkbox
            checked={PageStore.selectedPages.has(page._data.id)}
            className="check-round"
            onChange={handleCheckBoxChange}
            key={page._data.id}
          />
        </CheckBoxContainer>
      )}
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
    </PageItemContainer>
  ));
};

export default PageItem;
