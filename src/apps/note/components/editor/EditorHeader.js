import React from "react";
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

const EditorHeader = () => {
  const { PageStore, TagStore } = useStore();

  const handleClickBtn = (e) => {
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
  };

  const handleTitleInput = (e) => {
    const {
      target: { value },
    } = e;
    PageStore.setTitle(value);
  };

  return useObserver(() => (
    <>
      <EditorHeaderCover>
        <EditorHeaderContainer1>
          <EditBtn onClick={handleClickBtn}>
            {PageStore.isEdit === null || PageStore.isEdit === ""
              ? "수정"
              : "저장"}
          </EditBtn>
          <EditorTitle
            id="editorTitle"
            value={PageStore.noteTitle}
            onChange={handleTitleInput}
          />
        </EditorHeaderContainer1>
        <EditorHeaderContainer2>
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
