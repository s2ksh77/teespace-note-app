import React, { useEffect, useState } from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react';
import 'suneditor/dist/css/suneditor.min.css';
import useStore from '../store/useStore';
import EditorMenuTitle from './editorTitle';
import { ReadModeTitle, ReadModeToolTip } from '../styles/editorStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const EditorMenuContainer = () => {
  const { NoteStore, PageStore } = useStore();
  const [isEdit, setEdit] = useState(false);

  const convertEditMode = () => {
    console.log(toJS(PageStore.currentPageData));
    if (
      PageStore.currentPageData.is_edit === null ||
      PageStore.currentPageData.is_edit === ''
    ) {
      // 읽기모드
      console.log('read mode');
    } else {
      console.log('edit mode');
    }
  };

  useEffect(() => {
    convertEditMode();
  });

  return useObserver(() => (
    <>
      <EditorMenuTitle />
      {isEdit ? null : (
        <ReadModeTitle>
          <FontAwesomeIcon icon={faLock} className="readModeIcon" size={'1x'} />
          <ReadModeToolTip>읽기 모드</ReadModeToolTip>
        </ReadModeTitle>
      )}
      <SunEditor
        name="noteEditor"
        width="100%"
        height="732px"
        setOptions={{
          mode: 'classic',
          buttonList: NoteStore.editorButtonList,
        }}
        setContents={PageStore.currentPageData.note_content}
        showToolbar={isEdit ? true : false}
        disable={isEdit ? false : true}
      />
    </>
  ));
};
export default EditorMenuContainer;
