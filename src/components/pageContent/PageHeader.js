import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import {
  EditButton,
  AutoSaveMessage,
  EditingImage,
  ModifiedUser,
  ModifiedTime,
  SearchIcon,
} from '../../styles/HeaderStyle';
import { PageTitle } from '../../styles/PageStyle';
import LayoutStateButton from '../common/LayoutStateButton';

const PageHeader = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      <EditButton />
      <PageTitle />
      <AutoSaveMessage />
      <EditingImage />
      <ModifiedUser />
      <ModifiedTime />
      <SearchIcon />
      <LayoutStateButton />
    </>
  ));
};

export default PageHeader;
