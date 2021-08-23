import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import EditorContent from './EditorContent';
import TagContent from './TagContent';

const ContentContainer = () => {
  const { ChapterStore, PageStore, NoteStore } = useNoteStore();

  const renderContent = () => {
    return NoteStore.targetLayout === 'Editor' ? (
      <EditorContent />
    ) : NoteStore.targetLayout === 'Tag' ? (
      <TagContent />
    ) : null;
  };

  return useObserver(() => <>{renderContent()}</>);
};

export default ContentContainer;
