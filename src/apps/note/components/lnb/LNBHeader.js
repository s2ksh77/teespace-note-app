import React, { useRef, useState } from "react";
import useNoteStore from "../../store/useStore";
import {
  LnbTitleCover,
  LnbTitleNewButton,
  LnbTitleSearchContainer,
  LnbTitleSearchIcon,
  LnbTitleSearchInput,
} from '../../styles/titleStyle';
import searchImg from '../../assets/search.svg';
import { useObserver } from "mobx-react";
import cancelImg from '../../assets/ts_cancel@3x.png';
import { PreBtnWrapper, Button, SearchImgInput } from '../../styles/commonStyle';
import { SearchTagChip, TagText } from '../../styles/tagStyle';
import HeaderButtons from "../common/buttons";
import NoteStore from "../../store/noteStore";
import preImg from '../../assets/back.svg';
import { isFilled } from '../common/validators';
import Mark from 'mark.js';
import styled from 'styled-components';

const SearchCancelBtn = styled(Button)`
  margin-left: 0.69rem;
  width: 0.75rem;
  height: 0.75rem;
`;

const LNBHeader = ({ createNewChapter }) => {
  const { ChapterStore, PageStore, EditorStore } = useNoteStore();
  const inputRef = useRef(null);
  const instance = new Mark(EditorStore.tinymce?.getBody());

  // 뒤로 가기 버튼
  const handleLayoutBtn = (e) => {
    NoteStore.setTargetLayout('Content');
    NoteStore.setShowPage(false);
  }

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

  const onSubmitSearchBtn = async (e) => {
    e.preventDefault();
    if (ChapterStore.isTagSearching || !isFilled(ChapterStore.searchStr)) return;
    await ChapterStore.getSearchResult();
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    ChapterStore.setSearchStr(e.target.value);
  }

  const onClickCancelBtn = (e) => {
    ChapterStore.initSearchVar();
    ChapterStore.getNoteChapterList();
    instance.unmark();
  }

  // 태그칩에 있는 취소 버튼
  const cancelSearchingTagNote = (e) => {
    ChapterStore.initSearchVar();
    ChapterStore.getNoteChapterList();
  }

  // e.target에서 filtering하려고 data-btn 속성 추가
  return useObserver(() => (
    <>
      <LnbTitleCover>
        <PreBtnWrapper
          show={(NoteStore.layoutState === 'collapse') && ChapterStore.isTagSearching}
        >
          <Button src={preImg} onClick={handleLayoutBtn} />
        </PreBtnWrapper>
        <LnbTitleNewButton data-btn={'noteNewChapterBtn'} onClick={handleNewChapterClick}>
          {NoteStore.getI18n('newChapter')}
        </LnbTitleNewButton>
        <LnbTitleSearchContainer onSubmit={onSubmitSearchBtn} isSearch={(ChapterStore.searchStr !== "" || ChapterStore.isSearching) ? true : false}>
          <SearchImgInput type="image" border="0" alt=" " src={searchImg} isSearch={(ChapterStore.searchStr !== "" || ChapterStore.isSearching) ? true : false} />
          {ChapterStore.isTagSearching ? (
            <SearchTagChip>
              <TagText>{ChapterStore.searchingTagName}</TagText>
              <SearchCancelBtn onClick={cancelSearchingTagNote} src={cancelImg} />
            </SearchTagChip>
          ) :
            <LnbTitleSearchInput
              ref={inputRef} value={ChapterStore.searchStr} onChange={onChangeInput}
              placeholder={ChapterStore.isTagSearching ? "" : NoteStore.getI18n('searchPageChapter')}
              disabled={ChapterStore.isTagSearching ? true : false}
              onKeyDown={e => e.key === 'Escape' ? onClickCancelBtn() : null}
            />}
          {((!ChapterStore.isSearching && ChapterStore.searchStr === "") || ChapterStore.isTagSearching)
            ? null : <Button src={cancelImg} onClick={onClickCancelBtn} />}
        </LnbTitleSearchContainer>
        {NoteStore.layoutState === 'collapse' && <HeaderButtons />}
      </LnbTitleCover>
    </>
  ));
};
export default LNBHeader;
