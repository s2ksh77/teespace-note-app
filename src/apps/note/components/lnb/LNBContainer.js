import React, { useRef, useEffect } from "react";
import useNoteStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  LNBCover,
  LNBChapterCover,
} from "../../styles/lnbStyle";
import LNBHeader from "./LNBHeader";
import LNBNewChapterForm from './LNBNewChapterForm';
import LNBTag from "./LNBTag";
import ChapterList from './ChapterList';
import LNBSearchResult from './LNBSearchResult';
import DragPreview from "../common/DragPreview";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";

const LNBContainer = () => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const LNBRef = useRef(null);

  const createNewChapter = async () => {
    // dialog 클릭시 blur이벤트 동작
    if (NoteStore.showModal) return;
    if (!ChapterStore.isNewChapter) return;
    // 분기는 더 여러개 있어야하지만 우선 만드는걸로
    if (!ChapterStore.chapterNewTitle) {
      let autoName = ChapterStore.getNewChapterTitle();
      ChapterStore.setChapterTitle(autoName);
      await ChapterStore.createNoteChapter(
        ChapterStore.chapterNewTitle,
        ChapterStore.isNewChapterColor
      );
    } else if (ChapterStore.isValidChapterText(ChapterStore.chapterNewTitle)) {
      await ChapterStore.createNoteChapter(
        ChapterStore.chapterNewTitle,
        ChapterStore.isNewChapterColor
      );
    } else {
      NoteStore.setModalInfo('titleDuplicate');
    }
  };

  useEffect(() => {
    if (LNBRef.current) NoteStore.setLNBChapterCoverRef(LNBRef.current);
    ChapterStore.fetchChapterList();
  }, []);

  useEffect(() => {
    if (ChapterStore.scrollIntoViewId) {
      document.getElementById(ChapterStore.scrollIntoViewId).scrollIntoView(true);
      ChapterStore.setScrollIntoViewId('');
    }
  }, [ChapterStore.scrollIntoViewId]);

  return useObserver(() => (
    <>
      <LNBCover>
        <LNBHeader createNewChapter={createNewChapter} />
        <LNBChapterCover ref={LNBRef}>
          <LNBNewChapterForm show={ChapterStore.isNewChapter} createNewChapter={createNewChapter} />
          {(ChapterStore.isSearching || ChapterStore.isTagSearching)
            ? <LNBSearchResult />
            : <DndProvider backend={HTML5Backend}>
              {NoteStore.isDragging
                ? NoteStore.draggedType && NoteStore.draggedTitle
                  ? <DragPreview type={NoteStore.draggedType} title={NoteStore.draggedTitle} />
                  : null
                : null}
              <ChapterList type={""} />
              <LNBTag />
              <ChapterList type={"shared_page"} />
              <ChapterList type={"shared"} />
            </DndProvider>}
        </LNBChapterCover>
      </LNBCover>
    </>
  ));
};

export default LNBContainer;
