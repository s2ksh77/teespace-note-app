import React, { useState, useRef } from 'react';
import HeaderButtons from '../common/buttons';
import { TagMenuHeader } from '../../styles/tagStyle';
import {
  TagTitleSearchContainer,
  LnbTitleSearchInput,
  EditPreBtnWrapper,
} from '../../styles/titleStyle';
import NoteStore from '../../store/noteStore';
import TagStore from '../../store/tagStore';
import { useObserver } from 'mobx-react';
import searchImg from '../../assets/ts_m_search@3x.png';
import { SearchImgInput } from '../../styles/commonStyle';
import cancelImg from '../../assets/ts_cancel@3x.png';
import { Button } from '../../styles/commonStyle';
import preImg from '../../assets/back.svg';

const handleLayoutBtn = () => NoteStore.setTargetLayout('LNB');
const style = { cursor: 'pointer' };
const formStyle = { marginLeft: 'auto' };

const TagHeader = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    TagStore.setSearchString(value);
    TagStore.setIsSearching(true);
    inputRef.current.focus();
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  const onClickCancelBtn = e => {
    setValue('');
    TagStore.setIsSearching(false);
  };

  return useObserver(() => (
    <>
      <TagMenuHeader>
        <EditPreBtnWrapper
          style={
            NoteStore.layoutState === 'collapse'
              ? { display: 'flex' }
              : { display: 'none' }
          }
        >
          <Button style={style} src={preImg} onClick={handleLayoutBtn} />
        </EditPreBtnWrapper>
        <form style={formStyle} onSubmit={onSubmitForm}>
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
              style={value !== '' ? { display: '' } : { display: 'none' }}
              onClick={onClickCancelBtn}
            />
          </TagTitleSearchContainer>
        </form>
        <HeaderButtons />
      </TagMenuHeader>
    </>
  ));
};

export default TagHeader;
