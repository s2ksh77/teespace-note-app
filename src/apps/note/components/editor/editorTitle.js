import React from "react";
import { useObserver } from "mobx-react";
import useStore from "../../store/useStore";
import {
  EditorTitle,
  EditorTitleContainer1,
  EditorTitleButton,
  EditorTitleTextField,
  EditorTitleContainer2,
  EditorTitleModifiedUser,
  EditorTitleModifiedTime,
} from "../../styles/titleStyle";

const EditorMenuTitle = () => {
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
      <EditorTitle>
        <EditorTitleContainer1>
          <EditorTitleButton onClick={handleClickBtn}>
            {PageStore.isEdit === null || PageStore.isEdit === ""
              ? "수정"
              : "저장"}
          </EditorTitleButton>
          <EditorTitleTextField
            id="editorTitle"
            value={PageStore.noteTitle}
            onChange={handleTitleInput}
          />
        </EditorTitleContainer1>
        <EditorTitleContainer2>
          <EditorTitleModifiedUser>
            {PageStore.currentPageData.user_name}
          </EditorTitleModifiedUser>
          <EditorTitleModifiedTime>
            {PageStore.currentPageData.modified_date}
          </EditorTitleModifiedTime>
        </EditorTitleContainer2>
      </EditorTitle>
    </>
  ));
};
export default EditorMenuTitle;
