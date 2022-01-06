import React, { useRef, useContext } from 'react';
import { useNoteStore } from '../../external';
import {
  Wrapper,
  LnbTitleSearchContainer,
  LnbTitleSearchInput,
  Title,
} from '../../styles/titleStyle';
import {
  MediumButtonWrapper as SearchBtn,
  SmallButtonWrapper as CloseBtn,
} from '../../styles/commonStyle';
import { CloseIcon, SearchIcon } from '../icons';
import { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';

const Header = ({ title }) => {
  const { ChapterStore } = useNoteStore();
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const inputRef = useRef(null);

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

  return (
    <Wrapper>
      <Title> 내 노트 </Title>
      <LnbTitleSearchContainer
        onSubmit={handleSearchSubmit}
        isTagSearching={ChapterStore.isTagSearching}
        style={{ maxWidth: '22.5rem' }}
      >
        <SearchBtn onClick={handleSearchSubmit}>
          <SearchIcon
            color={
              ChapterStore.searchStr !== '' || ChapterStore.isSearching
                ? themeContext.Iconmain
                : themeContext.IconHinted
            }
          />
        </SearchBtn>
        <LnbTitleSearchInput
          ref={inputRef}
          value={ChapterStore.searchStr}
          onChange={handleSearchValueChange}
          placeholder={
            ChapterStore.isTagSearching ? '' : t('NOTE_PAGE_LIST_CMPNT_DEF_05')
          }
          disabled={!!ChapterStore.isTagSearching}
          onKeyDown={e => (e.key === 'Escape' ? handleCancelBtnClick() : null)}
        />
        <CloseBtn
          onClick={handleCancelBtnClick}
          visible={
            (ChapterStore.isSearching || ChapterStore.searchStr !== '') &&
            !ChapterStore.isTagSearching
          }
        >
          <CloseIcon width={0.75} height={0.75} />
        </CloseBtn>
      </LnbTitleSearchContainer>
    </Wrapper>
  );
};

export default Header;
