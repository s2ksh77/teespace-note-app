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

const Page = ({ page, index, chapter, chapterIdx, onClick }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  chapter.text = NoteUtil.decodeStr(chapter.text);
  page.text = NoteUtil.decodeStr(page.text);

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
      id: page.id,
      type: page.type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE,
    },
    begin: monitor => {
      if (!PageStore.dragData.get(page.id)) {
        PageStore.setDragData(new Map([[page.id, pageDragData]]));
        PageStore.setIsCtrlKeyDown(false);
      }

      NoteStore.setDraggedType('page');
      NoteStore.setDraggedItems(
        PageStore.getSortedDragDataList().map(data => data.item),
      );
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
      NoteStore.setIsDragging(true);

      return {
        type: page.type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE,
        data: [...PageStore.dragData].map(keyValue => {
          const { item } = keyValue[1];
          return {
            id: item.id,
            text: item.text,
            date: item.modified_date,
            type: page.type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE,
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

      if (!res && item.type === DRAG_TYPE.SHARED_PAGE)
        NoteStore.setIsDragging(false);
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

  const handleSelectPage = useCallback(
    e => {
      ChapterStore.setDragData(new Map([[chapter.id, chapterDragData]]));
      ChapterStore.setIsCtrlKeyDown(false);

      if (e.ctrlKey) {
        if (PageStore.dragData.get(page.id))
          PageStore.deleteDragData(page.id);
        else PageStore.appendDragData(page.id, pageDragData);
        PageStore.setIsCtrlKeyDown(true);
        return;
      }

      PageStore.setDragData(new Map([[page.id, pageDragData]]));
      PageStore.setIsCtrlKeyDown(false);
      onClick(page.id);
    },
    [page],
  );

  const handlePageName = e => PageStore.setRenameText(checkMaxLength(e));

  const handlePageTextInput = isEscape => {
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
    setIsEllipsisActive(
      e.currentTarget.offsetWidth < e.currentTarget.scrollWidth,
    );
  };

  const handleFocus = e => e.target.select();

  return useObserver(() => (
    <PageCover
      ref={
        authStore.hasPermission('noteSharePage', 'C') &&
        !PageStore.renameId &&
        page.type !== 'recycle'
          ? page.type === 'note'
            ? node => drag(drop(node))
            : drag
          : null
      }
      id={page.id}
      className="page-li"
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
          autoFocus
        />
      ) : (
        <PageTextCover
          className={
            PageStore.dragEnterChapterIdx === chapterIdx
              ? PageStore.dragEnterPageIdx === index && page.type === 'note'
                ? 'borderTopLine'
                : ''
              : ''
          }
        >
          <PageTextContainer
            className={
              PageStore.isCtrlKeyDown
                ? PageStore.dragData.get(page.id)
                  ? 'selected'
                  : ''
                : NoteStore.showPage &&
                  (NoteStore.isDragging && PageStore.dragData.size > 0
                    ? page.id === [...PageStore.dragData][0][0]
                    : page.id === PageStore.currentPageId)
                ? 'selected'
                : ''
            }
          >
            <Tooltip
              placement="bottomLeft"
              title={isEllipsisActive ? page.text : null}
            >
              <PageText onMouseOver={handleTooltip}>{page.text}</PageText>
            </Tooltip>
            {/* {(page.modified_date && moment().isBefore(moment(page.modified_date).add(72,'hours'))) && <NewNoteMark />} */}
            {(authStore.hasPermission('notePage', 'U') ||
              page.type === 'shared') && (
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

export default Page;
