/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Mark from 'mark.js';
import styled, { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';

import {
  SearchResultContainer,
  SearchDivision,
  ChapterSearchResult,
  ChapterSearchResultTitle,
  PageSearchResult,
  PageSearchResultPageTitle,
  PageSearchResultChapterTitle,
  PageSearchResultChapterTitle as SubText,
  PageSearchResult as TagSearchResult,
} from '../../styles/lnbStyle';
import { ChapterColor } from '../../styles/chpaterStyle';
import { ShareIcon, SharedPageIcon } from '../icons';
import NoteStore from '../../store/noteStore';
import SearchResultNotFound from '../common/SearchResultNotFound';
import { TagChip, TagList, TagText } from '../../styles/tagStyle';
import NoteUtil, { isNormalChapter } from '../../NoteUtil';
import ChapterItem from '../mobile/lnb/ChapterItem';
import PageItem from '../mobile/listview/PageItem';
import TagItem from '../mobile/listview/TagItem';

const LNBSearchResult = ({ isMobile }) => {
  const { ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const instance = new Mark(EditorStore.tinymce?.getBody());
  const [selected, setSelected] = useState({ id: null, type: null });

  const handleChapterClick = chapterId => async () => {
    const clickedChapter = ChapterStore.chapterList.find(
      chapter => chapter.id === chapterId,
    );
    const firstPageId = clickedChapter?.children[0]?.id;
    await PageStore.fetchCurrentPageData(firstPageId);

    ChapterStore.setDragData(
      new Map([[chapterId, ChapterStore.createDragData(chapterId)]]),
    );
    PageStore.setDragData(
      new Map([[firstPageId, PageStore.createDragData(firstPageId, chapterId)]]),
    );

    ChapterStore.setScrollIntoViewId(chapterId);
    ChapterStore.initSearchVar();
    NoteStore.setShowPage(true);
  };

  const ChapterIcon = React.memo(({ type, color }) => {
    switch (type) {
      case 'shared_page':
        return <SharedPageIcon color={themeContext.SubStateVivid} />;
      case 'shared':
        return <ShareIcon color={themeContext.SubStateVivid} />;
      default:
        return <ChapterColor background={color} />;
    }
  });

  const handlePageClick = (pageId, type) => async () => {
    if (!PageStore.isReadMode()) return;
    await PageStore.fetchCurrentPageData(pageId);

    instance.unmark();
    instance.mark(ChapterStore.searchResult?.keyword);
    NoteStore.setShowPage(true);
    if (NoteStore.layoutState === 'collapse') {
      if (!ChapterStore.isTagSearching) ChapterStore.initSearchVar();
      NoteStore.setTargetLayout('Content');
    }
    setSelected({ id: pageId, type });
  };

  useEffect(() => {
    if (!ChapterStore.searchResult?.keyword) return;
    const mark = new Mark(document.querySelectorAll('.lnb-result-context'));
    mark.unmark();
    mark.mark(ChapterStore.searchResult?.keyword);
  }, [ChapterStore.searchResult?.keyword]);

  return useObserver(() => (
    <>
      {ChapterStore.searchResult?.chapter === null &&
      ChapterStore.searchResult?.page === null &&
      ChapterStore.searchResult?.tag === null ? (
        <SearchResultNotFound searchStr={ChapterStore.searchResult?.keyword} />
      ) : (
        <SearchResultContainer>
          {ChapterStore.searchResult?.chapter && (
            <SearchDivision>{t('NOTE_META_TAG_01')}</SearchDivision>
          )}
          {ChapterStore.searchResult?.chapter?.map(chapter => {
            return isMobile ? (
              <ChapterItem key={chapter.id} chapter={chapter} flexOrder={1} />
            ) : (
              <ChapterSearchResult
                key={chapter.id}
                onClick={handleChapterClick(chapter.id)}
              >
                <ChapterIcon type={chapter.type} color={chapter.color} />
                <ChapterSearchResultTitle
                  style={{
                    marginLeft: isNormalChapter(chapter.type) ? '1.69rem' : '2.63rem',
                  }}
                >
                  {chapter.type === 'shared_page'
                    ? t('NOTE_PAGE_LIST_CMPNT_DEF_07')
                    : chapter.text}
                </ChapterSearchResultTitle>
              </ChapterSearchResult>
            );
          })}
          {ChapterStore.searchResult?.page && (
            <SearchDivision>{t('NOTE_META_TAG_02')}</SearchDivision>
          )}
          {ChapterStore.searchResult?.page?.map(page => {
            return isMobile ? (
              <PageItem key={page.id} page={page} isSearching />
            ) : (
              <PageSearchResult
                key={page.note_id}
                isSelected={selected.id === page.note_id && selected.type === 'page'}
                onClick={handlePageClick(page.note_id, 'page')}
              >
                <PageSearchResultChapterTitle>
                  {page.TYPE === 'shared_page'
                    ? t('NOTE_PAGE_LIST_CMPNT_DEF_07')
                    : page.TYPE === 'recycle_bin'
                    ? t('NOTE_BIN_01')
                    : page.text}
                </PageSearchResultChapterTitle>
                <PageSearchResultPageTitle>{page.note_title}</PageSearchResultPageTitle>
                {page.contentPreview && (
                  <SubText className="lnb-result-context" isContent>
                    {page.contentPreview}
                  </SubText>
                )}
              </PageSearchResult>
            );
          })}
          {ChapterStore.searchResult?.tag && (
            <SearchDivision>{t('NOTE_PAGE_LIST_CMPNT_DEF_06')}</SearchDivision>
          )}
          {ChapterStore.searchResult?.tag?.map((tag, pageListIdx) => {
            return isMobile ? (
              <TagItem tag={tag} listIdx={pageListIdx} />
            ) : (
              <TagSearchResult
                key={pageListIdx}
                isSelected={selected.id === tag.note_id && selected.type === 'tag'}
                onClick={handlePageClick(tag.note_id, 'tag')}
              >
                <PageSearchResultChapterTitle>
                  {tag.TYPE === 'shared_page'
                    ? t('NOTE_PAGE_LIST_CMPNT_DEF_07')
                    : tag.TYPE === 'recycle_bin'
                    ? t('NOTE_BIN_01')
                    : tag.text}
                </PageSearchResultChapterTitle>
                <PageSearchResultPageTitle>{tag.note_title}</PageSearchResultPageTitle>
                <TagList>
                  {tag.tagList.map((item, index) => {
                    return (
                      <SearchTagChip id={item.tag_id} key={`${pageListIdx}_${index}`}>
                        <TagText>{NoteUtil.decodeStr(item.text)}</TagText>
                      </SearchTagChip>
                    );
                  })}
                </TagList>
              </TagSearchResult>
            );
          })}
        </SearchResultContainer>
      )}
    </>
  ));
};

export default React.memo(LNBSearchResult);

const SearchTagChip = styled(TagChip)`
  margin: 0 0.38rem 0 0;
`;
