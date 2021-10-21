import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { useCoreStores, EventBus } from 'teespace-core';
import LongPressable from 'react-longpressable';
import useNoteStore from '../../../store/useStore';

import { LNBWrapper as MoveWrapper } from '../../../styles/lnbStyle';
import MoveHeader from '../lnb/MainHeader';
import { LNBBody as MoveBody } from '../styles/lnbStyles';
import ChapterItem from '../lnb/ChapterItem';
import NoteUtil from '../../../NoteUtil';

const MoveListViewContainer = () => {
  const { ChapterStore, NoteStore, PageStore } = useNoteStore();
  const { userStore } = useCoreStores();
  const { t } = useTranslation();

  const onShortPress = () => {}; // event prevent

  const onLongPress = () => {
    NoteStore.setLongPress(true);
  };

  const initialMoveData = () => {
    PageStore.selectedPages.clear();
    ChapterStore.selectedChapters.clear();
    NoteStore.setLongPress(false);
    PageStore.setIsMove(false);
  };

  const handlePageMove = async () => {
    try {
      const chapterId = [...ChapterStore.selectedChapters][0][0];
      if (chapterId === ChapterStore.chapterInfo.id) {
        initialMoveData();
        return;
      }

      const target = Array.from(PageStore.selectedPages.keys());
      await Promise.all(target.map(pageId => PageStore.movePage(pageId, chapterId)));
      await ChapterStore.fetchChapterInfo(ChapterStore.chapterInfo.id);
      initialMoveData();
    } catch (e) {
      console.log(`Page Move Error ${e}`);
    }
  };

  return useObserver(() => (
    <>
      <MoveWrapper
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
          backgroundColor: 'white',
        }}
      >
        <MoveHeader
          leftButtons={[
            {
              type: 'icon',
              action: 'close',
              onClick: () => {
                PageStore.setIsMove(false);
                ChapterStore.selectedChapters.clear();
              },
            },
          ]}
          title="페이지 이동"
          rightButtons={[
            {
              type: 'text',
              text: '완료',
              onClick: handlePageMove,
              disabled: !ChapterStore.selectedChapters.size,
            },
          ]}
        />
        <MoveBody>
          <LongPressable onShortPress={onShortPress} onLongPress={onLongPress}>
            {ChapterStore.chapterList.map((item, index) => {
              switch (NoteUtil.getChapterNumType(item.type)) {
                case 0:
                case 1: // default, NOTEBOOK
                  return (
                    <ChapterItem
                      key={item.id}
                      chapter={item}
                      index={index}
                      flexOrder={1}
                      moveFlag
                    />
                  );
                default:
                  break;
              }
            })}
          </LongPressable>
        </MoveBody>
      </MoveWrapper>
    </>
  ));
};

export default MoveListViewContainer;
