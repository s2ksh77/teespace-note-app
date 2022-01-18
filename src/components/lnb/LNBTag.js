import React, { memo, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';

import { LnbTagContainer, TagTxt } from '../../styles/tagStyle';
import { TagIcon } from '../icons';

const LNBTag = memo(({ flexOrder }) => {
  const { NoteStore, PageStore, ChapterStore } = useNoteStore();
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

  const onClickTagMenuBtn = () => {
    if (!PageStore.isReadMode()) return;
    NoteStore.setShowPage(false);
    if (NoteStore.layoutState === 'collapse') {
      NoteStore.setTargetLayout('Content');
    }
    ChapterStore.setDragData(new Map());
    ChapterStore.setIsCtrlKeyDown(false);
  };

  return useObserver(() => (
    <LnbTagContainer
      className={!NoteStore.showPage ? 'selectedMenu' : ''}
      order={flexOrder}
      onClick={onClickTagMenuBtn}
    >
      <TagIcon color={themeContext.SubStateVivid} />
      <TagTxt>{t('NOTE_PAGE_LIST_CMPNT_DEF_06')}</TagTxt>
    </LnbTagContainer>
  ));
});

export default React.memo(LNBTag);
