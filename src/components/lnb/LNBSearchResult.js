import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';
import {
  ChapterSearchResult,
  ChapterSearchResultColor,
  ChapterSearchResultTitle,
  ChapterSearchShareIcon,
  PageSearchResult,
  PageSearchResultChapterTitle,
  PageSearchResultPageTitle,
  SearchResultBotttom,
} from '../../styles/LNBStyle';
import shareImg from '../../assets/ts_share@3x.png';
import NoContent from '../common/NoContent';

const LNBSearchResult = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const [selected, setSelected] = useState(null);

  const handleChapterClick = chapterId => async () => {
    // TODO 스크롤
    // ChapterStore.setScrollIntoViewId(chapterId);

    NoteStore.setSearchInit();
    await ChapterStore.fetchChapterList();

    const chapterInfo = ChapterStore.chapterMap.get(chapterId);
    const pageInfo = chapterInfo.pageList?.[0];

    if (pageInfo) {
      await PageStore.fetchNoteInfoList(pageInfo.id);
      PageStore.fetchNoteTagList(pageInfo.id);
      NoteStore.setIsPageContent(true);
    }
  };

  const handlePageClick = pageId => async () => {
    await PageStore.fetchNoteInfoList(pageId);
    PageStore.fetchNoteTagList(pageId);
    NoteStore.setIsPageContent(true);
    if (!PageStore.pageModel.isReadMode) return;

    if (NoteStore.layoutState === 'collapse') {
      NoteStore.setSearchInit();
      NoteStore.setTargetLayout('content');
    } else {
      setSelected(pageId);
    }
  };

  return useObserver(() => (
    <>
      {NoteStore.searchResult?.chapterList === null &&
      NoteStore.searchResult?.pageList === null ? (
        <NoContent />
      ) : (
        <>
          {NoteStore.searchResult?.chapterList?.map(chapter => {
            return (
              <ChapterSearchResult
                key={chapter.id}
                onClick={handleChapterClick(chapter.id)}
              >
                {chapter.type === 'shared' || chapter.type === 'shared_page' ? (
                  <ChapterSearchShareIcon src={shareImg} />
                ) : (
                  <ChapterSearchResultColor backgroundColor={chapter.color} />
                )}
                <ChapterSearchResultTitle
                  style={
                    chapter.type === 'shared' || chapter.type === 'shared_page'
                      ? { paddingLeft: '0.59rem' }
                      : null
                  }
                >
                  {chapter.text}
                </ChapterSearchResultTitle>
                <SearchResultBotttom />
              </ChapterSearchResult>
            );
          })}
          {NoteStore.searchResult?.pageList?.map(page => {
            return (
              <PageSearchResult
                key={page.note_id}
                onClick={handlePageClick(page.note_id)}
                isSelected={selected === page.note_id}
              >
                <PageSearchResultChapterTitle>
                  {page.text}
                </PageSearchResultChapterTitle>
                <PageSearchResultPageTitle>
                  {page.note_title}
                </PageSearchResultPageTitle>
                <SearchResultBotttom />
              </PageSearchResult>
            );
          })}
        </>
      )}
    </>
  ));
};

export default LNBSearchResult;
