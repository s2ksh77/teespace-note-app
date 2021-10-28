import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';

import NoContent from '../../common/NoContent';
import PageItem from '../listview/PageItem';
import { SearchResultContainer } from '../../../styles/lnbStyle';

const PageSearchResult = () => {
  const { ChapterStore } = useNoteStore();

  return useObserver(() => (
    <>
      {ChapterStore.searchResult?.page === null ? (
        <NoContent content="search" value={ChapterStore.searchResult?.keyword} />
      ) : (
        <SearchResultContainer style={{ padding: '0.375rem 0.938rem' }}>
          {ChapterStore.searchResult?.page?.map(page => (
            <PageItem key={page.id} page={page} isSearching />
          ))}
        </SearchResultContainer>
      )}
    </>
  ));
};
export default PageSearchResult;
