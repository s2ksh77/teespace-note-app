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
  const { ChapterStore } = useStore();

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
      <ChapterTitle className={chapterId === ChapterStore.currentChapterId ? "selectedMenu" : ""}>
        <ChapterTextSpan>{text}</ChapterTextSpan>
        <ContextMenu
          type={"chapter"}
          chapterId={chapterId}
          chapterTitle={text}
          color={color}
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
