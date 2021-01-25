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
import { Tooltip } from "antd";
import NoteUtil from '../../NoteUtil';

const ChapterText = ({ chapter, handleFoldBtnClick, isFolded }) => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  chapter.text = NoteUtil.decodeStr(chapter.text);

  const handleTooltip = e => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth)
  };

  return useObserver(() => (
    <>
      <ChapterTitle>
        <Tooltip title={isEllipsisActive ? chapter.text : null} placement='bottomLeft'>
          <ChapterTextSpan
            onMouseOver={handleTooltip}
            marginLeft={
              chapter.type === 'notebook' || chapter.type === 'default'
                ? '1.69rem'
                : '2.63rem'
            }
          >
            {chapter.text}
          </ChapterTextSpan>
        </Tooltip>
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
          icon={isFolded ? faAngleDown : faAngleUp}
          style={{ color: '#7B7671' }}
          size={"lg"}
          onClick={handleFoldBtnClick}
        />
      </ChapterFolderBtn>
    </>
  ));
};

export default ChapterText;
