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

  const getSelectablePageId = () => {
    return pageIdx > 0
      ? parent.children[pageIdx - 1].id
      : parent.children[1]?.id;
  };

  /**
   * 챕터/페이지를 휴지통으로 이동시킨다.
   * [ todo ] 휴지통에 있는 페이지 삭제시 PageStore.setDeletePageList하고, NoteStore.setModalInfo('deletePage') 불러야함
   */
  const throwComponent = async () => {
    switch (noteType) {
      case 'chapter':
        ChapterStore.setDeleteChapterList([{ id: note.id }]);
        ChapterStore.getChapterChildren(note.id).then(async dto => {
          const editingList = dto.noteList.filter(
            page => page.is_edit !== null && page.is_edit !== '',
          );
          if (editingList.length === 1) {
            const { displayName } = await userStore.getProfile(editingList[0].is_edit);
            PageStore.setEditingUserName(displayName);
            NoteStore.setModalInfo('confirm');
          } else if (editingList.length > 1) {
            PageStore.setEditingUserCount(editingList.length);
            NoteStore.setModalInfo('chapterconfirm');
          } else {
            if (ChapterStore.currentChapterId === note.id) setSelectableIdOfChapter();
            if (note.type === 'shared' || note.type === 'shared_page') NoteStore.setModalInfo('sharedChapter');
            else NoteStore.setModalInfo('chapter');
          }
        });
        break;
      case 'page': {
        const { is_edit: editingUserId } = await PageStore.getNoteInfoList(
          note.id,
        );
        if (editingUserId) {
          const { displayName } = await userStore.getProfile(editingUserId);
          PageStore.setEditingUserName(displayName);
          NoteStore.setModalInfo('confirm');
          return;
        }

        PageStore.setDeletePageList([{ note_id: note.id }]);
        if (PageStore.pageInfo.id === note.id) {
          if (parent.type === 'shared_page' && parent.children.length === 1) {
            setSelectableIdOfChapter();
            ChapterStore.setDeleteChapterList([{ id: parent.id }]);
            ChapterStore.deleteNoteChapter();
            return;
          }
          setSelectableIdOfPage();
        }

        if (note.type === 'shared') {
          NoteStore.setModalInfo('sharedPage', {
            pageList: [{ note_id: note.id }],
            selectablePageId:
              PageStore.pageInfo.id === note.id ? getSelectablePageId() : '',
          });
          return;
        }

        PageStore.throwNotePage();
        break;
      }
      default:
        break;
    }
  };

  const restoreComponent = async () => {
    // 휴지통만 있는 경우
    if (ChapterStore.getRoomChapterList().length === 0) {
      const newChapter = await ChapterStore.createRestoreChapter(t('NOTE_PAGE_LIST_CMPNT_DEF_01'), ChapterStore.getChapterRandomColor());
      PageStore.restorePageLogic({
        chapterId: newChapter.id, 
        pageId: note.id, 
        toastTxt: t('NOTE_BIN_RESTORE_02'),
      });
    } else {
      PageStore.setRestorePageId(note.id);
      NoteStore.setModalInfo('restore');
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

  const emptyRecycleBin = () => {
    NoteStore.setModalInfo('emptyRecycleBin', {
      pageList: note.children.map(page => ({ note_id: page.id })),
    });
  };

  const deletePagePermanently = () => {
    if (PageStore.currentPageId === note.id) setSelectableIdOfPage();
    NoteStore.setModalInfo('deletePage', {
      pageList: [{ note_id: note.id }],
      selectablePageId:
        PageStore.currentPageId === note.id ? getSelectablePageId() : '',
    });
  };

  const onClickContextMenu = ({ key, domEvent }) => {
    domEvent.stopPropagation();

    if (key === 'rename') renameComponent();
    else if (key === 'throw') throwComponent();
    else if (key === 'forward') shareComponent();
    else if (key === 'sendEmail') exportComponent(true);
    else if (key === 'exportPDF') exportComponent(false);
    else if (key === 'exportTXT') exportTxtComponent();
    else if (key === 'viewInfo') infoComponent();
    else if (key === 'emptyRecycleBin') emptyRecycleBin();
    else if (key === 'restore') restoreComponent();
    else if (key === 'delete') deletePagePermanently();

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
