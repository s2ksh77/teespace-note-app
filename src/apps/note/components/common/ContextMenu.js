import React from "react";
import useNoteStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  ContextMenuCover,
  ContextMenuIconCover,
  ContextMenuIcon,
} from "../../styles/commonStyle";
import viewMoreIcon from '../../assets/view_more.svg';
import { Menu } from 'antd';
import { exportData, exportPageAsTxt, exportChapterAsTxt } from "./NoteFile";
import { useCoreStores } from "teespace-core";

const { SubMenu, Item } = Menu;

const ContextMenu = ({ noteType, chapter, chapterIdx, page, selectableChapterId, selectablePageId, type }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { userStore, spaceStore } = useCoreStores();

  const renameComponent = () => {
    // 이름을 변경한다.
    switch (noteType) {
      case "chapter":
        ChapterStore.setRenameChapterId(chapter.id);
        ChapterStore.setRenameChapterPrevText(chapter.text);
        ChapterStore.setRenameChapterText(chapter.text);
        break;
      case "page":
        PageStore.setRenamePageId(page.id);
        PageStore.setRenamePagePrevText(page.text);
        PageStore.setRenamePageText(page.text);
        break;
      default:
        break;
    }
  };

  const deleteComponent = async () => {
    // 챕터/페이지를 삭제한다.
    ChapterStore.setSelectableChapterId(selectableChapterId);
    PageStore.setSelectablePageId(selectablePageId);

    switch (noteType) {
      case "chapter":
        ChapterStore.setDeleteChapterId(chapter.id);
        ChapterStore.getChapterChildren(chapter.id).then(async dto => {
          if (dto.noteList.length > 0) {
            const editingList = dto.noteList.filter(note => note.is_edit !== null && note.is_edit !== '');
            if (editingList.length === 1) {
              const res = await userStore.fetchProfile(editingList[0].is_edit);
              PageStore.setEditingUserName(res.name);
              NoteStore.setModalInfo('confirm');
            } else if (editingList.length > 1) {
              PageStore.setEditingUserCount(editingList.length);
              NoteStore.setModalInfo('chapterconfirm');
            } else NoteStore.setModalInfo('chapter');
          } else NoteStore.setModalInfo('chapter');
        });
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      case "page":
        PageStore.getNoteInfoList(page.id).then(async dto => {
          if (dto.is_edit === null || dto.is_edit === '') {
            PageStore.setDeletePageList({ note_id: note.id });
            NoteStore.setModalInfo('page');
          } else {
            const res = await userStore.fetchProfile(dto.is_edit);
            PageStore.setEditingUserName(res.name);
            NoteStore.setModalInfo('confirm');
          }
        })
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      default:
        break;
    }
  };

  const shareComponent = () => {
    NoteStore.setShareNoteType(noteType);
    NoteStore.setShareContent(noteType === 'chapter' ? chapter : page);
    NoteStore.setIsShared(true);
    NoteStore.setModalInfo('forward');
    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  };

  const exportComponent = isMailShare => {
    switch (noteType) {
      case 'chapter':
        ChapterStore.setExportTitle(chapter.text);
        exportData(isMailShare, noteType, chapter.id);
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      case 'page':
        exportData(isMailShare, noteType, page.id);
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      default: break;
    }
  }

  const exportTxtComponent = () => {
    switch (noteType) {
      case 'chapter':
        exportChapterAsTxt(chapter.text, chapter.id);
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      case 'page':
        exportPageAsTxt(page.id);
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      default: break;
    }
  }

  const infoComponent = () => {
    if (noteType === 'chapter') NoteStore.handleSharedInfo(noteType, chapter.id);
    else if (noteType === 'page') NoteStore.handleSharedInfo(noteType, page.id);
    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  }

  const onClickContextMenu = ({ key, domEvent }) => {
    domEvent.stopPropagation();

    if (key === "0") renameComponent();
    else if (key === "1") deleteComponent();
    else if (key === "2") shareComponent();
    else if (key === "3") exportComponent(true);
    else if (key === "4") exportComponent(false);
    else if (key === "5") exportTxtComponent();
    else infoComponent();
  };

  const handleSubMenuClick = ({ domEvent }) => {
    domEvent.stopPropagation();
  }

  // txt로 내보내기 배포 때 주석 풀 예정
  // 순서는 이름 변경, 삭제, 다른 룸으로 전달, TeeMail로 전달, 내보내기, (정보 보기)
  const menu = (
    <Menu style={{ borderRadius: 5 }} onClick={onClickContextMenu}>
      {type === 'shared_page'
        ? null :
        <Item key="0">{NoteStore.getI18n('rename')}</Item>}
      <Item key="1">{NoteStore.getI18n('delete')}</Item>
      <Item key="2">{NoteStore.getI18n('forward')}</Item>
      {spaceStore.currentSpace?.plan !== 'BASIC' && <Item key="3">{NoteStore.getI18n('sendEmail')}</Item>}
      <SubMenu title={NoteStore.getI18n('export')} onTitleClick={handleSubMenuClick}>
        <Item key="4">PDF 형식(.pdf)</Item>
        <Item key="5">TXT 형식(.txt)</Item>
      </SubMenu>
      {type === 'shared'
        ? <Item key="6">{NoteStore.getI18n('viewInfo')}</Item>
        : null}
    </Menu>
  );

  return useObserver(() => (
    <ContextMenuCover
      className="ellipsisBtn"
      right={noteType === 'page' ? '0.3rem' : '0'}
      overlay={menu}
      trigger={['click']}
      placement="bottomRight"
      onClick={(e) => {
        e.stopPropagation();
        NoteStore.LNBChapterCoverRef.addEventListener('wheel', NoteStore.disableScroll);
      }}
      onVisibleChange={(visible) => {
        if (!visible) NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
      }}
    >
      <ContextMenuIconCover>
        <ContextMenuIcon src={viewMoreIcon} />
      </ContextMenuIconCover>
    </ContextMenuCover>
  ));
}

export default ContextMenu;