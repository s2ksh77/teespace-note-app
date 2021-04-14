import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import {
  HeaderContainer,
  EditButton,
  PageContentTitle,
  AutoSaveMessage,
  EditingIcon,
  ModifiedUser,
  ModifiedTime,
} from '../../styles/HeaderStyle';
import {
  ButtonWrapper as SearchButtonWrapper,
  ButtonIcon as SearchButtonIcon,
} from '../../styles/CommonStyle';
import LayoutStateButton from '../common/LayoutStateButton';
import editingIcon from '../../assets/wapl_working.svg';
import searchIcon from '../../assets/search.svg';

const PageHeader = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <HeaderContainer>
      <EditButton />
      <PageContentTitle>(제목 없음)</PageContentTitle>
      {/* <AutoSaveMessage /> */}
      {/* <EditingIcon src={editingIcon} /> */}
      <ModifiedUser>User</ModifiedUser>
      <ModifiedTime>Time</ModifiedTime>
      <SearchButtonWrapper style={{ marginRight: '0.37rem' }}>
        <SearchButtonIcon src={searchIcon} />
      </SearchButtonWrapper>
      {NoteStore.layoutState === 'expand' && <LayoutStateButton />}
    </HeaderContainer>
  ));
};

export default PageHeader;
