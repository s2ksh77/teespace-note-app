import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { Checkbox } from 'antd';
import LongPressable from 'react-longpressable';
import useNoteStore from '../../../store/useStore';

import {
  ListViewWrapper,
  CheckBoxContainer,
  PageItemContainer,
} from '../styles/listviewStyles';
import { LNBBody as ListViewBody, LNBBody } from '../styles/lnbStyles';
import LNBHeader from '../lnb/MainHeader';
import ListViewHeader from '../lnb/MainHeader';
import LongPressHeader from '../lnb/MainHeader';
import PageItem from './PageItem';
import NoContent from '../../page/NoContent';
import { NewAddIcon } from '../../icons';
import NoteUtil from '../../../NoteUtil';
import MoveListViewContainer from './MoveListViewContainer';
import { LNBWrapper } from '../../../styles/lnbStyle';
import ChapterItem from '../lnb/ChapterItem';

const ListViewContainer = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { getChapterNumType } = NoteUtil;

  const onShortPress = () => {}; // event prevent

  const onLongPress = () => {
    NoteStore.setLongPress(true);
  };

  useEffect(() => {
    return () => NoteStore.setLongPress(false);
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
    <>
      {PageStore.isMove ? <MoveListViewContainer /> : null}
      <ListViewWrapper style={{ position: 'relative' }}>
        {NoteStore.isLongPress ? (
          <LongPressHeader
            leftButtons={[
              {
                type: 'icon',
                action: 'close',
                onClick: () => {
                  NoteStore.setLongPress(false);
                  PageStore.selectedPages.clear();
                },
              },
            ]}
            title={`${PageStore.selectedPages.size} 개 선택됨`}
            rightButtons={[
              {
                type: 'icon',
                action: 'move',
                onClick: () => {
                  PageStore.setIsMove(true);
                },
              },
              { type: 'icon', action: 'remove' },
              { type: 'icon', action: 'share' },
            ]}
            isLongPress={NoteStore.isLongPress}
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
                  isLongPress={NoteStore.isLongPress}
                />
              );
            })}
          </LongPressable>
          {PageStore.pageList.length === 0 && <NoContent isWeb={false} />}
        </ListViewBody>
        <NewAddIcon
          id="newPage"
          onClick={handlePageCreate}
          display={
            getChapterNumType(ChapterStore.chapterType) <= 1 && !NoteStore.isLongPress
              ? 'flex'
              : 'none'
          }
        />
      </ListViewWrapper>
    </>
  ));
};

export default ListViewContainer;
