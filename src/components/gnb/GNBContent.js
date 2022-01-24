import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';

import { Wrapper, ContentWrapper } from '../../styles/commonStyle';
import Header from '../common/Header';
import Overlay from '../common/Overlay';
import TalkSearch from './TalkSearch';
import LNBSearchResult from '../lnb/LNBSearchResult';
import Searching from '../common/NoContent';
import Content from '../lnb/Content';

const GNBContent = ({ selectedMenu }) => {
  const { ChapterStore } = useNoteStore();

  const ContentBody = () => {
    switch (selectedMenu) {
      case 'talk':
        return <TalkSearch />;
      default:
        return <Content selectedMenu={selectedMenu} />;
    }
  };

  useEffect(() => {
    if (ChapterStore.isSearching || ChapterStore.isTagSearching)
      ChapterStore.initSearchVar();
  }, [selectedMenu]);

  return useObserver(() => (
    <Wrapper>
      <Header selectedMenu={selectedMenu} />
      <ContentWrapper>
        {!ChapterStore.isSearching && !ChapterStore.isTagSearching ? (
          <>
            <Overlay backgroundColor="#fff" />
            <ContentBody />
          </>
        ) : ChapterStore.isLoadingSearchResult ? (
          <Searching content="searching" />
        ) : (
          <LNBSearchResult />
        )}
      </ContentWrapper>
    </Wrapper>
  ));
};

export default GNBContent;
