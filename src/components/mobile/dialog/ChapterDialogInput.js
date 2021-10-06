import React from 'react';
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

  const handleTitleInput = e => ChapterStore.setChapterTitle(checkMaxLength(e));
  const isCreate = type === 'createChapter';

  return useObserver(() => (
    <>
      <StyledChapterInput
        placeholder={isCreate ? t('NOTE_PAGE_LIST_CMPNT_DEF_01') : ''}
        maxLength="200"
        value={isCreate ? ChapterStore.chapterNewTitle : ChapterStore.chapterName}
        onChange={handleTitleInput}
      />
    </>
  ));
};

export default ChapterDialogInput;
