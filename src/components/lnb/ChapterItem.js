import React from 'react';
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

const ChapterItem = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <ChapterContainer>
      <ChapterWrapper>
        <ChapterColor />
        <ChapterTitle />
      </ChapterWrapper>
      <PageList />
    </ChapterContainer>
  ));
};

export default ChapterItem;
