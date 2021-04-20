import React from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
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
  const { NoteStore, PageStore } = useNoteStore();
  const { t } = useTranslation();

  return useObserver(() => (
    <HeaderContainer>
      <EditButton />
      <PageContentTitle
        maxLength="200"
        placeholder={t('NOTE_PAGE_LIST_CMPNT_DEF_03')}
        value={PageStore.pageModel.name}
        disabled={PageStore.pageModel.isReadMode}
      />
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
