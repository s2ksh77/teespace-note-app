import React, { useRef, useState } from 'react';
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
import { isFilled, checkWhitespace, checkMaxLength } from '../common/validators';
import NoteUtil from '../../NoteUtil';
import { logEvent, useCoreStores } from 'teespace-core';
import { useTranslation } from 'react-i18next';
/** 
 * notetagListisNewTag 제외 TagStore 변수 제거
 */
const TagListContainer = () => {
  const { NoteStore, TagStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const { t } = useTranslation();
  // 새로운 태그 만들 때
  const [value, setValue] = useState('');

  // editTagInfo = {id,pre,cur}
  // 바뀌지 않는 값을 useRef에 저장하려 했으나 id로 input창을 끄고 켜서 리렌더가 필요 => useState로 관리하는 것으로 변경
  const [editTagInfo, setEditTagInfo] = useState({});

  // 선택한 노드 저장
  const [selectedId, setSelectedId] = useState(null);
  const selectedTag = useRef(null); // node를 받음, 방향키로 이동 위해 필요

  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const tagListCover = useRef(null) // scroll 때문에 필요
  
  /**
   *   AddTagForm 관련
  */ 
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
  const handleChangeAddInput = e => setValue(checkMaxLength(e));
  
  const handleBlurAddInput = () => {
    if (!checkWhitespace(value)) {};
    if (TagStore.isValidTag(value)) TagStore.createNoteTag([value], PageStore.currentPageId);
    else NoteStore.setModalInfo('duplicateTagName');
    // input창 초기화
    TagStore.setIsNewTag(false);
    setValue("");
  };  

  const handleAddTagKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        handleBlurAddInput();
        break;
      case "Escape":
        toggleTagInput();
        setValue("");
        break;
      default:
        break;
    }
  }
  /**
   *   edit tag 관련
  */  
  const handleChangeModifyInput = e => {
    let updated = checkMaxLength(e); // setState가 비동기라 해당 콜백 안에서는 e가 nullified
    setEditTagInfo((prev)=>({
      ...prev,
      cur:updated,
    }));
  }

  const updateNoteTagList = () => {
    TagStore.updateNoteTag([{
      tag_id: editTagInfo.id,
      text:editTagInfo.cur
    }], PageStore.currentPageId);
  }

  const handleBlurModify = () => {
    if (!editTagInfo.id || !editTagInfo.pre) {setEditTagInfo({}); return;}
    const isSame = NoteUtil.isSameStr(editTagInfo.pre, editTagInfo.cur);
    const isSameIgnoringCase = NoteUtil.isSameStr(editTagInfo.pre.toUpperCase(), editTagInfo.cur.toUpperCase());
    // 공백만 있거나 아무것도 입력하지 않은 경우
    // Modal없이 modify 취소
    if (!checkWhitespace(editTagInfo.cur) || !editTagInfo.id || isSame) {}
    // 대소문자만 바꾼 경우
    if (isSameIgnoringCase || TagStore.isValidTag(editTagInfo.cur)) updateNoteTagList();
    else NoteStore.setModalInfo('duplicateTagName');
    setEditTagInfo({});
  };
  
  const handleModifyKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        handleBlurModify();
        break;
      case "Escape":
        setEditTagInfo({});
        break;
      default:
        break;
    }
  }

  /**
   *   Tag Chip 관련 메서드
  */
  const handleCloseBtn = (targetId) => () => {
    TagStore.deleteNoteTag([targetId], PageStore.currentPageId);
  };

  const handleDbClick = (id,pre) => () => {
    setEditTagInfo({id,pre,cur:pre});
  };

  const handleBlurTagChip = (id) => (e) => {
    // 다른 태그가 선택돼서 blur되는 경우
    if (e.relatedTarget && tagListCover.current.contains(e.relatedTarget)) return;
    if (selectedId === id) setSelectedId(null);
  }

  const unselectTag = () => {
    selectedTag.current = null;
    setSelectedId(null);
  }
  
  const selectTag = (node) => {
    setSelectedId(node.id);
    selectedTag.current = node;
    selectedTag.current?.focus();
    selectedTag.current?.scrollIntoView(false);
  }

  // tagList.current에 idx 키에 element가 있다
  const handleClickTag = (id) => e => {
    if (selectedId === id) {unselectTag();return}
    selectTag(e.currentTarget);
    logEvent('note', 'clickTagBtn');
  }

  const handleTagChipKeyDown = (e) => {
    switch (e.keyCode) {
      // left
      case 37:
        if (selectedTag.current?.previousElementSibling) {
          selectTag(selectedTag.current.previousElementSibling);
        }
        break;
      // right
      case 39:
        if (selectedTag.current?.nextElementSibling) {
          selectTag(selectedTag.current.nextElementSibling);
        }
        break;
      default:
        break;
    }
  }
  /**
   *   Tooltip 관련 메서드
  */
  const handleTooltip = (e) => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth)
  }

  return useObserver(() => (
    <>
      <EditorTagCover>
        {authStore.hasPermission('notePage', 'U') && <Tooltip title={!PageStore.isReadMode() ? t('NOTE_ADD_TAGS_01') : t('NOTE_ADD_TAGS_02')}>
          <TagNewBtn>
            <TagNewBtnIcon src={tagImage} onClick={onClickNewTagBtn} />
          </TagNewBtn>
        </Tooltip>}
        {TagStore.isNewTag && <TagInput
          maxLength="50"
          value={value}
          onChange={handleChangeAddInput}
          onBlur={handleBlurAddInput}
          onKeyDown={handleAddTagKeyDown}
          autoFocus={true}
        />}
        <TagList ref={tagListCover}>
          {TagStore.notetagList.map((item, index) =>
            // note_id, tag_id, text
            (editTagInfo.id === item.tag_id) ? (
              <TagInput
                key={item}
                maxLength="50"
                value={editTagInfo.cur}
                onChange={handleChangeModifyInput}
                onBlur={handleBlurModify}
                onKeyDown={handleModifyKeyDown}
                autoFocus={true}
              />
            ) : (
                <TagChip
                  key={item.tag_id}
                  className={item.tag_id === selectedId ? 'noteFocusedTag' : ''}
                  data-idx={index} // 없어져도 되나?
                  id={item.tag_id}
                  closable={
                    PageStore.isReadMode() || !authStore.hasPermission('notePage', 'U')
                      ? false
                      : true
                  }
                  tabIndex="0"
                  onClose={handleCloseBtn(item.tag_id)}
                  onClick={handleClickTag(item.tag_id)}
                  onKeyDown={handleTagChipKeyDown}
                  onBlur={handleBlurTagChip(item.tag_id)}
                >
                  <Tooltip title={isEllipsisActive ? NoteUtil.decodeStr(item.text) : null}>
                    <TagText
                      onDoubleClick={
                        !PageStore.isReadMode() && authStore.hasPermission('notePage', 'U')
                          ? handleDbClick(item.tag_id,item.text)
                          : null
                      }
                      onMouseOver={handleTooltip}
                    >
                      {NoteUtil.decodeStr(item.text)}
                    </TagText>
                  </Tooltip>
                </TagChip>
              )
          )}
        </TagList>
      </EditorTagCover>
    </>
  ));
};

export default TagListContainer;