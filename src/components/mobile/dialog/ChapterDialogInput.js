import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChapterInput } from '../../../styles/chpaterStyle';
import { checkMaxLength } from '../../common/validators';
import useNoteStore from '../../../store/useStore';
import { useTranslation } from 'react-i18next';
import { useObserver } from 'mobx-react-lite';

const StyledChapterInput = styled(ChapterInput)`
  border: 1px solid #d0ccc7 !important;
  height: 1.875rem;
  border-radius: 4px;
  padding-left: 1rem;
  margin: 1rem 0 0 0;
`;

const ChapterDialogInput = ({ type }) => {
  const { ChapterStore } = useNoteStore();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const isCreate = type === 'createChapter';
  const handleTitleInput = e => ChapterStore.setChapterTitle(checkMaxLength(e));

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 1);
  }, []);

  return useObserver(() => (
    <>
      <StyledChapterInput
        ref={inputRef}
        placeholder={isCreate ? t('NOTE_PAGE_LIST_CMPNT_DEF_01') : ''}
        maxLength="200"
        value={ChapterStore.chapterNewTitle}
        onChange={handleTitleInput}
      />
    </>
  ));
};

export default ChapterDialogInput;
