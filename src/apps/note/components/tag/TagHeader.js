import React, { useEffect, useState, useRef } from 'react';
import ContentHeader from '../common/ContentHeader';
import {
  TagSearchForm,
  TagTitleSearchContainer,
  LnbTitleSearchInput,
  HeaderDivider
} from '../../styles/titleStyle';
import useNoteStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import searchImg from '../../assets/search.svg';
import { SearchImgInput } from '../../styles/commonStyle';
import cancelImg from '../../assets/ts_cancel@3x.png';
import { Button } from '../../styles/commonStyle';
import styled from 'styled-components';

const CancelBtn = styled(Button)`
  display:${props=>props.visible ? '' : 'none'};
`;

const TagHeader = () => {
  const { NoteStore, ChapterStore, TagStore } = useNoteStore();
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const activateSearchIcon = TagStore.isSearching || value !== "";

  // 뒤로가기 버튼 : lnb 영역(검색X인, 초기화된 챕터 리스트 나오도록 구현함)
  const onClickBackBtn = () => {
    NoteStore.setTargetLayout('LNB');
    ChapterStore.initSearchVar();
    ChapterStore.getNoteChapterList();
  }

  const onSubmitForm = e => {
    e.preventDefault();
    TagStore.searchTag(value);
    inputRef.current.focus();
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  const onClickCancelBtn = e => {
    setValue('');
    TagStore.setIsSearching(false);
    TagStore.setSearchStr('');
    TagStore.fetchTagData();
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') onClickCancelBtn();
  }

  useEffect(()=>{
    return () => setValue('');
  },[NoteStore.showPage]);

  return useObserver(() => (
    <>
      <ContentHeader
        handleBackBtn={onClickBackBtn}
        alignment={"right"}
      >
        <TagSearchForm onSubmit={onSubmitForm} show={TagStore.allSortedTagList.length > 0} >
          <TagTitleSearchContainer isSearch={activateSearchIcon ? true : false}>
            <SearchImgInput type="image" border="0" alt="tagSearchIcon" src={searchImg} isSearch={activateSearchIcon ? true : false} />
            <LnbTitleSearchInput
              autocomplete="off"
              ref={inputRef}
              value={value}
              onChange={onChangeInput}
              placeholder="태그 검색"
              onKeyDown={handleKeyDown}
              isSearch={activateSearchIcon ? true : false}
            />
            <CancelBtn
              src={cancelImg}
              visible={activateSearchIcon}
              onClick={onClickCancelBtn}
            />
          </TagTitleSearchContainer>
        </TagSearchForm>
        <HeaderDivider/>
      </ContentHeader>
    </>
  ));
};

export default TagHeader;
