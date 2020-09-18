
import React, { memo, useState, useRef } from 'react';
import HeaderButtons from '../common/buttons';
import { TagMenuHeader } from '../../styles/tagStyle';
import {
  TagTitleSearchContainer,
  LnbTitleSearchInput,
} from "../../styles/titleStyle";
import TagStore from '../../store/tagStore';
import { useObserver } from 'mobx-react';
import searchImg from "../../assets/ts_m_search@3x.png";
import { SearchImgInput } from '../../styles/commonStyle'
import cancelImg from '../../assets/ts_cancel@3x.png';
import { Button } from '../../styles/commonStyle';

const TagHeader = memo(() => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    TagStore.setIsSearching(true);
    TagStore.setSearchString(value);
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  const onClickCancelBtn = (e) => {
    setValue("");
    TagStore.setIsSearching(false);
    TagStore.setSearchString("");
  }

  return useObserver(() => (
    <>
      <TagMenuHeader>
        <form onSubmit={onSubmitForm}>
          <TagTitleSearchContainer>
            <SearchImgInput type="image" border="0" alt=" " src={searchImg} />
            <LnbTitleSearchInput autocomplete="off" ref={inputRef} value={value} onChange={onChangeInput} placeholder="태그 검색" />
            <Button src={cancelImg}
              style={(value !== "") ? { display: "" } : { display: "none" }}
              onClick={onClickCancelBtn} />
          </TagTitleSearchContainer>
        </form>
        <HeaderButtons />
      </TagMenuHeader>
    </>
  ));
});

export default TagHeader;