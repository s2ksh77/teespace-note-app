import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';
import PageItem from './PageItem';
import { NewPageButton, NewPageText } from '../../styles/PageStyle';

const PageList = ({ page }) => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      {page.map((item, index) => (
        <PageItem key={item.id} page={item} />
      ))}
      <NewPageButton>
        <NewPageText>+ 새 페이지 추가</NewPageText>
      </NewPageButton>
    </>
  ));
};

export default PageList;
