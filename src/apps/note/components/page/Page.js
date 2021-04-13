import React, { useCallback, useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useCoreStores } from 'teespace-core';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from "react-dnd-html5-backend";
import ContextMenu from '../common/ContextMenu';
import { NewNoteMark } from '../../styles/chpaterStyle';
import {
  PageCover,
  PageMargin,
  PageTextCover,
  PageTextContainer,
  PageText,
  PageTextInput,
} from '../../styles/pageStyle';
import { Tooltip } from 'antd';
import NoteUtil from '../../NoteUtil';
import { DRAG_TYPE } from '../../GlobalVariable';
import moment from 'moment-timezone';
import { checkMaxLength } from '../common/validators';

const Page = ({ page, index, chapter, chapterIdx, onClick }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  chapter.text = NoteUtil.decodeStr(chapter.text);
  page.text = NoteUtil.decodeStr(page.text);

  const chapterMoveInfo = {
    item: chapter,
    chapterIdx: chapterIdx,
  };
  const pageMoveInfo = {
    item: page,
    pageIdx: index,
    chapterId: chapter.id,
    chapterIdx: chapterIdx,
  };

  const [, drag, preview] = useDrag({
    item: { id: page.id, type: page.type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE },
    begin: (monitor) => {
      if (!PageStore.moveInfoMap.get(page.id)) {
        PageStore.setMoveInfoMap(new Map([[page.id, pageMoveInfo]]));
        PageStore.setIsCtrlKeyDown(false);
      }

      NoteStore.setDraggedType('page');
      NoteStore.setDraggedItems(PageStore.getSortedMoveInfoList().map(moveInfo => moveInfo.item));
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
      NoteStore.setIsDragging(true);

      return {
        type: page.type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE,
        data: [...PageStore.moveInfoMap].map(keyValue => {
          const item = keyValue[1].item;
          return {
            id: item.id,
            text: item.text,
            date: item.modified_date,
          }
        }),
      };
    },
    end: async (item, monitor) => {
      const res = monitor.getDropResult();
      if (res && res.target === 'Platform:Friend') {
        const roomInfo = await res.findRoom();
        PageStore.createNoteSharePage(roomInfo.id, item.data);
      } else if (res && res.target === 'Platform:Room') {
        PageStore.createNoteSharePage(res.targetData.id, item.data);
      }

      if (!res && item.type === DRAG_TYPE.SHARED_PAGE) NoteStore.setIsDragging(false);
      PageStore.setDragEnterPageIdx('');
      PageStore.setDragEnterChapterIdx('');
      NoteStore.setDraggedOffset({});
    },
  });

  const [, drop] = useDrop({
    accept: DRAG_TYPE.PAGE,
    drop: () => {
      PageStore.moveNotePage(chapter.id, chapterIdx, index);
    },
    hover() {
      if (PageStore.dragEnterChapterIdx !== chapterIdx)
        PageStore.setDragEnterChapterIdx(chapterIdx);
      if (PageStore.dragEnterPageIdx !== index)
        PageStore.setDragEnterPageIdx(index);
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const handleSelectPage = useCallback((e) => {
    ChapterStore.setMoveInfoMap(new Map([[chapter.id, chapterMoveInfo]]));
    ChapterStore.setIsCtrlKeyDown(false);

    if (e.ctrlKey) {
      if (PageStore.moveInfoMap.get(page.id)) PageStore.deleteMoveInfoMap(page.id);
      else PageStore.appendMoveInfoMap(page.id, pageMoveInfo);
      PageStore.setIsCtrlKeyDown(true);
      return;
    }

    PageStore.setMoveInfoMap(new Map([[page.id, pageMoveInfo]]));
    PageStore.setIsCtrlKeyDown(false);
    onClick(page.id);
  }, [page]);

  const handlePageName = (e) => PageStore.setRenameText(checkMaxLength(e));

  const handlePageTextInput = (isEscape) => {
    if (!isEscape) {
      PageStore.renameNotePage(chapter.id);
    }

    PageStore.setRenameId('');
    NoteStore.LNBChapterCoverRef.removeEventListener(
      'wheel',
      NoteStore.disableScroll,
    );
  };

  const handleTooltip = e => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth)
  };

  const handleFocus = (e) => e.target.select();

  return useObserver(() => (
    <PageCover
      ref={
        authStore.hasPermission('noteSharePage', 'C') && !PageStore.renameId
          ? (page.type === 'note' 
            ? (node) => drag(drop(node))
            : drag)
          : null
      }
      id={page.id}
      className={'page-li'}
      onClick={handleSelectPage}
    >
      <PageMargin />
      {PageStore.getRenameId() === page.id ? (
        <PageTextInput
          maxLength="200"
          placeholder={PageStore.renamePrevText}
          value={PageStore.renameText}
          onClick={e => e.stopPropagation()}
          onChange={handlePageName}
          onBlur={handlePageTextInput.bind(null, false)}
          onKeyDown={e => {
            if (e.key === 'Enter') handlePageTextInput(false);
            else if (e.key === 'Escape') handlePageTextInput(true);
          }}
          onFocus={handleFocus}
          autoFocus={true}
        />
      ) : (
        <PageTextCover
          className={
            PageStore.dragEnterChapterIdx === chapterIdx
              ? PageStore.dragEnterPageIdx === index
                && (page.type === 'note')
                ? 'borderTopLine'
                : ''
              : ''
          }
        >
          <PageTextContainer
            className={
              PageStore.isCtrlKeyDown
                ? (PageStore.moveInfoMap.get(page.id)
                    ? 'selected'
                    : '')
                : (NoteStore.showPage && (
                    NoteStore.isDragging && PageStore.moveInfoMap.size > 0
                      ? page.id === [...PageStore.moveInfoMap][0][0]
                      : page.id === PageStore.currentPageId)
                    ? 'selected'
                    : '')
            }
          >
            <Tooltip 
              placement='bottomLeft'
              title={isEllipsisActive ? page.text : null}
            >
              <PageText onMouseOver={handleTooltip}>{page.text}</PageText>
            </Tooltip>
            {/* {(page.modified_date && moment().isBefore(moment(page.modified_date).add(72,'hours'))) && <NewNoteMark />} */}
            <ContextMenu
              noteType={'page'}
              note={page}
              chapterIdx={chapterIdx}
              pageIdx={index}
              parent={chapter}
            />
          </PageTextContainer>
        </PageTextCover>
      )}
    </PageCover>
  ));
};

export default Page;
