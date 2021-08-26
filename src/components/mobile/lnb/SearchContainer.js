import React, { useEffect, useRef, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../../store/useStore';

import { LNBBody as SearchBody } from '../styles/lnbStyles';
import SearchHeader from './SearchHeader';

const SearchContainer = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();

  const handleCancelBtn = e => {};

  const handleSearchBtn = () => {};

  return useObserver(() => (
    <>
      <SearchHeader />
      <SearchBody>랄랄</SearchBody>
    </>
  ));
};
export default React.memo(SearchContainer);
