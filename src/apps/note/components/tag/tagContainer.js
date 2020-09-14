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
  TagTextSpan,
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
  const handleChangeTag = (text, index, id) => {
    TagStore.setCurrentTagData(id, text);
    TagStore.setEditTagText(text);
    TagStore.setEditTagIndex(index);
  };
  const handleChangeName = e => {
    const {
      target: { value },
    } = e;
    TagStore.setEditTagText(value);
  };
  const handleModifyInput = () => {
    TagStore.setEditTagText(TagStore.editTagValue);
    if (TagStore.currentTagId) {
      // 수정하지 않았으면 그대로 return
      if (TagStore.currentTagValue === TagStore.editTagValue)
        TagStore.setEditTagIndex(-1);
      else if (TagStore.editTagValue === '') {
        TagStore.setEditTagIndex(-1);
      } else {
        TagStore.notetagList[TagStore.editTagIndex].text =
          TagStore.editTagValue;
        TagStore.setUpdateTagList(TagStore.currentTagId, TagStore.editTagValue);
        TagStore.setEditTagIndex(-1);
      }
    }
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
        {TagStore.notetagList.map((item, index) =>
          TagStore.editTagIndex === index ? (
            <TagInput
              key={item}
              value={TagStore.editTagValue}
              onChange={handleChangeName}
              onBlur={handleModifyInput}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleModifyInput();
                }
              }}
              autoFocus={true}
            />
          ) : (
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
              <TagTextSpan
                onDoubleClick={
                  PageStore.isEdit === null || PageStore.isEdit === ''
                    ? null
                    : handleChangeTag.bind(null, item.text, index, item.tag_id)
                }
              >
                {item.text.length > 5
                  ? `${item.text.slice(0, 5)}...`
                  : item.text}
              </TagTextSpan>
            </Tag>
          ),
        )}
      </TagListDIV>
    </>
  ));
};

export default TagListContainer;
