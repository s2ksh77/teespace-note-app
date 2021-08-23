import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import LNBHeader from './LNBHeader';
import useNoteStore from '../../../store/useStore';
import ChapterItem from './ChapterItem';
import NoteUtil from '../../../NoteUtil';
import { toJS } from 'mobx';
import { LNBCover } from '../../../styles/lnbStyle';
import LNBTag from './LNBTag';
import RecycleBin from './RecycleBin';

const { getChapterNumType } = NoteUtil;

const LNBContainer = () => {
  const { ChapterStore, NoteStore } = useNoteStore();

  useEffect(() => {
    NoteStore.setTargetLayout('LNB');
  });

  return useObserver(() => (
    <>
      <LNBCover>
        <LNBHeader />
        {ChapterStore.chapterList.map((item, index) => {
          switch (getChapterNumType(item.type)) {
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
                    isShared
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
        <LNBTag flexOrder={4} />
      </LNBCover>
    </>
  ));
};

export default LNBContainer;
