import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import { useDrag, useDrop } from 'react-dnd';
import { Tooltip } from 'antd';
import useNoteStore from '../../stores/useNoteStore';

import { DRAG_TYPE } from '../../utils/const';
import { PageWrapper, PageTitle, PageTitleInput } from '../../styles/PageStyle';
import ContextMenu from './ContextMenu';
import { checkWhitespace, checkMaxLength } from '../../utils/validators';

const ignoreClick = e => e.stopPropagation();
const handleFocus = e => e.target.select();
/**
 * page
 * id, parent_notebook, children, created_date, modified_date, note_content
 * text, text_content, type, user_name
 */

const PageItem = ({ page, pageIdx, chapter, chapterIdx }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  const chapterDragData = {
    item: chapter,
    chapterIdx,
  };

  const pageDragData = {
    item: page,
    pageIdx,
    chapterId: chapter.id,
    chapterIdx,
  };

  const [, drag, preview] = useDrag({
    item: {
      id: page.id,
      type: page.type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE,
    },
    begin: monitor => {
      if (!PageStore.dragData.get(page.id)) {
        PageStore.setDragData(new Map([[page.id, pageDragData]]));
        PageStore.setIsCtrlKeyDown(false);
      }

      NoteStore.setDraggedType('page');
      NoteStore.setDraggedItems(
        PageStore.getSortedDragDataList().map(data => data.item),
      );
      NoteStore.setDraggedOffset(monitor.getInitialClientOffset());
      NoteStore.setIsDragging(true);

      return {
        type: page.type === 'note' ? DRAG_TYPE.PAGE : DRAG_TYPE.SHARED_PAGE,
        data: [...PageStore.dragData].map(keyValue => {
          const { item } = keyValue[1];
          return {
            id: item.id,
            text: item.text,
            date: item.modified_date,
          };
        }),
      };
    },
    end: async (item, monitor) => {
      const res = monitor.getDropResult();
      if (res && res.target === 'Platform:Friend') {
        const roomInfo = await res.findRoom();
        PageStore.createSharePage(roomInfo.id, item.data);
      } else if (res && res.target === 'Platform:Room') {
        PageStore.createSharePage(res.targetData.id, item.data);
      }

      if (!res && item.type === DRAG_TYPE.SHARED_PAGE) {
        NoteStore.setIsDragging(false);
      }
      PageStore.setDragEnterPageIdx('');
      PageStore.setDragEnterChapterIdx('');
      NoteStore.setDraggedOffset({});
    },
  });

  const [, drop] = useDrop({
    accept: DRAG_TYPE.PAGE,
    drop: () => {
      // PageStore.moveNotePage(chapter.id, chapterIdx, index);
    },
    hover() {
      // if (PageStore.dragEnterChapterIdx !== chapterIdx)
      //   PageStore.setDragEnterChapterIdx(chapterIdx);
      // if (PageStore.dragEnterPageIdx !== index)
      //   PageStore.setDragEnterPageIdx(index);
    },
  });

  const handlePageClick = async () => {
    await PageStore.fetchNoteInfoList(page.id);
    PageStore.setIsRecycleBin(page.type === 'recycle' ? true : false);
    PageStore.fetchNoteTagList(page.id);
    NoteStore.setIsPageContent(true);
    if (NoteStore.isCollapsed) NoteStore.setTargetLayout('content');
  };

  const handleTooltip = e => {
    setIsEllipsisActive(
      e.currentTarget.offsetWidth < e.currentTarget.scrollWidth,
    );
  };

  const handleChangeTitle = e =>
    ChapterStore.setRenameInfo({ cur: checkMaxLength(e) });

  const renameTitle = async () => {
    await PageStore.renamePage({
      pageId: ChapterStore.renameInfo.id,
      pageTitle: ChapterStore.renameInfo.cur,
      chapterId: page.parent_notebook,
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

  return useObserver(() => (
    <PageWrapper
      className={
        NoteStore.isPageContent && PageStore.pageModel.id === page.id
          ? 'selected'
          : ''
      }
      onClick={handlePageClick}
      ref={
        !PageStore.renameId &&
        (page.type === 'note' ? node => drag(drop(node)) : drag)
      }
    >
      {ChapterStore.renameInfo.id === page.id ? (
        <PageTitleInput
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
        <Tooltip
          placement="bottomLeft"
          title={isEllipsisActive ? page.text : null}
        >
          <PageTitle onMouseOver={handleTooltip}>{page.text}</PageTitle>
        </Tooltip>
      )}
      {(authStore.hasPermission('notePage', 'U') || page.type === 'shared') && (
        <ContextMenu itemType="page" item={page} parent={chapter} />
      )}
    </PageWrapper>
  ));
};

export default PageItem;
