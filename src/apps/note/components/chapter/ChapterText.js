import React, { useState } from "react";
import useNoteStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  ChapterTitle,
  ChapterTextSpan,
  NewNoteMark,
  ChapterFolderBtn,
  ChapterFoldBtnIcon,
} from "../../styles/chpaterStyle";
import ContextMenu from "../common/ContextMenu";
import arrowTopIcon from '../../assets/arrow_top_1.svg';
import arrowBottomIcon from '../../assets/arrow_bottom_1.svg';
import { Tooltip } from "antd";
import NoteUtil from '../../NoteUtil';
import { useTranslation } from "react-i18next";
import moment from 'moment-timezone';
import { useCoreStores } from 'teespace-core';

const isNew = (chapter) => {
  // 챕터 이름 변경시 업데이트
  if (chapter.modified_date && moment().isBefore(moment(chapter.modified_date).add(72,'hours'))) return true;
  // 하위 페이지 업데이트시 챕터 업데이트 표시
  for (const page of chapter.children) {
    if (page.modified_date && moment().isBefore(moment(page.modified_date).add(72,'hours'))) return true;
  }
  return false;
}

const ChapterText = ({ chapter, index, handleFoldBtnClick, isFolded }) => {
  const { ChapterStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const { t } = useTranslation();
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
            {chapter.type === 'shared_page' ? t('NOTE_PAGE_LIST_CMPNT_DEF_07') : chapter.text}
          </ChapterTextSpan>
        </Tooltip>
        {/* {isNew(chapter) && <NewNoteMark isChapter={true} />} */}
        {(authStore.hasPermission('noteChapter', 'U') || NoteUtil.getChapterNumType(chapter.type) === 3) && (
          <ContextMenu noteType={'chapter'} note={chapter} chapterIdx={index} />
        )}
      </ChapterTitle>
      <ChapterFolderBtn onClick={handleFoldBtnClick}>
        <ChapterFoldBtnIcon src={isFolded ? arrowBottomIcon : arrowTopIcon} />
      </ChapterFolderBtn>
    </>
  ));
};

export default ChapterText;
