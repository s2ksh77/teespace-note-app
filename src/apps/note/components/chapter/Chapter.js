import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useObserver } from 'mobx-react';
import { Message } from 'teespace-core';
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
import sharedPageImg from '../../assets/page_share.svg';

const Chapter = ({ chapter, index, isShared }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const [openValidModal, setOpenValidModal] = useState(false);
  const [isFolded, setIsFolded] = useState(false);

  // 중복체크 후 다시 입력받기 위해 ref 추가
  const titleInput = useRef(null);
  const { id, text:title, color } = chapter;
  const chapterMoveInfo = {
    chapterId: chapter.id,
    chapterIdx: index,
    shareData: {
      id: chapter.id,
      text: chapter.text,
      date: chapter.modified_date,
    },
  };

  // 챕터를 다른 챕터 영역에 drop했을 때
  const [, drop] = useDrop({
    accept: 'Item:Note:Chapters',
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
    item: { id: chapter.id, type: isShared ? 'Item:Note:SharedChapters' : 'Item:Note:Chapters' },
    begin: (monitor) => {
      if (!ChapterStore.moveInfoMap.get(chapter.id)) {
        ChapterStore.setMoveInfoMap(new Map([[chapter.id, chapterMoveInfo]]));
        ChapterStore.setIsCtrlKeyDown(false);
      }

      NoteStore.setDraggedComponentId(chapter.id);
      NoteStore.setDraggedComponentTitles(ChapterStore.getSortedMoveInfoList().map(moveInfo => moveInfo.shareData.text)); 
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
      NoteStore.setIsDragging(true);

      return {
        type: isShared ? 'Item:Note:SharedChapters' : 'Item:Note:Chapters',
        data: [...ChapterStore.moveInfoMap].map(keyValue => keyValue[1].shareData),
      };
    },
    end: (item, monitor) => {
      const res = monitor.getDropResult();
      if (res && res.target === 'Platform:Room')
        ChapterStore.createNoteShareChapter(res.targetData.id, item.data);

      ChapterStore.setDragEnterChapterIdx('');
      NoteStore.setDraggedOffset({});
    },
  });

  // 페이지를 drag하여 챕터에 drop 또는 hover했을 때
  const [, dropChapter] = useDrop({
    accept: 'Item:Note:Pages',
    drop: () => {
      PageStore.moveNotePage(chapter.id, index, 0);
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

  const handleChapterTextInput = (isEscape) => () => {
    // escape면 원래대로 돌아가기
    if (isEscape) {}
    // 기존과 동일 이름인 경우 통과
    else if (ChapterStore.renameChapterText === title) {}
    // 기존에 이미 있는 이름이라면 다시 입력해야
    else if (!ChapterStore.isValidChapterText(ChapterStore.renameChapterText)) {
      setOpenValidModal(true); return;
    }
    // 다 통과했으면 rename 가능
    else {
      ChapterStore.renameNoteChapter(color);
    }

    ChapterStore.setRenameChapterId('');
    NoteStore.LNBChapterCoverRef.removeEventListener(
      'wheel',
      NoteStore.disableScroll,
    );
  };

  const onClickChapterBtn = useCallback(e => {
    if (!PageStore.isReadMode()) return;

    if (e.ctrlKey) {
      if (ChapterStore.moveInfoMap.get(chapter.id)) ChapterStore.deleteMoveInfoMap(chapter.id);
      else ChapterStore.appendMoveInfoMap(chapter.id, chapterMoveInfo);
      ChapterStore.setIsCtrlKeyDown(true);
      return;
    }

    ChapterStore.setMoveInfoMap(new Map([[chapter.id, chapterMoveInfo]]));
    ChapterStore.setIsCtrlKeyDown(false);
    ChapterStore.setCurrentChapterId(chapter.id);
    let pageId = '';
    if (chapter.children.length > 0) pageId = chapter.children[0].id;
    NoteStore.setShowPage(true);
    PageStore.fetchCurrentPageData(pageId);
    if (pageId) PageStore.setMoveInfoMap(new Map([[pageId, {
      pageId: pageId,
      pageIdx: 0,
      chapterId: chapter.id,
      chapterIdx: index,
      shareData: {
        id: pageId,
        text: ChapterStore.chapterList[index].children[0]?.text,
        date: ChapterStore.chapterList[index].children[0]?.modified_date,
      }
    }]]))
    else PageStore.setMoveInfoMap(new Map());
    PageStore.setIsCtrlKeyDown(false);
  }, [chapter]);

  const handleFocus = (e) => e.target.select();

  const renderChapterIcon = () => {
    if (!isShared) {
      return <ChapterColor color={color} chapterId={id} />;
    }
    else {
      if (chapter.type === 'shared_page')
        return <ChapterShareIcon selected={ChapterStore.currentChapterId === id} src={sharedPageImg} />
      else
        return <ChapterShareIcon selected={ChapterStore.currentChapterId === id} src={shareImg} />
    }
  }

  const handleModalBtnClick = () => {
    setOpenValidModal(false);
    if (titleInput.current) titleInput.current.focus();   
  }

  const handleFoldBtnClick = (e) => {
    e.stopPropagation();
    
    const {
      dataset: { icon },
    } = e.currentTarget;
    
    if (icon === "angle-up") setIsFolded(true);
    else setIsFolded(false);
  };

  return useObserver(() => (
    <>
      <Message
        visible={openValidModal}
        title={"중복된 이름이 있습니다."}
        subtitle={"다른 이름을 입력하세요."}
        type="error"
        btns={[{
          type : 'solid',
          shape : 'round',
          text : '확인',
          onClick : handleModalBtnClick
        }]}
      />
      <ChapterContainer
        ref={!isShared ? drop : null}
        className={
          (isFolded
            ? 'folded '
            : '')
          + (ChapterStore.dragEnterChapterIdx === index
            && (!isShared)
            ? 'borderTopLine'
            : '')
        }
        id={chapter.id}
        key={chapter.id}
        itemType="chapter"
      >
        <ChapterCover
          className={'chapter-div'}
          ref={
            !isShared
              ? (node) => drag(dropChapter(node))
              : drag
          }
          onClick={onClickChapterBtn}
        >
          {renderChapterIcon()}
          {ChapterStore.getRenameChapterId() === id ? (
            <ChapterTextInput
              maxLength="200"
              placeholder={ChapterStore.renameChapterPrevText}
              value={ChapterStore.renameChapterText}
              onClick={e => e.stopPropagation()}
              onChange={handleChapterName}
              onBlur={handleChapterTextInput(false)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleChapterTextInput(false)();
                else if (e.key === 'Escape') handleChapterTextInput(true)();
              }}
              onFocus={handleFocus}
              autoFocus={true}
              ref={titleInput}
            />
          ) : (
              <ChapterText
                chapter={chapter}
                handleFoldBtnClick={handleFoldBtnClick}
                isFolded={isFolded}
              />
            )}
        </ChapterCover>
        <PageList
          showNewPage={!isShared}
          chapter={chapter}
          chapterIdx={index}
        />
      </ChapterContainer>
    </>
  ));
};

export default Chapter;
