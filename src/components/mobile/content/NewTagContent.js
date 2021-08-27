import React, { useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import MainHeader from '../lnb/MainHeader';
import { Button, Input, useCoreStores } from 'teespace-core';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import NoteUtil from '../../../NoteUtil';
import { checkWhitespace, checkMaxLength } from '../../common/validators';
import { TagChip, TagInput, TagList, TagText } from '../../../styles/tagStyle';
import { Tooltip } from 'antd';

const NewTagContent = () => {
  const { ChapterStore, PageStore, EditorStore, TagStore, NoteStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const [value, setValue] = useState('');

  const { t } = useTranslation();

  const handleBackButtonClick = () => EditorStore.setIsTagEditPage(false);

  const handleChangeAddInput = e => setValue(checkMaxLength(e));

  const handleCancelBtn = () => setValue('');

  const handleMouseDown = e => e.preventDefault();

  const handleCloseBtn = targetId => () => {
    TagStore.deleteNoteTag([targetId], PageStore.currentPageId);
  };
  const handleTooltip = e => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth);
  };

  const handleAddTagKeyDown = e => {
    switch (e.key) {
      case 'Enter':
        handleAddTag();
        break;
      case 'Escape':
        setValue('');
        break;
      default:
        break;
    }
  };

  const handleAddTag = async e => {
    if (!checkWhitespace(value)) {
    } else if (TagStore.isValidTag(value)) {
      const result = await TagStore.createNoteTag([value], PageStore.currentPageId);
      setValue('');
      return;
    } else NoteStore.setModalInfo('duplicateTagName');

    setValue('');
  };

  return useObserver(() => (
    <>
      <MainHeader
        leftButtons={[{ type: 'icon', action: 'back', onClick: handleBackButtonClick }]}
        rightButtons={[{ type: 'text', text: '저장' }]}
      />
      <InputWrapper>
        <TagInput
          maxLength="50"
          placeholder="태그 입력"
          value={value}
          style={{ flex: '1 auto', marginRight: '0.5rem', borderRadius: '0px' }}
          onChange={handleChangeAddInput}
          onKeyDown={handleAddTagKeyDown}
          autoFocus={true}
        />
        <Button type="solid" onClick={handleAddTag}>
          추가
        </Button>
      </InputWrapper>
      <TagList style={{ display: 'block', width: 'fit-content', margin: '0 1rem' }}>
        {TagStore.notetagList.map((item, index) => (
          <TagChip
            key={item.tag_id}
            id={item.tag_id}
            closable={true}
            tabIndex="0"
            onClose={handleCloseBtn(item.tag_id)}
          >
            <Tooltip title={isEllipsisActive ? NoteUtil.decodeStr(item.text) : null}>
              <TagText onMouseOver={handleTooltip}>
                {NoteUtil.decodeStr(item.text)}
              </TagText>
            </Tooltip>
          </TagChip>
        ))}
      </TagList>
    </>
  ));
};

export default NewTagContent;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
`;
