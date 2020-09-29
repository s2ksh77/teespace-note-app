import React, { useRef } from "react";
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
import { SearchTagChip, TagChipText } from '../../styles/tagStyle';
import HeaderButtons from "../common/buttons";
import NoteStore from "../../store/noteStore";

const LNBHeader = ({createNewChapter}) => {
  const { ChapterStore } = useStore();
  const inputRef = useRef(null);

  const handleNewChapterClick = async () => { 
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

  const onSubmitSearchBtn = (e) => {
    e.preventDefault();
    if (ChapterStore.isTagSearching || ChapterStore.inputValue === "") return;
    ChapterStore.setSearchStr(ChapterStore.inputValue);
    ChapterStore.setIsSearching(true);
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    ChapterStore.setInputValue(e.target.value);
  }

  const onClickCancelBtn = (e) => {
    ChapterStore.setIsSearching(false);
  }

  // 태그칩에 있는 취소 버튼
  const onClickCancelSearchTagBtn = (e) => {
    ChapterStore.setIsTagSearching(false);
  }

  // e.target에서 filtering하려고 data-btn 속성 추가
  return useObserver(() => (
    <>
      <LnbTitleCover>
        <LnbTitleNewButton data-btn={'noteNewChapterBtn'} onClick={handleNewChapterClick}>
          새 챕터
        </LnbTitleNewButton>
        <LnbTitleSearchContainer onSubmit={onSubmitSearchBtn}>
          <LnbTitleSearchIcon type="submit">
            <FontAwesomeIcon icon={faSearch} size={"1x"} />
          </LnbTitleSearchIcon>
          <LnbTitleSearchInput
            ref={inputRef} value={ChapterStore.inputValue} onChange={onChangeInput} 
            placeholder={ChapterStore.isTagSearching ? "" : "페이지, 챕터 검색"} 
            disabled={ChapterStore.isTagSearching ? true : false} />
          {ChapterStore.isTagSearching ? 
          <>
            <SearchTagChip>
              <TagChipText>{ChapterStore.targetSearchTagName}</TagChipText>
              <Button onClick={onClickCancelSearchTagBtn} style={{marginLeft:"0.69rem"}} src={cancelImg} />
            </SearchTagChip>
          </> : null}
          <Button src={cancelImg} 
            style={(ChapterStore.inputValue !== "") ? { display: "" } : { display: "none" }} onClick={onClickCancelBtn} />
        </LnbTitleSearchContainer>
        {NoteStore.layoutState === 'collapse' && <HeaderButtons />}
      </LnbTitleCover>
    </>
  ));
};
export default LNBHeader;
