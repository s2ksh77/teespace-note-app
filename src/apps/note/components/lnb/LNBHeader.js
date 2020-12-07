import React, { useRef, useState } from "react";
import useNoteStore from "../../store/useStore";
import {
  LnbTitleCover,
  LnbTitleNewButton,
  LnbTitleSearchContainer,
  LnbTitleSearchIcon,
  LnbTitleSearchInput,
} from '../../styles/titleStyle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useObserver } from "mobx-react";
import cancelImg from '../../assets/ts_cancel@3x.png';
import { PreBtnWrapper, Button } from '../../styles/commonStyle';
import { SearchTagChip, TagChipText } from '../../styles/tagStyle';
import HeaderButtons from "../common/buttons";
import NoteStore from "../../store/noteStore";
import preImg from '../../assets/back.svg';
import { isFilled } from '../common/validators';

const LNBHeader = ({ createNewChapter }) => {
  const { ChapterStore, PageStore } = useNoteStore();
  const inputRef = useRef(null);

  // 뒤로 가기 버튼
  const handleLayoutBtn = (e) => {
    NoteStore.setTargetLayout('Content');
    NoteStore.setShowPage(false);
  }

  const handleNewChapterClick = async () => {
    if (PageStore.isReadMode()) return;
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
    await ChapterStore.fetchSearchResult();
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    ChapterStore.setSearchStr(e.target.value);
  }

  const onClickCancelBtn = (e) => {
    ChapterStore.initSearchVar();
    ChapterStore.getNoteChapterList();
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
          새 챕터
        </LnbTitleNewButton>
        <LnbTitleSearchContainer onSubmit={onSubmitSearchBtn}>
          <LnbTitleSearchIcon type="submit">
            <FontAwesomeIcon icon={faSearch} size={"1x"} />
          </LnbTitleSearchIcon>
          <LnbTitleSearchInput
            ref={inputRef} value={ChapterStore.searchStr} onChange={onChangeInput}
            placeholder={ChapterStore.isTagSearching ? "" : "페이지, 챕터 검색"}
            disabled={ChapterStore.isTagSearching ? true : false}
            onKeyDown={e => e.key === 'Escape' ? onClickCancelBtn() : null}
          />
          {ChapterStore.isTagSearching ? (
            <SearchTagChip>
              <TagChipText>{ChapterStore.searchingTagName}</TagChipText>
              <Button onClick={cancelSearchingTagNote} style={{ marginLeft: "0.69rem" }} src={cancelImg} />
            </SearchTagChip>
          ) : null}
          <Button src={cancelImg}
            style={(ChapterStore.isSearching || ChapterStore.searchStr !== "") ? { display: "" } : { display: "none" }} onClick={onClickCancelBtn} />
        </LnbTitleSearchContainer>
        {NoteStore.layoutState === 'collapse' && <HeaderButtons />}
      </LnbTitleCover>
    </>
  ));
};
export default LNBHeader;
