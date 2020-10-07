import React from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import {
  EditorHeaderCover,
  EditorHeaderContainer1,
  EditBtn,
  EditorTitle,
  EditorHeaderContainer2,
  ModifiedUser,
  ModifiedTime,
  EditPreBtn,
  EditPreBtnWrapper,
} from '../../styles/titleStyle';
import HeaderButtons from '../common/buttons';
import editingImg from '../../assets/TeeSpace_working.gif';
import NoteStore from '../../store/noteStore';
import preImg from '../../assets/back.svg';
import { Button } from '../../styles/commonStyle';
import NoteUtil from '../common/NoteUtil';

const editingImgStyle = { width: '1.13rem', marginRight: '0.5rem' };
const style = { cursor: 'pointer' };
const handleLayoutBtn = () => NoteStore.setTargetLayout('LNB');

const EditorHeader = () => {
  const { NoteStore, PageStore, TagStore } = useStore();

  const handleClickBtn = e => {
    const {
      target: { innerText },
    } = e;
    if (innerText === '수정') {
      PageStore.editStart(PageStore.currentPageData.note_id);
    } else if (innerText === '저장') {
      // PageStore.noneEdit(PageStore.currentPageData.note_id);
      PageStore.handleSave();
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
      <EditorHeaderCover>
        <EditPreBtnWrapper
          style={
            NoteStore.layoutState === 'collapse'
              ? { display: 'flex' }
              : { display: 'none' }
          }
        >
          <Button style={style} src={preImg} onClick={handleLayoutBtn} />
        </EditPreBtnWrapper>
        <EditorHeaderContainer1>
          <EditBtn onClick={handleClickBtn}>{editBtnText}</EditBtn>
          <EditorTitle
            id="editorTitle"
            maxLength="200"
            value={PageStore.noteTitle}
            onChange={handleTitleInput}
            disabled={PageStore.isEdit ? false : true}
            autoComplete="off"
          />
        </EditorHeaderContainer1>
        <EditorHeaderContainer2>
          {PageStore.isEdit && <img style={editingImgStyle} src={editingImg} />}
          <ModifiedUser>{PageStore.currentPageData.user_name}</ModifiedUser>
          <ModifiedTime>{PageStore.modifiedDate}</ModifiedTime>
        </EditorHeaderContainer2>
        <HeaderButtons />
      </EditorHeaderCover>
    </>
  ));
};
export default EditorHeader;
