import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import {
  EditorHeaderContainer1,
  EditBtn,
  EditorTitle,
  EditorHeaderContainer2,
  EditingImg,
  ModifiedUser,
  ModifiedTime,
  EditorSearchIconDiv,
  EditorSearchIcon,
  EditorDivider,
} from '../../styles/titleStyle';
import ContentHeader from '../common/ContentHeader';
import editingImg from '../../assets/TeeSpace_working.gif';
import { handleFileSync } from '../common/NoteFile';
import { useCoreStores } from 'teespace-core';
import searchImg from '../../assets/search.svg';
import Mark from 'mark.js';

const EditorHeader = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { userStore } = useCoreStores();
  const instance = new Mark(EditorStore.tinymce?.getBody());

  // 뒤로 가기 버튼
  const handleLayoutBtn = async (e) => {
    if (PageStore.isReadMode()) {
      ChapterStore.getNoteChapterList();
      NoteStore.setTargetLayout('LNB');
    } else {
      const isUndoActive = EditorStore.tinymce?.undoManager.hasUndo();
      if (!isUndoActive) {
        await PageStore.handleNoneEdit();
        NoteStore.setTargetLayout('LNB');
      } else NoteStore.setModalInfo('editCancel');
    }
  }

  const handleClickBtn = async e => {
    const {
      target: { innerText },
    } = e;
    if (innerText === '수정') {
      if (PageStore.otherEdit) {
        const res = await userStore.fetchProfile(PageStore.getEditingUserID());
        PageStore.setEditingUserName(res.name);
        NoteStore.setModalInfo('editingPage');
      }
      else {
        PageStore.noteEditStart(PageStore.currentPageData.note_id);
      }
    } else if (innerText === '저장') {
      // PageStore.noteNoneEdit(PageStore.currentPageData.note_id);
      await handleFileSync()
        .then(() => PageStore.handleSave());
    }
    EditorStore.setIsSearch(false);
    instance.unmark();
    EditorStore.tinymce?.undoManager?.clear();
  };

  const handleTitleInput = e => {
    const {
      target: { value },
    } = e;
    PageStore.setTitle(value);
  };

  const editBtnText =
    PageStore.isReadMode() ? '수정' : '저장';

  const handleSearchEditor = () => {
    EditorStore.isSearch ? EditorStore.setIsSearch(false) : EditorStore.setIsSearch(true)
    initialSearch();
  }
  const initialSearch = () => {
    instance.unmark();
    EditorStore.setSearchResultState(false);
    EditorStore.setSearchValue('');
    EditorStore.setSearchTotalCount(0);
    EditorStore.setSearchCurrentCount(0);
  }

  return useObserver(() => (
    <>
      <ContentHeader
        handleBackBtn={handleLayoutBtn}
        alignment={"center"}
      >
        <EditorHeaderContainer1>
          <EditBtn data-btn="editorEditBtn" onClick={handleClickBtn}>{editBtnText}</EditBtn>
          <EditorTitle
            id="editorTitle"
            maxLength="200"
            placeholder='(제목 없음)'
            value={PageStore.noteTitle}
            onChange={handleTitleInput}
            disabled={!PageStore.isReadMode() ? false : true}
            autoComplete="off"
          />
        </EditorHeaderContainer1>
        <EditorHeaderContainer2>
          {(!PageStore.isReadMode() || PageStore.otherEdit) && <EditingImg src={editingImg} />}
          <ModifiedUser>
            {!PageStore.isReadMode()
              ? PageStore.prevModifiedUserName
              : PageStore.currentPageData.user_name}
          </ModifiedUser>
          <ModifiedTime>{PageStore.modifiedDate}</ModifiedTime>
          <EditorSearchIconDiv onClick={handleSearchEditor}>
            <EditorSearchIcon src={searchImg} />
          </EditorSearchIconDiv>
        </EditorHeaderContainer2>
        <EditorDivider />
      </ContentHeader>
    </>
  ));
};
export default EditorHeader;
