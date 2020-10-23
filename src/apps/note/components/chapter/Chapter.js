import React from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import { useDrag, useDrop } from 'react-dnd';
import ChapterColor from '../chapter/ChapterColor';
import ChapterText from '../chapter/ChapterText';
import PageList from '../page/PageList';
import {
  ChapterContainer,
  ChapterCover,
  ChapterTextInput,
} from '../../styles/chpaterStyle';
import takaImg from '../../assets/file_move_taka.png';

var draggedChapterImg;
var draggedPageImg;
var fileMoveImg = new Image();
fileMoveImg.src = takaImg;

const Chapter = ({ chapter, index }) => {
  const { NoteStore, ChapterStore, PageStore } = useStore();

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

  const [, drag] = useDrag({
    item: { id: chapter.id, type: 'chapter' },
    begin: () => {
      ChapterStore.setMoveChapterIdx(index);
    },
    end: () => {
      ChapterStore.setDragEnterChapterIdx('');
    },
  });

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

  const onDragStartChapterContainer = (chapterText, e) => {
    if (ChapterStore.isMovingChapter) {
      e.dataTransfer.setDragImage(fileMoveImg, 0, 0);

      draggedChapterImg = document.createElement('div');
      draggedChapterImg.setAttribute('id', 'dragged-chapter-image');
      draggedChapterImg.setAttribute('class', 'draggedChapter');
      draggedChapterImg.innerText = chapterText;
      document.body.appendChild(draggedChapterImg);
    }
    else if (PageStore.isMovingPage) {
      const emptyImg = document.createElement('div');
      e.dataTransfer.setDragImage(emptyImg, 0, 0);

      draggedPageImg = document.createElement('div');
      draggedPageImg.setAttribute('id', 'dragged-page-image');
      draggedPageImg.setAttribute('class', 'draggedPage');
      draggedPageImg.style.width =
        document.getElementById(PageStore.movePageId).offsetWidth - 30 + 'px';
      draggedPageImg.style.height =
        document.getElementById(PageStore.movePageId).offsetHeight + 'px';
      draggedPageImg.innerText = document.getElementById(
        PageStore.movePageId,
      ).innerText;
      document.body.appendChild(draggedPageImg);
    }

    document.body.style.overflowY = 'hidden';
  };

  const onDragOverChapterContainer = (e) => {
    if (ChapterStore.isMovingChapter) {
      draggedChapterImg.style.top = e.clientY + 30 + 'px';
      draggedChapterImg.style.left = e.clientX + 60 + 'px';
    }
    else if (PageStore.isMovingPage) {
      draggedPageImg.style.top = e.clientY + 10 + 'px';
      draggedPageImg.style.left = e.clientX + 10 + 'px';
    }

    e.preventDefault();
  };

  const onDragEnterChapter = (enterChapterIdx) => {
    if (!PageStore.isMovingPage) return;

    PageStore.setDragEnterPageIdx(0);
    PageStore.setDragEnterChapterIdx(enterChapterIdx);
  };

  const removeDropLine = () => {
    if (ChapterStore.isMovingChapter) {
      ChapterStore.setDragEnterChapterIdx('');
      document.body.removeChild(draggedChapterImg);
      ChapterStore.setIsMovingChapter(false);
    }
    else if (PageStore.isMovingPage) {
      PageStore.setDragEnterPageIdx('');
      PageStore.setDragEnterChapterIdx('');
      // const img = document.getElementById('dragged-page-image')
      // if (img) img.remove();
      document.body.removeChild(draggedPageImg);
      PageStore.setIsMovingPage(false);
    }

    document.body.style.overflowY = '';
  };

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
      <ChapterCover
        ref={drag}
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
