import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';

import { Wrapper, ContentWrapper } from '../../styles/commonStyle';
import { LNB as LNBWrapper, Content } from '../../GlobalStyles';
import Header from '../common/Header';
import Overlay from '../common/Overlay';
import LNBContainer from '../lnb/LNBContainer';
import PageContainer from '../page/PageContainer';
import TagContainer from '../tag/TagContainer';
import LNBPageContainer from '../lnb/LNBPageContainer';
import LNBSearchResult from '../lnb/LNBSearchResult';
import Searching from '../common/NoContent';

const GNBContent = ({ selectedMenu }) => {
  const { NoteStore, ChapterStore } = useNoteStore();

  const renderCondition = target =>
    !(NoteStore.layoutState === 'collapse' && NoteStore.targetLayout !== target);

  const LNB = () => {
    switch (selectedMenu) {
      case 'my':
        return <LNBContainer />;
      case 'talk':
        return <div>talk table</div>;
      case 'shared':
        return <LNBContainer selectedMenu={selectedMenu} />;
      case 'recent':
      case 'bookmark':
        return <LNBPageContainer selectedMenu={selectedMenu} />;
      default:
        return <div>test22</div>;
    }
  };

  return useObserver(() => (
    <Wrapper>
      <Header selectedMenu={selectedMenu} />
      <ContentWrapper>
        {!ChapterStore.isSearching && !ChapterStore.isTagSearching ? (
          <>
            <Overlay backgroundColor="#fff" />
            <LNBWrapper show={!NoteStore.isContentExpanded && renderCondition('LNB')}>
              <LNB />
            </LNBWrapper>
            <Content
              id="note-content"
              show={renderCondition('Content')}
              isBorderLeft={
                NoteStore.layoutState !== 'collapse' && !NoteStore.isContentExpanded
              }
            >
              <PageContainer selectedMenu={selectedMenu} />
              <TagContainer />
            </Content>
          </>
        ) : (ChapterStore.isSearching || ChapterStore.isTagSearching) &&
          ChapterStore.isLoadingSearchResult ? (
          <Searching content="searching" />
        ) : (
          <LNBSearchResult />
        )}
      </ContentWrapper>
    </Wrapper>
  ));
};

export default GNBContent;
