import React from "react";
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import ChapterColor from "../chapter/chapterColor";
import ChapterText from "../chapter/chapterText";
import PageContainer from "../page/page";
import {
  LnbMenuCover,
  LnbMenuChapterCover,
  LnbMenuChapterTempUl,
  LnbMenuChapterTempDiv,
} from "../../styles/lnbStyle";
import {
  ChapterContainerUl,
  ChapterUlDIV,
  ChapterColorSpan,
  ChapterColorDiv,
  ChapterInput,
  ChapterTextContainer,
} from "../../styles/chpaterStyle";
import LnbMenuTitle from "./lnbTitle";
import LnbMenuTagCover from "./lnbTag";

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

const ChapterList = () => {
  const { NoteStore, ChapterStore, PageStore } = useStore();
  if (ChapterStore.chapterList.length === 0) {
    ChapterStore.getChapterList();
  }

  const onClickChapterBtn = async (id, children) => {
    ChapterStore.setCurrentChapter(id);
    let targetPage = "";
    if (children.length) {
      targetPage = children[0]?.id;
    }
    ChapterStore.setCurrentPage(targetPage);
    await PageStore.getNoteInfoList(targetPage);
    NoteStore.setShowPage(true);
  };
  return useObserver(() => (
    <>
      {ChapterStore.chapterList.map((item) => (
        <ChapterContainerUl id={item.id} key={item.id} itemType="chapter">
          <ChapterUlDIV
            onClick={onClickChapterBtn.bind(this, item.id, item.children)}
          >
            <ChapterColor color={item.color} chapterId={item.id} />
            <ChapterText text={item.text} chapterId={item.id} />
          </ChapterUlDIV>
          <PageContainer
            children={JSON.stringify(item.children)}
            chapterId={item.id}
          />
        </ChapterContainerUl>
      ))}
    </>
  ));
};
export default LNBMenuContainer;
