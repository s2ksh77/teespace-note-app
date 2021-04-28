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
const ContextMenu = ({ itemType, item }) => {
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

  /**
   * 챕터/페이지를 삭제한다.
   */
  const deleteComponent = async () => {
    switch (itemType) {
      case 'chapter': {
        try {
          const children = await NoteRepository.getChapterChildren(item.id);
          const editingList = children.filter(
            _note => _note.editingUserId !== '',
          );
          if (editingList.length === 0) {
            alert(`해당 chapter를 삭제합니다`);
            await ChapterStore.deleteChapter(item.id);
            // [ TODO ] : 다음 챕터 선택하기, 일단 임시 코드 넣음
            if (
              !NoteStore.isPageContent ||
              PageStore.pageModel?.chapterId !== item.id
            )
              return; // 새로 선택 안해도 되는 경우
            // 챕터가 없는 경우
            if (ChapterStore.chapterList.length === 0) {
              PageStore.setPageModel(new PageModel({}));
              return;
            }
            // 첫 번째 챕터 선택 - 1) 첫 번째 페이지 선택, 2) 페이지X
            const chapter = ChapterStore.chapterList[0];
            if (chapter.pageList.length > 0) {
              await PageStore.fetchNoteInfoList(chapter.pageList[0].id);
              PageStore.fetchNoteTagList(chapter.pageList[0].id);
            } else
              PageStore.setPageModel(new PageModel({ chapterId: chapter.id })); // 페이지가 없는 경우

            return;
          }
          if (editingList.length === 1) {
            const res = await userStore.fetchProfile(editingList[0].is_edit);
            // PageStore.setEditingUserName(res.nick ? res.nick : res.name);
            // NoteStore.setModalInfo('confirm');
            alert('하위 페이지를 수정 중인 사용자가 있습니다.'); // temp
            return;
          }

          if (editingList.length > 1) {
            PageStore.setEditingUserCount(editingList.length);
            //     NoteStore.setModalInfo('chapterconfirm');
            alert('하위 페이지를 수정 중인 사용자가 있습니다.'); // temp
            return;
          }
        } catch (e) {
          console.log('챕터 삭제');
          console.log(e);
        }
        break;
      }
      case 'page': {
        // [TODO : 다음 페이지 선택 ] 20210428 임시 첫 번째 페이지 선택
        // chapterId, id, content, editingUserId, lastUserId, modDate, name, userName
        try {
          const page = await NoteRepository.getNoteInfoList(item.id);
          if (!page.editingUserId) {
            await PageStore.deletePage([{ note_id: page.id }]);
            // 페이지 화면을 보고 있고 현재 보고 있는 페이지를 삭제한 경우
            if (
              NoteStore.isPageContent &&
              PageStore.pageModel?.id === page.id
            ) {
              const chapter = ChapterStore.chapterMap.get(page.chapterId);
              if (chapter.pageList.length > 0) {
                await PageStore.fetchNoteInfoList(chapter.pageList[0]);
              } else
                PageStore.setPageModel(
                  new PageModel({ chapterId: chapter.id }),
                ); // 페이지가 없는 경우
            }
          } else {
            const res = await userStore.fetchProfile(page.editingUserId);
            // PageStore.setEditingUserName(res.nick ? res.nick : res.name);
            // NoteStore.setModalInfo('confirm'); // todo
            alert(`${res.nick ? res.nick : res.name}님이 수정 중입니다`);
          }
        } catch (e) {
          console.log('delete page에서 error');
          console.log(e);
        }
        // PageStore.getNoteInfoList(item.id).then(async dto => {
        //   if (dto.is_edit === null || dto.is_edit === '') {
        //     PageStore.setDeletePageList({ note_id: item.id });
        //     if (PageStore.currentPageId === item.id) {
        //       if (
        //         parent.type === 'shared_page' &&
        //         parent.children.length === 1
        //       ) {
        //         setSelectableIdOfChapter();
        //         PageStore.setLastSharedPageParentId(parent.id);
        //       } else {
        //         setSelectableIdOfPage();
        //       }
        //     }
        //     NoteStore.setModalInfo('page');
        //   }
        // });
        break;
      }
      default:
        break;
    }
  };

  const handleClickContextMenu = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    switch (key) {
      case '0':
        renameComponent();
        break;
      case '1':
        deleteComponent();
        break;
      case '2':
        // shareComponent();
        break;
      case '3':
        // exportComponent(true);
        break;
      case '4':
        // exportComponent(false);
        break;
      case '5':
        // exportTxtComponent();
        break;
      case '6':
        // infoComponent();
        break;
      default:
        break;
    }

    // if (key)
    //   NoteStore.LNBChapterCoverRef.removeEventListener(
    //     'wheel',
    //     NoteStore.disableScroll,
    //   );
  };

  const handleSubMenuClick = ({ domEvent }) => {
    domEvent.stopPropagation();
  };

  // 순서는 이름 변경, 삭제, 다른 룸으로 전달, TeeMail로 전달, 내보내기, (정보 보기)
  const menu = (
    <Menu style={{ borderRadius: 5 }} onClick={handleClickContextMenu}>
      {item.type !== 'shared_page' &&
        authStore.hasPermission('notePage', 'U') && (
          <Item key="0">{t('NOTE_DELIVER_CONTEXT_MENU_01')}</Item>
        )}
      {authStore.hasPermission('notePage', 'D') && (
        <Item key="1">{t('NOTE_PAGE_LIST_DEL_PGE_CHPT_04')}</Item>
      )}
      {/* {authStore.hasPermission('noteSharePage', 'C') && (
        <Item key="2">{t('CM_FORWARD')}</Item>
      )}
      {NoteStore.isMailApp && authStore.hasPermission('noteMailShare', 'C') && (
        <Item key="3">{t('NOTE_DELIVER_CONTEXT_MENU_02')}</Item>
      )}
      {authStore.hasPermission('notePage', 'C') && (
        <SubMenu
          title={t('NOTE_DELIVER_CONTEXT_MENU_03')}
          onTitleClick={handleSubMenuClick}
          disabled={!!(itemType === 'chapter' && !item.children.length)}
        >
          <Item key="4">{t('NOTE_PAGE_LIST_DL_PAGE_CHAPTER_01')}</Item>
          <Item key="5">{t('NOTE_PAGE_LIST_DL_PAGE_CHAPTER_02')}</Item>
        </SubMenu>
      )}
      {item.type === 'shared' && (
        <Item key="6">{t('NOTE_DELIVER_CONTEXT_MENU_04')}</Item>
      )} */}
    </Menu>
  );

  return useObserver(() => (
    <ContextMenuWrapper className="contextMenu" onClick={handleClickWrapper}>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <ContextMenuIcon src={viewMoreIcon} />
      </Dropdown>
    </ContextMenuWrapper>
  ));
};

export default ContextMenu;
