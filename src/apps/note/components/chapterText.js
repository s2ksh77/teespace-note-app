import React, { useState } from "react";
import { useObserver } from "mobx-react";
import {
  ChapterTextContainer,
  ChapterTextSpan,
  ChapterTextEllipsis,
  ChapterFolderBtn,
} from "../styles/chpaterStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import ChapterStore from "../store/chapterStore";

const ChapterText = ({ text }) => {
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
      <ChapterTextContainer>
        <ChapterTextSpan>{text}</ChapterTextSpan>
        <ChapterTextEllipsis className="ellipsisBtn">
          <FontAwesomeIcon icon={faEllipsisV} size={"1x"} />
        </ChapterTextEllipsis>
      </ChapterTextContainer>
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
