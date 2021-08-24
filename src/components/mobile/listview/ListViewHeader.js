import React, { useEffect, useRef, useContext } from 'react';
import useNoteStore from '../../../store/useStore';
import { useCoreStores } from 'teespace-core';
import { SearchIcon, ArrowBackIcon } from '../../icons';
import { HeaderTitle, MainHeader } from '../styles/lnbStyles';
import { useObserver } from 'mobx-react';
import { ButtonDiv, PreBtnWrapper } from '../../../styles/commonStyle';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components';

const LNBHeader = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleCancelBtn = e => {};

  const handleSearchBtn = () => {};

  const handleBackBtn = () => NoteStore.setTargetLayout('LNB');

  return useObserver(() => (
    <>
      <MainHeader>
        <PreBtnWrapper show={true} onClick={handleBackBtn}>
          <ArrowBackIcon color={themeContext.IconNormal} />
        </PreBtnWrapper>
        <HeaderTitle>{ChapterStore.chapterName}</HeaderTitle>
        <ButtonDiv onClick={handleSearchBtn}>
          <SearchIcon />
        </ButtonDiv>
        <ButtonDiv onClick={handleSearchBtn}>
          <SearchIcon />
        </ButtonDiv>
      </MainHeader>
    </>
  ));
};
export default React.memo(LNBHeader);
