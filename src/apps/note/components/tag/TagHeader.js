import React, { useState, useRef } from 'react';
import HeaderButtons from '../common/buttons';
import { TagMenuHeader } from '../../styles/tagStyle';
import {
  TagSearchForm,
  TagTitleSearchContainer,
  LnbTitleSearchInput,
  EditPreBtnWrapper,
} from '../../styles/titleStyle';
import useNoteStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import searchImg from '../../assets/ts_m_search@3x.png';
import { SearchImgInput, RightAligned } from '../../styles/commonStyle';
import cancelImg from '../../assets/ts_cancel@3x.png';
import { Button } from '../../styles/commonStyle';
import preImg from '../../assets/back.svg';

const TagHeader = () => {
  const { NoteStore, ChapterStore, TagStore } = useNoteStore();
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  // 뒤로가기 버튼 : lnb 영역(검색X인, 초기화된 챕터 리스트 나오도록 구현함)
  const handleLayoutBtn = () => {
    NoteStore.setTargetLayout('LNB');
    ChapterStore.initSearchVar();
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

  const cancelBtnVisibility = (TagStore.isSearching || value !== "") ? { display: '' } : { display: 'none' };

  return useObserver(() => (
    <>
      <TagMenuHeader>
        <EditPreBtnWrapper
          show={NoteStore.layoutState === 'collapse'}
        >
          <Button src={preImg} onClick={handleLayoutBtn} />
        </EditPreBtnWrapper>
        <RightAligned>
          <TagSearchForm onSubmit={onSubmitForm} show={TagStore.allSortedTagList.length > 0} >
            <TagTitleSearchContainer>
              <SearchImgInput type="image" border="0" alt=" " src={searchImg} />
              <LnbTitleSearchInput
                autocomplete="off"
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                placeholder="태그 검색"
              />
              <Button
                src={cancelImg}
                style={cancelBtnVisibility}
                onClick={onClickCancelBtn}
              />
            </TagTitleSearchContainer>
          </TagSearchForm>
          <HeaderButtons />
        </RightAligned>        
      </TagMenuHeader>
    </>
  ));
};

export default TagHeader;
