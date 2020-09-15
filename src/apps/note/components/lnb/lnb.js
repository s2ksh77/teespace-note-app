import React from "react";
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  LnbMenuCover,
  LnbMenuChapterCover,
  LnbMenuChapterTempUl,
  LnbMenuChapterTempDiv,
} from "../../styles/lnbStyle";
import {
  ChapterColorSpan,
  ChapterColorDiv,
  ChapterInput,
  ChapterTextContainer,
} from "../../styles/chpaterStyle";
import LnbMenuTitle from "./lnbTitle";
import LnbMenuTagCover from "./lnbTag";
import ChapterList from './chapterList';

const LNBMenuContainer = () => {
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
      <LnbMenuCover>
        <LnbMenuTitle />
        <LnbMenuTagCover />
        <LnbMenuChapterCover>
          {ChapterStore.isNewChapter ? (
            <LnbMenuChapterTempUl>
              <LnbMenuChapterTempDiv>
                <ChapterColorDiv>
                  <ChapterColorSpan
                    color={ChapterStore.isNewChapterColor}
                    background={ChapterStore.isNewChapterColor}
                  />
                </ChapterColorDiv>
                <ChapterTextContainer>
                  <ChapterInput
                    placeholder="새 챕터"
                    onChange={handleTitleInput}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        createNewChapter();
                      }
                    }}
                  />
                </ChapterTextContainer>
              </LnbMenuChapterTempDiv>
            </LnbMenuChapterTempUl>
          ) : null}
          <ChapterList />
        </LnbMenuChapterCover>
      </LnbMenuCover>
    </>
  ));
};

export default LNBMenuContainer;
