import React, { useEffect, useContext, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores, logEvent, WaplSearch } from 'teespace-core';
import Mark from 'mark.js';
import { useTranslation } from 'react-i18next';
import styled, { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';
import {
  EditorTitleCover,
  EditorTitle,
  EditBtn,
  EditingImg,
  AutoSaveMsg,
  ModifiedUser,
  ModifiedTime,
  EditorModCover,
  HeaderDivider,
  BookMarkCover,
} from '../../styles/titleStyle';
import { BookMarkIcon, SearchIcon } from '../icons';
import ContentHeader from '../common/ContentHeader';
import waplWorking from '../../assets/wapl_working.svg';
import { handleFileSync } from '../common/NoteFile';
import { checkMaxLength } from '../common/validators';
import {
  SearchContainer,
  SearchIconCover,
  WaplSearchCancel,
  WaplSearchWrapper,
} from '../../styles/editorStyle';

const EditorHeader = ({ selectedMenu }) => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { userStore, authStore } = useCoreStores();
  const { t } = useTranslation();
  const instance = new Mark(EditorStore.tinymce?.getBody());
  const themeContext = useContext(ThemeContext);
  const inputRef = useRef(null);
  let eleArr = EditorStore.tinymce?.getBody()?.querySelectorAll('mark');

  const [searchValue, setSearchValue] = useState('');
  const instanceOption = {
    accuracy: {
      value: 'partially',
      limiters: [],
    },
    done: function (count) {
      EditorStore.setSearchTotalCount(count);
    },
  };

  const initialSearch = () => {
    instance.unmark();
    EditorStore.setSearchResultState(false);
    EditorStore.setSearchValue('');
    EditorStore.setSearchTotalCount(0);
    EditorStore.setSearchCurrentCount(0);
  };

  // 뒤로 가기 버튼
  const handleLayoutBtn = async () => {
    if (PageStore.isReadMode()) {
      EditorStore.setIsSearch(false);
      initialSearch();
      if (!ChapterStore.isTagSearching) {
        ChapterStore.initSearchVar();
        ChapterStore.getNoteChapterList();
        NoteStore.setTargetLayout('LNB');
      } else {
        NoteStore.setTargetLayout('Content');
        NoteStore.setShowPage(false);
      }
    } else {
      if (EditorStore.isUploading) {
        NoteStore.setModalInfo('uploadingFiles');
        return;
      }
      if (!EditorStore.isEditCancelOpen()) {
        await PageStore.handleNoneEdit();
        NoteStore.setTargetLayout('LNB');
        return;
      }
      PageStore.editCancel();
    }
  };

  const handleModifySaveBtnClick = async () => {
    if (EditorStore.isUploading) {
      NoteStore.setModalInfo('uploadingFiles');
      return;
    }
    EditorStore.setIsSearch(false);
    initialSearch();
    EditorStore.tinymce?.undoManager?.clear();
    if (PageStore.isReadMode()) {
      // 수정모드 진입시 lnb 검색 결과 초기화
      if (NoteStore.layoutState !== 'collapse') ChapterStore.initSearchVar();
      if (PageStore.otherEdit) {
        const { displayName } = await userStore.getProfile(
          PageStore.pageInfo.editingUserId,
        );
        NoteStore.setModalInfo('editingPage', { name: displayName });
      } else PageStore.noteEditStart(PageStore.pageInfo.id);
    } else {
      await handleFileSync().then(() => PageStore.handleSave());
      logEvent('note', 'clickModifyBtn');
    }
  };

  const handleTitleInput = e => PageStore.setTitle(e.target.value);

  const toggleSearch = () => {
    EditorStore.setIsSearch(!EditorStore.isSearch);
    if (!EditorStore.isSearch) initialSearch();
  };

  const handleOnEditCancel = e => {
    e.stopPropagation();
    PageStore.editCancel();
  };

  const toggleBookMark = async e => {
    e.stopPropagation();
    const result = await PageStore.toggleBookMark();
    if (result === 'Success') {
      PageStore.fetchCurrentPageData(PageStore.currentPageId);
      if (selectedMenu === 'recent' || selectedMenu === 'bookmark') {
        PageStore.fetchLNBPageList(selectedMenu, selectedMenu === 'bookmark');
      } else ChapterStore.getNoteChapterList();
    }
  };

  const handleSearchInputChange = value => {
    EditorStore.setSearchValue(value);
  };

  const handleSearchEditor = () => {
    if (searchValue === EditorStore.searchValue) {
      handleSearchNext();
    } else {
      instance.unmark();
      setSearchValue(EditorStore.searchValue);
      instance.mark(EditorStore.searchValue, instanceOption);
      eleArr = EditorStore.tinymce?.getBody()?.querySelectorAll('mark');
      if (EditorStore.searchTotalCount === 0) EditorStore.setSearchCurrentCount(0);
      else {
        EditorStore.setSearchCurrentCount(1);
        eleArr[EditorStore.searchCurrentCount - 1].classList.add('searchselected');
      }
      EditorStore.setSearchResultState(true);
    }
  };

  const handleClearSearch = () => {
    EditorStore.setSearchValue('');
    setSearchValue('');
    EditorStore.setIsSearch(false);
    EditorStore.setSearchResultState(false);
    instance.unmark();
  };
  const handleSearchPrev = () => {
    if (EditorStore.searchTotalCount === 0) return;
    else {
      if (EditorStore.searchCurrentCount > 1) {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(EditorStore.searchCurrentCount - 1);
      } else {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(EditorStore.searchTotalCount);
      }
      eleArr[EditorStore.searchCurrentCount - 1].scrollIntoView(false);
      eleArr[EditorStore.searchCurrentCount - 1].classList.add('searchselected');
    }
  };

  const handleSearchNext = () => {
    if (EditorStore.searchTotalCount === 0) return;
    else {
      if (EditorStore.searchCurrentCount < EditorStore.searchTotalCount) {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(EditorStore.searchCurrentCount + 1);
      } else {
        eleArr[EditorStore.searchCurrentCount - 1].classList.remove('searchselected');
        EditorStore.setSearchCurrentCount(1);
      }
      eleArr[EditorStore.searchCurrentCount - 1].scrollIntoView(false);
      eleArr[EditorStore.searchCurrentCount - 1].classList.add('searchselected');
    }
  };

  useEffect(() => {
    // 수정모드 시 룸 생성 버튼 및 메일 탭 임시 editCancel 적용
    if (!PageStore.isReadMode() && NoteStore.appType === 'wapl') {
      document
        .querySelector('.rooms__create-button')
        ?.addEventListener('click', handleOnEditCancel);
      document
        .querySelectorAll('.ant-tabs-tab')[2]
        ?.addEventListener('click', handleOnEditCancel);
    }
    return () => {
      if (PageStore.isReadMode() && NoteStore.appType === 'wapl') {
        document
          .querySelector('.rooms__create-button')
          ?.removeEventListener('click', handleOnEditCancel);
        document
          .querySelectorAll('.ant-tabs-tab')[2]
          ?.removeEventListener('click', handleOnEditCancel);
      }
    };
  }, [PageStore.isReadMode()]);

  // Search Toggle 시 reset
  useEffect(() => {
    return () => setSearchValue('');
  }, [EditorStore.isSearch]);

  useEffect(() => {
    // WaplSearch ref prop이 없음.
    if (EditorStore.isSearch) inputRef.current?.lastChild?.lastChild.focus();
  }, [EditorStore.isSearch]);

  return useObserver(() => (
    <>
      <ContentHeader handleBackBtn={handleLayoutBtn} alignment="center">
        <EditorTitleCover>
          <BookMarkCover isItem={false} visible={true} onClick={toggleBookMark}>
            <BookMarkIcon
              width="1.25"
              height="1.25"
              color={PageStore.bookMark ? '#FECB38' : '#CCCCCC'}
              isButton={true}
            />
          </BookMarkCover>
          <EditorTitle
            id="editorTitle"
            maxLength="200"
            placeholder={t('NOTE_PAGE_LIST_CMPNT_DEF_03')}
            value={PageStore.noteTitle}
            onChange={handleTitleInput}
            disabled={!!PageStore.isReadMode()}
            autoComplete="off"
          />
          {!EditorStore.isSearch ? (
            <SearchIconCover onClick={toggleSearch}>
              <SearchIcon width="1" height="1" />
            </SearchIconCover>
          ) : (
            <SearchContainer>
              <WaplSearchWrapper ref={inputRef} style={{ display: 'flex' }}>
                <StyledWaplSearch
                  searchIconColor={{
                    default: !EditorStore.searchValue
                      ? themeContext.IconHinted
                      : themeContext.Iconmain,
                  }}
                  clearIconColor={{
                    default: !EditorStore.searchValue
                      ? themeContext.IconHinted
                      : themeContext.Iconmain,
                  }}
                  onChange={handleSearchInputChange}
                  placeholder={t('NOTE_EDIT_PAGE_SEARCH_03')}
                  onEnterDown={handleSearchEditor}
                  onClear={handleClearSearch}
                  onSearchPrev={handleSearchPrev}
                  onSearchNext={handleSearchNext}
                  className=""
                  isCountExist={EditorStore.searchResultState ? true : false}
                  SearchNumber={EditorStore.searchCurrentCount}
                  TotalNumber={EditorStore.searchTotalCount}
                />
              </WaplSearchWrapper>
              <WaplSearchCancel onClick={toggleSearch}>
                {t('NOTE_PAGE_LIST_DEL_PGE_CHPT_05')}
              </WaplSearchCancel>
            </SearchContainer>
          )}
        </EditorTitleCover>
        <EditorModCover>
          <>
            <ModifiedTime
              style={{
                fontSize: '0.75rem',
                borderLeft: '0px solid #ffffff',
                marginRight: 'auto',
              }}
            >
              {PageStore.pageInfo.modDate}
            </ModifiedTime>
            {PageStore.isReadMode() && (
              <ModifiedUser style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>
                {PageStore.pageInfo.modUserName}
              </ModifiedUser>
            )}
          </>
          {PageStore.saveStatus.saving && (
            <AutoSaveMsg>{t('NOTE_EDIT_PAGE_AUTO_SAVE_01')}</AutoSaveMsg>
          )}
          {PageStore.saveStatus.saved && (
            <AutoSaveMsg>{t('NOTE_EDIT_PAGE_AUTO_SAVE_02')}</AutoSaveMsg>
          )}
          {!PageStore.saveStatus.saved &&
            (!PageStore.isReadMode() || PageStore.otherEdit) && (
              <EditingImg src={waplWorking} />
            )}
        </EditorModCover>
      </ContentHeader>
    </>
  ));
};
export default React.memo(EditorHeader);

const StyledWaplSearch = styled(WaplSearch)`
  width: 100%;
  margin: 0 0.438rem;
  border-radius: 0.375rem;
  padding: 0.38rem 0.625rem;
  &:hover:not(:focus-within) {
    background-color: ${props => props.theme.SubStateBright};
    path {
      fill: ${props => props.theme.IconNormal};
    }
  }
  &:focus-within {
    background-color: ${props => props.theme.StateNormal};
    border: 1px solid ${props => props.theme.SubStateVivid};
    path {
      fill: ${props => props.theme.IconActive};
    }
  }
  color: ${props => props.theme.TextMain};
  border: 1px solid transparent;
  background-color: ${props => props.theme.SubStateNormal};
`;
