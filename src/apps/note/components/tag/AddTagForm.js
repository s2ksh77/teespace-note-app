import React from 'react';
import { TagInput } from '../../styles/tagStyle';
import {checkWhitespace} from '../common/validators';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';

const AddTagForm = ({show, toggleTagInput}) => {
  if (!show) return null;  
  const {PageStore, TagStore} = useNoteStore();
  const handleTagInput = e => {
    TagStore.setTagText(e.target.value);
  };
  
  const createTag = () => {
    if (!checkWhitespace(TagStore.tagText)) {
      TagStore.setIsNewTag(false);
    } else {
      if (TagStore.isValidTag(TagStore.tagText)) {
        TagStore.appendAddTagList(TagStore.tagText);
        TagStore.setIsNewTag(false);
        TagStore.notetagList.unshift({ text: TagStore.tagText });
      } else {
        TagStore.setIsNewTag(false);
      }
    }
  };  

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        createTag();
        break;
      case "Escape":
        toggleTagInput();
        break;
      default:
        break;
    }
  }
  return useObserver(()=>(
    <TagInput
      maxLength="50"
      onChange={handleTagInput}
      onBlur={createTag}
      onKeyDown={handleKeyDown}
      autoFocus={true}
    />
  ));
};

export default AddTagForm;
