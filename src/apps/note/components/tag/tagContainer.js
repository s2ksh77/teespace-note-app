import React from 'react';
import { useObserver } from 'mobx-react';
import { Tag } from 'antd';
import 'antd/dist/antd.css';
import useStore from '../../store/useStore';
import {
  TagNewBtnDIV,
  TagNewBtnIcon,
  TagListDIV,
  TagInput,
} from '../../styles/tagStyle';
import tagImage from '../../assets/tag_add.svg';

const TagListContainer = () => {
  const { TagStore, PageStore } = useStore();
  const handleCloseBtn = (targetId, targetText) => {
    if (targetId) {
      const curTag = TagStore.notetagList.filter(
        tag => tag.tag_id !== targetId,
      );
      TagStore.setTagNoteList(curTag);
      TagStore.setDeleteTagList(targetId);
    } else {
      const exceptTag = TagStore.notetagList.filter(
        tag => tag.text !== targetText,
      );
      TagStore.setTagNoteList(exceptTag);
      TagStore.removeAddTagList(targetText);
    }
  };
  const toggleTagInput = () => {
    if (!TagStore.isNewTag && PageStore.isEdit) TagStore.setIsNewFlag(true);
    else TagStore.setIsNewFlag(false);
  };
  const handleTagInput = e => {
    const {
      target: { value },
    } = e;
    TagStore.setTagText(value);
  };
  const createTag = () => {
    TagStore.setAddTagList(TagStore.tagText, PageStore.currentPageId);
    TagStore.setIsNewFlag(false);
    TagStore.notetagList.unshift({ text: TagStore.tagText });
  };
  return useObserver(() => (
    <>
      <TagNewBtnDIV>
        <TagNewBtnIcon src={tagImage} onClick={toggleTagInput} />
      </TagNewBtnDIV>
      {TagStore.isNewTag ? (
        <TagInput
          onChange={handleTagInput}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              createTag();
            }
          }}
        />
      ) : null}
      <TagListDIV>
        {TagStore.notetagList.map(item => (
          <Tag
            key={item.tag_id}
            id={item.tag_id}
            closable={
              PageStore.isEdit === null || PageStore.isEdit === ''
                ? false
                : true
            }
            onClose={handleCloseBtn.bind(null, item.tag_id, item.text)}
          >
            {item.text.length > 5 ? `${item.text.slice(0, 5)}...` : item.text}
          </Tag>
        ))}
      </TagListDIV>
    </>
  ));
};

export default TagListContainer;
