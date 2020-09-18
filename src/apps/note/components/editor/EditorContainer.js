import React, { useRef } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import EditorHeader from './EditorHeader';
import { ReadModeContainer, ReadModeText } from '../../styles/editorStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import TagListContainer from '../tag/TagListContainer';
import { modules, formats, config } from '../../store/editorStore';
import { toJS } from 'mobx';
import JoditEditor, { Jodit } from 'jodit-react';

const EditorContainer = () => {
  const { NoteStore, PageStore, EditorStore } = useStore();
  let noteEditor = useRef(null);

  const getEditorContent = content => {
    PageStore.setContent(content);
  };

  const setNoteEditor = instance => {
    noteEditor = instance;
    EditorStore.setEditor(instance);
    if (PageStore.isReadMode()) {
      noteEditor.lock();
      noteEditor.setReadOnly(true);
    } else {
      noteEditor.unlock();
      noteEditor.setReadOnly(false);
    }
  };

  return useObserver(() => (
    <>
      <EditorHeader />
      {PageStore.isReadMode() ? (
        <ReadModeContainer style={{ display: 'flex' }}>
          <FontAwesomeIcon icon={faLock} className="readModeIcon" size={'1x'} />
          <ReadModeText>읽기 모드</ReadModeText>
          <ReadModeText>
            편집하려면 수정 버튼을 클릭해주세요.
          </ReadModeText>
        </ReadModeContainer>
      ) : (
          // null 로 했더니 에디터 밑에 생겨버림
          <ReadModeContainer style={{ display: 'none' }}>
            <FontAwesomeIcon icon={faLock} className="readModeIcon" size={'1x'} />
            <ReadModeText>읽기 모드</ReadModeText>
            <ReadModeText>
              편집하려면 수정 버튼을 클릭해주세요.
          </ReadModeText>
          </ReadModeContainer>
        )}
      <JoditEditor
        editorRef={jodit => setNoteEditor(jodit)}
        onChange={getEditorContent}
        config={{
          buttons: config.buttons,
          uploader: config.uploader,
          placeholder: config.placeholder,
          toolbar: PageStore.isReadMode() ? false : true,
          height: PageStore.isReadMode()
            ? 'calc(100% - 8.6rem)'
            : 'calc(100% - 5.8rem)',
        }}
        value={PageStore.currentPageData.note_content}
      />

      <TagListContainer />

    </>
  ));
};

export default EditorContainer;
