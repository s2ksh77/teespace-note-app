import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
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
import EditorStore from '../../store/editorStore';

const Page = ({ page, index, children, chapterId, chapterIdx }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const [, drag, preview] = useDrag({
    item: { id: page.id, type: 'page' },
    begin: () => {
      PageStore.setMovePageId(page.id);
      PageStore.setMovePageIdx(index);
      PageStore.setMoveChapterId(chapterId);
      PageStore.setMoveChapterIdx(chapterIdx);

      NoteStore.setIsDragging(true);
      NoteStore.setDraggedType('page');
      NoteStore.setDraggedTitle(page.text);
    },
    end: () => {
      PageStore.setDragEnterPageIdx('');
      PageStore.setDragEnterChapterIdx('');

      NoteStore.setIsDragging(false);
      NoteStore.setDraggedType('');
      NoteStore.setDraggedTitle('');
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

  const onClickLnbPage = async (id) => {
    if (PageStore.isEdit) return;
    NoteStore.setShowPage(true);
    ChapterStore.setCurrentChapterId(chapterId);
    await PageStore.setCurrentPageId(id);
    EditorStore.handleLinkListener();
    if (NoteStore.layoutState === 'collapse')
      NoteStore.setTargetLayout('Content');
  };

  const handlePageName = (e) => {
    const {
      target: { value },
    } = e;
    PageStore.setRenamePageText(value);
  };

  const handlePageTextInput = (isEscape) => {
    if (!isEscape) {
      PageStore.renamePage(chapterId);
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
      ref={(node) => drag(drop(node))}
      id={page.id}
      className={
        'page-li' +
        (NoteStore.showPage && (
          PageStore.movePageId
            ? page.id === PageStore.movePageId
            : page.id === PageStore.currentPageId)
          ? ' selected'
          : '')
      }
      onClick={onClickLnbPage.bind(null, page.id)}
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
              PageStore.dragEnterChapterIdx !== chapterIdx
                ? ''
                : PageStore.dragEnterPageIdx === index
                  ? 'borderTopLine'
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
