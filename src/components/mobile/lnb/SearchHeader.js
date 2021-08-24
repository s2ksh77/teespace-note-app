import React, { useEffect, useRef, useContext } from 'react';
import useNoteStore from '../../../store/useStore';
import { useCoreStores } from 'teespace-core';
import { SearchIcon, CloseIcon, TrashIcon } from '../../icons';
import { HeaderTitle, MainHeader } from '../styles/lnbStyles';
import { useObserver } from 'mobx-react';
import { ButtonDiv } from '../../../styles/commonStyle';
import { useTranslation } from 'react-i18next';

const SearchHeader = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();

  const handleCancelBtn = e => {};

  const handleSearchBtn = () => {};

  return useObserver(() => (
    <>
      <div style={{ width: '100%', height: '2.875rem' }}>Search Header 다~~~</div>
    </>
  ));
};
export default React.memo(SearchHeader);
