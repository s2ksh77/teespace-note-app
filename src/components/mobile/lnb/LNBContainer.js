import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import LNBHeader from './LNBHeader';
import useNoteStore from '../../../store/useStore';
import ChapterItem from './ChapterItem';
import NoteUtil from '../../../NoteUtil';
import { toJS } from 'mobx';
import { LNBCover } from '../../../styles/lnbStyle';
import LNBTag from './LNBTag';
import RecycleBin from './RecycleBin';
import LongPressable from 'react-longpressable';

const { getChapterNumType } = NoteUtil;

const LNBContainer = () => {
  const { ChapterStore, NoteStore } = useNoteStore();
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
    <>
      <LNBCover>
        <LNBHeader />
        <LongPressable onShortPress={onShortPress} onLongPress={onLongPress}>
          {ChapterStore.chapterList.map((item, index) => {
            switch (getChapterNumType(item.type)) {
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
      </LNBCover>
    </>
  ));
};

export default LNBContainer;
