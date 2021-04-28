import React, { useMemo, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useDrag, useDrop } from 'react-dnd';
import { useCoreStores } from 'teespace-core';
import useNoteStore from '../../stores/useNoteStore';

import {
  ChapterContainer,
  ChapterWrapper,
  ChapterColor,
  ChapterShareIcon,
  ChapterTitle,
  ChapterTitleInput,
} from '../../styles/ChapterStyle';
import { ButtonWrapper, ButtonIcon } from '../../styles/CommonStyle';
import { DRAG_TYPE } from '../../utils/const';
import ContextMenu from './ContextMenu';
import PageList from './PageList';
import sharedPageIcon from '../../assets/page_shared.svg';
import sharedIcon from '../../assets/share_1.svg';
import arrowTopIcon from '../../assets/arrow_top_1.svg';
import arrowBottomIcon from '../../assets/arrow_bottom_1.svg';
import PageModel from '../../stores/model/PageModel';
import { checkWhitespace, checkMaxLength } from '../../utils/validators';

const ignoreClick = e => e.stopPropagation();
const handleFocus = e => e.target.select();

const ChapterItem = ({ chapter, index, flexOrder, isShared }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();

  const dragData = {
    item: chapter,
    chapterIdx: index,
  };

  // When a chapter is dropped on another chapter area
  const [, drop] = useDrop({
    accept: DRAG_TYPE.CHAPTER,
    drop: () => {
      ChapterStore.moveChapter(index);
    },
    hover() {
      if (ChapterStore.dragEnterChapterIdx !== index)
        ChapterStore.setDragEnterChapterIdx(index);
    },
  });

  // When chapters are dragged on another chapter
  const [, drag, preview] = useDrag({
    item: {
      id: chapter.id,
      type: isShared ? DRAG_TYPE.SHARED_CHAPTER : DRAG_TYPE.CHAPTER,
    },
    begin: monitor => {
      if (!ChapterStore.dragData.get(chapter.id)) {
        ChapterStore.setDragData(new Map([[chapter.id, dragData]]));
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
          console.log(item);
          return {
            id: item.id,
            text: item.name,
            date: item.modDate,
          };
        }),
      };
    },
    end: async (item, monitor) => {
      const res = monitor.getDropResult();
      if (res && res.target === 'Platform:Friend') {
        const room = await res.findRoom();
        ChapterStore.createNoteShareChapter(room.id, item.data);
      } else if (res && res.target === 'Platform:Room') {
        ChapterStore.createNoteShareChapter(res.targetData.id, item.data);
      }

      if (!res && item.type === DRAG_TYPE.SHARED_CHAPTER) {
        NoteStore.setIsDragging(false);
      }
      ChapterStore.setDragEnterChapterIdx('');
      NoteStore.setDraggedOffset({});
    },
  });

  // When pages are dropped or hovered on a chapter
  const [, dropChapter] = useDrop({
    accept: DRAG_TYPE.PAGE,
    drop: () => {
      // PageStore.moveNotePage(chapter.id, index, 0);
    },
    hover() {
      // if (PageStore.dragEnterPageIdx !== 0) PageStore.setDragEnterPageIdx(0);
      // if (PageStore.dragEnterChapterIdx !== index)
      //   PageStore.setDragEnterChapterIdx(index);
    },
  });

  const handleChapterClick = async e => {
    if (!PageStore.pageModel.isReadMode) return;

    // Multiple Choice
    if (e.ctrlKey) {
      if (ChapterStore.dragData.get(chapter.id)) {
        ChapterStore.deleteDragData(chapter.id);
      } else {
        ChapterStore.appendDragData(chapter.id, dragData);
      }
      ChapterStore.setIsCtrlKeyDown(true);
      return;
    }

    ChapterStore.setDragData(new Map([[chapter.id, dragData]]));
    ChapterStore.setIsCtrlKeyDown(false);

    if (chapter.pageList.length > 0) {
      const page = chapter.pageList[0];
      PageStore.setDragData(
        new Map([
          [
            page.id,
            {
              item: page,
              pageIdx: 0,
              chapterId: chapter.id,
              chapterIdx: index,
            },
          ],
        ]),
      );
      await PageStore.fetchNoteInfoList(page.id);
      PageStore.fetchNoteTagList(page.id);
    } else {
      PageStore.clearDragData();
      PageStore.setPageModel(new PageModel({ chapterId: chapter.id }));
    }
    PageStore.setIsCtrlKeyDown(false);
    if (NoteStore.isCollapsed) NoteStore.setTargetLayout('content');
    NoteStore.setIsPageContent(true);
  };

  const handleChangeTitle = e =>
    ChapterStore.setRenameInfo({ cur: checkMaxLength(e) });

  const renameTitle = async () => {
    await ChapterStore.renameChapter({
      chapterId: ChapterStore.renameInfo.id,
      chapterTitle: ChapterStore.renameInfo.cur,
      color: chapter.color,
    });
    ChapterStore.setRenameInfo({ id: '', pre: '', cur: '' });
  };

  const handleBlurInput = isEscape => () => {
    // rename 안 됨 : escape키 누를 때, pre === cur 일 때 rename 작업 취소
    if (
      isEscape ||
      !checkWhitespace(ChapterStore.renameInfo.cur) ||
      ChapterStore.renameInfo.pre === ChapterStore.renameInfo.cur
    ) {
      ChapterStore.setRenameInfo({ id: '', pre: '', cur: '' });
      return;
    }
    // 다 통과했으면 rename 가능
    renameTitle();
    // NoteStore.LNBChapterCoverRef.removeEventListener(
    //   'wheel',
    //   NoteStore.disableScroll,
    // );
  };

  const handleKeydown = e => {
    if (e.key === 'Enter') handleBlurInput(false)();
    else if (e.key === 'Escape') handleBlurInput(true)();
  };

  const ChapterIcon = () => {
    if (chapter.type === 'shared_page')
      return <ChapterShareIcon src={sharedPageIcon} />;
    if (chapter.type === 'shared') return <ChapterShareIcon src={sharedIcon} />;
    return <ChapterColor background={chapter.color} />;
  };

  return useObserver(() => (
    <ChapterContainer order={flexOrder}>
      <ChapterWrapper
        className={
          NoteStore.isPageContent &&
          PageStore.pageModel?.chapterId === chapter.id
            ? 'selectedMenu'
            : ''
        }
        style={{ paddingLeft: isShared ? '2.63rem' : '1.69rem' }}
        onClick={handleChapterClick}
        ref={
          !ChapterStore.renameId &&
          (isShared ? drag : node => drag(dropChapter(node)))
        }
      >
        <ChapterIcon />
        {ChapterStore.renameInfo.id === chapter.id ? (
          <ChapterTitleInput
            paddingLeft={isShared ? '2.63rem' : '1.69rem'}
            maxLength="200"
            placeholder={ChapterStore.renameInfo.pre}
            value={ChapterStore.renameInfo.cur}
            onClick={ignoreClick}
            onChange={handleChangeTitle}
            onBlur={handleBlurInput(false)}
            onKeyDown={handleKeydown}
            onFocus={handleFocus}
            autoFocus
          />
        ) : (
          <ChapterTitle>{chapter.name}</ChapterTitle>
        )}
        <ContextMenu itemType="chapter" item={chapter} />
        <ButtonWrapper>
          <ButtonIcon src={arrowTopIcon} />
        </ButtonWrapper>
      </ChapterWrapper>
      <PageList page={chapter.pageList} chapterId={chapter.id} />
    </ChapterContainer>
  ));
};

export default ChapterItem;
