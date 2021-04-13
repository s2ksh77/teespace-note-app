import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import {
  ChapterContainer,
  ChapterWrapper,
  ChapterColor,
  ChapterShareIcon,
  ChapterTitle,
  ChapterTitleInput,
  ChapterFoldButton,
  ChapterFoldButtonIcon,
} from '../../styles/ChapterStyle';
import ContextMenu from './ContextMenu';
import PageList from './PageList';
import arrowTopIcon from '../../assets/arrow_top_1.svg';
import arrowBottomIcon from '../../assets/arrow_bottom_1.svg';

const ChapterItem = ({ chapter, flexOrder, isShared }) => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <ChapterContainer order={flexOrder}>
      <ChapterWrapper>
        <ChapterColor color={chapter.color} background={chapter.color} />
        <ChapterTitle>{chapter.name}</ChapterTitle>
        <ContextMenu />
        <ChapterFoldButton>
          <ChapterFoldButtonIcon src={arrowTopIcon} />
        </ChapterFoldButton>
      </ChapterWrapper>
      <PageList page={chapter.pageList} />
    </ChapterContainer>
  ));
};

export default ChapterItem;
