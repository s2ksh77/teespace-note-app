import React from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import { useDrag, useDrop } from 'react-dnd';
import ContextMenu from '../common/ContextMenu';
import {
  PageCover,
  PageMargin,
  PageTextCover,
  PageText,
  PageTextInput,
} from '../../styles/pageStyle';

const Page = ({ page, index, children, chapterId, chapterIdx }) => {
  const { NoteStore, ChapterStore, PageStore } = useStore();

  const [, drag] = useDrag({
    item: { id: page.id, type: 'page' },
    begin: () => {
      PageStore.setMovePageId(page.id);
      PageStore.setMovePageIdx(index);
      PageStore.setMoveChapterId(chapterId);
    },
  });

  const [, drop] = useDrop({
    accept: 'page',
    drop: () => {
      PageStore.movePage(chapterId, chapterIdx, children, index);
    },
  });

  const onClickLnbPage = async (id) => {
    NoteStore.setShowPage(true);
    ChapterStore.setCurrentChapterId(chapterId);
    await PageStore.setCurrentPageId(id);
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

  const onDragStartPage = (pageId, pageIdx) => {
    PageStore.setIsMovingPage(true);
    
  };

  const onDragEnterPage = (enterPageIdx) => {
    if (!PageStore.isMovingPage) return; // 챕터를 드래그하고 있는 경우

    PageStore.setDragEnterPageIdx(enterPageIdx);
    PageStore.setDragEnterChapterIdx(chapterIdx);
  };

  const onDropPage = (targetPageIdx) => {
    if (!PageStore.isMovingPage) return;

    PageStore.setMoveTargetPageList(children);
    PageStore.setMoveTargetPageIdx(targetPageIdx);
    PageStore.movePage(chapterId, chapterIdx);
  };

  return useObserver(() => (
    <PageCover
      ref={(node) => drag(drop(node))}
      id={page.id}
      className={
        'page-li' +
        NoteStore.showPage && page.id === PageStore.currentPageId
          ? ' selected'
          : ''
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
        <PageTextCover>
          <PageText>{page.text}</PageText>
          <ContextMenu
            type={'page'}
            chapterId={chapterId}
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
