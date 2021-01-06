import React, {useState} from 'react';
import { TagInput } from '../../styles/tagStyle';
import {checkWhitespace} from '../common/validators';
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';

const AddTagForm = ({show, toggleTagInput, setOpenModal}) => {  
  const [value, setValue] = useState('');
  if (!show) return null;  
  const handleTagInput = e => {
    setValue(e.target.value);
  };
  
  const handleBlurTagInput = () => {
    if (!checkWhitespace(value)) {
      TagStore.setIsNewTag(false);
    } else {
      if (TagStore.isValidTag(value)) {
        TagStore.appendAddTagList(value);
        TagStore.setIsNewTag(false);
        TagStore.prependNoteTagList(value);
      } else {        
        setOpenModal(true);
        TagStore.setIsNewTag(false);
      }
    }
    // input창 초기화
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
