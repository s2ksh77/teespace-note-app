import React from 'react';
import useStore from '../store/useStore';
import {
  LnbTitleCover,
  LnbTitleNewButton,
  LnbTitleSearchContainer,
  LnbTitleSearchIcon,
  LnbTitleSearchInput,
} from '../styles/titleStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useObserver } from 'mobx-react';

const LnbMenuTitle = () => {
  const { NoteStore } = useStore();
  return useObserver(() => (
    <>
      <LnbTitleCover>
        <LnbTitleNewButton>새 챕터</LnbTitleNewButton>
        <LnbTitleSearchContainer>
          <LnbTitleSearchIcon>
            <FontAwesomeIcon icon={faSearch} size={'1x'} />
          </LnbTitleSearchIcon>
          <LnbTitleSearchInput placeholder="페이지, 챕터 검색"></LnbTitleSearchInput>
        </LnbTitleSearchContainer>
      </LnbTitleCover>
    </>
  ));
};
export default LnbMenuTitle;
