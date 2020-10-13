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

const LNBContainer = () => {
  const { NoteStore, ChapterStore } = useStore();
  const outsideClickRef = useRef(null);
  const LNBRef = useRef(null);

  const handleTitleInput = (e) => {
    const {
      target: { value },
    } = e;
    // set ChapterStore.chapterNewTitle
    ChapterStore.setChapterTitle(value);
  };

  const createNewChapter = async () => {
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
      alert('중복된 이름이 있습니다')
    }
    
  };

  // 바깥 영역 클릭시
  useEffect(() => {
    if (outsideClickRef.current) {
      const handleClickOutside = async (e) => {
        // 새 챕터 버튼 누른 것은 무시
        if (e.target.dataset.btn === "noteNewChapterBtn") return true;
        if (outsideClickRef.current && !outsideClickRef.current.contains(e.target)) {
          await createNewChapter();
        }
      }
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }    
  }, [ChapterStore.isNewChapter])

  useEffect(() => {
    if (LNBRef.current) NoteStore.setLNBChapterCoverRef(LNBRef.current);
  }, [])

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        createNewChapter();
        break;
      case "Escape":
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
            {ChapterStore.isNewChapter ? (
              <LNBNewChapter ref={outsideClickRef}>
                <ChapterColor color={ChapterStore.isNewChapterColor} />
                <ChapterTitle>
                  <ChapterInput
                    placeholder="새 챕터"
                    maxLength="200"
                    onChange={handleTitleInput}
                    onKeyDown={handleKeyDown}
                  />
                </ChapterTitle>
              </LNBNewChapter>
            ) : null}
            {(ChapterStore.isSearching || ChapterStore.isTagSearching)
            ? <LNBSearchResult /> :
            <>
              <ChapterList type={"chapter"} />
              <LNBTag />
              {/* <ChapterList type={"shared"}/> )}*/}
            </>}            
          </LNBChapterCover>
      </LNBCover>
    </>
  ));
};

export default LNBContainer;
