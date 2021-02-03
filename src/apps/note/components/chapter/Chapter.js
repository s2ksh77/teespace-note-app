import React, { useCallback, useEffect, useState} from 'react';
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
import shareImg from '../../assets/share_1.svg';
import sharedPageImg from '../../assets/page_shared.svg';

const Chapter = ({ chapter, index, isShared }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const [isFolded, setIsFolded] = useState(false);

  // 중복체크 후 다시 입력받기 위해 ref 추가
  const { id, text:title, color } = chapter;
  const chapterMoveInfo = {
    item: chapter,
    chapterIdx: index,
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

      NoteStore.setDraggedType('chapter');
      NoteStore.setDraggedItems(ChapterStore.getSortedMoveInfoList().map(moveInfo => moveInfo.item)); 
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
      NoteStore.setIsDragging(true);

      return {
        type: isShared ? 'Item:Note:SharedChapters' : 'Item:Note:Chapters',
        data: [...ChapterStore.moveInfoMap].map(keyValue => {
          const item = keyValue[1].item;
          return {
            id: item.id,
            text: item.text,
            date: item.modified_date,
          }
        }),
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
    PageStore.setCurrentPageId(pageId);
    NoteStore.setShowPage(true);
    PageStore.fetchCurrentPageData(pageId);
    if (pageId) PageStore.setMoveInfoMap(new Map([[pageId, {
      item: chapter.children[0],
      pageIdx: 0,
      chapterId: chapter.id,
      chapterIdx: index,
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

  const handleFoldBtnClick = (e) => {
    e.stopPropagation();
    setIsFolded(!isFolded);
  };

  return useObserver(() => (
    <>
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
          className={'chapter-div'
          + (ChapterStore.isCtrlKeyDown
              ? (ChapterStore.moveInfoMap.get(chapter.id)
                ? ' selectedMenu'
                : '')
              : (NoteStore.isDragging && ChapterStore.moveInfoMap.size > 0
                  ? chapter.id === [...ChapterStore.moveInfoMap][0][0]
                  : chapter.id === ChapterStore.currentChapterId)
                ? ' selectedMenu'
                : '')
          }
          ref={
            !ChapterStore.renameChapterId
              ? (!isShared
                ? (node) => drag(dropChapter(node))
                : drag)
            :null
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
