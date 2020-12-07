import React, { useCallback, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from "react-dnd-html5-backend";
import ChapterColor from '../chapter/ChapterColor';
import ChapterText from '../chapter/ChapterText';
import PageList from '../page/PageList';
import {
  ChapterContainer,
  ChapterCover,
  ChapterTextInput,
  ChapterShareIcon
} from '../../styles/chpaterStyle';
import shareImg from '../../assets/ts_share@3x.png';

const Chapter = ({ chapter, index, isShared }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  // 챕터를 다른 챕터 영역에 drop했을 때
  const [, drop] = useDrop({
    accept: 'chapter',
    drop: () => {
      ChapterStore.moveChapter(index);
    },
    hover() {
      if (ChapterStore.dragEnterChapterIdx !== index)
        ChapterStore.setDragEnterChapterIdx(index);
    },
  });

  // 챕터를 drag했을 때 
  const [, drag, preview] = useDrag({
    item: { id: chapter.id, type: isShared ? 'shared' : 'chapter' },
    begin: (monitor) => {
      ChapterStore.setMoveChapterIdx(index);

      NoteStore.setIsDragging(true);
      NoteStore.setDraggedType('chapter');
      NoteStore.setDraggedTitle(chapter.text);
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
    },
    end: () => {
      ChapterStore.setDragEnterChapterIdx('');

      NoteStore.setIsDragging(false);
      NoteStore.setDraggedType('');
      NoteStore.setDraggedTitle('');
      NoteStore.setDraggedOffset({});
    },
  });

  // 페이지를 drag하여 챕터에 drop 또는 hover했을 때
  const [, dropChapter] = useDrop({
    accept: 'page',
    drop: () => {
      PageStore.movePage(chapter.id, index, chapter.children, 0);
    },
    hover() {
      if (PageStore.dragEnterPageIdx !== 0)
        PageStore.setDragEnterPageIdx(0);
      if (PageStore.dragEnterChapterIdx !== index)
        PageStore.setDragEnterChapterIdx(index);
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const handleChapterName = (e) => {
    const {
      target: { value },
    } = e;
    ChapterStore.setRenameChapterText(value);
  };

  const handleChapterTextInput = (isEscape, color) => {
    if (!isEscape && ChapterStore.isValidChapterText(ChapterStore.renameChapterText)) {
      ChapterStore.renameNoteChapter(color);
    }

    ChapterStore.setRenameChapterId('');
    NoteStore.LNBChapterCoverRef.removeEventListener(
      'wheel',
      NoteStore.disableScroll,
    );
  };

  const onClickChapterBtn = useCallback(() => {
    if (!PageStore.isReadMode()) return;
    ChapterStore.setCurrentChapterId(chapter.id);
    let pageId = '';
    if (chapter.children.length > 0) pageId = chapter.children[0].id;
    NoteStore.setShowPage(true);
    PageStore.setCurrentPageId(pageId);
    PageStore.fetchCurrentPageData(pageId);
  }, [chapter]);

  const handleFocus = (e) => e.target.select();

  const renderChapterIcon = () => {
    if (!isShared) {
      return <ChapterColor color={chapter.color} chapterId={chapter.id} />;
    } else {
      return <ChapterShareIcon selected={ChapterStore.getCurrentChapterId() === chapter.id} src={shareImg} />
    }
  }
  return useObserver(() => (
    <ChapterContainer
      ref={!isShared ? drop : null}
      className={
        ChapterStore.dragEnterChapterIdx === index
          && (!isShared)
          ? 'borderTopLine'
          : ''
      }
      id={chapter.id}
      key={chapter.id}
      itemType="chapter"
    >
      <ChapterCover
        ref={
          !isShared
            ? (node) => drag(dropChapter(node))
            : drag
        }
        onClick={onClickChapterBtn}
      >
        {renderChapterIcon()}
        {ChapterStore.getRenameChapterId() === chapter.id ? (
          <ChapterTextInput
            maxLength="200"
            placeholder='새 챕터'
            value={ChapterStore.renameChapterText}
            onClick={e => e.stopPropagation()}
            onChange={handleChapterName}
            onBlur={handleChapterTextInput.bind(null, false, chapter.color)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleChapterTextInput(false, chapter.color);
              else if (e.key === 'Escape') handleChapterTextInput(true, chapter.color);
            }}
            onFocus={handleFocus}
            autoFocus={true}
          />
        ) : (
            <ChapterText
              chapter={chapter}
            />
          )}
      </ChapterCover>
      <PageList
        showNewPage={!isShared}
        chapter={chapter}
        chapterIdx={index}
      />
    </ChapterContainer>
  ));
};

export default Chapter;
