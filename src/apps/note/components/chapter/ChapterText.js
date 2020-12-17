import React, { useState } from "react";
import useNoteStore from "../../store/useStore";
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

const ChapterText = ({ chapter }) => {
  const { NoteStore, ChapterStore } = useNoteStore();

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
          (ChapterStore.isCtrlKeyDown
            ? (ChapterStore.moveInfoList.find(info => info.chapterId === chapter.id)
                ? 'selectedMenu'
                : '')
            : (!NoteStore.isDragging && chapter.id === ChapterStore.currentChapterId
                ? 'selectedMenu'
                : '')
          )
        }
      >
        <ChapterTextSpan>{chapter.text}</ChapterTextSpan>
        <ContextMenu
          noteType={"chapter"}
          chapter={chapter}
          nextSelectableChapterId={
            ChapterStore.chapterList.length - ChapterStore.sharedCnt > 1 ? (
              ChapterStore.chapterList[0].id === chapter.id ? ChapterStore.chapterList[1].id : ChapterStore.chapterList[0].id
            ) : ("")
          }
          nextSelectablePageId={
            ChapterStore.chapterList.length - ChapterStore.sharedCnt > 1 && ChapterStore.chapterList[1].children.length > 0 && ChapterStore.chapterList[0].children.length > 0 ? (
              ChapterStore.chapterList[0].id === chapter.id ? ChapterStore.chapterList[1].children[0].id : ChapterStore.chapterList[0].children[0].id
            ) : ("")
          }
          type={chapter.type}
        />
      </ChapterTitle>
      <ChapterFolderBtn>
        <FontAwesomeIcon
          icon={isFold ? faAngleDown : faAngleUp}
          style={{color:'#75757F'}}
          size={"lg"}
          onClick={handleFoldClick}
        />
      </ChapterFolderBtn>
    </>
  ));
};

export default ChapterText;
