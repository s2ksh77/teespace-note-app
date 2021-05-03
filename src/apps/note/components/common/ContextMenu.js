import React from 'react';
import { useObserver } from 'mobx-react';
import { Menu } from 'antd';
import { useCoreStores } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../store/useStore';
import {
  ContextMenuCover,
  ContextMenuIconCover,
  ContextMenuIcon,
} from '../../styles/commonStyle';
import viewMoreIcon from '../../assets/view_more.svg';
import { exportData, exportPageAsTxt, exportChapterAsTxt } from './NoteFile';
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

  /**
   * 챕터/페이지를 삭제한다.
   * [ todo ] 휴지통에 있는 페이지 삭제시 PageStore.setDeletePageList하고, NoteStore.setModalInfo('deletePage') 불러야함
   */
  const deleteComponent = async () => {
    switch (noteType) {
      case 'chapter':
        ChapterStore.setDeleteChapterId(note.id);
        ChapterStore.getChapterChildren(note.id).then(async dto => {
          const editingList = dto.noteList.filter(
            page => page.is_edit !== null && page.is_edit !== '',
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

    if (key === 'rename') renameComponent();
    else if (key === 'throw') deleteComponent();
    else if (key === 'forward') shareComponent();
    else if (key === 'sendEmail') exportComponent(true);
    else if (key === 'exportPDF') exportComponent(false);
    else if (key === 'exportTXT') exportTxtComponent();
    else if (key === 'viewInfo') infoComponent();
    else if (key === 'emptyRecycleBin');
    else if (key === 'restore');
    else if (key === 'delete');

    if (key)
      NoteStore.LNBChapterCoverRef.removeEventListener(
        'wheel',
        NoteStore.disableScroll,
      );
  };

  const handleSubMenuClick = ({ domEvent }) => {
    domEvent.stopPropagation();
  };

  const menu = (() => {
    switch (note.type) {
      case 'recycle_bin':
        return (
          <Menu style={{ borderRadius: 5 }} onClick={onClickContextMenu}>
            <Item key="emptyRecycleBin">{t('NOTE_CONTEXT_MENU_03')}</Item>
          </Menu>
        );
      case 'recycle':
        return (
          <Menu style={{ borderRadius: 5 }} onClick={onClickContextMenu}>
            <Item key="restore">{t('NOTE_CONTEXT_MENU_02')}</Item>
            <Item key="delete">{t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04')}</Item>
          </Menu>
        );
      default:
        return (
          <Menu style={{ borderRadius: 5 }} onClick={onClickContextMenu}>
            {note.type !== 'shared_page' &&
              authStore.hasPermission('notePage', 'U') && (
                <Item key="rename">{t('NOTE_DELIVER_CONTEXT_MENU_01')}</Item>
              )}
            {authStore.hasPermission('noteSharePage', 'C') && (
              <Item key="forward">{t('NOTE_CONTEXT_MENU_01')}</Item>
            )}
            {GlobalVariable.isMailApp &&
              authStore.hasPermission('noteMailShare', 'C') && (
                <Item key="sendEmail">{t('NOTE_DELIVER_CONTEXT_MENU_02')}</Item>
              )}
            {authStore.hasPermission('notePage', 'C') && (
              <SubMenu
                title={t('NOTE_DELIVER_CONTEXT_MENU_03')}
                onTitleClick={handleSubMenuClick}
              >
                <Item key="exportPDF">
                  {t('NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01')}
                </Item>
                <Item key="exportTXT">
                  {t('NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02')}
                </Item>
              </SubMenu>
            )}
            {note.type === 'shared' && (
              <Item key="viewInfo">{t('NOTE_DELIVER_CONTEXT_MENU_04')}</Item>
            )}
            {authStore.hasPermission('notePage', 'D') && (
              <Item key="throw">{t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04')}</Item>
            )}
          </Menu>
        );
    }
  })();

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
