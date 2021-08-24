import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import ListViewHeader from './ListViewHeader';
import {
  CheckBoxContainer,
  ListViewCover,
  PageItemContainer,
} from '../styles/listviewStyles';
import PageItem from './PageItem';
import NoContent from '../../page/NoContent';
import { Checkbox } from 'teespace-core';

const ListViewContainer = () => {
  const { ChapterStore, PageStore } = useNoteStore();
  const [isLongPress, setLongPress] = useState(false);

  return useObserver(() => (
    <>
      <ListViewCover>
        <ListViewHeader />
        {PageStore.pageList?.map((item, index) => {
          return (
            <PageItemContainer>
              {isLongPress && (
                <CheckBoxContainer>
                  <Checkbox />
                </CheckBoxContainer>
              )}
              <PageItem key={item._data.id} page={item} index={index} />
            </PageItemContainer>
          );
        })}
        {PageStore.pageList.length === 0 && <NoContent isWeb={false} />}
      </ListViewCover>
    </>
  ));
};

export default ListViewContainer;
