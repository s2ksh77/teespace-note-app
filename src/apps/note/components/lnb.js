import React from "react";
import useStore from "../store/useStore";
import { useObserver } from "mobx-react";
import ChapterColor from "./chapterColor";
import ChapterText from "./chapterText";
import PageContainer from "./page";
import {
  LnbMenuCover,
  LnbMenuChapterCover,
  LnbMenuChapterTempUl,
  LnbMenuChapterTempDiv,
} from "../styles/lnbStyle";
import {
  ChapterContainerUl,
  ChapterUlDIV,
  ChapterColorSpan,
  ChapterColorDiv,
  ChapterInput,
  ChapterTextContainer,
} from "../styles/chpaterStyle";
import LnbMenuTitle from "./lnbTitle";

const LNBMenuContainer = () => {
  const { ChapterStore } = useStore();
  if (ChapterStore.chapterList.length === 0) ChapterStore.getChapterList();

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
          {ChapterStore.chapterList.map((item) => (
            <ChapterContainerUl id={item.id} key={item.id} itemType="chapter">
              <ChapterUlDIV>
                <ChapterColor color={item.color} chapterId={item.id} />
                <ChapterText text={item.text} chapterId={item.id} />
              </ChapterUlDIV>
              <PageContainer
                children={JSON.stringify(item.children)}
                chapterId={item.id}
              />
            </ChapterContainerUl>
          ))}
        </LnbMenuChapterCover>
      </LnbMenuCover>
    </>
  ));
};

export default LNBMenuContainer;
