import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import LayoutStateButton from './LayoutStateButton';
import { HeaderContainer, BackButtonIcon } from '../../styles/HeaderStyle';
import { PreBtnWrapper as BackButton } from '../../styles/CommonStyle';
import backIcon from '../../assets/arrow_back_1.svg';

const ContentHeader = ({ handleBackBtnClick, children }) => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <HeaderContainer>
      {NoteStore.targetLayout === 'content' && (
        <BackButton
          show={NoteStore.targetLayout === 'content'}
          onClick={handleBackBtnClick}
        >
          <BackButtonIcon src={backIcon} />
        </BackButton>
      )}
      {children}
      {(NoteStore.targetLayout === 'content' ||
        NoteStore.targetLayout === 'both') && <LayoutStateButton />}
    </HeaderContainer>
  ));
};

export default ContentHeader;
