import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from "react-dnd-html5-backend";
import DragPreview from '../common/DragPreview';
import ChapterColor from '../chapter/ChapterColor';
import ChapterText from '../chapter/ChapterText';
import PageList from '../page/PageList';
import {
  ChapterContainer,
  ChapterCover,
  ChapterTextInput,
} from '../../styles/chpaterStyle';

const Chapter = ({ chapter, index }) => {
  const { NoteStore, ChapterStore, PageStore } = useStore();

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
  const [{ isDragging }, drag, preview] = useDrag({
    item: { id: chapter.id, type: 'chapter' },
    begin: () => {
      ChapterStore.setMoveChapterIdx(index);
    },
    end: () => {
      ChapterStore.setDragEnterChapterIdx('');
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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

  const onClickChapterBtn = async (id, children) => {
    if (PageStore.isEdit) return;
    ChapterStore.setCurrentChapterId(id);
    let targetPage = '';
    if (children.length) targetPage = children[0]?.id;
    NoteStore.setShowPage(true);
    await PageStore.setCurrentPageId(targetPage);
  };

  const handleChapterName = (e) => {
    const {
      target: { value },
    } = e;
    ChapterStore.setRenameChapterText(value);
  };

  const handleChapterTextInput = (isEscape, color) => {
    if (!isEscape && ChapterStore.isValidChapterText(ChapterStore.renameChapterText)) {
      ChapterStore.renameChapter(color);
    }

    ChapterStore.setRenameChapterId('');
    NoteStore.LNBChapterCoverRef.removeEventListener(
      'wheel',
      NoteStore.disableScroll,
    );
  };

  const handleFocus = (e) => e.target.select();

  return useObserver(() => (
    <ChapterContainer
      ref={drop}
      className={
        ChapterStore.dragEnterChapterIdx === index
          ? 'borderTopLine'
          : ''
      }
      id={chapter.id}
      key={chapter.id}
      itemType="chapter"
    >
      {isDragging 
        ? <DragPreview type={'chapter'} title={chapter.text} /> 
        : null}
      <ChapterCover
        ref={(node) => drag(dropChapter(node))}
        onClick={onClickChapterBtn.bind(null, chapter.id, chapter.children)}
      >
        <ChapterColor color={chapter.color} chapterId={chapter.id} />
        {ChapterStore.getRenameChapterId() === chapter.id ? (
          <ChapterTextInput
            maxLength="200"
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
            text={chapter.text}
            chapterId={chapter.id}
            color={chapter.color}
          />
        )}
      </ChapterCover>
      <PageList
        children={chapter.children}
        chapterId={chapter.id}
        chapterIdx={index}
      />
    </ChapterContainer>
  ));
};

export default Chapter;
