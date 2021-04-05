import React, {useState} from 'react';
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
  const [selected, setSelected] = useState(null);

  // 챕터 검색때만 초기화
  const onClickChapterBtn = (chapterId) => async () => {
    ChapterStore.setScrollIntoViewId(chapterId);
    ChapterStore.initSearchVar();
    NoteStore.setShowPage(true);
    ChapterStore.getChapterChildren(chapterId).then(data => {
      // 어차피 이미 그려진 리스트에 없다면 첫 번째 자식 선택 못하므로 일단 그려진 애들 중 첫번째가 삭제되지 않은 경우 선택
      const pageId = ChapterStore.getFirstPageFromChapter(chapterId);
      if (pageId && data.noteList && data.noteList.length > 0 && data.noteList.find(page => page.note_id === pageId)) {
        PageStore.fetchCurrentPageData(pageId);
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
      if (NoteStore.layoutState === "collapse") {
        if (!ChapterStore.isTagSearching) ChapterStore.initSearchVar();
        NoteStore.setTargetLayout('Content');
      }
      setSelected(pageId);
    });    
  }

  return useObserver(() => (
    <>
      {(ChapterStore.searchResult?.["chapter"] === null &&
        ChapterStore.searchResult?.["page"] === null)
        ? <SearchResultNotFound searchStr={ChapterStore.searchStr.trim()} /> :
        <>
          {ChapterStore.searchResult?.["chapter"]?.map((chapter) => {
            return (
              <ChapterSearchResult 
                key={chapter.id}
                onClick={onClickChapterBtn(chapter.id)}
              >
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
              <PageSearchResult 
                key={page.note_id}
                isSelected={(selected === page.note_id) ? true : false}
                onClick={onClickPageBtn(page.note_id)}
              >
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