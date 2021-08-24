import React, { useEffect, useRef, useContext } from 'react';
import useNoteStore from '../../../store/useStore';
import { EventBus, useCoreStores } from 'teespace-core';
import { SearchIcon, CloseIcon } from '../../icons';
import { HeaderTitle, MainHeader } from '../styles/lnbStyles';
import { useObserver } from 'mobx-react';
import { ButtonDiv } from '../../../styles/commonStyle';
import { useTranslation } from 'react-i18next';

const LNBHeader = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();

  const handleCancelBtn = e => EventBus.dispatch('onLayoutClose');

  const handleSearchBtn = () => {};

  return useObserver(() => (
    <>
      <MainHeader>
        <ButtonDiv onClick={handleCancelBtn}>
          <CloseIcon />
        </ButtonDiv>
        <HeaderTitle>{t('NOTE_META_TAG_01')}</HeaderTitle>
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
