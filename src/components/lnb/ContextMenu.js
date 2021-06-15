import React from 'react';
import { useObserver } from 'mobx-react';
import { Menu, Dropdown } from 'antd';
import { useCoreStores } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../stores/useNoteStore';
import { ContextMenuWrapper, ContextMenuIcon } from '../../styles/LNBStyle';
import viewMoreIcon from '../../assets/view_more.svg';
import NoteRepository from '../../stores/repository/NoteRepository';
import PageModel from '../../stores/model/PageModel';

/**
 *
 * @param {*}
 * item:
 * page = {children, created_date,id,modified_date,note_content,parent_notebook,text,text_content,type, user_name}
 * chapter = {chId, color, id, isFolded, modDate, name, pageList, roomId, shareRoomId, sharedUserId, sharedDate, targetChId, targetRoomId, type, userId, userName}
 * @returns
 */
const ContextMenu = ({ itemType, item, parent }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { userStore, authStore } = useCoreStores();
  const { t } = useTranslation();
  const { SubMenu, Item } = Menu;

  const handleClickWrapper = e => {
    e.stopPropagation();
  };

  /**
   * 챕터/페이지의 이름을 변경한다.
   */
  const renameComponent = () => {
    ChapterStore.setRenameInfo({
      id: item.id,
      pre: itemType === 'chapter' ? item.name : item.text,
      cur: itemType === 'chapter' ? item.name : item.text,
    });
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
   * 챕터/페이지를 삭제한다. 하위 페이지들은 휴지통으로
   * 전달받은 챕터/페이지는 영구 삭제
   */
  const throwComponent = async () => {
    switch (itemType) {
      case 'chapter':
        ChapterStore.setDeleteChapterList([{ id: item.id }]);
        ChapterStore.getChapterChildren(item.id).then(async dto => {
          const editingList = dto.noteList.filter(
            page => page.is_edit !== null && page.is_edit !== '',
          );
          if (editingList.length === 1) {
            const { displayName } = await userStore.getProfile(
              editingList[0].is_edit,
            );
            PageStore.setEditingUserName(displayName);
            NoteStore.setModalInfo('confirm');
          } else if (editingList.length > 1) {
            PageStore.setEditingUserCount(editingList.length);
            NoteStore.setModalInfo('chapterconfirm');
          } else {
            if (ChapterStore.currentChapterId === item.id)
              setSelectableIdOfChapter();
            if (item.type === 'shared' || item.type === 'shared_page')
              NoteStore.setModalInfo('sharedChapter');
            else NoteStore.setModalInfo('chapter');
          }
        });
        break;
      case 'page':
        PageStore.getNoteInfoList(item.id).then(async model => {
          if (model.editingUserId === null || model.editingUserId === '') {
            // PageStore.setDeletePageList([{ note_id: item.id }]);
            // if (PageStore.pageModel.id === item.id) {
            //   if (
            //     parent.type === 'shared_page' &&
            //     parent.children.length === 1
            //   ) {
            //     setSelectableIdOfChapter();
            //     PageStore.setLastSharedPageParentId(parent.id);
            //   } else {
            //     setSelectableIdOfPage();
            //   }
            // }
            // if (PageStore.lastSharedPageParentId) {
            //   ChapterStore.setDeleteChapterId(PageStore.lastSharedPageParentId);
            //   PageStore.setLastSharedPageParentId('');
            //   ChapterStore.deleteNoteChapter();
            // } else if (item.type === 'shared')
            //   NoteStore.setModalInfo('sharedPage');
            // else PageStore.throwNotePage(model);
            console.log(model);
            PageStore.throwPage(model);
          } else {
            const { displayName } = await userStore.getProfile(
              model.editingUserId,
            );
            PageStore.setEditingUserName(displayName);
            NoteStore.setModalInfo('confirm');
          }
        });
        break;
      default:
        break;
    }
  };

  const handleClickContextMenu = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    if (key === 'rename') renameComponent();
    else if (key === 'throw') throwComponent();
    // else if (key === 'forward') shareComponent();
    // else if (key === 'sendEmail') exportComponent(true);
    // else if (key === 'exportPDF') exportComponent(false);
    // else if (key === 'exportTXT') exportTxtComponent();
    // else if (key === 'viewInfo') infoComponent();
    // else if (key === 'emptyRecycleBin') emptyComponent();
    else if (key === 'restore') restoreComponent();
    else if (key === 'delete') deleteComponent();

    // if (key)
    //   NoteStore.LNBChapterCoverRef.removeEventListener(
    //     'wheel',
    //     NoteStore.disableScroll,
    //   );
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
      PageStore.setRestorePageId(note.id);
      NoteStore.setModalInfo('restore');
    }
  };

  const handleSubMenuClick = ({ domEvent }) => {
    domEvent.stopPropagation();
  };

  // 순서는 이름 변경, 삭제, 다른 룸으로 전달, TeeMail로 전달, 내보내기, (정보 보기)
  const menu = (() => {
    switch (item.type) {
      case 'recycle_bin':
        return (
          <Menu style={{ borderRadius: 5 }} onClick={handleClickContextMenu}>
            <Item key="emptyRecycleBin">{t('NOTE_CONTEXT_MENU_03')}</Item>
          </Menu>
        );
      case 'recycle':
        return (
          <Menu style={{ borderRadius: 5 }} onClick={handleClickContextMenu}>
            <Item key="restore">{t('NOTE_CONTEXT_MENU_02')}</Item>
            <Item key="delete">{t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04')}</Item>
          </Menu>
        );
      default:
        return (
          <Menu style={{ borderRadius: 5 }} onClick={handleClickContextMenu}>
            {item.type !== 'shared_page' &&
              authStore.hasPermission('notePage', 'U') && (
                <Item key="rename">{t('NOTE_DELIVER_CONTEXT_MENU_01')}</Item>
              )}
            {/* {authStore.hasPermission('noteSharePage', 'C') && (
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
            {item.type === 'shared' && (
              <Item key="viewInfo">{t('NOTE_DELIVER_CONTEXT_MENU_04')}</Item>
            )} */}
            {authStore.hasPermission('notePage', 'D') && (
              <Item key="throw">{t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04')}</Item>
            )}
          </Menu>
        );
    }
  })();

  return useObserver(() => (
    <ContextMenuWrapper className="contextMenu" onClick={handleClickWrapper}>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <ContextMenuIcon src={viewMoreIcon} />
      </Dropdown>
    </ContextMenuWrapper>
  ));
};

export default ContextMenu;
