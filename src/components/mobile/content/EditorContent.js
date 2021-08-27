import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import EditorContainer from '../../editor/EditorContainer';

const EditorContent = () => {
  const { ChapterStore, PageStore, EditorStore } = useNoteStore();

  return useObserver(() => (
    <>
      <EditorContainer isWeb={false} />
    </>
  ));
};

export default EditorContent;
