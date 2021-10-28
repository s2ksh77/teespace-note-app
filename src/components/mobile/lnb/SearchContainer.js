import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';

import { LNBBody as SearchBody } from '../styles/lnbStyles';
import SearchHeader from './SearchHeader';
import PageSearchResult from './PageSearchResult';
import SearchResult from '../../lnb/LNBSearchResult';

const SearchContainer = ({ isPageSearching }) => {
  const { ChapterStore } = useNoteStore();

  useEffect(() => {
    return () => ChapterStore.setSearchResult({});
  }, []);

  return useObserver(() => (
    <>
      <SearchHeader isPageSearching={isPageSearching} />
      <SearchBody style={{ padding: '0.625rem 0' }}>
        {isPageSearching ? <PageSearchResult /> : <SearchResult isMobile />}
      </SearchBody>
    </>
  ));
};
export default React.memo(SearchContainer);
