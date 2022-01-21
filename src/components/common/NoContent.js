import React from 'react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../store/useStore';

import {
  ContentBodyWrapper,
  NoneTitle as Title,
  NoneSubtitle as Subtitle,
  NoneImage as Image,
} from '../../styles/commonStyle';
import noFileImage from '../../assets/no_contents.svg';
import noResultImage from '../../assets/no_result.svg';
import searchingImage from '../../assets/search_loading.svg';
import ContentHeader from './ContentHeader';

const NoContent = ({ header, content, value }) => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { t } = useTranslation();

  const title = (() => {
    switch (content) {
      case 'chapter':
        return t('NOTE_PAGE_LIST_NO_CHPT_01');
      case 'page':
        return t('NOTE_PAGE_LIST_NO_PGE_IN_CHPT_01');
      case 'tag':
        return t('NOTE_TAG_NO_CONTENTS_01');
      case 'search':
        return `'${value}'`;
      case 'searching':
        return t('NOTE_EDIT_PAGE_SEARCH_02');
      case 'recycle':
        return t('NOTE_PAGE_LIST_NO_PGE_IN_CHPT_01');
      default:
        return '';
    }
  })();

  const subtitle = (() => {
    switch (content) {
      case 'chapter':
        return t('NOTE_PAGE_LIST_NO_CHPT_02');
      case 'page':
        return t('NOTE_PAGE_LIST_NO_PGE_IN_CHPT_02');
      case 'tag':
        return t('NOTE_TAG_NO_CONTENTS_02');
      case 'search':
        return t('NOTE_EDIT_PAGE_SEARCH_01');
      default:
        return '';
    }
  })();

  const imageSrc = (() => {
    switch (content) {
      case 'search':
        return noResultImage;
      case 'searching':
        return searchingImage;
      default:
        return noFileImage;
    }
  })();

  return (
    <>
      {header && (
        <ContentHeader
          handleBackBtn={() => {
            ChapterStore.getNoteChapterList();
            NoteStore.setTargetLayout('LNB');
          }}
        />
      )}
      <ContentBodyWrapper style={{ justifyContent: 'center' }}>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <Image src={imageSrc} />
      </ContentBodyWrapper>
    </>
  );
};

export default NoContent;
