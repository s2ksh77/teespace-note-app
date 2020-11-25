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

const Page = ({ page, index, children, chapterId, chapterIdx, type, onClick }) => {
  const { NoteStore, PageStore } = useNoteStore();

  const [, drag, preview] = useDrag({
    item: { id: page.id, type: type === 'notebook' || type === 'default' ? 'page' : 'shared_page' },
    begin: (monitor) => {
      PageStore.setMovePageId(page.id);
      PageStore.setMovePageIdx(index);
      PageStore.setMoveChapterId(chapterId);
      PageStore.setMoveChapterIdx(chapterIdx);

      NoteStore.setIsDragging(true);
      NoteStore.setDraggedType('page');
      NoteStore.setDraggedTitle(page.text);
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
    },
    end: () => {
      PageStore.setDragEnterPageIdx('');
      PageStore.setDragEnterChapterIdx('');

      NoteStore.setIsDragging(false);
      NoteStore.setDraggedType('');
      NoteStore.setDraggedTitle('');
      NoteStore.setDraggedOffset({});
    },
  });

  const [, drop] = useDrop({
    accept: 'page',
    drop: () => {
      PageStore.movePage(chapterId, chapterIdx, children, index);
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
    onClick(page.id,e);
  }, []);

  const handlePageName = (e) => {
    const {
      target: { value },
    } = e;
    PageStore.setRenamePageText(value);
  };

  const handlePageTextInput = (isEscape) => {
    if (!isEscape) {
      PageStore.renameNotePage(chapterId);
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
      ref={type === 'notebook' || type === 'default' ? (node) => drag(drop(node)) : drag}
      id={page.id}
      className={
        'page-li' +
        (NoteStore.showPage && (
          NoteStore.isDragging
            ? page.id === PageStore.movePageId
            : page.id === PageStore.currentPageId)
          ? ' selected'
          : '')
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
                  && (type === 'notebook' || type === 'default')
                  ? 'borderTopLine'
                  : ''
                : ''
            }
          >
            <PageText>{page.text}</PageText>
            <ContextMenu
              type={'page'}
              chapterId={chapterId}
              chapterIdx={chapterIdx}
              pageId={page.id}
              pageTitle={page.text}
              nextSelectablePageId={
                children.length > 1
                  ? children[0].id === page.id
                    ? children[1].id
                    : children[0].id
                  : ''
              }
            />
          </PageTextCover>
        )}
    </PageCover>
  ));
};

export default Page;
