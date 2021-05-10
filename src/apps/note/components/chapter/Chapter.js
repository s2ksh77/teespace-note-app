import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import useNoteStore from '../../store/useStore';
import ChapterColor from './ChapterColor';
import ChapterText from './ChapterText';
import PageList from '../page/PageList';
import {
  ChapterContainer,
  ChapterCover,
  ChapterTextInput,
  ChapterShareIcon,
} from '../../styles/chpaterStyle';
import trashImg from '../../assets/trash.svg';
import shareImg from '../../assets/share_1.svg';
import sharedPageImg from '../../assets/page_shared.svg';
import { CHAPTER_TYPE, DRAG_TYPE } from '../../GlobalVariable';
import NoteUtil from '../../NoteUtil';
import { checkMaxLength } from '../common/validators';

const Chapter = ({ chapter, index, flexOrder, isShared }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const chapterContainerRef = useRef(null);
  // 주의: ChapterStore.chapterList의 isFolded는 getNoteChapterList때만 정확한 정보 담고 있음
  const [isFolded, setIsFolded] = useState(
    chapter.isFolded ? chapter.isFolded : false,
  );

  // 중복체크 후 다시 입력받기 위해 ref 추가
  const { id, text: title, color } = chapter;
  const chapterMoveInfo = useMemo(
    () => ({
      item: chapter,
      chapterIdx: index,
    }),
    [chapter, index],
  );

  // 챕터를 다른 챕터 영역에 drop했을 때
  const [, drop] = useDrop({
    accept: DRAG_TYPE.CHAPTER,
    drop: () => {
      if (ChapterStore.dragEnterChapterIdx >= 0) ChapterStore.moveChapter();
    },
    hover(item, monitor) {
      if (!chapterContainerRef.current) return;
      const hoverBoundingRect = chapterContainerRef.current.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect.height / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (
        hoverClientY < hoverMiddleY &&
        ChapterStore.dragEnterChapterIdx !== index
      ) {
        ChapterStore.setDragEnterChapterIdx(index);
      } else if (
        hoverClientY > hoverMiddleY &&
        Chapter.dragEnterChapterIdx !== index + 1
      ) {
        ChapterStore.setDragEnterChapterIdx(index + 1);
      }
    },
  });

  // 챕터를 drag했을 때
  const [, drag, preview] = useDrag({
    item: {
      id: chapter.id,
      type: isShared ? DRAG_TYPE.SHARED_CHAPTER : DRAG_TYPE.CHAPTER,
    },
    begin: monitor => {
      if (!ChapterStore.moveInfoMap.get(chapter.id)) {
        ChapterStore.setMoveInfoMap(new Map([[chapter.id, chapterMoveInfo]]));
        ChapterStore.setIsCtrlKeyDown(false);
      }

      NoteStore.setDraggedType('chapter');
      NoteStore.setDraggedItems(
        ChapterStore.getSortedMoveInfoList().map(moveInfo => moveInfo.item),
      );
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
      NoteStore.setIsDragging(true);

      return {
        type: isShared ? DRAG_TYPE.SHARED_CHAPTER : DRAG_TYPE.CHAPTER,
        data: [...ChapterStore.moveInfoMap].map(keyValue => {
          const { item } = keyValue[1];
          return {
            id: item.id,
            text: item.text,
            date: item.modified_date,
            type: isShared ? DRAG_TYPE.SHARED_CHAPTER : DRAG_TYPE.CHAPTER,
          };
        }),
      };
    },
    end: async (item, monitor) => {
      const res = monitor.getDropResult();
      if (res && res.target === 'Platform:Friend') {
        const roomInfo = await res.findRoom();
        ChapterStore.createNoteShareChapter(roomInfo.id, item.data);
      } else if (res && res.target === 'Platform:Room') {
        ChapterStore.createNoteShareChapter(res.targetData.id, item.data);
      }

      if (!res && item.type === DRAG_TYPE.SHARED_CHAPTER)
        NoteStore.setIsDragging(false);
      ChapterStore.setDragEnterChapterIdx('');
      NoteStore.setDraggedOffset({});
    },
  });

  // 페이지를 drag하여 챕터에 drop 또는 hover했을 때
  const [, dropChapter] = useDrop({
    accept: DRAG_TYPE.PAGE,
    drop: () => {
      PageStore.moveNotePage(chapter.id, index, 0);
    },
    hover() {
      if (PageStore.dragEnterPageIdx !== 0) PageStore.setDragEnterPageIdx(0);
      if (PageStore.dragEnterChapterIdx !== index)
        PageStore.setDragEnterChapterIdx(index);
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const handleChapterName = e => ChapterStore.setRenameText(checkMaxLength(e));

  const handleChapterTextInput = isEscape => () => {
    if (!isEscape && ChapterStore.renameText !== title) {
      ChapterStore.renameNoteChapter(color);
    }

    ChapterStore.setRenameId('');
    NoteStore.LNBChapterCoverRef.removeEventListener(
      'wheel',
      NoteStore.disableScroll,
    );
  };

  const onClickChapterBtn = useCallback(
    e => {
      if (!PageStore.isReadMode()) return;

      if (ChapterStore.moveInfoMap.size > 0 && e.ctrlKey) {
        if (ChapterStore.moveInfoMap.get(chapter.id))
          ChapterStore.deleteMoveInfoMap(chapter.id);
        else ChapterStore.appendMoveInfoMap(chapter.id, chapterMoveInfo);
        ChapterStore.setIsCtrlKeyDown(true);
        return;
      }

      ChapterStore.setMoveInfoMap(new Map([[chapter.id, chapterMoveInfo]]));
      ChapterStore.setIsCtrlKeyDown(false);
      PageStore.setIsRecycleBin(false);
      ChapterStore.setCurrentChapterId(chapter.id);
      let pageId = '';
      if (chapter.children.length > 0) pageId = chapter.children[0].id;
      PageStore.setCurrentPageId(pageId);
      NoteStore.setShowPage(true);
      PageStore.fetchCurrentPageData(pageId);
      if (pageId)
        PageStore.setMoveInfoMap(
          new Map([
            [
              pageId,
              {
                item: chapter.children[0],
                pageIdx: 0,
                chapterId: chapter.id,
                chapterIdx: index,
              },
            ],
          ]),
        );
      else PageStore.clearMoveInfoMap();
      PageStore.setIsCtrlKeyDown(false);
    },
    [chapter],
  );

  const handleFocus = e => e.target.select();

  const renderChapterIcon = () => {
    if (!isShared) {
      if (chapter.type === CHAPTER_TYPE.RECYCLE_BIN)
        return (
          <ChapterShareIcon
            selected={ChapterStore.currentChapterId === id}
            src={trashImg}
          />
        );
      return <ChapterColor color={color} chapterId={id} />;
    }
    if (chapter.type === 'shared_page')
      return (
        <ChapterShareIcon
          selected={ChapterStore.currentChapterId === id}
          src={sharedPageImg}
        />
      );
    return (
      <ChapterShareIcon
        selected={ChapterStore.currentChapterId === id}
        src={shareImg}
      />
    );
  };

  const handleFoldBtnClick = e => {
    e.stopPropagation();
    NoteUtil.setLocalChapterFoldedState({
      channelId: NoteStore.notechannel_id,
      chapterId: id,
      isFolded: !isFolded,
      isTheRest: isShared,
    });
    setIsFolded(!isFolded);
  };

  return useObserver(() => (
    <>
      <ChapterContainer
        ref={!isShared ? drop(chapterContainerRef) : null}
        className={
          (isFolded ? 'folded ' : '') +
          (ChapterStore.dragEnterChapterIdx === index && !isShared
            ? 'borderTopLine'
            : '') +
          (ChapterStore.dragEnterChapterIdx === index + 1 &&
          ChapterStore.dragEnterChapterIdx ===
            ChapterStore.chapterList.length - ChapterStore.sharedCnt &&
          !isShared
            ? 'borderBottomLine'
            : '')
        }
        id={chapter.id}
        key={chapter.id}
        order={flexOrder}
        itemType="chapter"
      >
        <ChapterCover
          className={`chapter-div${
            ChapterStore.isCtrlKeyDown
              ? ChapterStore.moveInfoMap.get(chapter.id)
                ? ' selectedMenu'
                : ''
              : (
                  NoteStore.isDragging && ChapterStore.moveInfoMap.size > 0
                    ? chapter.id === [...ChapterStore.moveInfoMap][0][0]
                    : chapter.id === ChapterStore.currentChapterId
                )
              ? ' selectedMenu'
              : ''
          }`}
          ref={
            authStore.hasPermission('noteShareChapter', 'C') &&
            !ChapterStore.renameId
              ? !isShared
                ? node => drag(dropChapter(node))
                : drag
              : null
          }
          onClick={onClickChapterBtn}
        >
          {renderChapterIcon()}
          {ChapterStore.getRenameId() === id ? (
            <ChapterTextInput
              paddingLeft={isShared ? '2.63rem' : '1.69rem'}
              maxLength="200"
              placeholder={ChapterStore.renamePrevText}
              value={ChapterStore.renameText}
              onClick={e => e.stopPropagation()}
              onChange={handleChapterName}
              onBlur={handleChapterTextInput(false)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleChapterTextInput(false)();
                else if (e.key === 'Escape') handleChapterTextInput(true)();
              }}
              onFocus={handleFocus}
              autoFocus
            />
          ) : (
            <ChapterText
              chapter={chapter}
              index={index}
              handleFoldBtnClick={handleFoldBtnClick}
              isFolded={isFolded}
            />
          )}
        </ChapterCover>
        <PageList
          showNewPage={!isShared && chapter.type !== CHAPTER_TYPE.RECYCLE_BIN}
          chapter={chapter}
          chapterIdx={index}
        />
      </ChapterContainer>
    </>
  ));
};

export default Chapter;
