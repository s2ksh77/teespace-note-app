import React, { useEffect, useRef, useContext } from 'react';
import useNoteStore from '../../store/useStore';
import {
  LnbTitleCover,
  LnbTitleNewButton,
  LnbTitleSearchContainer,
  LnbTitleSearchInput,
} from '../../styles/titleStyle';
import searchImg from '../../assets/search.svg';
import { useObserver } from 'mobx-react';
import cancelImg from '../../assets/ts_cancel@3x.png';
import {
  PreBtnWrapper,
  Button,
  MediumButtonWrapper as SearchButton,
  SmallButtonWrapper as CloseButton,
  CancelBtn,
  SearchImgInput,
} from '../../styles/commonStyle';
import { SearchTagChip, TagText } from '../../styles/tagStyle';
import HeaderButtons from '../common/buttons';
import preImg from '../../assets/back.svg';
import { isFilled } from '../common/validators';
import Mark from 'mark.js';
import styled, { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useCoreStores } from 'teespace-core';
import { SearchIcon, CloseIcon } from '../icons';

const StyledCancelBtn = styled(CancelBtn)`
  margin-left: 0.69rem;
`;

const LNBHeader = ({ createNewChapter }) => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const instance = new Mark(EditorStore.tinymce?.getBody());
  const themeContext = useContext(ThemeContext);

  // 뒤로 가기 버튼
  const handleLayoutBtn = e => {
    NoteStore.setTargetLayout('Content');
    NoteStore.setShowPage(false);
  };

  const handleNewChapterClick = async () => {
    if (!PageStore.isReadMode()) return;
    if (!ChapterStore.isNewChapter) {
      ChapterStore.setChapterTempUl(true); // isNewChapter = true;
      ChapterStore.getChapterRandomColor();
    } else {
      await createNewChapter();
      ChapterStore.getChapterRandomColor();
      ChapterStore.setChapterTempUl(true);
    }
    // else ChapterStore.setChapterTempUl(false);
  };

  const onSubmitSearchBtn = async e => {
    e.preventDefault();
    if (ChapterStore.isTagSearching || !isFilled(ChapterStore.searchStr.trim())) return;
    await ChapterStore.getSearchResult();
    inputRef.current.focus();
  };

  const onChangeInput = e => {
    ChapterStore.setSearchStr(e.target.value);
  };

  const onClickCancelBtn = e => {
    ChapterStore.initSearchVar();
    ChapterStore.getNoteChapterList();
    instance.unmark();
  };

  // 태그칩에 있는 취소 버튼
  const cancelSearchingTagNote = e => {
    ChapterStore.initSearchVar();
    ChapterStore.getNoteChapterList();
  };

  // e.target에서 filtering하려고 data-btn 속성 추가
  return useObserver(() => (
    <>
      <LnbTitleCover>
        <PreBtnWrapper
          show={NoteStore.layoutState === 'collapse' && ChapterStore.isTagSearching}
        >
          <Button src={preImg} onClick={handleLayoutBtn} />
        </PreBtnWrapper>
        {authStore.hasPermission('noteChapter', 'C') && (
          <LnbTitleNewButton
            data-btn={'noteNewChapterBtn'}
            onClick={handleNewChapterClick}
          >
            {t('NOTE_PAGE_LIST_CMPNT_DEF_01')}
          </LnbTitleNewButton>
        )}
        <LnbTitleSearchContainer
          onSubmit={onSubmitSearchBtn}
          isTagSearching={ChapterStore.isTagSearching}
        >
          <SearchButton onClick={onSubmitSearchBtn}>
            <SearchIcon
              color={
                ChapterStore.searchStr !== '' || ChapterStore.isSearching
                  ? themeContext.Iconmain
                  : themeContext.IconHinted
              }
            />
          </SearchButton>
          {ChapterStore.isTagSearching ? (
            <SearchTagChip>
              <TagText>{ChapterStore.searchingTagName}</TagText>
              <StyledCancelBtn
                onClick={cancelSearchingTagNote}
                src={cancelImg}
                visible={true}
              />
            </SearchTagChip>
          ) : (
            <LnbTitleSearchInput
              ref={inputRef}
              value={ChapterStore.searchStr}
              onChange={onChangeInput}
              placeholder={
                ChapterStore.isTagSearching ? '' : t('NOTE_PAGE_LIST_CMPNT_DEF_05')
              }
              disabled={ChapterStore.isTagSearching ? true : false}
              onKeyDown={e => (e.key === 'Escape' ? onClickCancelBtn() : null)}
            />
          )}
          <CloseButton
            onClick={onClickCancelBtn}
            visible={
              (ChapterStore.isSearching || ChapterStore.searchStr !== '') &&
              !ChapterStore.isTagSearching
            }
          >
            <CloseIcon width={0.75} height={0.75} />
          </CloseButton>
        </LnbTitleSearchContainer>
        {NoteStore.layoutState === 'collapse' && <HeaderButtons />}
      </LnbTitleCover>
    </>
  ));
};
export default React.memo(LNBHeader);
