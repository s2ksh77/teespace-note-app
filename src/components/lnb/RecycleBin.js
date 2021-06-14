import React, { useState, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { useCoreStores } from 'teespace-core';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../stores/useNoteStore';
import PageList from './PageList';
import {
  ChapterContainer,
  ChapterCover,
  ChapterWrapper,
  ChapterTitle,
} from '../../styles/ChapterStyle';
import { ButtonWrapper, ButtonIcon } from '../../styles/CommonStyle';
import arrowTopIcon from '../../assets/arrow_top_1.svg';
import { TrashIcon } from '../icons';
import { DRAG_TYPE } from '../../utils/const';
import ContextMenu from './ContextMenu';

const RecycleBin = ({ chapter, index, flexOrder, isShared }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { userStore } = useCoreStores();
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();
  // 주의: ChapterStore.chapterList의 isFolded는 getNoteChapterList때만 정확한 정보 담고 있음
  const [isFolded, setIsFolded] = useState(true);
  const { id, children } = chapter;

  // When chapters/pages are dropped on recycle bin area
  const [, drop] = useDrop({
    accept: [
      DRAG_TYPE.CHAPTER,
      DRAG_TYPE.PAGE,
      DRAG_TYPE.SHARED_CHAPTER,
      DRAG_TYPE.SHARED_PAGE,
    ],
    drop: async item => {
      const { type, data } = item;
      const editingNoteList = [];

      switch (type) {
        case DRAG_TYPE.CHAPTER: {
          if (data.find(note => note.type === DRAG_TYPE.SHARED_CHAPTER)) {
            NoteStore.floatToast(t('NOTE_DND_ACTION_02'));
            break;
          }

          const deleteChapterList = await Promise.all(
            data.map(async note => {
              const dto = await ChapterStore.getChapterChildren(note.id);
              editingNoteList.push(
                ...dto.noteList.filter(page => page.is_edit),
              );
              return { id: note.id };
            }),
          );

          if (editingNoteList.length === 1) {
            const res = await userStore.getProfile(editingNoteList[0].is_edit);
            PageStore.setEditingUserName(res.displayName);
            NoteStore.setModalInfo('confirm');
          } else if (editingNoteList.length > 1) {
            PageStore.setEditingUserCount(editingNoteList.length);
            NoteStore.setModalInfo('chapterconfirm');
          } else {
            ChapterStore.setDeleteChapterList(deleteChapterList);
            NoteStore.setModalInfo('draggedChapter');
          }
          break;
        }
        case DRAG_TYPE.PAGE: {
          if (data.find(note => note.type === DRAG_TYPE.SHARED_PAGE)) {
            NoteStore.floatToast(t('NOTE_DND_ACTION_02'));
            break;
          }

          const deletePageList = await Promise.all(
            data.map(async note => {
              const dto = await PageStore.getNoteInfoList(note.id);
              if (dto.is_edit) editingNoteList.push(dto);
              return { note_id: note.id };
            }),
          );

          if (editingNoteList.length === 1) {
            const res = await userStore.getProfile(editingNoteList[0].is_edit);
            PageStore.setEditingUserName(res.displayName);
            NoteStore.setModalInfo('confirm');
          } else if (editingNoteList.length > 1) {
            PageStore.setEditingUserCount(editingNoteList.length);
            NoteStore.setModalInfo('chapterconfirm');
          } else {
            PageStore.setDeletePageList(deletePageList);
            PageStore.throwNotePage(true);
          }
          break;
        }
        case DRAG_TYPE.SHARED_CHAPTER:
        case DRAG_TYPE.SHARED_PAGE:
          NoteStore.floatToast(t('NOTE_DND_ACTION_02'));
          break;
        default:
          break;
      }
    },
    hover(item) {
      if (item.type === DRAG_TYPE.CHAPTER) {
        if (ChapterStore.dragEnterChapterIdx !== index)
          ChapterStore.setDragEnterChapterIdx(index);
        return;
      }
      if (PageStore.dragEnterPageIdx) PageStore.setDragEnterPageIdx('');
    },
  });

  const onClickRecycleBinBtn = e => {
    if (!PageStore.isReadMode() || e.ctrlKey) return;

    ChapterStore.clearDragData();
    ChapterStore.setIsCtrlKeyDown(false);

    const pageId = children.length > 0 ? children[0].id : '';
    NoteStore.setShowPage(true);
    PageStore.setIsRecycleBin(true); // 깜빡임 방지하기 위해 중복 메서드 넣음
    PageStore.fetchCurrentPageData(pageId); // isEdit 갱신
    if (!pageId) ChapterStore.setCurrentChapterId(chapter.id);
    PageStore.clearDragData();
    PageStore.setIsCtrlKeyDown(false);
  };

  const handleFoldBtnClick = e => {
    e.stopPropagation();
    setIsFolded(!isFolded);
  };

  return useObserver(() => (
    <ChapterContainer
      ref={drop}
      className={isFolded ? 'folded ' : ''}
      key={id}
      order={flexOrder}
    >
      <ChapterWrapper
        className={`chapter-div${
          id === ChapterStore.currentChapterId ? ' selectedMenu' : ''
        }`}
        onClick={onClickRecycleBinBtn}
        style={{
          paddingLeft: '2.63rem',
          color: ChapterStore.dragEnterChapterIdx === index ? '#205855' : null,
        }}
      >
        <TrashIcon color={themeContext.SubStateVivid} />
        <ChapterTitle>{chapter.name}</ChapterTitle>
        <ContextMenu itemType="chapter" item={chapter} />
        <ButtonWrapper>
          <ButtonIcon src={arrowTopIcon} />
        </ButtonWrapper>
      </ChapterWrapper>
      <PageList
        page={chapter.pageList}
        showNewPage={false}
        chapter={chapter}
        chapterIdx={index}
      />
    </ChapterContainer>
  ));
};

export default RecycleBin;
