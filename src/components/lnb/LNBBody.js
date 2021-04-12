import React from 'react';
import { useObserver } from 'mobx-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useNoteStore from '../../stores/useNoteStore';

import { LNBBodyContainer } from '../../styles/LNBStyle';
import NewChapterForm from './NewChapterForm';
import SearchingContent from '../common/SearchingContent';
import LNBSearchResult from './LNBSearchResult';
import ChapterItem from './ChapterItem';
import LNBTag from './LNBTag';
import NoteUtil from '../../utils/NoteUtil';

const LNBBody = () => {
  const { NoteStore, ChapterStore } = useNoteStore();

  return useObserver(() => (
    <LNBBodyContainer>
      <NewChapterForm />
      {ChapterStore.isSearching || ChapterStore.isTagSearching ? (
        <LNBSearchResult /> // SearchingContent도 넣어야 함
      ) : (
        <DndProvider backend={HTML5Backend}>
          {ChapterStore.chapterList &&
            ChapterStore.chapterList.map((item, index) => {
              switch (NoteUtil.getChapterType(item.type)) {
                case 0:
                case 1: // default, NOTEBOOK
                  return (
                    <ChapterItem
                      key={item.id}
                      chapter={item}
                      name={item.name}
                      flexOrder={1}
                    />
                  );
                case 2: // SHARED_PAGE
                  if (item.pageList.length > 0)
                    return (
                      <ChapterItem key={item.id} chapter={item} flexOrder={3} />
                    );
                  break;
                case 3:
                  return (
                    <ChapterItem key={item.id} chapter={item} flexOrder={3} />
                  );
                default:
                  break;
              }
              return null;
            })}
          <LNBTag flexOrder={2} />
        </DndProvider>
      )}
    </LNBBodyContainer>
  ));
};

export default LNBBody;
