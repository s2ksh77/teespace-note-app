/* eslint-disable no-nested-ternary */
import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';

import { LNB as LNBWrapper, Content as LNBContentWrapper } from '../../GlobalStyles';
import LNBContainer from './LNBContainer';
import PageContainer from '../page/PageContainer';
import TagContainer from '../tag/TagContainer';
import LNBPageContainer from './LNBPageContainer';

const Content = ({ selectedMenu }) => {
  const { NoteStore } = useNoteStore();

  const renderCondition = target =>
    !(NoteStore.layoutState === 'collapse' && NoteStore.targetLayout !== target);

  const LNB = () => {
    switch (selectedMenu) {
      case 'recent':
      case 'bookmark':
        return <LNBPageContainer selectedMenu={selectedMenu} />;
      default:
        return <LNBContainer selectedMenu={selectedMenu} />;
    }
  };

  return useObserver(() => (
    <>
      <LNBWrapper
        className="lnb-wrapper"
        show={!NoteStore.isContentExpanded && renderCondition('LNB')}
      >
        <LNB />
      </LNBWrapper>
      <LNBContentWrapper
        id="note-content"
        show={renderCondition('Content')}
        isBorderLeft={
          NoteStore.layoutState !== 'collapse' && !NoteStore.isContentExpanded
        }
      >
        <PageContainer selectedMenu={selectedMenu} />
        <TagContainer />
      </LNBContentWrapper>
    </>
  ));
};

export default Content;
