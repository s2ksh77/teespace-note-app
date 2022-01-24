import React, { useRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNoteStore } from '../../external';
import {
  Wrapper,
  LnbTitleSearchContainer,
  LnbTitleSearchInput,
  Title,
  LnbTitleSelect,
  HeaderDivider,
} from '../../styles/titleStyle';
import {
  MediumButtonWrapper as SearchBtn,
  SmallButtonWrapper as CloseBtn,
} from '../../styles/commonStyle';
import { CloseIcon, SearchIcon } from '../icons';
import { getMenuTitle } from '../../NoteUtil';
import { Select } from 'antd';
import { useObserver } from 'mobx-react';
import Mark from 'mark.js';
import { isFilled } from './validators';
import { SearchTagChip, TagText } from '../../styles/tagStyle';

const { Option } = Select;

const Header = ({ selectedMenu }) => {
  const { ChapterStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const inputRef = useRef(null);
  const [searchFilter, setSearchFilter] = useState('all');
  const instance = new Mark(EditorStore.tinymce?.getBody());

  const handleSearchSubmit = async e => {
    if (e) e.preventDefault();
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

  const handleChange = value => {
    setSearchFilter(value);
  };

  return useObserver(() => (
    <Wrapper>
      <Title>{getMenuTitle(selectedMenu)}</Title>
      <LnbTitleSearchContainer
        onSubmit={handleSearchSubmit}
        isTagSearching={ChapterStore.isTagSearching}
        style={{ maxWidth: '22.5rem' }}
      >
        <LnbTitleSelect defaultValue="all" onChange={handleChange}>
          <Option value="all">{t('NOTE_SEARCH_ALL')}</Option>
          <Option value="tag">{t('NOTE_PAGE_LIST_CMPNT_DEF_06')}</Option>
        </LnbTitleSelect>
        <HeaderDivider style={{ marginLeft: '0' }} />
        <SearchBtn onClick={handleSearchSubmit}>
          <SearchIcon
            color={
              ChapterStore.searchStr !== '' || ChapterStore.isSearching
                ? themeContext.Iconmain
                : themeContext.IconHinted
            }
          />
        </SearchBtn>
        {ChapterStore.isTagSearching ? (
          <SearchTagChip closable onClose={handleTagSearchCancel}>
            <TagText>{ChapterStore.searchingTagName}</TagText>
          </SearchTagChip>
        ) : (
          <LnbTitleSearchInput
            ref={inputRef}
            value={ChapterStore.searchStr}
            onChange={handleSearchValueChange}
            placeholder={
              ChapterStore.isTagSearching ? '' : t('NOTE_PAGE_LIST_CMPNT_DEF_05')
            }
            disabled={!!ChapterStore.isTagSearching}
            onKeyDown={e =>
              e.key === 'Escape'
                ? handleCancelBtnClick()
                : e.key === 'Enter'
                ? handleSearchSubmit()
                : null
            }
          />
        )}
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
  ));
};

export default Header;
