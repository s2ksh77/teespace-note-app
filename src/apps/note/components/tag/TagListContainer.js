import React, { useRef, useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { Tag } from 'antd';
import 'antd/dist/antd.css';
import useStore from '../../store/useStore';
import {
  TagNewBtn,
  TagNewBtnIcon,
  TagList,
  TagInput,
  TagText,
} from '../../styles/tagStyle';
import { EditorTagCover } from '../../styles/tagStyle';
import tagImage from '../../assets/tag_add.svg';
import {Tooltip} from 'antd';

const TagListContainer = () => {
  const { TagStore, PageStore } = useStore();
  const [focusedTag, setFocusedTag] = useState(null);
  const tagList = useRef(null);

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
  const handleFocus = (e) => e.target.select();

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
    if (TagStore.currentTagId) {
      // 수정하지 않았으면 그대로 return
      if (TagStore.currentTagValue === TagStore.editTagValue)
        TagStore.setEditTagIndex(-1);
      else if (TagStore.editTagValue === '') {
        TagStore.setEditTagIndex(-1);
      } else {
        if (!TagStore.validTag(TagStore.editTagValue)) {
          TagStore.notetagList[TagStore.editTagIndex].text =
            TagStore.editTagValue;
          TagStore.setUpdateTagList(
            TagStore.currentTagId,
            TagStore.editTagValue
          );
          TagStore.setEditTagIndex(-1);
        } else TagStore.setEditTagIndex(-1);
      }
    } else { // 아이디 없는 애를 고칠 경우
      if (TagStore.currentTagValue === TagStore.editTagValue)
        TagStore.setEditTagIndex(-1);
      else if (TagStore.editTagValue === '') {
        TagStore.setEditTagIndex(-1);
      } else {
        TagStore.setEditCreateTag();
        TagStore.setEditTagIndex(-1);
      }

    }
  };
  const createTag = () => {
    if (TagStore.tagText === "") {
      TagStore.setIsNewFlag(false);
    } else {
      if (!TagStore.validTag(TagStore.tagText)) {
        TagStore.setAddTagList(TagStore.tagText, PageStore.currentPageId);
        TagStore.setIsNewFlag(false);
        TagStore.notetagList.unshift({ text: TagStore.tagText });
      } else {
        TagStore.setIsNewFlag(false);
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
    }
  }

  const handleModifyingKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        handleModifyInput();
        break;
      case "Escape":
        TagStore.setIsNewFlag(false);
        break;
    }
  }

  const handleClickOutside = (e) => {
    if (e.target.dataset.tag !== "noteTagItem") {
      setFocusedTag(null);
    }
  }

  const handleClickTag = (idx,e) => {
    if (focusedTag === null) {
      document.addEventListener("click", handleClickOutside);
    }
    setFocusedTag(idx);
    changeFocusedTag(idx);
  }

  const changeFocusedTag = (idx) => {
    let target = tagList.current.children[idx]
    target.focus();
    target.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  const handleKeyDownTag = (e) => {
    switch (e.keyCode) {
      // left
      case 37:
        if (focusedTag > 0) {
          setFocusedTag((preIdx) => {
            changeFocusedTag(preIdx-1);   
            return preIdx-1
          });                 
        }
        break;
      // right
      case 39:
        if (focusedTag < TagStore.notetagList.length-1) {
          setFocusedTag((preIdx) => {
            changeFocusedTag(preIdx+1);
            return preIdx+1
          });
        }
        break;
      default:
        break;
    }
  }

  useEffect(() => {      
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  },[]);

  return useObserver(() => (
    <>
      <EditorTagCover>
        <Tooltip title={PageStore.isEdit ? "태그 추가" : "읽기모드에서는 추가할 수 없습니다"}>
          <TagNewBtn>
            <TagNewBtnIcon src={tagImage} onClick={toggleTagInput} />
          </TagNewBtn>
        </Tooltip>
        {TagStore.isNewTag ? (
          <TagInput
            maxLength="50"
            onChange={handleTagInput}
            onBlur={createTag}
            onKeyDown={handleKeyDown}
            autoFocus={true}
          />
        ) : null}
        <TagList ref={tagList}>
          {TagStore.notetagList.map((item, index) =>
            TagStore.editTagIndex === index ? (
              <TagInput
                key={item}
                maxLength="50"
                value={TagStore.editTagValue}
                onChange={handleChangeName}
                onBlur={handleModifyInput}
                onKeyDown={handleModifyingKeyDown}
                onFocus={handleFocus}
                autoFocus={true}
              />
            ) : (
                <Tag
                  key={index}
                  data-idx={index}
                  data-tag="noteTagItem"
                  id={item.tag_id}
                  closable={
                    PageStore.isEdit === null || PageStore.isEdit === ''
                      ? false
                      : true
                  }
                  tabIndex="0"
                  style={focusedTag===index ? {backgroundColor:"#1EA8DF"} : {}}
                  onClose={handleCloseBtn.bind(null, item.tag_id, item.text)}
                  onClick={handleClickTag.bind(null, index)}
                  onKeyDown={handleKeyDownTag.bind(null)}
                >
                  <TagText
                    onDoubleClick={
                      PageStore.isEdit === null || PageStore.isEdit === ''
                        ? null
                        : handleChangeTag.bind(null, item.text, index, item.tag_id)
                    }
                  >
                    {item.text.length > 5
                      ? `${item.text.slice(0, 5)}...`
                      : item.text}
                  </TagText>
                </Tag>
              )
          )}
        </TagList>
      </EditorTagCover>
    </>
  ));
};

export default TagListContainer;
