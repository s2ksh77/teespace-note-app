
import React, {memo, useState, useRef} from 'react';
import HeaderButtons from '../common/buttons';
import {TagMenuHeader} from '../../styles/tagStyle';
import {
  TagTitleSearchContainer,
  LnbTitleSearchIcon,
  LnbTitleSearchInput,
} from "../../styles/titleStyle";
import TagStore from '../../store/tagStore';
import { useObserver } from 'mobx-react';

const TagMenuTitle = memo(() => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    // if ()
    TagStore.setIsSearching(true);
    TagStore.setSearchString(value);
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return useObserver(() => (
    <>
      <TagMenuHeader>
        <form onSubmit={onSubmitForm}>
          <TagTitleSearchContainer>
              <input type="image" border="0" alt=" " src="../../assets/ts_m_search@3x.png" />
              <LnbTitleSearchInput autocomplete="off" ref={inputRef} value={value} onChange={onChangeInput} placeholder="태그 검색" /> 
          </TagTitleSearchContainer>       
        </form>
        <HeaderButtons />
      </TagMenuHeader>
    </>
  ));
});

export default TagMenuTitle;