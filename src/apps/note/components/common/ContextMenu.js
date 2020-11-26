import React from "react";
import useNoteStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  ContextMenuCover,
  ContextMenuIconCover,
} from "../../styles/commonStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Menu } from 'antd';
import { exportChapterData, exportPageData } from "./NoteFile";

const ContextMenu = ({ noteType, chapterId, chapterIdx, pageId, chapterTitle, pageTitle, nextSelectableChapterId, nextSelectablePageId, type }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const renameComponent = () => {
    // 이름을 변경한다.
    switch (noteType) {
      case "chapter":
        ChapterStore.setRenameChapterId(chapterId);
        ChapterStore.setRenameChapterText(chapterTitle);
        break;
      case "page":
        PageStore.setRenamePageId(pageId);
        PageStore.setRenamePageText(pageTitle);
        PageStore.setIsRename(true);
        break;
      default:
        break;
    }
  };

  const deleteComponent = () => {
    // 챕터/페이지를 삭제한다.
    ChapterStore.setNextSelectableChapterId(nextSelectableChapterId);
    PageStore.setNextSelectablePageId(nextSelectablePageId);

    switch (noteType) {
      case "chapter":
        ChapterStore.setDeleteChapterId(chapterId);
        NoteStore.setModalInfo('chapter');
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      case "page":
        PageStore.setDeletePageList({ note_id: pageId });
        PageStore.setDeleteParentIdx(chapterIdx);
        NoteStore.setModalInfo('page');
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      default:
        break;
    }
  };

  const exportComponent = () => {
    switch (noteType) {
      case 'chapter':
        ChapterStore.setExportId(chapterId);
        ChapterStore.setExportTitle(chapterTitle);
        exportChapterData();
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      case 'page':
        PageStore.setExportId(pageId);
        exportPageData();
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      default: break;
    }
  }

  const infoComponent = () => {
    if (noteType === 'chapter') NoteStore.handleSharedInfo(noteType, chapterId);
    else if (noteType === 'page') NoteStore.handleSharedInfo(noteType, pageId);
  }

  const onClickContextMenu = ({ key, domEvent }) => {
    domEvent.stopPropagation();

    if (key === "0") renameComponent();
    else if (key === "1") deleteComponent();
    else if (key === "2") exportComponent();
    else infoComponent();
  };

  const menu = (
    <Menu style={{ borderRadius: 5 }} onClick={onClickContextMenu}>
      <Menu.Item key="0">이름 변경</Menu.Item>
      <Menu.Item key="1">삭제</Menu.Item>
      <Menu.Item key="2">내보내기(.pdf)</Menu.Item>
      {type === 'shared'
        ? <Menu.Item key="3">정보 보기</Menu.Item>
        : null}
    </Menu>
  );

  return useObserver(() => (
    <ContextMenuCover
      className="ellipsisBtn"
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
        <FontAwesomeIcon icon={faEllipsisV} size={"1x"} />
      </ContextMenuIconCover>
    </ContextMenuCover>
  ));
}

export default ContextMenu;