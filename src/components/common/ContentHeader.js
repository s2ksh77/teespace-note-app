import React, { useContext } from 'react';
import { useObserver } from 'mobx-react';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';
import {
  ContentHeaderCover,
  PreBtnWrapper,
  Button,
  RightAligned,
} from '../../styles/commonStyle';
import HeaderButtons from './buttons';
import preImg from '../../assets/arrow_back_1.svg';
import { ArrowBackIcon } from '../icons';

const ContentHeader = ({ handleBackBtn, alignment, children }) => {
  const { NoteStore } = useNoteStore();
  const themeContext = useContext(ThemeContext);
  // editor header부분은 borderBottom 없게
  return useObserver(() => (
    <>
      <ContentHeaderCover borderBottom={alignment !== 'center'}>
        <PreBtnWrapper
          show={NoteStore.layoutState === 'collapse'}
          onClick={handleBackBtn}
        >
          <ArrowBackIcon color={themeContext.IconNormal} />
        </PreBtnWrapper>
        {alignment === 'center' ? children : null}
        <RightAligned>
          {alignment === 'right' ? children : null}
          {NoteStore.appType === 'wapl' ? <HeaderButtons /> : null}
        </RightAligned>
      </ContentHeaderCover>
    </>
  ));
};

export default ContentHeader;
