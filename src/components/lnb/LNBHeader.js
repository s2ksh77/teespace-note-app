import React, { useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';
import {
  HeaderContainer as LNBHeaderContainer,
  BackButtonIcon,
  NewChapterButton,
  SearchBar,
  SearchBarIcon,
  SearchInput,
  SearchCancelButton,
} from '../../styles/HeaderStyle';
import { TagItem, TagText, TagCancelButton } from '../../styles/TagStyle';
import LayoutStateButton from '../common/LayoutStateButton';
import backBtn from '../../assets/arrow_back_1.svg';
import searchImg from '../../assets/search.svg';
import cancelImg from '../../assets/ts_cancel@3x.png';
import LNBSearchResult from './LNBSearchResult';

const LNBHeader = () => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  // Back Btn TODO

  const handleNewBtnClick = () => {
    ChapterStore.setNewChapterVisible(!ChapterStore.newChapterVisible);
  };
  const handleStateChange = () => {};

  const handleChange = e => {
    const {
      target: { value },
    } = e;
    NoteStore.setSearchStr(value);
  };

  const handleKeyDown = async e => {
    e.preventDefault();
    try {
      const response = await NoteStore.getSearchList(NoteStore.searchStr);
      NoteStore.setIsSearch(true);
      NoteStore.setSearchResult(response);
    } catch (error) {
      console.error(`FetchSearchList :: Error is ${error}`);
    }
  };

  const handleCancelKeyDown = async () => {
    NoteStore.setSearchStr('');
    try {
      const reponse = await ChapterStore.fetchChapterList();
    } catch (error) {
      console.error(`FetchChapterList :: Error is ${error}`);
    }
  };

  const handleCancel = async () => {
    NoteStore.setSearchInit();
    await ChapterStore.fetchChapterList();
  };

  return useObserver(() => (
    <LNBHeaderContainer>
      <BackButtonIcon
        src={backBtn}
        onClick={handleStateChange}
        style={{ display: 'none' }}
      />
      <NewChapterButton onClick={handleNewBtnClick}>
        {t('NOTE_PAGE_LIST_CMPNT_DEF_01')}
      </NewChapterButton>
      <SearchBar
        style={
          NoteStore.targetLayout === 'lnb'
            ? { marginRight: '0.63rem' }
            : { marginRight: '0' }
        }
        onSubmit={handleKeyDown}
      >
        <SearchBarIcon
          type="image"
          src={searchImg}
          isSearch={!!(NoteStore.searchStr !== '' || NoteStore.isSearch)}
        />
        {ChapterStore.isTagSearching ? (
          <TagItem>
            <TagText />
            <TagCancelButton />
          </TagItem>
        ) : (
          <SearchInput
            ref={inputRef}
            value={NoteStore.searchStr}
            onChange={handleChange}
            placeholder={t('NOTE_PAGE_LIST_CMPNT_DEF_05')}
            onKeyDown={e => (e.key === 'Escape' ? handleCancelKeyDown() : null)}
          />
        )}
        <SearchCancelButton
          src={cancelImg}
          visible={!!(NoteStore.searchStr !== '' || NoteStore.isSearch)}
          onClick={handleCancel}
        />
      </SearchBar>
      {NoteStore.layoutState === 'collapse' && <LayoutStateButton />}
    </LNBHeaderContainer>
  ));
};

export default LNBHeader;
