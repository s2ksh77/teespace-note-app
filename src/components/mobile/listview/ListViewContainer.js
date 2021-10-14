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
import LongPressHeader from '../lnb/MainHeader';
import PageItem from './PageItem';
import NoContent from '../../page/NoContent';
import { NewAddIcon } from '../../icons';
import NoteUtil from '../../../NoteUtil';

const ListViewContainer = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const [isLongPress, setLongPress] = useState(false);
  const { getChapterNumType } = NoteUtil;

  const onShortPress = () => {}; // event prevent

  const onLongPress = () => {
    setLongPress(true);
  };

  useEffect(() => {
    return () => setLongPress(false);
  }, []);

  const handlePageCreate = async () => {
    try {
      PageStore.setCreatePageParent(ChapterStore.currentChapterId);
      await PageStore.createNotePage(false);
      NoteStore.setTargetLayout('Editor');
    } catch (e) {
      console.log(`Create Page Error ${e}`);
    }
  };

  return useObserver(() => (
    <ListViewWrapper>
      {isLongPress ? (
        <LongPressHeader
          leftButtons={[
            {
              type: 'icon',
              action: 'close',
              onClick: () => {
                setLongPress(false);
                PageStore.selectedPages.clear();
              },
            },
          ]}
          title={`${PageStore.selectedPages.size} 개 선택됨`}
          rightButtons={[
            { type: 'icon', action: 'search' },
            { type: 'icon', action: 'remove' },
            { type: 'icon', action: 'share' },
          ]}
          isLongPress={isLongPress}
        />
      ) : (
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
      )}
      <ListViewBody style={{ padding: '0.625rem 1rem' }}>
        <LongPressable onShortPress={onShortPress} onLongPress={onLongPress}>
          {PageStore.pageList?.map((item, index) => {
            return (
              <PageItem
                key={item.id}
                page={item}
                index={index}
                isLongPress={isLongPress}
              />
            );
          })}
        </LongPressable>
        {PageStore.pageList.length === 0 && <NoContent isWeb={false} />}
      </ListViewBody>
      <NewAddIcon
        id="newPage"
        onClick={handlePageCreate}
        display={getChapterNumType(ChapterStore.chapterType) <= 1 ? 'flex' : 'none'}
      />
    </ListViewWrapper>
  ));
};

export default ListViewContainer;
