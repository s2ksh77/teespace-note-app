import React from 'react';
import useNoteStore from '../../store/useStore';
import noPageImage from '../../assets/no_contents.svg';
import {
  NoneContainer,
  NoneTitle,
  NoneText,
  NoneImg
} from '../../styles/commonStyle';

// 페이지가 존재하지 않습니다
const TagNotFound = () => {
  const { NoteStore } = useNoteStore();

  return (
    <>
      <NoneContainer>
        <NoneTitle>{NoteStore.getI18n('noTagFound')}</NoneTitle>
        <NoneText>{NoteStore.getI18n('notag')}</NoneText>
        <NoneImg src={noPageImage} alt="tag_not_found" />
      </NoneContainer>
    </>
  );
};

export default TagNotFound;