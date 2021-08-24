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
import { Checkbox } from 'antd';
import LongPressable from 'react-longpressable';

const ListViewContainer = () => {
  const { ChapterStore, PageStore } = useNoteStore();
  const [isLongPress, setLongPress] = useState(false);

  const onShortPress = () => {}; // event prevent

  const onLongPress = () => {
    setLongPress(true);
  };

  useEffect(() => {
    return () => setLongPress(false);
  }, []);

  return useObserver(() => (
    <>
      <ListViewCover>
        <ListViewHeader />
        <LongPressable onShortPress={onShortPress} onLongPress={onLongPress}>
          {PageStore.pageList?.map((item, index) => {
            return (
              <PageItem
                key={item._data.id}
                page={item}
                index={index}
                isLongPress={isLongPress}
              />
            );
          })}
        </LongPressable>
        {PageStore.pageList.length === 0 && <NoContent isWeb={false} />}
      </ListViewCover>
    </>
  ));
};

export default ListViewContainer;
