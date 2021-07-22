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

  const getAdjacentChapter = () => {
    return chapterIdx > 0
      ? ChapterStore.chapterList[chapterIdx - 1]
      : ChapterStore.chapterList[1];
  };

  const getAdjacentPageId = () => {
    return pageIdx > 0
      ? parent.children[pageIdx - 1].id
      : parent.children[1]?.id;
  };

  const throwNoteInRecycleBin = async () => {
    switch (noteType) {
      case 'chapter': {
        const { noteList: pageList } = await ChapterStore.getChapterChildren(
          note.id,
        );
        const editingPageList = pageList.filter(page => page.is_edit);

        if (editingPageList.length === 1) {
          const { displayName } = await userStore.getProfile(
            editingPageList[0].is_edit,
          );
          PageStore.setEditingUserName(displayName);
          NoteStore.setModalInfo('confirm');
        } else if (editingPageList.length > 1) {
          PageStore.setEditingUserCount(editingPageList.length);
          NoteStore.setModalInfo('chapterconfirm');
        } else {
          NoteStore.setModalInfo(
            note.type === 'shared' || note.type === 'shared_page'
              ? 'sharedChapter'
              : 'chapter',
            {
              chapterList: [{ id: note.id }],
              selectablePageId: getAdjacentChapter()?.children[0]?.id,
            },
          );
        }
        break;
      }
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

        if (
          PageStore.pageInfo.id === note.id &&
          parent.type === 'shared_page' &&
          parent.children.length === 1
        ) {
          ChapterStore.deleteNoteChapter({
            chapterList: [{ id: parent.id }],
            selectablePageId: getAdjacentChapter()?.children[0]?.id,
          });
          return;
        }

        const data = {
          pageList: [{ note_id: note.id, restoreChapterId: parent.id }],
          selectablePageId: getAdjacentPageId(),
        };
        if (note.type === 'shared') {
          NoteStore.setModalInfo('sharedPage', data);
          return;
        }
        PageStore.throwNotePage(data);
        break;
      }
      default:
        break;
    }
  };

  const restoreComponent = async () => {
    // 휴지통만 있는 경우
    if (ChapterStore.getRoomChapterList().length === 0) {
      const newChapter = await ChapterStore.createRestoreChapter(
        t('NOTE_PAGE_LIST_CMPNT_DEF_01'),
        ChapterStore.getChapterRandomColor(),
      );
      PageStore.restorePageLogic({
        chapterId: newChapter.id,
        pageId: note.id,
        toastTxt: t('NOTE_BIN_RESTORE_02'),
      });
    } else {
      if (note.restoreChapterId) {
        const { id: restoreChapterId } = await ChapterStore.getChapterInfoList(
          note.restoreChapterId,
        );
        if (restoreChapterId) {
          PageStore.restorePageLogic({
            chapterId: restoreChapterId,
            pageId: note.id,
            toastTxt: t('NOTE_BIN_RESTORE_02'),
          });
        } else {
          PageStore.setRestorePageId(note.id);
          NoteStore.setModalInfo('restore');
        }
      } else {
        PageStore.setRestorePageId(note.id);
        NoteStore.setModalInfo('restore');
      }
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
    NoteStore.setModalInfo('deletePage', {
      pageList: [{ note_id: note.id }],
      selectablePageId: getAdjacentPageId(),
    });
  };

  const onClickContextMenu = ({ key, domEvent }) => {
    domEvent.stopPropagation();

    if (key === 'rename') renameComponent();
    else if (key === 'throw') throwNoteInRecycleBin();
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
