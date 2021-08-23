import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import ListViewHeader from './ListViewHeader';
import { ListViewCover } from '../styles/listviewStyles';
import PageItem from './PageItem';
import NoContent from '../../page/NoContent';

const ListViewContainer = () => {
  const { ChapterStore, PageStore } = useNoteStore();

  return useObserver(() => (
    <>
      <ListViewCover>
        <ListViewHeader />
        {PageStore.pageList?.map((item, index) => {
          return <PageItem key={item._data.id} page={item} index={index} />;
        })}
        {PageStore.pageList.length === 0 && <NoContent isWeb={false} />}
      </ListViewCover>
    </>
  ));
};

export default ListViewContainer;
