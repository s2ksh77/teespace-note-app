import React, { useState, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { useCoreStores } from 'teespace-core';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';
import ChapterText from './ChapterText';
import PageList from '../page/PageList';
import { ChapterContainer, ChapterCover } from '../../styles/chpaterStyle';
import { TrashIcon } from '../icons';
import { DRAG_TYPE } from '../../GlobalVariable';

const RecycleBin = ({ chapter, index, flexOrder }) => {
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
              editingNoteList.push(...dto.noteList.filter(page => page.is_edit));
              return { id: note.id };
            }),
          );

          if (editingNoteList.length === 1) {
            const { displayName } = await userStore.getProfile(
              editingNoteList[0].is_edit,
            );
            NoteStore.setModalInfo('nonDeletableSinglePage', { name: displayName });
          } else if (editingNoteList.length > 1) {
            NoteStore.setModalInfo('nonDeletableMultiPage', {
              count: editingNoteList.length,
            });
          } else {
            ChapterStore.setDeleteChapterList(deleteChapterList);
            NoteStore.setModalInfo('draggedChapter', {
              chapterList: deleteChapterList,
              isDnd: true,
            });
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
              return {
                note_id: note.id,
                restoreChapterId: note.chapterId,
              };
            }),
          );

          if (editingNoteList.length === 1) {
            const { displayName } = await userStore.getProfile(
              editingNoteList[0].is_edit,
            );
            NoteStore.setModalInfo('nonDeletableSinglePage', { name: displayName });
          } else if (editingNoteList.length > 1) {
            NoteStore.setModalInfo('nonDeletableMultiPage', {
              count: editingNoteList.length,
            });
          } else {
            PageStore.throwNotePage({ pageList: deletePageList, isDnd: true });
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

  const handleRecycleBinClick = async e => {
    if (!PageStore.isReadMode() || e.ctrlKey) return;

    ChapterStore.clearDragData();
    ChapterStore.setIsCtrlKeyDown(false);

    const pageId = children.length > 0 ? children[0].id : '';
    await PageStore.fetchCurrentPageData(pageId);
    if (!pageId) ChapterStore.setCurrentChapterId(chapter.id);

    PageStore.clearDragData();
    PageStore.setIsCtrlKeyDown(false);
    NoteStore.setShowPage(true);
    PageStore.setIsRecycleBin(true); // 깜빡임 방지하기 위해 중복 메서드 넣음
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
      <ChapterCover
        className={`chapter-div${
          id === ChapterStore.currentChapterId ? ' selectedMenu' : ''
        }`}
        onClick={handleRecycleBinClick}
        style={ChapterStore.dragEnterChapterIdx === index ? { color: '#205855' } : null}
        isRecycleBin={true}
      >
        <TrashIcon color={themeContext.SubStateVivid} />
        <ChapterText
          chapter={chapter}
          index={index}
          handleFoldBtnClick={handleFoldBtnClick}
          isFolded={isFolded}
        />
      </ChapterCover>
      <PageList showNewPage={false} chapter={chapter} chapterIdx={index} />
    </ChapterContainer>
  ));
};

export default RecycleBin;
