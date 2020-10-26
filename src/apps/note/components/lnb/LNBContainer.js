import React, {useRef, useEffect} from "react";
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  LNBCover,
  LNBChapterCover,
  LNBNewChapter,
  NewChapter,
} from "../../styles/lnbStyle";
import {
  ChapterInput,
  ChapterTitle,
} from "../../styles/chpaterStyle";
import LNBHeader from "./LNBHeader";
import LNBTag from "./LNBTag";
import ChapterList from './ChapterList';
import LNBSearchResult from './LNBSearchResult';
import ChapterColor from "../chapter/ChapterColor"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";

const LNBContainer = () => {
  const { NoteStore, ChapterStore } = useStore();
  const titleRef=  useRef(null);
  const LNBRef = useRef(null);

  const handleTitleInput = (e) => {
    const {
      target: { value },
    } = e;
    // set ChapterStore.chapterNewTitle
    ChapterStore.setChapterTitle(value);
  };

  const createNewChapter = async () => {
    // dialog 클릭시 blur이벤트 동작
    if (NoteStore.showModal) return;
    if (!ChapterStore.isNewChapter) return;
    // 분기는 더 여러개 있어야하지만 우선 만드는걸로
    if (!ChapterStore.chapterNewTitle) {
      let autoName = ChapterStore.getNewChapterTitle();
      ChapterStore.setChapterTitle(autoName);
      await ChapterStore.createChapter(
        ChapterStore.chapterNewTitle,
        ChapterStore.isNewChapterColor
      );
    } else if (ChapterStore.isValidChapterText(ChapterStore.chapterNewTitle)) {
      await ChapterStore.createChapter(
        ChapterStore.chapterNewTitle,
        ChapterStore.isNewChapterColor
      );
    } else {
      NoteStore.setModalInfo('titleDuplicate');
    }    
  };

  const handleBlur = async (e) => {
    if (e.relatedTarget && e.relatedTarget.getAttribute('data-btn') === "editorEditBtn") {
      ChapterStore.setChapterTempUl(false); return;
    }
    await createNewChapter();
  }

  useEffect(() => {
    if (LNBRef.current) NoteStore.setLNBChapterCoverRef(LNBRef.current);
  }, []);


  // useEffect랑 useObserver 중 하나만 있으면 focus가 동작하지 않는다ㅠㅠ
  // 임시로 둘 다 넣음
  useEffect(()=>{
    if (titleRef.current) titleRef.current.focus();
  },[NoteStore.showModal, ChapterStore.isNewChapter])

  useObserver(()=>{
    if (!NoteStore.showModal && titleRef.current) titleRef.current.focus();
  })

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        createNewChapter();
        break;
      // esc키 누르면 blur이벤트 먼저 타서 create된다
      case "Escape":
        // event.stopPropagation(); // blur무조건 탄다
        ChapterStore.setChapterTempUl(false);
        break;
      default:
        break;
    }
  }

  return useObserver(() => (
    <>
      <LNBCover>
        <LNBHeader createNewChapter={createNewChapter} />
        <LNBChapterCover ref={LNBRef}>
            <LNBNewChapter show={ChapterStore.isNewChapter}>
              <ChapterColor color={ChapterStore.isNewChapterColor} />
              <ChapterTitle>
                <ChapterInput
                  ref={titleRef}
                  placeholder="새 챕터"
                  maxLength="200"
                  value={ChapterStore.chapterNewTitle}
                  onChange={handleTitleInput}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              </ChapterTitle>
            </LNBNewChapter>
            {(ChapterStore.isSearching || ChapterStore.isTagSearching)
            ? <LNBSearchResult /> :
            <DndProvider backend={HTML5Backend}>
              <ChapterList type={"chapter"} />
              <LNBTag />
              {/* <ChapterList type={"shared"}/> )}*/}
            </DndProvider>}            
          </LNBChapterCover>
      </LNBCover>
    </>
  ));
};

export default LNBContainer;
