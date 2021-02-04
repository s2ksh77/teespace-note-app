import React, { useRef, useEffect } from "react";
import useNoteStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  LNBCover,
  LNBChapterCover,
  LNBEditModeCover,
} from "../../styles/lnbStyle";
import LNBHeader from "./LNBHeader";
import LNBNewChapterForm from './LNBNewChapterForm';
import LNBTag from "./LNBTag";
import ChapterList from './ChapterList';
import LNBSearchResult from './LNBSearchResult';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import SearchingImg from '../common/SearchingImg';

const LNBContainer = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const LNBRef = useRef(null);

  const createNewChapter = async isNeededLNBLayout => {
    // dialog 클릭시 blur이벤트 동작
    if (NoteStore.showModal) return;
    if (!ChapterStore.isNewChapter) return;
    // 분기는 더 여러개 있어야하지만 우선 만드는걸로
    if (!ChapterStore.chapterNewTitle) {
      ChapterStore.setChapterTitle("새 챕터");
      await ChapterStore.createNoteChapter(
        ChapterStore.chapterNewTitle,
        ChapterStore.isNewChapterColor,
        isNeededLNBLayout
      );
    } else {
      await ChapterStore.createNoteChapter(
        ChapterStore.chapterNewTitle,
        ChapterStore.isNewChapterColor,
        isNeededLNBLayout
      );
    }
  };
  const handleEditMode = () => {
    const isUndoActive = EditorStore.tinymce?.undoManager.hasUndo();
    if (!isUndoActive && !PageStore.otherEdit) { PageStore.handleNoneEdit(); return; }
    NoteStore.setModalInfo('editCancel');
  }
  useEffect(() => {
    if (LNBRef.current) NoteStore.setLNBChapterCoverRef(LNBRef.current);
    // ChapterStore.fetchChapterList();
  }, []);

  useEffect(() => {
    if (ChapterStore.isSearching || ChapterStore.isTagSearching) return;
    if (ChapterStore.scrollIntoViewId) {
      document.getElementById(ChapterStore.scrollIntoViewId).scrollIntoView(true);
      ChapterStore.setScrollIntoViewId('');
    }
  }, [ChapterStore.scrollIntoViewId]);

  return useObserver(() => (
    <>
      <LNBCover>
        <LNBEditModeCover mode={PageStore.isReadMode().toString()} onClick={!PageStore.isReadMode() ? handleEditMode : null} />
        <LNBHeader createNewChapter={createNewChapter} />
        <LNBChapterCover ref={LNBRef}>
          <LNBNewChapterForm show={ChapterStore.isNewChapter} createNewChapter={createNewChapter} />
          {(ChapterStore.isSearching || ChapterStore.isTagSearching)
            ? (ChapterStore.isLoadingSearchResult ? <SearchingImg /> : <LNBSearchResult />)
            : <DndProvider backend={HTML5Backend}>
              {ChapterStore.sortedChapterList.roomChapterList.length > 0 ?
                <ChapterList type={"roomChapterList"} isShared={false} /> : null}
              <LNBTag />
              {ChapterStore.sortedChapterList.sharedPageList.length > 0 && ChapterStore.sortedChapterList.sharedPageList[0]?.children.length > 0 ?
                <ChapterList type={"sharedPageList"} isShared={true} /> : null}
              {ChapterStore.sortedChapterList.sharedChapterList.length > 0 ?
                <ChapterList type={"sharedChapterList"} isShared={true} /> : null}
            </DndProvider>}
        </LNBChapterCover>
      </LNBCover>
    </>
  ));
};

export default LNBContainer;
