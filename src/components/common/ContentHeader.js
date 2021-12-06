import React, { useContext } from 'react';
import { useObserver } from 'mobx-react';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';
import {
  ContentHeaderWrapper,
  BackBtnWrapper,
  RightAligned,
} from '../../styles/commonStyle';
import HeaderButtons from './buttons';
import { ArrowBackIcon } from '../icons';

const ContentHeader = ({ handleBackBtn, alignment, children }) => {
  const { NoteStore } = useNoteStore();
  const themeContext = useContext(ThemeContext);

  return useObserver(() => (
    <ContentHeaderWrapper borderBottom={alignment !== 'center'}>
      <BackBtnWrapper show={NoteStore.layoutState === 'collapse'} onClick={handleBackBtn}>
        <ArrowBackIcon color={themeContext.IconNormal} />
      </BackBtnWrapper>
      {alignment === 'center' && children}
      <RightAligned>
        {alignment === 'right' && children}
        {NoteStore.appType === 'wapl' && <HeaderButtons />}
      </RightAligned>
    </ContentHeaderWrapper>
  ));
};

export default React.memo(ContentHeader);
