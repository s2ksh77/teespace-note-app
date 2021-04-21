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
  BackButton as BackButtonIcon,
} from '../../styles/HeaderStyle';
import {
  ButtonWrapper as SearchButtonWrapper,
  ButtonIcon as SearchButtonIcon,
  PreBtnWrapper as BackButton,
} from '../../styles/CommonStyle';
import LayoutStateButton from '../common/LayoutStateButton';
import editingIcon from '../../assets/wapl_working.svg';
import searchIcon from '../../assets/search.svg';
import backIcon from '../../assets/arrow_back_1.svg';

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
        <BackButton
          show={NoteStore.targetLayout === 'content'}
          onClick={handleStateChange}
        >
          <BackButtonIcon src={backIcon} />
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
        disabled={PageStore.pageModel.isReadMode}
        onChange={handleChange}
      />
      {/* <AutoSaveMessage /> */}
      {PageStore.pageModel.isReadMode ? (
        <>
          <ModifiedUser>{PageStore.pageModel.userName}</ModifiedUser>
          <ModifiedTime>{PageStore.pageModel.modDate}</ModifiedTime>
        </>
      ) : (
        <EditingIcon src={editingIcon} />
      )}
      <SearchButtonWrapper style={{ marginRight: '0.37rem' }}>
        <SearchButtonIcon src={searchIcon} />
      </SearchButtonWrapper>
      {(NoteStore.targetLayout === 'content' ||
        NoteStore.targetLayout === 'both') && <LayoutStateButton />}
    </HeaderContainer>
  ));
};

export default PageHeader;
