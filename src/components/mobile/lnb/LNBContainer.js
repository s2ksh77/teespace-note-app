import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { EventBus } from 'teespace-core';
import LongPressable from 'react-longpressable';
import useNoteStore from '../../../store/useStore';

import { LNBWrapper } from '../../../styles/lnbStyle';
import LNBHeader from './MainHeader';
import { LNBBody } from '../styles/lnbStyles';
import ChapterItem from './ChapterItem';
import LNBTag from './LNBTag';
import RecycleBin from './RecycleBin';
import NoteUtil from '../../../NoteUtil';

const LNBContainer = () => {
  const { ChapterStore, NoteStore } = useNoteStore();
  const { t } = useTranslation();
  const [isLongPress, setLongPress] = useState(false);

  useEffect(() => {
    NoteStore.setTargetLayout('LNB');
  });

  const onShortPress = () => {}; // event prevent

  const onLongPress = () => {
    setLongPress(true);
  };

  useEffect(() => {
    return () => setLongPress(false);
  }, [NoteStore.notechannel_id]); // 동일하게 앱 켜두고 다른 방 이동시 unmount 되지 않음 (현재 platform 환경)

  return useObserver(() => (
    <LNBWrapper>
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
          { type: 'icon', action: 'search' },
          { type: 'text', text: '🎅🏻' },
        ]}
      />
      <LNBBody>
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
                    isLongPress={isLongPress}
                  />
                );
              case 2: // SHARED_PAGE
                if (item.children.length > 0)
                  return (
                    <ChapterItem
                      key={item.id}
                      chapter={item}
                      index={index}
                      flexOrder={2}
                      isLongPress={isLongPress}
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
                    isLongPress={isLongPress}
                  />
                );
              case 4:
                return (
                  <RecycleBin
                    key={item.id}
                    chapter={item}
                    index={index}
                    flexOrder={3}
                    isLongPress={isLongPress}
                  />
                );
              default:
                break;
            }
          })}
        </LongPressable>
        <LNBTag flexOrder={4} />
      </LNBBody>
    </LNBWrapper>
  ));
};

export default LNBContainer;
