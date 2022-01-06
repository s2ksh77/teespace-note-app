import React, { useRef, useContext } from 'react';
import { useObserver } from 'mobx-react';
import Mark from 'mark.js';
import { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useCoreStores } from 'teespace-core';
import useNoteStore from '../../store/useStore';

import {
  LNBHeaderWrapper,
  LnbTitleNewButton,
  LnbTitleSearchContainer,
  LnbTitleSearchInput,
} from '../../styles/titleStyle';
import {
  BackBtnWrapper as BackBtn,
  MediumButtonWrapper as SearchBtn,
  SmallButtonWrapper as CloseBtn,
} from '../../styles/commonStyle';
import { SearchTagChip, TagText } from '../../styles/tagStyle';
import HeaderButtons from '../common/buttons';
import { isFilled } from '../common/validators';
import { ArrowBackIcon, SearchIcon, CloseIcon } from '../icons';

const LNBHeader = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const instance = new Mark(EditorStore.tinymce?.getBody());
  const themeContext = useContext(ThemeContext);

  const handleBackBtnClick = () => {
    NoteStore.setTargetLayout('Content');
    NoteStore.setShowPage(false);
  };

  const handleNewChapterClick = async () => {
    if (!PageStore.isReadMode() || ChapterStore.isNewChapter) return;
    ChapterStore.setChapterTempUl(true); // isNewChapter = true;
    ChapterStore.getChapterRandomColor();
  };

  const handleSearchSubmit = async e => {
    e.preventDefault();
    if (ChapterStore.isTagSearching || !isFilled(ChapterStore.searchStr.trim())) return;
    await ChapterStore.getSearchResult();
    inputRef.current.focus();
  };

  const handleSearchValueChange = e => {
    ChapterStore.setSearchStr(e.target.value);
  };

  const handleCancelBtnClick = () => {
    ChapterStore.initSearchVar();
    ChapterStore.getNoteChapterList();
    instance.unmark();
  };

  const handleTagSearchCancel = () => {
    ChapterStore.initSearchVar();
    ChapterStore.getNoteChapterList();
  };

  return useObserver(() => (
    <LNBHeaderWrapper>
      <BackBtn
        show={NoteStore.layoutState === 'collapse' && ChapterStore.isTagSearching}
        onClick={handleBackBtnClick}
      >
        <ArrowBackIcon color={themeContext.IconNormal} />
      </BackBtn>
      {authStore.hasPermission('noteChapter', 'C') && (
        <LnbTitleNewButton
          data-btn="noteNewChapterBtn"
          onClick={handleNewChapterClick}
          style={{ width: '100%' }}
        >
          {t('NOTE_PAGE_LIST_CMPNT_DEF_01')}
        </LnbTitleNewButton>
      )}
      {NoteStore.layoutState === 'collapse' && <HeaderButtons />}
    </LNBHeaderWrapper>
  ));
};
export default React.memo(LNBHeader);
