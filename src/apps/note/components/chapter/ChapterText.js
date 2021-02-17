import React, { useState } from "react";
import useNoteStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  ChapterTitle,
  ChapterTextSpan,
  ChapterFolderBtn,
  ChapterFoldBtnIcon,
} from "../../styles/chpaterStyle";
import ContextMenu from "../common/ContextMenu";
import arrowTopIcon from '../../assets/arrow_top_1.svg';
import arrowBottomIcon from '../../assets/arrow_bottom_1.svg';
import { Tooltip } from "antd";
import NoteUtil from '../../NoteUtil';

const ChapterText = ({ chapter, index, handleFoldBtnClick, isFolded }) => {
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
            {chapter.type === 'shared_page' ? NoteStore.getI18n('receivedPage') : chapter.text}
          </ChapterTextSpan>
        </Tooltip>
        <ContextMenu
          noteType={"chapter"}
          note={chapter}
          selectableChapterId={
            ChapterStore.chapterList.length > 1
              ? index === 0
                ? ChapterStore.chapterList[1].id
                : ChapterStore.chapterList[index - 1].id
              : ''
          }
          selectablePageId={
            ChapterStore.chapterList.length > 1
              ? index === 0
                ? ChapterStore.chapterList[1].children.length > 0
                  ? ChapterStore.chapterList[1].children[0].id
                  : ''
                : ChapterStore.chapterList[index - 1].children.length > 0
                  ? ChapterStore.chapterList[index - 1].children[0].id
                  : ''
              : ''
          }
        />
      </ChapterTitle>
      <ChapterFolderBtn onClick={handleFoldBtnClick}>
        <ChapterFoldBtnIcon src={isFolded ? arrowBottomIcon : arrowTopIcon} />
      </ChapterFolderBtn>
    </>
  ));
};

export default ChapterText;
