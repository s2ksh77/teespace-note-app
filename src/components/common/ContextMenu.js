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
import GlobalVariable, { CHAPTER_TYPE } from '../../GlobalVariable';

const { SubMenu, Item } = Menu;

const ContextMenu = ({ noteType, note, chapterIdx, pageIdx, parent }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { userStore, authStore } = useCoreStores();
  const { t } = useTranslation();
  const store = {
    chapter: ChapterStore,
    page: PageStore,
  };

  const renameNote = () => {
    const targetStore = store[noteType];
    targetStore?.setRenameId(note.id);
  };

  const getAdjacentChapter = () => {
    return chapterIdx > 0
      ? ChapterStore.chapterList[chapterIdx - 1]
      : ChapterStore.chapterList[1];
  };

  const getAdjacentPageId = () => {
    return pageIdx > 0 ? parent.children[pageIdx - 1].id : parent.children[1]?.id;
  };

  const throwNoteInRecycleBin = async () => {
    switch (noteType) {
      case 'chapter': {
        const { noteList } = await ChapterStore.getChapterChildren(note.id);
        const editingUserIds = [
          ...new Set(noteList.filter(page => page.is_edit).map(page => page.is_edit)),
        ];

        if (editingUserIds.length === 1) {
          const { displayName } = await userStore.getProfile(editingUserIds[0]);
          NoteStore.setModalInfo('nonDeletableSinglePage', { name: displayName });
        } else if (editingUserIds.length > 1) {
          NoteStore.setModalInfo('nonDeletableMultiPage', {
            count: editingUserIds.length,
          });
        } else {
          NoteStore.setModalInfo(
            note.type === CHAPTER_TYPE.SHARED || note.type === CHAPTER_TYPE.SHARED_PAGE
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
        const { is_edit: editingUserId } = await PageStore.getNoteInfoList(note.id);
        if (editingUserId) {
          const { displayName } = await userStore.getProfile(editingUserId);
          NoteStore.setModalInfo('nonDeletableSinglePage', { name: displayName });
          return;
        }

        if (
          PageStore.pageInfo.id === note.id &&
          parent.type === CHAPTER_TYPE.SHARED_PAGE &&
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
        if (note.type === CHAPTER_TYPE.SHARED) {
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
    if (ChapterStore.getRoomChapterList().length === 0) {
      // 생성된 챕터가 없는 경우
      const { id, text: title } = await ChapterStore.createRestoreChapter(
        t('NOTE_PAGE_LIST_CMPNT_DEF_01'),
        ChapterStore.getChapterRandomColor(),
      );
      PageStore.restorePageLogic({
        chapterId: id,
        pageId: note.id,
        toastTxt: t('NOTE_BIN_RESTORE_02', { name: title }),
      });
      return;
    }

    if (note.restoreChapterId) {
      const { id: restoreChapterId, text: title } = await ChapterStore.getChapterInfoList(
        note.restoreChapterId,
      );
      if (restoreChapterId) {
        PageStore.restorePageLogic({
          chapterId: restoreChapterId,
          pageId: note.id,
          toastTxt: t('NOTE_BIN_RESTORE_02', { name: title }),
        });
      } else {
        PageStore.setRestorePageId(note.id);
        NoteStore.setModalInfo('restore');
      }
      return;
    }

    PageStore.setRestorePageId(note.id);
    NoteStore.setModalInfo('restore');
  };

  const shareComponent = () => {
    NoteStore.setShareNoteType(noteType);
    NoteStore.setShareContent(note);
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

    if (key === 'rename') renameNote();
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
      NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  };

  const handleSubMenuClick = ({ domEvent }) => {
    domEvent.stopPropagation();
  };

  const menu = (() => {
    switch (note.type) {
      case CHAPTER_TYPE.RECYCLE_BIN:
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
            {note.type !== CHAPTER_TYPE.SHARED_PAGE &&
              authStore.hasPermission('notePage', 'U') && (
                <Item key="rename">{t('NOTE_DELIVER_CONTEXT_MENU_01')}</Item>
              )}
            {authStore.hasPermission('noteSharePage', 'C') && (
              <Item key="forward">{t('NOTE_CONTEXT_MENU_01')}</Item>
            )}
            {/* {GlobalVariable.isMailApp &&
              authStore.hasPermission('noteMailShare', 'C') && (
                <Item key="sendEmail">{t('NOTE_DELIVER_CONTEXT_MENU_02')}</Item>
              )} */}
            {authStore.hasPermission('notePage', 'C') && (
              <SubMenu
                title={t('NOTE_DELIVER_CONTEXT_MENU_03')}
                onTitleClick={handleSubMenuClick}
              >
                <Item key="exportPDF">{t('NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01')}</Item>
                <Item key="exportTXT">{t('NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02')}</Item>
              </SubMenu>
            )}
            {note.type === CHAPTER_TYPE.SHARED && (
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
        NoteStore.LNBChapterCoverRef.addEventListener('wheel', NoteStore.disableScroll);
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

export default React.memo(ContextMenu);
