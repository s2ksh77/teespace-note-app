import React, { useState, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { Tooltip } from 'antd';
import moment from 'moment-timezone';
import { useCoreStores } from 'teespace-core';
import { ThemeContext } from 'styled-components';
import { ChapterTitle, ChapterTextSpan, NewNoteMark } from '../../styles/chpaterStyle';
import { ButtonWrapper } from '../../styles/commonStyle';
import ContextMenu from '../common/ContextMenu';
import NoteUtil, { isNormalChapter, getI18nChapterTitle } from '../../NoteUtil';
import { CHAPTER_TYPE } from '../../GlobalVariable';
import { ArrowTopIcon, ArrowBottomIcon } from '../icons';

const isNew = chapter => {
  // 챕터 이름 변경시 업데이트
  if (
    chapter.modified_date &&
    moment().isBefore(moment(chapter.modified_date).add(72, 'hours'))
  )
    return true;
  // 하위 페이지 업데이트시 챕터 업데이트 표시
  for (const page of chapter.children) {
    if (
      page.modified_date &&
      moment().isBefore(moment(page.modified_date).add(72, 'hours'))
    )
      return true;
  }
  return false;
};

const ChapterText = ({ chapter, index, handleFoldBtnClick, isFolded }) => {
  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const themeContext = useContext(ThemeContext);
  chapter.text = NoteUtil.decodeStr(chapter.text);

  const handleTooltip = e => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth);
  };

  return useObserver(() => (
    <>
      <ChapterTitle>
        <Tooltip title={isEllipsisActive ? chapter.text : null} placement="bottomLeft">
          <ChapterTextSpan
            onMouseOver={handleTooltip}
            marginLeft={isNormalChapter(chapter.type) ? '1.69rem' : '2.63rem'}
          >
            {getI18nChapterTitle(chapter.type, chapter.text)}
          </ChapterTextSpan>
        </Tooltip>
        {/* {isNew(chapter) && <NewNoteMark isChapter={true} />} */}
        {(authStore.hasPermission('noteChapter', 'U') ||
          chapter.type === CHAPTER_TYPE.SHARED) &&
          (chapter.type !== CHAPTER_TYPE.RECYCLE_BIN || chapter.children.length) && (
            <ContextMenu noteType="chapter" note={chapter} chapterIdx={index} />
          )}
      </ChapterTitle>
      {(chapter.type !== CHAPTER_TYPE.RECYCLE_BIN || chapter.children.length) && (
        <ButtonWrapper style={{ marginLeft: '0.15rem' }} onClick={handleFoldBtnClick}>
          {isFolded ? (
            <ArrowBottomIcon color={themeContext.IconNormal} />
          ) : (
            <ArrowTopIcon color={themeContext.IconNormal} />
          )}
        </ButtonWrapper>
      )}
    </>
  ));
};

export default React.memo(ChapterText);
