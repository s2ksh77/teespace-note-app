import React, {useMemo, useCallback} from "react";
import { useObserver } from "mobx-react";
import useStore from "../../store/useStore";
import {
  EditorHeaderCover,
  EditorHeaderContainer1,
  EditBtn,
  EditorTitle,
  EditorHeaderContainer2,
  ModifiedUser,
  ModifiedTime,
} from "../../styles/titleStyle";
import HeaderButtons from '../common/buttons';
import editingImg from '../../assets/TeeSpace_working.gif';

const EditorHeader = () => {
  const { PageStore, TagStore } = useStore();
  const editingImgStyle = {width:"1.13rem", marginRight:"0.5rem"};

  const handleClickBtn = useCallback((e) => {
    const {
      target: { innerText },
    } = e;
    if (innerText === "수정") {
      PageStore.editStart(PageStore.currentPageData.note_id);
    } else if (innerText === "저장") {
      // PageStore.noneEdit(PageStore.currentPageData.note_id);
      const updateDTO = {
        dto: {
          note_id: PageStore.currentPageData.note_id,
          note_title: PageStore.noteTitle,
          note_content: PageStore.noteContent,
          parent_notebook: PageStore.currentPageData.parent_notebook,
          is_edit: "",
          TYPE: "EDIT_DONE",
        },
      };
      PageStore.editDone(updateDTO);
      if (TagStore.removeTagList) TagStore.deleteTag(TagStore.removeTagList);
      if (TagStore.addTagList) TagStore.createTag(TagStore.addTagList);
      if (TagStore.updateTagList) TagStore.updateTag(TagStore.updateTagList);
    }
  },[]);

  const handleTitleInput = useCallback((e) => {
    const {
      target: { value },
    } = e;
    PageStore.setTitle(value);
  }, []);

  const editImg = useMemo(() => {
    return PageStore.isEdit && <img style={editingImgStyle} src={editingImg} />
  }, [PageStore.isEdit])

  const editBtnText = useMemo(() => {
    return (PageStore.isEdit === null || PageStore.isEdit === "") ? "수정" : "저장"
  }, [PageStore.isEdit])

  return useObserver(() => (
    <>
      <EditorHeaderCover>
        <EditorHeaderContainer1>
          <EditBtn onClick={handleClickBtn}>
            {editBtnText}
          </EditBtn>
          <EditorTitle
            id="editorTitle"
            maxLength="200"
            value={PageStore.noteTitle}
            onChange={handleTitleInput}
          />
        </EditorHeaderContainer1>
        <EditorHeaderContainer2>
          {editImg}
          <ModifiedUser>
            {PageStore.currentPageData.user_name}
          </ModifiedUser>
          <ModifiedTime>
            {PageStore.currentPageData.modified_date}
          </ModifiedTime>
        </EditorHeaderContainer2>
        <HeaderButtons/>
      </EditorHeaderCover>
    </>
  ));
};
export default EditorHeader;
