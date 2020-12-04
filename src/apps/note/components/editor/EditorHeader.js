import React from 'react';
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
} from '../../styles/titleStyle';
import ContentHeader from '../common/ContentHeader';
import editingImg from '../../assets/TeeSpace_working.gif';
import { handleFileSync } from '../common/NoteFile';

const EditorHeader = () => {
  const { NoteStore, PageStore, EditorStore } = useNoteStore();

  // 뒤로 가기 버튼
  const handleLayoutBtn = async (e) => {
    if (!PageStore.isEdit) {
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
      PageStore.noteEditStart(PageStore.currentPageData.note_id);
    } else if (innerText === '저장') {
      // PageStore.noteNoneEdit(PageStore.currentPageData.note_id);
      await handleFileSync()
        .then(() => PageStore.handleSave());
    }
  };

  const handleTitleInput = e => {
    const {
      target: { value },
    } = e;
    PageStore.setTitle(value);
  };

  const editBtnText =
    PageStore.isEdit === null || PageStore.isEdit === '' ? '수정' : '저장';

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
            placeholder='제목 없음'
            value={PageStore.noteTitle}
            onChange={handleTitleInput}
            disabled={PageStore.isEdit ? false : true}
            autoComplete="off"
          />
        </EditorHeaderContainer1>
        <EditorHeaderContainer2 show={NoteStore.layoutState !== "collapse"}>
          {PageStore.isEdit && <EditingImg src={editingImg} />}
          <ModifiedUser>
            {PageStore.isEdit
              ? PageStore.prevModifiedUserName
              : PageStore.currentPageData.user_name}
          </ModifiedUser>
          <ModifiedTime>{PageStore.modifiedDate}</ModifiedTime>
        </EditorHeaderContainer2>
      </ContentHeader>
    </>
  ));
};
export default EditorHeader;
