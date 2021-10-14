import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useCoreStores, EventBus } from 'teespace-core';
import LongPressable from 'react-longpressable';
import useNoteStore from '../../../store/useStore';

import { LNBWrapper } from '../../../styles/lnbStyle';
import LNBHeader from './MainHeader';
import LongPressHeader from './MainHeader';
import { LNBBody } from '../styles/lnbStyles';
import ChapterItem from './ChapterItem';
import LNBTag from './LNBTag';
import RecycleBin from './RecycleBin';
import NoteUtil from '../../../NoteUtil';
import { NewAddIcon } from '../../icons';

const LNBContainer = () => {
  const { ChapterStore, NoteStore } = useNoteStore();
  const { userStore } = useCoreStores();
  const { t } = useTranslation();

  useEffect(() => {
    NoteStore.setTargetLayout('LNB');
  });

  const onShortPress = () => {}; // event prevent

  const onLongPress = () => {
    NoteStore.setLongPress(true);
  };

  const handleChapterCreate = () => {
    NoteStore.setShowDialog(true);
    NoteStore.setModalInfo('createChapter', _, false);
  };

  const handleEditChapter = () => {
    if (ChapterStore.selectedChapters.size === 0) return;
    const id = [...ChapterStore.selectedChapters][0][0];
    const { text, color } = [...ChapterStore.selectedChapters][0][1];

    ChapterStore.setChapterTitle(text);
    NoteStore.setModalInfo('renameChapter', { id, color }, false);
    NoteStore.setShowDialog(true);
  };

  const getEditingPageList = async chapterId => {
    const { noteList } = await ChapterStore.getChapterChildren(chapterId);
    return noteList.filter(page => page.is_edit);
  };

  const handleChapterDelete = async () => {
    const editingPageList = [];
    const chapterList = await Promise.all(
      [...ChapterStore.selectedChapters].map(async ([, chapter]) => {
        editingPageList.push(...(await getEditingPageList(chapter.id)));
        return { id: chapter.id };
      }),
    );

    if (editingPageList.length === 1) {
      const { displayName } = await userStore.getProfile(editingPageList[0].is_edit);
      NoteStore.setModalInfo('nonDeletableSinglePage', { name: displayName }, false);
    } else if (editingPageList.length > 1) {
      NoteStore.setModalInfo(
        'nonDeletableMultiPage',
        { count: editingPageList.length },
        false,
      );
    } else {
      NoteStore.setModalInfo('deleteChapter', { chapterList }, false);
    }

    NoteStore.setShowDialog(true);
  };

  return useObserver(() => (
    <LNBWrapper>
      {NoteStore.isLongPress ? (
        <LongPressHeader
          leftButtons={[
            {
              type: 'icon',
              action: 'close',
              onClick: () => {
                NoteStore.setLongPress(false);
                ChapterStore.selectedChapters.clear();
              },
            },
          ]}
          title={`${ChapterStore.selectedChapters.size} 개 선택됨`}
          rightButtons={[
            {
              type: 'icon',
              action: 'edit',
              onClick: ChapterStore.selectedChapters.size > 1 ? null : handleEditChapter,
              disabled: ChapterStore.selectedChapters.size > 1,
            },
            {
              type: 'icon',
              action: 'remove',
              onClick: handleChapterDelete,
              disabled: !ChapterStore.selectedChapters.size,
            },
            { type: 'icon', action: 'share' },
          ]}
          isLongPress={NoteStore.isLongPress}
        />
      ) : (
        <LNBHeader
          leftButtons={[
            {
              type: 'icon',
              action: 'close',
              onClick: () => EventBus.dispatch('onLayoutClose'),
            },
          ]}
          title={t('NOTE_META_TAG_01')}
          rightButtons={[
            {
              type: 'icon',
              action: 'search',
              onClick: () => NoteStore.setTargetLayout('Search'),
            },
            { type: 'text', text: '🎅🏻' },
          ]}
        />
      )}
      <LNBBody>
        <LongPressable onShortPress={onShortPress} onLongPress={onLongPress}>
          {ChapterStore.chapterList.map((item, index) => {
            switch (NoteUtil.getChapterNumType(item.type)) {
              case 0:
              case 1: // default, NOTEBOOK
                return (
                  <ChapterItem key={item.id} chapter={item} index={index} flexOrder={1} />
                );
              case 2: // SHARED_PAGE
                if (item.children.length > 0)
                  return (
                    <ChapterItem
                      key={item.id}
                      chapter={item}
                      index={index}
                      flexOrder={2}
                    />
                  );
                break;
              case 3:
                return (
                  <ChapterItem
                    key={item.id}
                    chapter={item}
                    index={index}
                    flexOrder={2}
                    isShared
                  />
                );
              case 4:
                return (
                  <RecycleBin key={item.id} chapter={item} index={index} flexOrder={3} />
                );
              default:
                break;
            }
          })}
        </LongPressable>
        <LNBTag flexOrder={4} />
      </LNBBody>
      <NewAddIcon id="newChapter" onClick={handleChapterCreate} />
    </LNBWrapper>
  ));
};

export default LNBContainer;
