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
} from '../../styles/ChapterStyle';
import PageList from './PageList';

const ChapterItem = ({ chapter }) => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <ChapterContainer>
      <ChapterWrapper>
        <ChapterColor color={chapter.color} background={chapter.color} />
        <ChapterTitle>{chapter.name}</ChapterTitle>
      </ChapterWrapper>
      <PageList page={chapter.pageList} />
    </ChapterContainer>
  ));
};

export default ChapterItem;
