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

// chapter : id, title, color, firstPageId
// page : chapterId, chapterTitle, id, title
const LNBSearchResult = () => {
  const { ChapterStore, PageStore } = useNoteStore();
  // 챕터 검색때만 초기화
  const onClickChapterBtn = (chapterId) => async () => {
    ChapterStore.setScrollIntoViewId(chapterId);
    ChapterStore.initSearchVar();
    NoteStore.setShowPage(true);
    ChapterStore.getChapterChildren(chapterId).then(data => {
      if (data.noteList && data.noteList.length > 0) {
        PageStore.fetchCurrentPageData(data.noteList[0].note_id)
      } else {
        ChapterStore.setCurrentChapterId(chapterId);
        PageStore.setCurrentPageId('');
      }
    })
  }

  const onClickPageBtn = (pageId) => async () => {
    if (!PageStore.isReadMode()) return;
    await PageStore.fetchCurrentPageData(pageId);
    // ChapterStore.initSearchVar();
    NoteStore.setShowPage(true);
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
                {chapter.type === "shared" 
                ?<ChapterSearchShareIcon src={shareImg} />
                :<ChapterSearchResultColor backgroundColor={chapter.color} />
                }
                <ChapterSearchResultTitle>{chapter.text}</ChapterSearchResultTitle>
                <SearchResultBotttom />
              </ChapterSearchResult>
            )
          })}
          {ChapterStore.searchResult?.["page"]?.map((page) => {
            return (
              <PageSearchResult key={page.note_id} onClick={onClickPageBtn(page.note_id)}>
                <PageSearchResultChapterTitle>{page.parentText}</PageSearchResultChapterTitle>
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