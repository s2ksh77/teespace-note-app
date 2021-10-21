import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { Checkbox } from 'antd';
import LongPressable from 'react-longpressable';
import { useCoreStores } from 'teespace-core';
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
import { isNormalChapter, getI18nChapterTitle } from '../../../NoteUtil';
import MoveListViewContainer from './MoveListViewContainer';
import { LNBWrapper } from '../../../styles/lnbStyle';
import ChapterItem from '../lnb/ChapterItem';

const ListViewContainer = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { userStore } = useCoreStores();

  const onShortPress = () => {}; // event prevent

  const onLongPress = () => {
    NoteStore.setLongPress(true);
  };

  const handlePageCreate = async () => {
    try {
      PageStore.setCreatePageParent(ChapterStore.chapterInfo.id);
      await PageStore.createNotePage(false);
      NoteStore.setTargetLayout('Editor');
    } catch (e) {
      console.log(`Create Page Error ${e}`);
    }
  };

  const handlePageDelete = async () => {
    const editingUserIdList = [];
    const pageList = await Promise.all(
      [...PageStore.selectedPages].map(async ([id]) => {
        const {
          is_edit: editingUserId,
          parent_notebook: chapterId,
        } = await PageStore.getNoteInfoList(id);
        if (editingUserId) editingUserIdList.push(editingUserId);
        return { note_id: id, restoreChapterId: chapterId };
      }),
    );

    if (editingUserIdList.length === 1) {
      const { displayName } = await userStore.getProfile(editingUserIdList[0]);
      NoteStore.setModalInfo('nonDeletableSinglePage', { name: displayName }, false);
    } else if (editingUserIdList.length > 1) {
      NoteStore.setModalInfo(
        'nonDeletableMultiPage',
        { count: editingUserIdList.length },
        false,
      );
    } else {
      if (isNormalChapter(ChapterStore.chapterInfo.type)) {
        await PageStore.throwNotePage({ pageList });
        await ChapterStore.fetchChapterInfo(ChapterStore.chapterInfo.id);
        NoteStore.setLongPress(false);
        PageStore.selectedPages.clear();
        return;
      }

      if (pageList.length === ChapterStore.chapterInfo.pageList.length) {
        NoteStore.setModalInfo(
          'emptySharedPage',
          {
            chapterList: [{ id: ChapterStore.chapterInfo.id }],
            count: pageList.length,
          },
          false,
        );
      } else {
        NoteStore.setModalInfo('deleteSharedPage', { pageList }, false);
      }
    }
    NoteStore.setShowDialog(true);
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
              {
                type: 'icon',
                action: 'remove',
                onClick: handlePageDelete,
              },
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
            title={getI18nChapterTitle(
              ChapterStore.chapterInfo.type,
              ChapterStore.chapterInfo.title,
            )}
            rightButtons={[
              { type: 'icon', action: 'search' },
              { type: 'text', text: '🎅🏻' },
            ]}
          />
        )}
        <ListViewBody style={{ padding: '0.625rem 1rem' }}>
          <LongPressable onShortPress={onShortPress} onLongPress={onLongPress}>
            {ChapterStore.chapterInfo.pageList?.map((item, index) => {
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
          {ChapterStore.chapterInfo.pageList.length === 0 && <NoContent isWeb={false} />}
        </ListViewBody>
        <NewAddIcon
          id="newPage"
          onClick={handlePageCreate}
          display={
            isNormalChapter(ChapterStore.chapterInfo.type) && !NoteStore.isLongPress
              ? 'flex'
              : 'none'
          }
        />
      </ListViewWrapper>
    </>
  ));
};

export default ListViewContainer;
