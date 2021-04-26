import React from 'react';
import { useObserver } from 'mobx-react';
import LoadingContent from '../common/LoadingContent';
import useNoteStore from '../../stores/useNoteStore';
import NoContent from '../common/NoContent';
import TagKeyList from './TagKeyList';

const TagBody = () => {
  const { NoteStore, TagStore } = useNoteStore();

  return useObserver(() => (
    <>
      <div>Tag Body{console.log(TagStore.tagCategory)}</div>
    </>
  ));
};

export default TagBody;
