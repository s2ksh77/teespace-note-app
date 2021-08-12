import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';
import ChapterText from './ChapterText';
import PageList from '../page/PageList';
import {
  ChapterContainer,
  ChapterCover,
  ChapterColor,
  ChapterTextInput,
} from '../../styles/chpaterStyle';
import { TrashIcon, ShareIcon, SharedPageIcon } from '../icons';
import { CHAPTER_TYPE, DRAG_TYPE } from '../../GlobalVariable';
import NoteUtil from '../../NoteUtil';
import { checkMaxLength } from '../common/validators';

const ChapterItem = ({ chapter, index, flexOrder, isShared }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const themeContext = useContext(ThemeContext);
  const chapterContainerRef = useRef(null);
  const [isFolded, setIsFolded] = useState(!!chapter.isFolded);

  const { id, color, children, type, text: title } = chapter;
  const [renameTitle, setRenameTitle] = useState(title);

  const chapterDragData = useMemo(
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

      if (hoverClientY < hoverMiddleY && ChapterStore.dragEnterChapterIdx !== index) {
        ChapterStore.setDragEnterChapterIdx(index);
      } else if (
        hoverClientY > hoverMiddleY &&
        ChapterStore.dragEnterChapterIdx !== index + 1
      ) {
        ChapterStore.setDragEnterChapterIdx(index + 1);
      }
    },
  });

  // 챕터를 drag했을 때
  const [, drag, preview] = useDrag({
    item: {
      id,
      type: isShared ? DRAG_TYPE.SHARED_CHAPTER : DRAG_TYPE.CHAPTER,
    },
    begin: monitor => {
      if (!ChapterStore.dragData.get(id)) {
        ChapterStore.setDragData(new Map([[id, chapterDragData]]));
        ChapterStore.setIsCtrlKeyDown(false);
      }

      NoteStore.setDraggedType('chapter');
      NoteStore.setDraggedItems(
        ChapterStore.getSortedDragDataList().map(data => data.item),
      );
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
      NoteStore.setIsDragging(true);

      return {
        type: isShared ? DRAG_TYPE.SHARED_CHAPTER : DRAG_TYPE.CHAPTER,
        data: [...ChapterStore.dragData].map(keyValue => {
          const { item } = keyValue[1];
          return {
            id: item.id,
            text: item.text,
            date: item.modified_date,
            type:
              item.type === 'shared' || item.type === 'shared_page'
                ? DRAG_TYPE.SHARED_CHAPTER
                : DRAG_TYPE.CHAPTER,
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

      if (!res && item.type === DRAG_TYPE.SHARED_CHAPTER) NoteStore.setIsDragging(false);
      ChapterStore.setDragEnterChapterIdx('');
      NoteStore.setDraggedOffset({});
    },
  });

  // 페이지를 drag하여 챕터에 drop 또는 hover했을 때
  const [, dropChapter] = useDrop({
    accept: DRAG_TYPE.PAGE,
    drop: () => {
      PageStore.moveNotePage(id, index, 0);
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

  const chapterWrapperRef = node => (isShared ? drag(node) : drag(dropChapter(node)));

  const handleChapterClick = useCallback(
    async e => {
      if (!PageStore.isReadMode()) return;
      if (PageStore.isRecycleBin && e.ctrlKey) return;

      if (e.ctrlKey) {
        if (ChapterStore.dragData.get(id)) ChapterStore.deleteDragData(id);
        else ChapterStore.appendDragData(id, chapterDragData);
        ChapterStore.setIsCtrlKeyDown(true);
        return;
      }

      ChapterStore.setDragData(new Map([[id, chapterDragData]]));
      ChapterStore.setIsCtrlKeyDown(false);

      const pageId = children.length > 0 ? children[0].id : '';
      await PageStore.fetchCurrentPageData(pageId);
      NoteStore.setShowPage(true);
      if (pageId) {
        PageStore.setDragData(
          new Map([
            [
              pageId,
              {
                item: children[0],
                pageIdx: 0,
                chapterId: id,
                chapterIdx: index,
              },
            ],
          ]),
        );
      } else {
        ChapterStore.setCurrentChapterInfo(id, false);
        PageStore.clearDragData();
      }
      PageStore.setIsCtrlKeyDown(false);
    },
    [chapter],
  );

  const ChapterIcon = () => {
    switch (type) {
      case CHAPTER_TYPE.SHARED_PAGE:
        return <SharedPageIcon color={themeContext.SubStateVivid} />;
      case CHAPTER_TYPE.SHARED:
        return <ShareIcon color={themeContext.SubStateVivid} />;
      case CHAPTER_TYPE.RECYCLE_BIN:
        return <TrashIcon color={themeContext.SubStateVivid} />;
      default:
        return <ChapterColor background={color} />;
    }
  };

  const handleTitleChange = e => {
    setRenameTitle(checkMaxLength(e));
  };

  const handleTitleUpdate = isEscape => () => {
    if (isEscape || !renameTitle) {
      setRenameTitle(title);
    } else if (renameTitle !== title) {
      ChapterStore.renameNoteChapter({ id, title: renameTitle, color });
    }

    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  };

  const handleFocus = e => e.target.select();

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

  useEffect(() => {
    setRenameTitle(title);
  }, [title]);

  return useObserver(() => (
    <ChapterContainer
      ref={!isShared ? drop(chapterContainerRef) : null}
      className={
        (isFolded ? 'folded ' : '') +
        (ChapterStore.dragEnterChapterIdx === index && !isShared ? 'borderTopLine' : '') +
        (ChapterStore.dragEnterChapterIdx === index + 1 &&
        ChapterStore.dragEnterChapterIdx ===
          ChapterStore.chapterList.length - ChapterStore.sharedCnt &&
        !isShared
          ? 'borderBottomLine'
          : '')
      }
      id={id}
      key={id}
      order={flexOrder}
    >
      <ChapterCover
        className={`chapter-div${ChapterStore.dragData.get(id) ? ' selectedMenu' : ''}`}
        ref={
          authStore.hasPermission('noteShareChapter', 'C') && !ChapterStore.renameId
            ? node => chapterWrapperRef(node)
            : null
        }
        onClick={handleChapterClick}
        appType={NoteStore.appType}
      >
        <ChapterIcon />
        {ChapterStore.getRenameId() === id ? (
          <ChapterTextInput
            paddingLeft={isShared ? '2.63rem' : '1.69rem'}
            maxLength="200"
            placeholder={title}
            value={renameTitle}
            onClick={e => e.stopPropagation()}
            onChange={handleTitleChange}
            onBlur={handleTitleUpdate(false)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleTitleUpdate(false)();
              else if (e.key === 'Escape') handleTitleUpdate(true)();
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
        showNewPage={!isShared && type !== CHAPTER_TYPE.RECYCLE_BIN}
        chapter={chapter}
        chapterIdx={index}
      />
    </ChapterContainer>
  ));
};

export default ChapterItem;
