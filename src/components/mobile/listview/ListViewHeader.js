import React, { useEffect, useRef, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components';
import { useCoreStores } from 'teespace-core';
import useNoteStore from '../../../store/useStore';

import { MainHeaderWrapper, HeaderTitle } from '../styles/lnbStyles';
import { PreBtnWrapper, ButtonDiv } from '../../../styles/commonStyle';
import { ArrowBackIcon2, SearchIcon } from '../../icons';

const ListViewHeader = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleSearchButtonClick = () => {};

  const handleBackButtonClick = () => NoteStore.setTargetLayout('LNB');

  return useObserver(() => (
    <MainHeaderWrapper>
      <PreBtnWrapper show onClick={handleBackButtonClick}>
        <ArrowBackIcon2 width="1.25" height="1.25" color={themeContext.IconNormal2} />
      </PreBtnWrapper>
      <HeaderTitle>{ChapterStore.chapterName}</HeaderTitle>
      <ButtonDiv onClick={handleSearchButtonClick}>
        <SearchIcon width="1.25" height="1.25" color={themeContext.IconNormal2} />
      </ButtonDiv>
      <ButtonDiv>
        <SearchIcon width="1.5" height="1.5" />
      </ButtonDiv>
    </MainHeaderWrapper>
  ));
};
export default React.memo(ListViewHeader);
