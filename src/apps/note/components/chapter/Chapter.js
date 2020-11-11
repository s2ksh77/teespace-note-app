import React, { useEffect } from 'react';
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

const Chapter = ({ chapter, index }) => {
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
    item: { id: chapter.id, type: chapter.type === 'notebook' ? 'chapter' : 'shared' },
    begin: () => {
      ChapterStore.setMoveChapterIdx(index);

      NoteStore.setIsDragging(true);
      NoteStore.setDraggedType('chapter');
      NoteStore.setDraggedTitle(chapter.text);
    },
    end: () => {
      ChapterStore.setDragEnterChapterIdx('');

      NoteStore.setIsDragging(false);
      NoteStore.setDraggedType('');
      NoteStore.setDraggedTitle('');
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

  const onClickChapterBtn = (id, children) => async () => {
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

  const renderChapterIcon = () => {
    if (!["shared", "shared_page"].includes(chapter.type)) {
      return <ChapterColor color={chapter.color} chapterId={chapter.id} />;
    } else {
      return <ChapterShareIcon selected={ChapterStore.getCurrentChapterId() === chapter.id} src={shareImg} />
    }
  }
  return useObserver(() => (
    <ChapterContainer
      ref={chapter.type === 'notebook' ? drop : null}
      className={
        ChapterStore.dragEnterChapterIdx === index
          ? 'borderTopLine'
          : ''
      }
      id={chapter.id}
      key={chapter.id}
      itemType="chapter"
    >
      <ChapterCover
        ref={chapter.type === 'notebook' ? (node) => drag(dropChapter(node)) : drag}
        onClick={onClickChapterBtn(chapter.id, chapter.children)}
      >
        {renderChapterIcon()}
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
        showNewPage={!['shared','shared_page'].includes(chapter.type)}
        children={chapter.children}
        chapterId={chapter.id}
        chapterIdx={index}
        type={chapter.type}
      />
    </ChapterContainer>
  ));
};

export default Chapter;
