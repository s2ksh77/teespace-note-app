import React from 'react';
import SunEditor from 'suneditor-react';
import { useObserver } from 'mobx-react';
import 'suneditor/dist/css/suneditor.min.css';
import useStore from '../../store/useStore';
import EditorMenuTitle from './editorTitle';
import { ReadModeTitle, ReadModeToolTip } from '../../styles/editorStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import TagListContainer from '../tag/tagContainer';
import { TagContainer } from '../../styles/tagStyle';

const EditorMenuContainer = () => {
  const { NoteStore, PageStore } = useStore();

  const getEditorContent = content => {
    PageStore.setContent(content);
  };

  return useObserver(() => (
    <>
      <EditorMenuTitle />
      {PageStore.isEdit === null || PageStore.isEdit === '' ? (
        <ReadModeTitle>
          <FontAwesomeIcon icon={faLock} className="readModeIcon" size={'1x'} />
          <ReadModeToolTip>읽기 모드</ReadModeToolTip>
        </ReadModeTitle>
      ) : null}
      <SunEditor
        name="noteEditor"
        width="100%"
        height="735px"
        onChange={getEditorContent}
        setOptions={{
          mode: 'classic',
          buttonList: NoteStore.editorButtonList,
          resizingBar: false,
        }}
        setContents={PageStore.currentPageData.note_content}
        showToolbar={
          PageStore.isEdit === null || PageStore.isEdit === '' ? false : true
        }
        disable={
          PageStore.isEdit === null || PageStore.isEdit === '' ? true : false
        }
      />
      <TagContainer>
        <TagListContainer />
      </TagContainer>
    </>
  ));
};

export default EditorMenuContainer;
