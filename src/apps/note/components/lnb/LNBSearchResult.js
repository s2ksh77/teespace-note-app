import React from 'react';
import useNoteStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  ChapterSearchResult, ChapterSearchResultColor, ChapterSearchResultTitle,
  PageSearchResult, PageSearchResultPageTitle, PageSearchResultChapterTitle, SearchResultBotttom
} from '../../styles/lnbStyle';
import NoteStore from '../../store/noteStore';
import SearchResultNotFound from '../common/SearchResultNotFound';

// chapter : id, title, color, firstPageId
// page : chapterId, chapterTitle, id, title
const LNBSearchResult = () => {
  const { ChapterStore, PageStore } = useNoteStore();
  // 챕터 검색때만 초기화
  const onClickChapterBtn = (chapterId, pageId) => async () => {
    ChapterStore.setCurrentChapterId(chapterId);
    PageStore.setCurrentPageId(pageId);    
    PageStore.fetchCurrentPageData(pageId);
    ChapterStore.initSearchVar();
    NoteStore.setShowPage(true);
    ChapterStore.setScrollIntoViewId(chapterId);
  }

  const onClickPageBtn = (chapterId, pageId) => async () => {
    if (PageStore.isEdit) return;
    ChapterStore.setCurrentChapterId(chapterId);
    PageStore.setCurrentPageId(pageId);    
    PageStore.fetchCurrentPageData(pageId);
    // ChapterStore.initSearchVar();
    NoteStore.setShowPage(true);
    if (NoteStore.layoutState === "collapse") NoteStore.setTargetLayout('Content');
  }

  return useObserver(() => (
    <>
      {(ChapterStore.searchResult?.["chapter"]?.length === 0 &&
        ChapterStore.searchResult?.["page"]?.length === 0)
        ? <SearchResultNotFound searchStr={ChapterStore.searchStr} /> :
        <>
          {ChapterStore.searchResult?.["chapter"]?.map((chapter) => {
            return (
              <ChapterSearchResult key={chapter.id} onClick={onClickChapterBtn(chapter.id, chapter.firstPageId)}>
                <ChapterSearchResultColor backgroundColor={chapter.color} />
                <ChapterSearchResultTitle>{chapter.title}</ChapterSearchResultTitle>
                <SearchResultBotttom />
              </ChapterSearchResult>
            )
          })}
          {ChapterStore.searchResult?.["page"]?.map((page) => {
            return (
              <PageSearchResult key={page.id} onClick={onClickPageBtn(page.chapterId, page.id)}>
                <PageSearchResultPageTitle>{page.title}</PageSearchResultPageTitle>
                <PageSearchResultChapterTitle>{page.chapterTitle}</PageSearchResultChapterTitle>
                <SearchResultBotttom />
              </PageSearchResult>
            )
          })}
        </>
      }
    </>
  ));
}

export default LNBSearchResult;