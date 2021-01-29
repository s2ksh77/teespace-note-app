import React from 'react';
import useNoteStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  ChapterSearchShareIcon,
  ChapterSearchResult, ChapterSearchResultColor, ChapterSearchResultTitle,
  PageSearchResult, PageSearchResultPageTitle, PageSearchResultChapterTitle, SearchResultBotttom
} from '../../styles/lnbStyle';
import shareImg from '../../assets/ts_share@3x.png';
import NoteStore from '../../store/noteStore';
import SearchResultNotFound from '../common/SearchResultNotFound';
import Mark from 'mark.js';
// chapter : id, title, color, firstPageId
// page : chapterId, chapterTitle, id, title
const LNBSearchResult = () => {
  const { ChapterStore, PageStore, EditorStore } = useNoteStore();
  const instance = new Mark(EditorStore.tinymce?.getBody());

  // 챕터 검색때만 초기화
  const onClickChapterBtn = (chapterId) => async () => {
    ChapterStore.setScrollIntoViewId(chapterId);
    ChapterStore.initSearchVar();
    NoteStore.setShowPage(true);
    ChapterStore.getChapterChildren(chapterId).then(data => {
      if (data.noteList && data.noteList.length > 0) {
        PageStore.fetchCurrentPageData(data.noteList[0].note_id);
      } else {
        ChapterStore.setCurrentChapterId(chapterId);
        PageStore.setCurrentPageId('');
      }
    })
  }

  const onClickPageBtn = (pageId) => async () => {
    if (!PageStore.isReadMode()) return;
    PageStore.fetchCurrentPageData(pageId).then(() => {
      instance.unmark();
      instance.mark(ChapterStore.searchStr);
      NoteStore.setShowPage(true);
    });
    // ChapterStore.initSearchVar();
    if (NoteStore.layoutState === "collapse") NoteStore.setTargetLayout('Content');
  }

  return useObserver(() => (
    <>
      {(ChapterStore.searchResult?.["chapter"] === null &&
        ChapterStore.searchResult?.["page"] === null)
        ? <SearchResultNotFound searchStr={ChapterStore.searchStr} /> :
        <>
          {ChapterStore.searchResult?.["chapter"]?.map((chapter) => {
            return (
              <ChapterSearchResult key={chapter.id} onClick={onClickChapterBtn(chapter.id)}>
                {chapter.type === "shared" || chapter.type === "shared_page"
                  ? <ChapterSearchShareIcon src={shareImg} />
                  : <ChapterSearchResultColor backgroundColor={chapter.color} />
                }
                <ChapterSearchResultTitle style={(chapter.type === "shared" || chapter.type === "shared_page") ? { paddingLeft: "0.59rem" } : null}>{chapter.text}</ChapterSearchResultTitle>
                <SearchResultBotttom />
              </ChapterSearchResult>
            )
          })}
          {ChapterStore.searchResult?.["page"]?.map((page) => {
            return (
              <PageSearchResult key={page.note_id} onClick={onClickPageBtn(page.note_id)}>
                <PageSearchResultChapterTitle>{page.text}</PageSearchResultChapterTitle>
                <PageSearchResultPageTitle>{page.note_title}</PageSearchResultPageTitle>
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