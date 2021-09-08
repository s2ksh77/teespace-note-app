import React, { useEffect, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { ThemeContext } from 'styled-components';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../../store/useStore';

import {
  AutoSaveMsg,
  EditingImg,
  EditorTitle,
  ModifiedTime,
  ModifiedUser,
} from '../../../styles/titleStyle';
import { EditorModCover, EditorTitleCover } from '../styles/editorStyles';
import waplWorking from '../../../assets/wapl_working.svg';
import MainHeader from '../lnb/MainHeader';

const MobileEditorHeader = () => {
  const { ChapterStore, PageStore, NoteStore } = useNoteStore();
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);

  const handleBackButtonClick = () => {
    if(!PageStore.isReadMode()) PageStore.handleSave();
    NoteStore.setTargetLayout('List')
  };

  const handleTitleInput = e => PageStore.setTitle(e.target.value);

  return useObserver(() => (
    <>
      <MainHeader
        leftButtons={[{ type: 'icon', action: 'back', onClick: handleBackButtonClick }]}
        rightButtons={
          PageStore.isReadMode() && [
            { type: 'icon', action: 'search' },
            { type: 'text', text: '🎅🏻' },
          ]
        }
      />
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
          <>
            <ModifiedTime
              style={{ fontSize: '0.75rem', borderLeft: '0px solid #ffffff', marginRight:'auto' }}
            >
              {PageStore.pageInfo.modDate}
            </ModifiedTime>
            {PageStore.isReadMode() && <ModifiedUser style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>
              {PageStore.pageInfo.modUserName}
            </ModifiedUser>}
          </>
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
      </EditorModCover>
    </>
  ));
};

export default MobileEditorHeader;
