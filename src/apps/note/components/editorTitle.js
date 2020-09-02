import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../store/useStore';
import {
  EditorTitle,
  EditorTitleContainer1,
  EditorTitleButton,
  EditorTitleTextField,
  EditorTitleContainer2,
  EditorTitleModifiedUser,
  EditorTitleModifiedTime,
} from '../styles/titleStyle';

const EditorMenuTitle = () => {
  const { PageStore } = useStore();
  const [title, setTitle] = useState('');

  const handleTitleInput = e => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  return useObserver(() => (
    <>
      <EditorTitle>
        <EditorTitleContainer1>
          <EditorTitleButton>수정</EditorTitleButton>
          <EditorTitleTextField
            id="editorTitle"
            value={PageStore.currentPageData.note_title || ''}
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
