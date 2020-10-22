import React, { useEffect } from "react";
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import ChapterColor from "../chapter/ChapterColor";
import ChapterText from "../chapter/ChapterText";
import PageList from "../page/PageList";
import {
  ChapterContainer,
  Chapter,
  ChapterTextInput,
} from "../../styles/chpaterStyle";
import PageStore from "../../store/pageStore";
import takaImg from '../../assets/file_move_taka.png';

var draggedChapterImg;
var draggedPageImg;
var fileMoveImg = new Image();

const ChapterList = ({ type }) => {
  const { NoteStore, ChapterStore, PageStore, TagStore } = useStore();

  useEffect(() => {
    (async () => {
      if (ChapterStore.chapterList.length === 0) {
        await ChapterStore.getChapterList();
        if (ChapterStore.chapterList.length === 0) { NoteStore.setShowPage(false); return null; }
        NoteStore.setShowPage(true);
        const chapterId = ChapterStore.chapterList[0]?.id;
        const pageId = ChapterStore.chapterList[0]?.children?.[0]?.id;
        ChapterStore.setCurrentChapterId(chapterId)
        await PageStore.setCurrentPageId(pageId);
      }
    })()
  }, [])

  const onClickChapterBtn = async (id, children) => {
    if (PageStore.isEdit) return;
    ChapterStore.setCurrentChapterId(id);
    let targetPage = "";
    if (children.length) {
      targetPage = children[0]?.id;
    }
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
    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  };

  const handleFocus = (e) => e.target.select();

  const onDragStartChapterContainer = (chapterText, e) => {
    if (ChapterStore.isMovingChapter) {
      fileMoveImg.src = takaImg;
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
      draggedPageImg.style.width = document.getElementById(PageStore.movePageId).offsetWidth - 30 + 'px';
      draggedPageImg.style.height = document.getElementById(PageStore.movePageId).offsetHeight + 'px';
      draggedPageImg.innerText = document.getElementById(PageStore.movePageId).innerText;
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

  const onDragEnterChapterContainer = (enterChapterIdx) => {
    if (!ChapterStore.isMovingChapter) return;
    
    ChapterStore.setDragEnterChapterIdx(enterChapterIdx);
  };

  const onDragStartChapter = (chapterIdx) => {
    ChapterStore.setIsMovingChapter(true);
    ChapterStore.setMoveChapterIdx(chapterIdx);
  };

  const onDragEnterChapter = (enterChapterIdx) => {
    if (!PageStore.isMovingPage) return;

    PageStore.setDragEnterPageIdx(0);
    PageStore.setDragEnterChapterIdx(enterChapterIdx);
  };

  const onDropPage = (chapterId, chapterIdx, childrenList) => {
    if (!PageStore.isMovingPage) return; // 챕터를 드래그하고 있는 경우
    
    PageStore.setMoveTargetPageList(childrenList);
    PageStore.setMoveTargetPageIdx(0);
    PageStore.movePage(chapterId, chapterIdx);
  };

  const onDropChapter = (chapterIdx) => {
    if (!ChapterStore.isMovingChapter) return;

    ChapterStore.moveChapter(chapterIdx);
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
    <>
      {ChapterStore.chapterList.length > 0 && ChapterStore.chapterList.map((item, index) => (
        <ChapterContainer
          className={ChapterStore.dragEnterChapterIdx === index ? 'borderTopLine' : ''}
          id={item.id}
          key={item.id}
          itemType="chapter"
          onDragStart={onDragStartChapterContainer.bind(null, item.text)}
          onDragOver={onDragOverChapterContainer}
          onDragEnter={onDragEnterChapterContainer.bind(null, index)}
          onDrop={onDropChapter.bind(null, index)}
          onDragEnd={removeDropLine}
        >
          <Chapter
            onClick={onClickChapterBtn.bind(null, item.id, item.children)}
            draggable='true'
            onDragStart={onDragStartChapter.bind(null, index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={onDragEnterChapter.bind(null, index)}
            onDrop={onDropPage.bind(null, item.id, index, item.children)}
          >
            <ChapterColor color={item.color} chapterId={item.id} />
            {ChapterStore.getRenameChapterId() === item.id ? (
              <ChapterTextInput
                maxLength="200"
                value={ChapterStore.renameChapterText}
                onClick={(e) => e.stopPropagation()}
                onChange={handleChapterName}
                onBlur={handleChapterTextInput.bind(null, false, item.color)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { handleChapterTextInput(false, item.color); }
                  else if (e.key === "Escape") { handleChapterTextInput(true, item.color); }
                }}
                onFocus={handleFocus}
                autoFocus={true}
              />
            ) : (
                <ChapterText
                  text={item.text} chapterId={item.id} color={item.color} />
              )
            }
          </Chapter>
          <PageList
            children={JSON.stringify(item.children)}
            chapterId={item.id}
            chapterIdx={index}
          />
        </ChapterContainer>
      ))
      }
    </>
  ));
};
export default ChapterList;