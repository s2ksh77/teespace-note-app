import React, { useCallback, useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from "react-dnd-html5-backend";
import ContextMenu from '../common/ContextMenu';
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

const Page = ({ page, index, chapter, chapterIdx, onClick }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
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
    item: { id: page.id, type: page.type === 'note' ? 'Item:Note:Pages' : 'Item:Note:SharedPages' },
    begin: (monitor) => {
      if (!PageStore.moveInfoMap.get(page.id)) {
        PageStore.setMoveInfoMap(new Map([[page.id, pageMoveInfo]]));
        PageStore.setIsCtrlKeyDown(false);
      }

      NoteStore.setDraggedItems(PageStore.getSortedMoveInfoList().map(moveInfo => moveInfo.item));
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
      NoteStore.setIsDragging(true);

      return {
        type: page.type === 'note' ? 'Item:Note:Pages' : 'Item:Note:SharedPages',
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
    end: (item, monitor) => {
      const res = monitor.getDropResult();
      if (res && res.target === 'Platform:Room')
        PageStore.createNoteSharePage(res.targetData.id, item.data);

      PageStore.setDragEnterPageIdx('');
      PageStore.setDragEnterChapterIdx('');
      NoteStore.setDraggedOffset({});
    },
  });

  const [, drop] = useDrop({
    accept: 'Item:Note:Pages',
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

  const handlePageName = (e) => {
    const {
      target: { value },
    } = e;
    PageStore.setRenamePageText(value);
  };

  const handlePageTextInput = (isEscape) => {
    if (!isEscape) {
      PageStore.renameNotePage(chapter.id);
      PageStore.setIsRename(false);
    }

    PageStore.setRenamePageId('');
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
        !PageStore.renamePageId
          ? (page.type === 'note' 
            ? (node) => drag(drop(node))
            : drag)
          : null
      }
      id={page.id}
      className={'page-li'}
      onClick={handleSelectPage}
    >
      <PageMargin
        style={
          page.id === PageStore.getRenamePageId() && PageStore.isRename
            ? { background: '#ffffff' }
            : { background: 'unset' }
        }
      />
      {PageStore.getRenamePageId() === page.id ? (
        <PageTextContainer
          style={
            page.id === PageStore.getRenamePageId() && PageStore.isRename
              ? { background: '#ffffff' }
              : { background: 'unset' }
          }
        >
          <PageTextInput
            maxLength="200"
            placeholder={PageStore.renamePagePrevText}
            value={PageStore.renamePageText}
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
        </PageTextContainer>
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
            <ContextMenu
              noteType={'page'}
              chapter={chapter}
              chapterIdx={chapterIdx}
              page={page}
              nextSelectablePageId={
                chapter.children.length > 1
                  ? chapter.children[0].id === page.id
                    ? chapter.children[1].id
                    : chapter.children[0].id
                  : ''
              }
              type={page.type}
            />
          </PageTextContainer>
        </PageTextCover>
      )}
    </PageCover>
  ));
};

export default Page;
