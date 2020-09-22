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
  const { ChapterStore } = useStore();
  const outsideClickRef = useRef(null);

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
    }
    await ChapterStore.createChapter(
      ChapterStore.chapterNewTitle,
      ChapterStore.isNewChapterColor
    );
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

  return useObserver(() => (
    <>
      <LNBCover>
        <LNBHeader createNewChapter={createNewChapter} />
        <LNBChapterCover>
            {ChapterStore.isNewChapter ? (
              <LNBNewChapter ref={outsideClickRef}>
                <ChapterColor color={ChapterStore.isNewChapterColor} />
                <ChapterTitle>
                  <ChapterInput
                    placeholder="새 챕터"
                    onChange={handleTitleInput}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        createNewChapter();
                      }
                    }}
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
