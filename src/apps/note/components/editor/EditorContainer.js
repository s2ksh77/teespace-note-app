import React, { useLayoutEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import EditorHeader from './EditorHeader';
import { ReadModeContainer, ReadModeText } from '../../styles/editorStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import TagListContainer from '../tag/TagListContainer';
import { Editor } from '@tinymce/tinymce-react'

const EditorContainer = () => {
  const { NoteStore, PageStore, EditorStore } = useStore();
  const getEditorContent = content => {
    PageStore.setContent(content);
  };

  const setNoteEditor = instance => {
    EditorStore.setEditor(instance);
    // 첫 init 때 onChange가 불리지 않아서 setting...
    PageStore.setContent(PageStore.currentPageData.note_content);
    // 첫 setup 으로 생성시 한번만 불림, instance 타이밍 이슈로 mode가 잘 안먹음
    initialMode()
  };

  useLayoutEffect(() => {
    if (PageStore.isReadMode()) {
      EditorStore.tinymce?.setMode('readonly')
      if (document.querySelector('.tox-editor-header')) document.querySelector('.tox-editor-header').style.display = 'none'
      if (document.querySelector('.tox-tinymce')) document.querySelector('.tox-tinymce').style.height = "calc(100% - 8.8rem)"
    } else {
      EditorStore.tinymce?.setMode('design')
      if (document.querySelector('.tox-editor-header')) document.querySelector('.tox-editor-header').style.display = 'block'
      if (document.querySelector('.tox-tinymce')) document.querySelector('.tox-tinymce').style.height = "calc(100% - 6rem)"
    }
  }, [PageStore.isReadMode()])

  const initialMode = () => {
    if (PageStore.isReadMode()) EditorStore.tinymce?.setMode('readonly')
    else EditorStore.tinymce?.setMode('design')
  }

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
      {/* <JoditEditor
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
      /> */}
      <Editor
        id='noteEditor'
        value={PageStore.currentPageData.note_content}
        init={{
          menubar: 'edit view insert format tools table',
          height: "calc(100% - 8.8rem)",
          setup: function (editor) {
            setNoteEditor(editor)
          }
        }}
        onEditorChange={getEditorContent}
        apiKey="d9c90nmok7sq2sil8caz8cwbm4akovrprt6tc67ac0y7my81"
        plugins='print preview paste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars'
        toolbar='undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap fullscreen preview print | insertfile image media link anchor codesample | ltr rtl'
      />

      <TagListContainer />

    </>
  ));
}
export default EditorContainer;
