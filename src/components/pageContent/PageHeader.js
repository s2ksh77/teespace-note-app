import React, { useState } from 'react';
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
  BackButton as Icon,
} from '../../styles/HeaderStyle';
import {
  ButtonWrapper as SearchButtonWrapper,
  ButtonIcon as SearchButtonIcon,
  PreBtnWrapper as BackButton,
} from '../../styles/CommonStyle';
import LayoutStateButton from '../common/LayoutStateButton';
import editingIcon from '../../assets/wapl_working.svg';
import searchIcon from '../../assets/search.svg';
import backBtn from '../../assets/arrow_back_1.svg';
import { useTranslation } from 'react-i18next';

const PageHeader = () => {
  const { NoteStore, PageStore } = useNoteStore();
  const { t } = useTranslation();

  const handleStateChange = () => {
    NoteStore.setTargetLayout('lnb');
  };

  const handleChange = e => {
    const {
      target: { value },
    } = e;
    PageStore.pageModel.setNoteTitle(value);
  };

  return useObserver(() => (
    <HeaderContainer>
      {NoteStore.targetLayout === 'content' && (
        <BackButton show={NoteStore.targetLayout === 'content'}>
          <Icon src={backBtn} onClick={handleStateChange} />
        </BackButton>
      )}
      <EditButton>
        {PageStore.pageModel.isReadMode
          ? t('NOTE_PAGE_LIST_ADD_NEW_PGE_01')
          : t('NOTE_PAGE_LIST_ADD_NEW_PGE_04')}
      </EditButton>
      <PageContentTitle
        maxLength="200"
        placeholder={t('NOTE_PAGE_LIST_CMPNT_DEF_03')}
        value={PageStore.pageModel.name}
        disabled={PageStore.pageModel.isReadMode ? true : false}
        onChange={handleChange}
      />
      {/* <AutoSaveMessage /> */}
      {/* <EditingIcon src={editingIcon} /> */}
      <ModifiedUser>{PageStore.pageModel.userName}</ModifiedUser>
      <ModifiedTime>{PageStore.pageModel.modDate}</ModifiedTime>
      <SearchButtonWrapper style={{ marginRight: '0.37rem' }}>
        <SearchButtonIcon src={searchIcon} />
      </SearchButtonWrapper>
      {(NoteStore.targetLayout === 'content' ||
        NoteStore.targetLayout === 'both') && <LayoutStateButton />}
    </HeaderContainer>
  ));
};

export default PageHeader;
