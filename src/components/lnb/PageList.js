import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import PageItem from './PageItem';
import { NewPageButton, NewPageText } from '../../styles/PageStyle';

const PageList = ({ chapter }) => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <>
      {chapter.children.map((item, index) => (
        <PageItem />
      ))}
      <NewPageButton>
        <NewPageText />
      </NewPageButton>
    </>
  ));
};

export default PageList;
