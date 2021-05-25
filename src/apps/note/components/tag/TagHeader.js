import React, { useEffect, useState, useRef, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import ContentHeader from '../common/ContentHeader';
import {
  TagSearchForm,
  TagTitleSearchContainer,
  LnbTitleSearchInput,
  HeaderDivider,
} from '../../styles/titleStyle';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';
import {
  MediumButtonWrapper as SearchButton,
  SmallButtonWrapper as CloseButton,
} from '../../styles/commonStyle';
import { SearchIcon, CloseIcon } from '../icons';

const TagHeader = () => {
  const { NoteStore, ChapterStore, TagStore } = useNoteStore();
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const activateSearchIcon = TagStore.isSearching || value !== '';
  const themeContext = useContext(ThemeContext);

  // 뒤로가기 버튼 : lnb 영역(검색X인, 초기화된 챕터 리스트 나오도록 구현함)
  const onClickBackBtn = () => {
    NoteStore.setTargetLayout('LNB');
    ChapterStore.initSearchVar();
    ChapterStore.getNoteChapterList();
  };

  const onSubmitForm = e => {
    e.preventDefault();
    TagStore.searchTag(value.trim());
    inputRef.current.focus();
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  const onClickCancelBtn = () => {
    setValue('');
    TagStore.setIsSearching(false);
    TagStore.setSearchStr('');
    TagStore.fetchTagData();
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') onClickCancelBtn();
  };

  useEffect(() => {
    if (NoteStore.showPage) {
      setValue('');
      TagStore.setIsSearching(false);
      TagStore.setSearchStr('');
    }
  }, [NoteStore.showPage]);

  return useObserver(() => (
    <>
      <ContentHeader handleBackBtn={onClickBackBtn} alignment="right">
        <TagSearchForm
          onSubmit={onSubmitForm}
          show={TagStore.allSortedTagList.length > 0}
        >
          <TagTitleSearchContainer isSearch={!!activateSearchIcon}>
            <SearchButton onClick={onSubmitForm}>
              <SearchIcon
                color={
                  ChapterStore.searchStr !== '' ||
                  ChapterStore.isSearching
                    ? themeContext.Iconmain
                    : themeContext.IconHinted
                }
              />
            </SearchButton>
            <LnbTitleSearchInput
              autocomplete="off"
              ref={inputRef}
              value={value}
              onChange={onChangeInput}
              placeholder={t('NOTE_TAG_TAG_MENU_05')}
              onKeyDown={handleKeyDown}
              isSearch={!!activateSearchIcon}
            />
            <CloseButton
              onClick={onClickCancelBtn}
              visible={activateSearchIcon}
            >
              <CloseIcon width={0.75} height={0.75} />
            </CloseButton>
          </TagTitleSearchContainer>
        </TagSearchForm>
        <HeaderDivider />
      </ContentHeader>
    </>
  ));
};

export default TagHeader;
