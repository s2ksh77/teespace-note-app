import React, { useEffect, useContext } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import { MainHeader as EditorHeaderCover } from '../styles/lnbStyles';
import { ButtonDiv, PreBtnWrapper } from '../../../styles/commonStyle';
import { ArrowBackIcon, SearchIcon, TrashIcon } from '../../icons';
import { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  AutoSaveMsg,
  EditingImg,
  EditorTitle,
  ModifiedTime,
  ModifiedUser,
} from '../../../styles/titleStyle';
import { EditorModCover, EditorTitleCover } from '../styles/editorStyles';
import waplWorking from '../../../assets/wapl_working.svg';

const MobileEditorHeader = () => {
  const { ChapterStore, PageStore, NoteStore } = useNoteStore();
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);

  const handleBackBtn = () => NoteStore.setTargetLayout('LIST');

  const handleSearchBtn = () => {};

  const handleTitleInput = e => PageStore.setTitle(e.target.value);

  return useObserver(() => (
    <>
      <EditorHeaderCover>
        <PreBtnWrapper show={true} onClick={handleBackBtn}>
          <ArrowBackIcon color={themeContext.IconNormal} />
        </PreBtnWrapper>
        <ButtonDiv onClick={handleSearchBtn} style={{ marginLeft: 'auto' }}>
          <SearchIcon />
        </ButtonDiv>
        <ButtonDiv onClick={handleSearchBtn}>
          <TrashIcon color={themeContext.SubStateVivid} />
        </ButtonDiv>
      </EditorHeaderCover>
      <EditorTitleCover>
        <EditorTitle
          id="editorTitle"
          maxLength="200"
          placeholder={t('NOTE_PAGE_LIST_CMPNT_DEF_03')}
          value={PageStore.noteTitle}
          onChange={handleTitleInput}
          disabled={!!PageStore.isReadMode()}
          autoComplete="off"
        />
      </EditorTitleCover>
      <EditorModCover>
        {PageStore.saveStatus.saving && (
          <AutoSaveMsg>{t('NOTE_EDIT_PAGE_AUTO_SAVE_01')}</AutoSaveMsg>
        )}
        {PageStore.saveStatus.saved && (
          <AutoSaveMsg>{t('NOTE_EDIT_PAGE_AUTO_SAVE_02')}</AutoSaveMsg>
        )}
        {!PageStore.saveStatus.saved &&
          (!PageStore.isReadMode() || PageStore.otherEdit) && (
            <EditingImg src={waplWorking} />
          )}
        {PageStore.isReadMode() && (
          <>
            <ModifiedTime
              style={{ fontSize: '0.75rem', borderLeft: '0px solid #ffffff' }}
            >
              {PageStore.pageInfo.modDate}
            </ModifiedTime>
            <ModifiedUser style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>
              {PageStore.pageInfo.modUserName}
            </ModifiedUser>
          </>
        )}
      </EditorModCover>
    </>
  ));
};

export default MobileEditorHeader;
