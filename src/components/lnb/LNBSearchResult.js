import React, { useEffect } from 'react';
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
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      {NoteStore.searchResult?.['chapterList'] === null &&
      NoteStore.searchResult?.['pageList'] === null ? (
        <NoContent />
      ) : (
        <>
          {NoteStore.searchResult?.['chapterList']?.map(chapter => {
            return (
              <ChapterSearchResult key={chapter.id}>
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
          {NoteStore.searchResult?.['pageList']?.map(page => {
            return (
              <PageSearchResult key={page.note_id}>
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
