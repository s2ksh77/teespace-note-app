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

const TagHeader = () => {
  const { NoteStore, ChapterStore, TagStore } = useNoteStore();
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  // 뒤로가기 버튼 : lnb 영역(검색X인, 초기화된 챕터 리스트 나오도록 구현함)
  const handleLayoutBtn = () => {
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

  useEffect(()=>{
    return () => setValue('');
  },[NoteStore.showPage])

  const cancelBtnVisibility = (TagStore.isSearching || value !== "") ? { display: '' } : { display: 'none' };

  return useObserver(() => (
    <>
      <ContentHeader
        handleBackBtn={handleLayoutBtn}
        alignment={"right"}
      >
        <TagSearchForm onSubmit={onSubmitForm} show={TagStore.allSortedTagList.length > 0} >
          <TagTitleSearchContainer isSearch={(TagStore.isSearching || value !== "") ? true : false}>
            <SearchImgInput type="image" border="0" alt=" " src={searchImg} isSearch={(TagStore.isSearching || value !== "") ? true : false} />
            <LnbTitleSearchInput
              autocomplete="off"
              ref={inputRef}
              value={value}
              onChange={onChangeInput}
              placeholder="태그 검색"
              onKeyDown={e => e.key === 'Escape' ? onClickCancelBtn() : null}
              isSearch={(TagStore.isSearching || value !== "") ? true : false}
            />
            <Button
              src={cancelImg}
              style={cancelBtnVisibility}
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
