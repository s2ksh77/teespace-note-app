import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';

import { LNBBody as SearchBody } from '../styles/lnbStyles';
import SearchHeader from './SearchHeader';
import SearchResult from '../../lnb/LNBSearchResult';

const SearchContainer = () => {
  const { ChapterStore } = useNoteStore();

  useEffect(() => {
    return () => ChapterStore.setSearchResult({});
  }, []);

  return useObserver(() => (
    <>
      <SearchHeader />
      <SearchBody style={{ padding: '0.625rem 0' }}>
        <SearchResult isMobile />
      </SearchBody>
    </>
  ));
};
export default React.memo(SearchContainer);
