import React, { useState, useRef } from "react";
import useStore from "../../store/useStore";
import {
  LnbTitleCover,
  LnbTitleNewButton,
  LnbTitleSearchContainer,
  LnbTitleSearchIcon,
  LnbTitleSearchInput,
} from "../../styles/titleStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useObserver } from "mobx-react";
import cancelImg from '../../assets/ts_cancel@3x.png';
import { Button } from '../../styles/commonStyle';

const LNBHeader = () => {
  const { ChapterStore } = useStore();
  const inputRef = useRef(null);

  const handleNewChapterClick = () => {
    if (!ChapterStore.isNewChapter) {
      ChapterStore.setChapterTempUl(true);
      ChapterStore.getChapterRandomColor();
    } else ChapterStore.setChapterTempUl(false);
  };

  const onSubmitSearchBtn = (e) => {
    e.preventDefault();
    ChapterStore.setSearchStr(ChapterStore.inputValue);
    ChapterStore.setIsSearching(true);
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    ChapterStore.setInputValue(e.target.value);
  }

  const onClickCancelBtn = (e) => {
    ChapterStore.setInputValue("");
    ChapterStore.setSearchStr("");
    ChapterStore.setIsSearching(false);
  }

  return useObserver(() => (
    <>
      <LnbTitleCover>
        <LnbTitleNewButton onClick={handleNewChapterClick}>
          새 챕터
        </LnbTitleNewButton>
        <LnbTitleSearchContainer onSubmit={onSubmitSearchBtn}>
          <LnbTitleSearchIcon type="submit">
            <FontAwesomeIcon icon={faSearch} size={"1x"} />
          </LnbTitleSearchIcon>
          <LnbTitleSearchInput
            ref={inputRef} value={ChapterStore.inputValue} onChange={onChangeInput} placeholder="페이지, 챕터 검색" />
          <Button src={cancelImg} 
            style={(ChapterStore.inputValue !== "") ? { display: "" } : { display: "none" }} onClick={onClickCancelBtn} />
        </LnbTitleSearchContainer>
      </LnbTitleCover>
    </>
  ));
};
export default LNBHeader;
