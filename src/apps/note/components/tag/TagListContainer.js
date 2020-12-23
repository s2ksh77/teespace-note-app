import React, { useRef, useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { Message } from 'teespace-core';
import 'antd/dist/antd.css';
import useNoteStore from '../../store/useStore';
import {
  TagChip,
  TagNewBtn,
  TagNewBtnIcon,
  TagList,
  TagInput,
  TagText,
} from '../../styles/tagStyle';
import { EditorTagCover } from '../../styles/tagStyle';
import tagImage from '../../assets/tag_add.svg';
import { Tooltip } from 'antd';
import AddTagForm from './AddTagForm'
import { isFilled, checkWhitespace } from '../common/validators';

const TagListContainer = () => {
  const { TagStore, PageStore } = useNoteStore();
  const [openModal, setOpenModal] = useState(false);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const focusedTag = useRef([]);
  const tagList = useRef(null);

  const handleCloseBtn = (targetId, targetText) => {
    if (targetId) {
      const curTag = TagStore.notetagList.filter(
        tag => tag.tag_id !== targetId,
      );
      TagStore.setNoteTagList(curTag);
      TagStore.appendRemoveTagList(targetId);
    } else {
      const exceptTag = TagStore.notetagList.filter(
        tag => tag.text !== targetText,
      );
      TagStore.setNoteTagList(exceptTag);
      TagStore.removeAddTagList(targetText);
    }
  };

  const toggleTagInput = () => {
    if (!TagStore.isNewTag && !PageStore.isReadMode()) TagStore.setIsNewTag(true);
    else TagStore.setIsNewTag(false);
  };

  const onClickNewTagBtn = () => {
    toggleTagInput();
    let target = tagList.current.children[0]
    if (target) target.scrollIntoView(false);
  }

  const handleFocus = (e) => e.target.select();

  const handleChangeTag = (text, index, id) => () => {
    TagStore.setCurrentTagData(id, text);
    TagStore.setEditTagValue(text);
    TagStore.setEditTagIndex(index);
  };
  const handleChangeName = e => {
    const {
      target: { value },
    } = e;
    TagStore.setEditTagValue(value);
  };

  const updateNoteTagList = () => {
    TagStore.notetagList[TagStore.editTagIndex].text = TagStore.editTagValue;
    TagStore.setUpdateNoteTagList(
      TagStore.currentTagId,
      TagStore.editTagValue
    );
  }

  const handleModifyInput = () => {
    if (TagStore.currentTagId) {
      // 수정하지 않았으면 그대로 return
      if (TagStore.currentTagValue === TagStore.editTagValue) { }
      // 대소문자만 바꾼 경우
      else if (TagStore.currentTagValue.toUpperCase() === TagStore.editTagValue.toUpperCase()) {
        updateNoteTagList();
      }
      // 공백만 있거나 아무것도 입력하지 않은 경우
      // Modal없이 modify 취소
      else if (!checkWhitespace(TagStore.editTagValue)) { }
      else {
        if (TagStore.isValidTag(TagStore.editTagValue)) {
          updateNoteTagList();
        } else {
          setOpenModal(true);
        }
      }
    } else { // 아이디 없는 애를 고칠 경우
      if (TagStore.currentTagValue === TagStore.editTagValue) { }
      // 대소문자만 바꾼 경우
      else if (TagStore.currentTagValue.toUpperCase() === TagStore.editTagValue.toUpperCase()) {
        TagStore.setEditCreateTag();
      }
      // 공백만 있거나 아무것도 입력하지 않은 경우
      // Modal없이 modify 취소
      else if (!checkWhitespace(TagStore.editTagValue)) { }
      else {
        if (TagStore.isValidTag(TagStore.editTagValue)) {
          TagStore.setEditCreateTag();
        } else {
          setOpenModal(true);
        }
      }
    }
    TagStore.setEditTagIndex(-1)
  };

  const handleModifyingKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        handleModifyInput();
        break;
      case "Escape":
        TagStore.setIsNewTag(false);
        break;
      default:
        break;
    }
  }

  const handleClickOutside = (e) => {
    if (!e.target.closest(".ant-tag")) {
      TagStore.setSelectTagIndex('')
    }
  }

  const handleClickTag = (idx, e) => {
    const prev = focusedTag.current;
    if (TagStore.selectTagIdx === idx) TagStore.setSelectTagIndex('');
    else changeFocusedTag(prev[idx], idx);
  }

  // idx : null 가능
  const changeFocusedTag = (target, idx) => {
    if (target === null && idx === null) return;
    if (idx === null) return;
    if (target) {
      TagStore.setSelectTagIndex(idx);
      target.focus();
      target.scrollIntoView(false);
    }
  }

  const handleKeyDownTag = (e) => {
    const prev = focusedTag.current;
    switch (e.keyCode) {
      // left
      case 37:
        if (TagStore.selectTagIdx > 0) {
          changeFocusedTag(prev[TagStore.selectTagIdx - 1], TagStore.selectTagIdx - 1);
        }
        break;
      // right
      case 39:
        if (TagStore.selectTagIdx < TagStore.notetagList.length - 1) {
          changeFocusedTag(prev[TagStore.selectTagIdx + 1], TagStore.selectTagIdx + 1);
        }
        break;
      default:
        break;
    }
  }

  const handleClickModalBtn = (e) => {
    e.stopPropagation();
    setOpenModal(false);
  }
  const handleTooltip = (e) => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth)
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  });

  return useObserver(() => (
    <>
      <EditorTagCover>
        <Message
          visible={openModal}
          title={"이미 있는 태그 이름입니다."}
          type="error"
          btns={[{
            type: 'solid',
            shape: 'round',
            text: '확인',
            onClick: handleClickModalBtn
          }]}
        />
        <Tooltip title={!PageStore.isReadMode() ? "태그 추가" : "읽기모드에서는 추가할 수 없습니다"}>
          <TagNewBtn>
            <TagNewBtnIcon src={tagImage} onClick={onClickNewTagBtn} />
          </TagNewBtn>
        </Tooltip>
        <AddTagForm
          show={TagStore.isNewTag}
          toggleTagInput={toggleTagInput}
          setOpenModal={setOpenModal}
        />
        <TagList ref={tagList}>
          {TagStore.notetagList.map((item, index) =>
            (TagStore.editTagIndex === index) ? (
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
                <TagChip
                  ref={el => focusedTag.current[index] = el}
                  key={index}
                  className={index === TagStore.selectTagIdx ? 'noteFocusedTag' : ''}
                  data-idx={index}
                  id={item.tag_id}
                  closable={PageStore.isReadMode() ? false : true}
                  tabIndex="0"
                  onClose={handleCloseBtn.bind(null, item.tag_id, item.text)}
                  onClick={handleClickTag.bind(null, index)}
                  onKeyDown={handleKeyDownTag.bind(null)}
                >

                  {!PageStore.isReadMode() ?
                    <Tooltip title={isEllipsisActive ? item.text : null}>
                      <TagText
                        onDoubleClick={handleChangeTag(item.text, index, item.tag_id)}
                        onMouseOver={handleTooltip}
                      >
                        {item.text}
                      </TagText>
                    </Tooltip>
                    :
                    <Tooltip title={isEllipsisActive ? item.text : null}>
                      <TagText onMouseOver={handleTooltip}>{item.text}
                      </TagText>
                    </Tooltip>
                  }
                </TagChip>
              )
          )}
        </TagList>
      </EditorTagCover>
    </>
  ));
};

export default TagListContainer;
