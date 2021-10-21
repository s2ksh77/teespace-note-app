import React from 'react';
import { useObserver } from 'mobx-react';
import { Checkbox } from 'teespace-core';
import useNoteStore from '../../../store/useStore';
import {
  CheckBoxContainer,
  Color,
  PageContentContainer,
  PagePreviewWrapper,
  PagePreview,
  PageItemWrapper,
  PageItemContainer,
  ChapterTitle,
  PageTitle,
} from '../styles/listviewStyles';
import NoteUtil, { getI18nChapterTitle } from '../../../NoteUtil';

const PageItem = ({ page, index, isLongPress = false, isSearching }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const handleCheckBoxChange = e => {
    if (typeof e === 'boolean' && !e) {
      PageStore.selectedPages.set(page.id, page);
    } else if (typeof e === 'boolean' && e) {
      PageStore.selectedPages.delete(page.id);
    } else if (e.target.checked) {
      PageStore.selectedPages.set(page.id, page);
    } else {
      PageStore.selectedPages.delete(page.id);
    }
  };

  const fetchPageInfo = async () => {
    try {
      await PageStore.fetchNoteInfoList(page.id || page.note_id);
      PageStore.setIsRecycleBin((page.type || page.TYPE) === 'recycle');
      NoteStore.setTargetLayout('Editor');
    } catch (e) {
      console.warn('Fetch PageInfo error', e);
    }
  };

  const handlePageClick = async () => {
    if (isLongPress) {
      handleCheckBoxChange(PageStore.selectedPages.has(page.id));
      return;
    }

    if (isSearching) await ChapterStore.fetchChapterInfo(page.parent_notebook);
    fetchPageInfo();
  };

  return useObserver(() => (
    <PageItemContainer>
      {isLongPress && (
        <CheckBoxContainer>
          <Checkbox
            checked={PageStore.selectedPages.has(page.id)}
            className="check-round"
            onChange={handleCheckBoxChange}
            key={page.id}
          />
        </CheckBoxContainer>
      )}
      <PageItemWrapper onClick={handlePageClick}>
        <Color color={isSearching ? page.color : ChapterStore.chapterInfo.color} />
        <PageContentContainer>
          {isSearching && (
            <ChapterTitle>{getI18nChapterTitle(page.type, page.text)}</ChapterTitle>
          )}
          <PageTitle>{isSearching ? page.note_title : page.text}</PageTitle>
          <PagePreviewWrapper>
            <PagePreview className="lnb-result-context">
              {NoteUtil.decodeStr(
                (page.contentPreview || page.note_content)
                  .replace(/[<][^>]*[>]|&nbsp;|&zwj;/gi, '')
                  .replace(/&lt;/gi, '<')
                  .replace(/&gt;/gi, '>')
                  .replace(/\n/gi, ' '),
              )}
            </PagePreview>
          </PagePreviewWrapper>
        </PageContentContainer>
      </PageItemWrapper>
    </PageItemContainer>
  ));
};

export default PageItem;
