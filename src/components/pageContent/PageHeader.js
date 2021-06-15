import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores, logEvent } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import Mark from 'mark.js';
import useNoteStore from '../../stores/useNoteStore';

import {
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
import ContentHeader from '../common/ContentHeader';
import editingIcon from '../../assets/wapl_working.svg';
import searchIcon from '../../assets/search.svg';
import backIcon from '../../assets/arrow_back_1.svg';
import NoteUtil from '../../utils/NoteUtil';

const PageHeader = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { userStore, authStore } = useCoreStores();
  const { t } = useTranslation();
  const instance = new Mark(EditorStore.tinymce?.getBody());

  const handleBackBtnClick = () => {
    if (PageStore.pageModel.isReadMode) {
      // EditorStore.setIsSearch(false);
      // initialSearch();
      if (!ChapterStore.isTagSearching) {
        // ChapterStore.initSearchVar();
        // ChapterStore.getNoteChapterList();
        NoteStore.setTargetLayout('lnb');
      } else {
        NoteStore.setTargetLayout('content');
        // NoteStore.setShowPage(false);
      }
    } else {
      if (EditorStore.isUploading) {
        NoteStore.setModalInfo('uploadingFiles');
        return;
      }
      NoteStore.setModalInfo('editCancel');
    }
  };

  const handleEditBtnClick = async () => {
    const { pageModel } = PageStore;
    if (EditorStore.isUploading) {
      NoteStore.setModalInfo('uploadingFiles');
      return;
    }
    // EditorStore.setIsSearch(false);
    // initialSearch();
    // EditorStore.tinymce?.undoManager?.clear();
    if (pageModel.isReadMode) {
      // if (NoteStore.layoutState !== 'collapse') ChapterStore.initSearchVar();
      if (pageModel.editingUesrId) {
        // modal에서 pageModel.getDisplayName(pageModel.editingUserId) 해도 될듯!
        // NoteStore.setModalInfo('editingPage');
      } else {
        PageStore.editStart(pageModel.id, pageModel.chapterId);
      }
    } else {
      // await handleFileSync().then(() => PageStore.handleSave());
      PageStore.editDone({
        note_id: pageModel.id,
        note_title: pageModel.name,
        note_content: pageModel.content,
        text_content: pageModel.textContent,
        parent_notebook: pageModel.chapterId,
        is_edit: '',
      });
      logEvent('note', 'clickModifyBtn');
    }
  };

  const handleChange = e => {
    const {
      target: { value },
    } = e;
    PageStore.pageModel.setNoteTitle(value);
  };

  const handleSearch = () => {};

  return useObserver(() => (
    <>
      <ContentHeader handleBackBtnClick={handleBackBtnClick}>
        {authStore.hasPermission('notePage', 'U') &&
          !PageStore.isRecycleBin && (
            <EditButton onClick={handleEditBtnClick}>
              {PageStore.pageModel.isReadMode
                ? t('NOTE_PAGE_LIST_ADD_NEW_PGE_01')
                : t('NOTE_PAGE_LIST_ADD_NEW_PGE_04')}
            </EditButton>
          )}
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
            <ModifiedTime>
              {NoteUtil.convertDateFormat(PageStore.pageModel.modDate)}
            </ModifiedTime>
          </>
        ) : (
          <EditingIcon src={editingIcon} />
        )}
        <SearchButtonWrapper
          style={{ marginRight: '0.75rem' }}
          onClick={handleSearch}
        >
          <SearchButtonIcon src={searchIcon} />
        </SearchButtonWrapper>
      </ContentHeader>
    </>
  ));
};

export default PageHeader;
