import React, { useRef } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import EditorMenuTitle from './editorTitle';
import { ReadModeTitle, ReadModeToolTip } from '../../styles/editorStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import TagListContainer from '../tag/tagContainer';
import { TagContainer } from '../../styles/tagStyle';
import { modules, formats, config } from '../../store/editorStore';
import { toJS } from 'mobx';
import JoditEditor, { Jodit } from 'jodit-react';

const EditorMenuContainer = () => {
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
      <EditorMenuTitle />
      {PageStore.isReadMode() ? (
        <ReadModeTitle style={{ display: 'flex' }}>
          <FontAwesomeIcon icon={faLock} className="readModeIcon" size={'1x'} />
          <ReadModeToolTip>읽기 모드</ReadModeToolTip>
          <ReadModeToolTip>
            편집하려면 수정 버튼을 클릭해주세요.
          </ReadModeToolTip>
        </ReadModeTitle>
      ) : (
        // null 로 했더니 에디터 밑에 생겨버림
        <ReadModeTitle style={{ display: 'none' }}>
          <FontAwesomeIcon icon={faLock} className="readModeIcon" size={'1x'} />
          <ReadModeToolTip>읽기 모드</ReadModeToolTip>
          <ReadModeToolTip>
            편집하려면 수정 버튼을 클릭해주세요.
          </ReadModeToolTip>
        </ReadModeTitle>
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
      <TagContainer>
        <TagListContainer />
      </TagContainer>
    </>
  ));
};

export default EditorMenuContainer;
