import React from "react";
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

  const handleTitleInput = (e) => {
    const {
      target: { value },
    } = e;
    ChapterStore.setChapterTitle(value);
  };
  const createNewChapter = () => {
    // 분기는 더 여러개 있어야하지만 우선 만드는걸로
    if (ChapterStore.chapterNewTitle) {
      ChapterStore.createChapter(
        ChapterStore.chapterNewTitle,
        ChapterStore.isNewChapterColor
      );
    }
  };

  return useObserver(() => (
    <>
      <LNBCover>
        <LNBHeader />
        <LNBTag />
        {ChapterStore.isSearching ? <LNBSearchResult />
          : (<LNBChapterCover>
            {ChapterStore.isNewChapter ? (
              <LNBNewChapter>
                <NewChapter>
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
                </NewChapter>
              </LNBNewChapter>
            ) : null}
            <ChapterList type={"chapter"} />
            {/* <LNBTag /> */}
            {/* <ChapterList type={"shared"}/> */}
          </LNBChapterCover>)}
      </LNBCover>
    </>
  ));
};

export default LNBContainer;
