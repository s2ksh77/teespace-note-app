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
// chapter : id, title, color, firstPageId
// page : chapterId, chapterTitle, id, title
const LNBSearchResult = () => {
  const { ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const instance = new Mark(EditorStore.tinymce?.getBody());
  const [selected, setSelected] = useState({ id: null, type: null });

  // 챕터 검색때만 초기화
  // children 순서도 알아야하므로 type 넘겨주지 않고 chapterList에서 chapter 찾아서 type도 알아내고, children도 알아낸다
  const onClickChapterBtn = chapterId => async () => {
    ChapterStore.setScrollIntoViewId(chapterId);
    ChapterStore.initSearchVar();
    NoteStore.setShowPage(true);
    ChapterStore.getChapterChildren(chapterId).then(data => {
      const chapterInfo = ChapterStore.chapterList.find(
        chapter => chapter.id === chapterId,
      );
      if (!chapterInfo) return; // 만약의 경우

      if (chapterInfo.children.length > 0) {
        const pageId = chapterInfo.children[0].id;
        // 어차피 이미 그려진 리스트에 없다면 첫 번째 자식 선택 못하므로 일단 그려진 애들 중 첫번째가 삭제되지 않은 경우 선택
        if (
          pageId &&
          data.noteList?.length > 0 &&
          data.noteList.find(page => page.note_id === pageId)
        ) {
          PageStore.fetchCurrentPageData(pageId);
          return;
        }
      }
      ChapterStore.setCurrentChapterInfo(chapterId);
      PageStore.fetchCurrentPageData('');
    });
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

  const onClickPageBtn = (pageId, type) => async () => {
    if (!PageStore.isReadMode()) return;
    PageStore.fetchCurrentPageData(pageId).then(() => {
      instance.unmark();
      instance.mark(ChapterStore.searchStr);
      NoteStore.setShowPage(true);
      if (NoteStore.layoutState === 'collapse') {
        if (!ChapterStore.isTagSearching) ChapterStore.initSearchVar();
        NoteStore.setTargetLayout('Content');
      }
      setSelected({ id: pageId, type: type });
    });
  };

  useEffect(() => {
    new Mark(document.querySelectorAll('.lnb-result-context')).mark(
      ChapterStore.searchStr,
    );
  }, []);

  return useObserver(() => (
    <>
      {ChapterStore.searchResult?.chapter === null &&
      ChapterStore.searchResult?.page === null &&
      ChapterStore.searchResult?.tag === null ? (
        <SearchResultNotFound searchStr={ChapterStore.searchStr.trim()} />
      ) : (
        <SearchResultContainer>
          {ChapterStore.searchResult?.chapter && (
            <SearchDivision>{t('NOTE_META_TAG_01')}</SearchDivision>
          )}
          {ChapterStore.searchResult?.chapter?.map(chapter => {
            return (
              <ChapterSearchResult
                key={chapter.id}
                onClick={onClickChapterBtn(chapter.id)}
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
            return (
              <PageSearchResult
                key={page.note_id}
                isSelected={selected.id === page.note_id && selected.type === 'page'}
                onClick={onClickPageBtn(page.note_id, 'page')}
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
            return (
              <TagSearchResult
                key={pageListIdx}
                isSelected={selected.id === tag.note_id && selected.type === 'tag'}
                onClick={onClickPageBtn(tag.note_id, 'tag')}
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
