import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { Checkbox } from 'antd';
import LongPressable from 'react-longpressable';
import useNoteStore from '../../../store/useStore';

import {
  ListViewWrapper,
  CheckBoxContainer,
  PageItemContainer,
} from '../styles/listviewStyles';
import { LNBBody as ListViewBody } from '../styles/lnbStyles';
import ListViewHeader from '../lnb/MainHeader';
import PageItem from './PageItem';
import NoContent from '../../page/NoContent';

const ListViewContainer = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const [isLongPress, setLongPress] = useState(false);

  const onShortPress = () => {}; // event prevent

  const onLongPress = () => {
    setLongPress(true);
  };

  useEffect(() => {
    return () => setLongPress(false);
  }, []);

  return useObserver(() => (
    <ListViewWrapper>
      <ListViewHeader
        leftButtons={[
          {
            type: 'icon',
            action: 'back',
            onClick: () => NoteStore.setTargetLayout('LNB'),
          },
        ]}
        title={ChapterStore.chapterName}
        rightButtons={[
          { type: 'icon', action: 'search' },
          { type: 'text', text: '🎅🏻' },
        ]}
      />
      <ListViewBody>
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
      </ListViewBody>
    </ListViewWrapper>
  ));
};

export default ListViewContainer;
