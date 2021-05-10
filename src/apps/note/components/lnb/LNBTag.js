import React, { memo } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../store/useStore';
import tagImg from '../../assets/add_tag.svg';
import { LnbTagContainer, TagImg, TagTxt } from '../../styles/tagStyle';

const LNBTag = memo(({ flexOrder }) => {
  const { NoteStore, PageStore } = useNoteStore();
  const { t } = useTranslation();

  const onClickTagMenuBtn = () => {
    if (!PageStore.isReadMode()) return;
    NoteStore.setShowPage(false);
    if (NoteStore.layoutState === 'collapse') {
      NoteStore.setTargetLayout('Content');
    }
  };

  return useObserver(() => (
    <>
      <LnbTagContainer
        className={!NoteStore.showPage ? 'selectedMenu' : ''}
        order={flexOrder}
        onClick={onClickTagMenuBtn}
      >
        <TagImg showTag={!NoteStore.showPage} src={tagImg} alt="tagImg" />
        <TagTxt>{t('NOTE_PAGE_LIST_CMPNT_DEF_06')}</TagTxt>
      </LnbTagContainer>
    </>
  ));
});

export default LNBTag;
