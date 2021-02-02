import React, { useRef, useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
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
import tagImage from '../../assets/add_tag.svg';
import { Tooltip } from 'antd';
import AddTagForm from './AddTagForm'
import { isFilled, checkWhitespace } from '../common/validators';
import NoteUtil from '../../NoteUtil';

const TagListContainer = () => {
  const { NoteStore, TagStore, PageStore } = useNoteStore();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const tagList = useRef([]); // 모든 노트 태그 리스트 담을 것
  const tagListCover = useRef(null) // scroll 때문에 필요

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

  // AddTagForm 보여줄지말지
  const toggleTagInput = () => {
    if (PageStore.isReadMode()) return; // early return으로 바꾸기
    if (!TagStore.isNewTag) TagStore.setIsNewTag(true);
    else TagStore.setIsNewTag(false);
  };

  const onClickNewTagBtn = () => {
    toggleTagInput();
    tagListCover.current.scrollTo({ left: 0, behavior: 'smooth' });
  }

  const handleFocus = (e) => e.target.select();

  const handleChangeTag = (text, index, id) => () => {
    TagStore.setCurrentTagData(id, text);
    TagStore.setEditTagValue(text);
    TagStore.setEditTagIndex(index); // input창을 보여줄지 말지
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
    const isSame = NoteUtil.isSameStr(TagStore.currentTagValue, TagStore.editTagValue);
    const isSameIgnoringCase = NoteUtil.isSameStr(TagStore.currentTagValue.toUpperCase(), TagStore.editTagValue.toUpperCase());

    if (TagStore.currentTagId) {
      // 수정하지 않았으면 그대로 return
      if (isSame) { }
      // 대소문자만 바꾼 경우
      else if (isSameIgnoringCase) {
        updateNoteTagList();
      }
      // 공백만 있거나 아무것도 입력하지 않은 경우
      // Modal없이 modify 취소
      else if (!checkWhitespace(TagStore.editTagValue)) { }
      else {
        if (TagStore.isValidTag(TagStore.editTagValue)) {
          updateNoteTagList();
        } else {          
          NoteStore.setModalInfo('duplicateTagName');
        }
      }
    } else { // 아이디 없는 애를 고칠 경우
      if (isSame) { }
      // 대소문자만 바꾼 경우
      else if (isSameIgnoringCase) {
        TagStore.setEditCreateTag();
      }
      // 공백만 있거나 아무것도 입력하지 않은 경우
      // Modal없이 modify 취소
      else if (!checkWhitespace(TagStore.editTagValue)) { }
      else {
        if (TagStore.isValidTag(TagStore.editTagValue)) {
          TagStore.setEditCreateTag();
        } else {          
          NoteStore.setModalInfo('duplicateTagName');
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
        TagStore.setIsNewTag(false); // todo : 필요한건지 체크
        TagStore.setCurrentTagData("", "");
        TagStore.setEditTagValue("");
        TagStore.setEditTagIndex(""); // input 태그 보여줄지 tagchip 보여줄지 결정
        break;
      default:
        break;
    }
  }

  const handleTagChipBlur = (index) => (e) => {
    // 선택된게 blur된 경우 풀어주기
    if (TagStore.selectTagIdx === index) TagStore.setSelectTagIndex('');
  }

  // tagList.current에 idx 키에 element가 있다
  const handleClickTag = (idx, e) => {
    if (TagStore.selectTagIdx === idx) TagStore.setSelectTagIndex('');
    else changeFocusedTag(tagList.current[idx], idx);
  }

  // 다른 곳에서도 필요해서 handleClickTag랑 분리한듯
  // idx : null 가능
  const changeFocusedTag = (target, idx) => {
    if (!isFilled(idx) || !isFilled(target)) return;
    TagStore.setSelectTagIndex(idx);
    target.focus();
    target.scrollIntoView(false);
  }

  const handleKeyDownTag = (e) => {
    switch (e.keyCode) {
      // left
      case 37:
        if (TagStore.selectTagIdx > 0) {
          changeFocusedTag(tagList.current[TagStore.selectTagIdx - 1], TagStore.selectTagIdx - 1);
        }
        break;
      // right
      case 39:
        if (TagStore.selectTagIdx < TagStore.notetagList.length - 1) {
          changeFocusedTag(tagList.current[TagStore.selectTagIdx + 1], TagStore.selectTagIdx + 1);
        }
        break;
      default:
        break;
    }
  }

  const handleTooltip = (e) => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth)
  }

  return useObserver(() => (
    <>
      <EditorTagCover>
        <Tooltip title={!PageStore.isReadMode() ? "태그 추가" : "읽기모드에서는 추가할 수 없습니다"}>
          <TagNewBtn>
            <TagNewBtnIcon src={tagImage} onClick={onClickNewTagBtn} />
          </TagNewBtn>
        </Tooltip>
        <AddTagForm
          show={TagStore.isNewTag}
          toggleTagInput={toggleTagInput}
        />
        <TagList ref={tagListCover}>
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
                  ref={el => tagList.current[index] = el}
                  key={index}
                  className={index === TagStore.selectTagIdx ? 'noteFocusedTag' : ''}
                  data-idx={index}
                  id={item.tag_id}
                  closable={PageStore.isReadMode() ? false : true}
                  tabIndex="0"
                  onClose={handleCloseBtn.bind(null, item.tag_id, item.text)}
                  onClick={handleClickTag.bind(null, index)}
                  onKeyDown={handleKeyDownTag.bind(null)}
                  onBlur={handleTagChipBlur(index)}
                >

                  {!PageStore.isReadMode() ?
                    <Tooltip title={isEllipsisActive ? NoteUtil.decodeStr(item.text) : null}>
                      <TagText
                        onDoubleClick={handleChangeTag(item.text, index, item.tag_id)}
                        onMouseOver={handleTooltip}
                      >
                        {NoteUtil.decodeStr(item.text)}
                      </TagText>
                    </Tooltip>
                    :
                    <Tooltip title={isEllipsisActive ? NoteUtil.decodeStr(item.text) : null}>
                      <TagText onMouseOver={handleTooltip}>{NoteUtil.decodeStr(item.text)}
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