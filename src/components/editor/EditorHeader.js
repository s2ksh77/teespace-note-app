import React, { useEffect, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores, logEvent } from 'teespace-core';
import Mark from 'mark.js';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';
import {
  EditorHeaderContainer1,
  EditBtn,
  EditorTitle,
  EditorHeaderContainer2,
  EditingImg,
  AutoSaveMsg,
  ModifiedUser,
  ModifiedTime,
  EditorSearchIconDiv,
  HeaderDivider,
} from '../../styles/titleStyle';
import { SearchIcon } from '../icons';
import ContentHeader from '../common/ContentHeader';
import waplWorking from '../../assets/wapl_working.svg';
import { handleFileSync } from '../common/NoteFile';
import { checkMaxLength } from '../common/validators';

const EditorHeader = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { userStore, authStore } = useCoreStores();
  const { t } = useTranslation();
  const instance = new Mark(EditorStore.tinymce?.getBody());
  const themeContext = useContext(ThemeContext);

  const initialSearch = () => {
    instance.unmark();
    EditorStore.setSearchResultState(false);
    EditorStore.setSearchValue('');
    EditorStore.setSearchTotalCount(0);
    EditorStore.setSearchCurrentCount(0);
  };

  // 뒤로 가기 버튼
  const handleLayoutBtn = async () => {
    if (PageStore.isReadMode()) {
      EditorStore.setIsSearch(false);
      initialSearch();
      if (!ChapterStore.isTagSearching) {
        ChapterStore.initSearchVar();
        ChapterStore.getNoteChapterList();
        NoteStore.setTargetLayout('LNB');
      } else {
        NoteStore.setTargetLayout('Content');
        NoteStore.setShowPage(false);
      }
    } else {
      if (EditorStore.isUploading) {
        NoteStore.setModalInfo('uploadingFiles');
        return;
      }
      if (!EditorStore.isEditCancelOpen()) {
        await PageStore.handleNoneEdit();
        NoteStore.setTargetLayout('LNB');
        return;
      }
      PageStore.editCancel();
    }
  };

  const handleModifySaveBtnClick = async () => {
    if (EditorStore.isUploading) {
      NoteStore.setModalInfo('uploadingFiles');
      return;
    }
    EditorStore.setIsSearch(false);
    initialSearch();
    EditorStore.tinymce?.undoManager?.clear();
    if (PageStore.isReadMode()) {
      // 수정모드 진입시 lnb 검색 결과 초기화
      if (NoteStore.layoutState !== 'collapse') ChapterStore.initSearchVar();
      if (PageStore.otherEdit) {
        const { displayName } = await userStore.getProfile(
          PageStore.pageInfo.editingUserId,
        );
        NoteStore.setModalInfo('editingPage', { name: displayName });
      } else PageStore.noteEditStart(PageStore.pageInfo.id);
    } else {
      await handleFileSync().then(() => PageStore.handleSave());
      logEvent('note', 'clickModifyBtn');
    }
  };

  const handleTitleInput = e => PageStore.setTitle(e.target.value);

  const handleSearchEditor = () => {
    EditorStore.setIsSearch(!EditorStore.isSearch);
    initialSearch();
  };

  const handleOnEditCancel = e => {
    e.stopPropagation();
    PageStore.editCancel();
  };

  useEffect(() => {
    // 수정모드 시 룸 생성 버튼 및 메일 탭 임시 editCancel 적용
    if (!PageStore.isReadMode() && NoteStore.appType === 'wapl') {
      document
        .querySelector('.rooms__create-button')
        ?.addEventListener('click', handleOnEditCancel);
      document
        .querySelectorAll('.ant-tabs-tab')[2]
        ?.addEventListener('click', handleOnEditCancel);
    }
    return () => {
      if (PageStore.isReadMode() && NoteStore.appType === 'wapl') {
        document
          .querySelector('.rooms__create-button')
          ?.removeEventListener('click', handleOnEditCancel);
        document
          .querySelectorAll('.ant-tabs-tab')[2]
          ?.removeEventListener('click', handleOnEditCancel);
      }
    };
  }, [PageStore.isReadMode()]);

  return useObserver(() => (
    <>
      <ContentHeader handleBackBtn={handleLayoutBtn} alignment="center">
        <EditorHeaderContainer1>
          {authStore.hasPermission('notePage', 'U') && !PageStore.isRecycleBin && (
            <EditBtn data-btn="editorEditBtn" onClick={handleModifySaveBtnClick}>
              {PageStore.isReadMode()
                ? t('NOTE_PAGE_LIST_ADD_NEW_PGE_01')
                : t('NOTE_PAGE_LIST_ADD_NEW_PGE_04')}
            </EditBtn>
          )}
          <EditorTitle
            id="editorTitle"
            maxLength="200"
            placeholder={t('NOTE_PAGE_LIST_CMPNT_DEF_03')}
            value={PageStore.noteTitle}
            onChange={handleTitleInput}
            disabled={!!PageStore.isReadMode()}
            autoComplete="off"
          />
        </EditorHeaderContainer1>
        <EditorHeaderContainer2>
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
              <ModifiedUser>{PageStore.pageInfo.modUserName}</ModifiedUser>
              <ModifiedTime>{PageStore.pageInfo.modDate}</ModifiedTime>
            </>
          )}
          <EditorSearchIconDiv onClick={handleSearchEditor}>
            <SearchIcon width={1} height={1} color={themeContext.IconNormal} />
          </EditorSearchIconDiv>
        </EditorHeaderContainer2>
        {NoteStore.appType === 'wapl' ? <HeaderDivider /> : null}
      </ContentHeader>
    </>
  ));
};
export default React.memo(EditorHeader);
