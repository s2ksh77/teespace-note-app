import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import ContentHeader from './ContentHeader';

const NoContent = ({ type }) => {
  const { NoteStore } = useNoteStore();

  const handleBackBtnClick = () => {
    // 임시 로직
    NoteStore.setTargetLayout('lnb');
  };

  return useObserver(() => (
    <ContentHeader handleBackBtnClick={handleBackBtnClick}>
      <span style={{ width: '100%' }} />
    </ContentHeader>
  ));
};

export default NoContent;
