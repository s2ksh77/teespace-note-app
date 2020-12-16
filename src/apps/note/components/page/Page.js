import React, { useCallback, useEffect, useMemo } from 'react';
import { Observer, useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from "react-dnd-html5-backend";
import ContextMenu from '../common/ContextMenu';
import {
  PageCover,
  PageMargin,
  PageTextCover,
  PageText,
  PageTextInput,
} from '../../styles/pageStyle';

const Page = ({ page, index, chapter, chapterIdx, onClick }) => {
  const { NoteStore, PageStore } = useNoteStore();
  const moveInfo = {
    pageId: page.id,
    pageIdx: index,
    chapterId: chapter.id,
    chapterIdx: chapterIdx,
    shareData: {
      id: page.id,
      text: page.text,
      date: page.modified_date,
    },
  };

  const [, drag, preview] = useDrag({
    item: { id: page.id, type: page.type === 'note' ? 'Item:Note:Pages' : 'Item:Note:SharedPages' },
    begin: (monitor) => {
      if (!PageStore.moveInfoList.find(info => info.pageId === page.id)) {
        PageStore.setMoveInfoList([moveInfo]);
        PageStore.setIsCtrlKeyDown(false);
      }

      PageStore.setMovePageId(page.id);
      NoteStore.setIsDragging(true);
      NoteStore.setDraggedType('page');
      NoteStore.setDraggedTitle(page.text);
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());

      return {
        type: page.type === 'note' ? 'Item:Note:Pages' : 'Item:Note:SharedPages',
        data: PageStore.moveInfoList.map(moveInfo => moveInfo.shareData),
      };
    },
    end: (item, monitor) => {
      const res = monitor.getDropResult();
      if (res.target === 'Platform:Room')
        PageStore.createNoteSharePage(res.targetData.id, item.data);

      PageStore.setDragEnterPageIdx('');
      PageStore.setDragEnterChapterIdx('');

      NoteStore.setIsDragging(false);
      NoteStore.setDraggedType('');
      NoteStore.setDraggedTitle('');
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
    if (e.ctrlKey) {
      const idx = PageStore.moveInfoList.findIndex((info) => info.pageId === page.id);
      if (idx === -1) PageStore.appendMoveInfoList(moveInfo);
      else PageStore.removeMoveInfoList(idx);
      PageStore.setIsCtrlKeyDown(true);
      return;
    }

    PageStore.setMoveInfoList([moveInfo]);
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

  const handleFocus = (e) => e.target.select();

  return useObserver(() => (
    <PageCover
      ref={page.type === 'note' ? (node) => drag(drop(node)) : drag}
      id={page.id}
      className={
        'page-li' +
        (PageStore.isCtrlKeyDown
          ? (PageStore.moveInfoList.find((info) => info.pageId === page.id)
              ? ' selected'
              : '')
          : (NoteStore.showPage && (
              NoteStore.isDragging
                ? page.id === PageStore.movePageId
                : page.id === PageStore.currentPageId)
              ? ' selected'
              : ''))
      }
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
        <PageTextCover
          style={
            page.id === PageStore.getRenamePageId() && PageStore.isRename
              ? { background: '#ffffff' }
              : { background: 'unset' }
          }
        >
          <PageTextInput
            maxLength="200"
            placeholder='새 페이지'
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
        </PageTextCover>
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
            <PageText>{page.text}</PageText>
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
          </PageTextCover>
        )}
    </PageCover>
  ));
};

export default Page;
