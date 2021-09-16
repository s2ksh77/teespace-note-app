import React, {useState} from 'react';
import { TagInput } from '../../styles/tagStyle';
import {checkWhitespace, checkMaxLength} from '../common/validators';
import useNoteStore from '../../store/useStore';

const AddTagForm = ({show, toggleTagInput}) => {
  const { NoteStore, PageStore, TagStore } = useNoteStore(); 
  const [value, setValue] = useState('');
  if (!show) return null;

  const handleTagInput = e => setValue(checkMaxLength(e));
  
  const handleBlurTagInput = () => {
    if (!checkWhitespace(value)) {};
    if (TagStore.isValidTag(value)) TagStore.createNoteTag([value], PageStore.currentPageId);
    else NoteStore.setModalInfo('duplicateTagName');
    setValue("");
  };  

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        handleBlurTagInput();
        break;
      case "Escape":
        toggleTagInput();
        setValue("");
        break;
      default:
        break;
    }
  }
  // return useObserver(()=>(
  return (
    <TagInput
      maxLength="50"
      value={value}
      onChange={handleTagInput}
      onBlur={handleBlurTagInput}
      onKeyDown={handleKeyDown}
      autoFocus={true}
    />
  );
};

export default AddTagForm;
