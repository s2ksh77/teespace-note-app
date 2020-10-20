import React, { useState } from "react";
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  ChapterTitle,
  ChapterTextSpan,
  ChapterFolderBtn,
} from "../../styles/chpaterStyle";
import ContextMenu from "../common/ContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

const ChapterText = ({ text, chapterId, color }) => {
  const { ChapterStore, PageStore } = useStore();

  const [isFold, setFold] = useState(false);
  const handleFoldClick = (e) => {
    const {
      dataset: { icon },
    } = e.currentTarget;
    const targetUl = e.currentTarget.closest("ul");
    if (icon === "angle-up") {
      setFold(true);
      targetUl.classList.add("folded");
    } else {
      setFold(false);
      targetUl.classList.remove("folded");
    }
  };
  return useObserver(() => (
    <>
      <ChapterTitle 
        className={
          !PageStore.isMovingPage && chapterId === ChapterStore.currentChapterId 
          ? "selectedMenu" 
          : ""
        }
      >
        <ChapterTextSpan>{text}</ChapterTextSpan>
        <ContextMenu
          type={"chapter"}
          chapterId={chapterId}
          chapterTitle={text}
          nextSelectableChapterId={
            ChapterStore.chapterList.length > 1 ? (
              ChapterStore.chapterList[0].id === chapterId ? ChapterStore.chapterList[1].id : ChapterStore.chapterList[0].id 
            ) : ("")
          }
          nextSelectablePageId={
            ChapterStore.chapterList.length > 1 && ChapterStore.chapterList[1].children.length > 0 && ChapterStore.chapterList[0].children.length > 0 ? (
              ChapterStore.chapterList[0].id === chapterId ? ChapterStore.chapterList[1].children[0].id : ChapterStore.chapterList[0].children[0].id
            ) : ("")
          }
        />
      </ChapterTitle>
      <ChapterFolderBtn>
        <FontAwesomeIcon
          icon={isFold ? faAngleDown : faAngleUp}
          size={"2x"}
          onClick={handleFoldClick}
        />
      </ChapterFolderBtn>
    </>
  ));
};

export default ChapterText;
