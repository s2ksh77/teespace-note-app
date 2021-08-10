import React, { useCallback, useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Tooltip } from 'antd';
import moment from 'moment-timezone';
import useNoteStore from '../../store/useStore';
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
import NoteUtil from '../../NoteUtil';
import { DRAG_TYPE } from '../../GlobalVariable';
import { checkMaxLength } from '../common/validators';

const PageItem = ({ page, index, chapter, chapterIdx, onClick }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  chapter.text = NoteUtil.decodeStr(chapter.text);
  page.text = NoteUtil.decodeStr(page.text);

  const { id, type, text: title } = page;
  const [renameTitle, setRenameTitle] = useState(title);

  const chapterDragData = {
    item: chapter,
    chapterIdx,
  };
  const pageDragData = {
    item: page,
    pageIdx: index,
    chapterId: chapter.id,
    chapterIdx,
  };

  const [, drag, preview] = useDrag({
    item: {
      id,
      type: type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE,
    },
    begin: monitor => {
      if (!PageStore.dragData.get(id)) {
        PageStore.setDragData(new Map([[id, pageDragData]]));
        PageStore.setIsCtrlKeyDown(false);
      }

      NoteStore.setDraggedType('page');
      NoteStore.setDraggedItems(PageStore.getSortedDragDataList().map(data => data.item));
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
      NoteStore.setIsDragging(true);

      return {
        type: type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE,
        data: [...PageStore.dragData].map(keyValue => {
          const { item } = keyValue[1];
          return {
            id: item.id,
            text: item.text,
            date: item.modified_date,
            type: item.type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE,
            chapterId: item.parent_notebook,
          };
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
      ChapterStore.setDragEnterChapterIdx('');
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
      if (PageStore.dragEnterPageIdx !== index) PageStore.setDragEnterPageIdx(index);
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const handlePageSelect = useCallback(
    e => {
      if ((type === 'recycle' || PageStore.isRecycleBin) && e.ctrlKey) return;

      if (e.ctrlKey) {
        if (PageStore.dragData.get(id)) PageStore.deleteDragData(id);
        else PageStore.appendDragData(id, pageDragData);
        PageStore.setIsCtrlKeyDown(true);
        return;
      }

      ChapterStore.setDragData(new Map([[chapter.id, chapterDragData]]));
      ChapterStore.setIsCtrlKeyDown(false);
      PageStore.setDragData(new Map([[id, pageDragData]]));
      PageStore.setIsCtrlKeyDown(false);
      onClick(id);
    },
    [page],
  );

  const handleTitleChange = e => {
    setRenameTitle(checkMaxLength(e));
  };

  const handleRename = isEscape => {
    if (isEscape || !renameTitle) {
      setRenameTitle(title);
    } else if (renameTitle !== title) {
      PageStore.renameNotePage({
        id,
        title: renameTitle,
        chapterId: chapter.id,
      });
    }

    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  };

  const handleTooltip = e => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth);
  };

  const handleFocus = e => e.target.select();

  useEffect(() => {
    setRenameTitle(title);
  }, [title]);

  return useObserver(() => (
    <PageCover
      ref={
        authStore.hasPermission('noteSharePage', 'C') &&
        !PageStore.renameId &&
        type !== 'recycle'
          ? type === 'note'
            ? node => drag(drop(node))
            : drag
          : null
      }
      id={id}
      className="page-li"
      onClick={handlePageSelect}
    >
      <PageMargin appType={NoteStore.appType} />
      {PageStore.getRenameId() === id ? (
        <PageTextInput
          maxLength="200"
          placeholder={title}
          value={renameTitle}
          onClick={e => e.stopPropagation()}
          onChange={handleTitleChange}
          onBlur={handleRename.bind(null, false)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleRename(false);
            else if (e.key === 'Escape') handleRename(true);
          }}
          onFocus={handleFocus}
          autoFocus
        />
      ) : (
        <PageTextCover
          className={
            PageStore.dragEnterChapterIdx === chapterIdx &&
            PageStore.dragEnterPageIdx === index &&
            type === 'note'
              ? 'borderTopLine'
              : ''
          }
          appType={NoteStore.appType}
        >
          <PageTextContainer
            className={
              PageStore.isCtrlKeyDown
                ? PageStore.dragData.get(id)
                  ? 'selected'
                  : ''
                : NoteStore.showPage &&
                  (NoteStore.isDragging && PageStore.dragData.size > 0
                    ? id === [...PageStore.dragData][0][0]
                    : id === PageStore.currentPageId)
                ? 'selected'
                : ''
            }
          >
            <Tooltip placement="bottomLeft" title={isEllipsisActive ? title : null}>
              <PageText onMouseOver={handleTooltip}>{title}</PageText>
            </Tooltip>
            {/* {(page.modified_date && moment().isBefore(moment(page.modified_date).add(72,'hours'))) && <NewNoteMark />} */}
            {(authStore.hasPermission('notePage', 'U') || page.type === 'shared') && (
              <ContextMenu
                noteType="page"
                note={page}
                chapterIdx={chapterIdx}
                pageIdx={index}
                parent={chapter}
              />
            )}
          </PageTextContainer>
        </PageTextCover>
      )}
    </PageCover>
  ));
};

export default PageItem;
