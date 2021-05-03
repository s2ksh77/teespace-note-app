import React from 'react';
import useNoteStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import {
  ContextMenuCover,
  ContextMenuIconCover,
  ContextMenuIcon,
} from '../../styles/commonStyle';
import viewMoreIcon from '../../assets/view_more.svg';
import { Menu } from 'antd';
import { exportData, exportPageAsTxt, exportChapterAsTxt } from './NoteFile';
import { useCoreStores } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import GlobalVariable from '../../GlobalVariable';

const { SubMenu, Item } = Menu;

const ContextMenu = ({ noteType, note, chapterIdx, pageIdx, parent }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { userStore, authStore } = useCoreStores();
  const { t } = useTranslation();
  const store = {
    chapter: ChapterStore,
    page: PageStore,
  };

  /**
   * 챕터/페이지의 이름을 변경한다.
   */
  const renameComponent = () => {
    const targetStore = store[noteType];
    if (!targetStore) return;

    targetStore.setRenameId(note.id);
    targetStore.setRenamePrevText(note.text);
    targetStore.setRenameText(note.text);
  };

  /**
   * 챕터/페이지를 삭제한다.
   */
  const deleteComponent = async () => {
    switch (noteType) {
      case 'chapter':
        ChapterStore.setDeleteChapterId(note.id);
        ChapterStore.getChapterChildren(note.id).then(async dto => {
          const editingList = dto.noteList.filter(
            note => note.is_edit !== null && note.is_edit !== '',
          );
          if (editingList.length === 1) {
            const res = await userStore.getProfile(editingList[0].is_edit);
            PageStore.setEditingUserName(res.nick ? res.nick : res.name);
            NoteStore.setModalInfo('confirm');
          } else if (editingList.length > 1) {
            PageStore.setEditingUserCount(editingList.length);
            NoteStore.setModalInfo('chapterconfirm');
          } else {
            if (ChapterStore.currentChapterId === note.id)
              setSelectableIdOfChapter();
            NoteStore.setModalInfo('chapter');
          }
        });
        break;
      case 'page':
        PageStore.getNoteInfoList(note.id).then(async dto => {
          if (dto.is_edit === null || dto.is_edit === '') {
            PageStore.setDeletePageList({ note_id: note.id });
            if (PageStore.currentPageId === note.id) {
              if (
                parent.type === 'shared_page' &&
                parent.children.length === 1
              ) {
                setSelectableIdOfChapter();
                PageStore.setLastSharedPageParentId(parent.id);
              } else {
                setSelectableIdOfPage();
              }
            }
            NoteStore.setModalInfo('page');
          } else {
            const res = await userStore.getProfile(dto.is_edit);
            PageStore.setEditingUserName(res.nick ? res.nick : res.name);
            NoteStore.setModalInfo('confirm');
          }
        });
        break;
      default:
        break;
    }
  };

  const setSelectableIdOfChapter = () => {
    const selectableChapter =
      chapterIdx > 0
        ? ChapterStore.chapterList[chapterIdx - 1]
        : ChapterStore.chapterList[1];
    const selectableChapterId = selectableChapter?.id;
    const selectablePageId = selectableChapter?.children[0]?.id;

    ChapterStore.setSelectableChapterId(selectableChapterId);
    PageStore.setSelectablePageId(selectablePageId);
  };

  const setSelectableIdOfPage = () => {
    const selectablePageId =
      pageIdx > 0 ? parent.children[pageIdx - 1]?.id : parent.children[1]?.id;

    PageStore.setSelectablePageId(selectablePageId);
  };

  const shareComponent = () => {
    NoteStore.setShareNoteType(noteType);
    NoteStore.setShareContent(note);
    NoteStore.setIsShared(true);
    NoteStore.setModalInfo('forward');
  };

  const exportComponent = isMailShare => {
    const targetStore = store[noteType];
    if (!targetStore) return;

    // loading 화면 돌아가기 시작
    NoteStore.setIsExporting(true);
    if (noteType === 'chapter') targetStore.setExportTitle(note.text);
    exportData(isMailShare, noteType, note.id);
  };

  const exportTxtComponent = () => {
    // loading 화면 돌아가기 시작
    NoteStore.setIsExporting(true);

    switch (noteType) {
      case 'chapter':
        exportChapterAsTxt(note.text, note.id);
        break;
      case 'page':
        exportPageAsTxt(note.id);
        break;
      default:
        break;
    }
  };

  const infoComponent = () => {
    NoteStore.handleSharedInfo(noteType, note.id);
  };

  const onClickContextMenu = ({ key, domEvent }) => {
    domEvent.stopPropagation();

    if (key === '0') renameComponent();
    else if (key === '1') deleteComponent();
    else if (key === '2') shareComponent();
    else if (key === '3') exportComponent(true);
    else if (key === '4') exportComponent(false);
    else if (key === '5') exportTxtComponent();
    else infoComponent();

    if (key)
      NoteStore.LNBChapterCoverRef.removeEventListener(
        'wheel',
        NoteStore.disableScroll,
      );
  };

  const handleSubMenuClick = ({ domEvent }) => {
    domEvent.stopPropagation();
  };

  // 순서는 이름 변경, 삭제, 다른 룸으로 전달, TeeMail로 전달, 내보내기, (정보 보기)
  const menu = (
    <Menu style={{ borderRadius: 5 }} onClick={onClickContextMenu}>
      {note.type !== 'shared_page' && authStore.hasPermission('notePage', 'U') && (
        <Item key="0">{t('NOTE_DELIVER_CONTEXT_MENU_01')}</Item>
      )}
      {authStore.hasPermission('notePage', 'D') && (
        <Item key="1">{t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04')}</Item>
      )}
      {authStore.hasPermission('noteSharePage', 'C') && (
        <Item key="2">{t('NOTE_CONTEXT_MENU_01')}</Item>
      )}
      {GlobalVariable.isMailApp && authStore.hasPermission('noteMailShare', 'C') && (
        <Item key="3">{t('NOTE_DELIVER_CONTEXT_MENU_02')}</Item>
      )}
      {authStore.hasPermission('notePage', 'C') && (
        <SubMenu
          title={t('NOTE_DELIVER_CONTEXT_MENU_03')}
          onTitleClick={handleSubMenuClick}
        >
          <Item key="4">{t('NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01')}</Item>
          <Item key="5">{t('NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02')}</Item>
        </SubMenu>
      )}
      {note.type === 'shared' && (
        <Item key="6">{t('NOTE_DELIVER_CONTEXT_MENU_04')}</Item>
      )}
    </Menu>
  );

  return useObserver(() => (
    <ContextMenuCover
      className="ellipsisBtn"
      right={noteType === 'page' ? '0.3rem' : '0'}
      overlay={menu}
      trigger={['click']}
      placement="bottomRight"
      onClick={e => {
        e.stopPropagation();
        NoteStore.LNBChapterCoverRef.addEventListener(
          'wheel',
          NoteStore.disableScroll,
        );
      }}
      onVisibleChange={visible => {
        if (!visible)
          NoteStore.LNBChapterCoverRef.removeEventListener(
            'wheel',
            NoteStore.disableScroll,
          );
      }}
    >
      <ContextMenuIconCover>
        <ContextMenuIcon src={viewMoreIcon} />
      </ContextMenuIconCover>
    </ContextMenuCover>
  ));
};

export default ContextMenu;
