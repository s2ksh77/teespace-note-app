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
import { ButtonWrapper, ButtonIcon } from '../../styles/CommonStyle';
import ContextMenu from './ContextMenu';
import PageList from './PageList';
import sharedPageIcon from '../../assets/page_shared.svg';
import sharedIcon from '../../assets/share_1.svg';
import arrowTopIcon from '../../assets/arrow_top_1.svg';
import arrowBottomIcon from '../../assets/arrow_bottom_1.svg';

const ChapterItem = ({ chapter, flexOrder, isShared }) => {
  const { NoteStore } = useNoteStore();

  const ChapterIcon = () => {
    if (chapter.type === 'shared_page')
      return <ChapterShareIcon src={sharedPageIcon} />;
    if (chapter.type === 'shared') return <ChapterShareIcon src={sharedIcon} />;
    return <ChapterColor background={chapter.color} />;
  };

  return useObserver(() => (
    <ChapterContainer order={flexOrder}>
      <ChapterWrapper style={{ paddingLeft: isShared ? '2.63rem' : '1.69rem' }}>
        <ChapterIcon />
        <ChapterTitle>{chapter.name}</ChapterTitle>
        <ContextMenu />
        <ButtonWrapper>
          <ButtonIcon src={arrowTopIcon} />
        </ButtonWrapper>
      </ChapterWrapper>
      <PageList page={chapter.pageList} />
    </ChapterContainer>
  ));
};

export default ChapterItem;
