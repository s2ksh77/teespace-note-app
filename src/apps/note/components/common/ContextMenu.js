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
import { exportChapterData, exportPageData, exportPageAsTxt, exportChapterAsTxt } from "./NoteFile";

const { SubMenu, Item } = Menu;

const ContextMenu = ({ noteType, chapter, chapterIdx, page, nextSelectableChapterId, nextSelectablePageId, type }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const renameComponent = () => {
    // 이름을 변경한다.
    switch (noteType) {
      case "chapter":
        ChapterStore.setRenameChapterId(chapter.id);
        ChapterStore.setRenameChapterText(chapter.text);
        break;
      case "page":
        PageStore.setRenamePageId(page.id);
        PageStore.setRenamePageText(page.text);
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
        ChapterStore.setDeleteChapterId(chapter.id);
        NoteStore.setModalInfo('chapter');
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      case "page":
        PageStore.setDeletePageList({ note_id: page.id, type: page.type });
        PageStore.setDeleteParentIdx(chapterIdx);
        NoteStore.setModalInfo('page');
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
    NoteStore.setModalInfo('shareRoom');
    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  };

  const mailShareComponent = () => {
    NoteStore.setIsMailShare(true);
    exportComponent();
  };

  const exportComponent = () => {
    switch (noteType) {
      case 'chapter':
        ChapterStore.setExportId(chapter.id);
        ChapterStore.setExportTitle(chapter.text);
        exportChapterData();
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      case 'page':
        PageStore.setExportId(page.id);
        exportPageData();
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
    else if (key === "3") mailShareComponent();
    else if (key === "4") exportComponent();
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
        <Item key="0">이름 변경</Item>}
        <Item key="1">삭제</Item>
        <Item key="2">다른 룸으로 전달</Item>
      {/* <Item key="3">Mail로 전달</Item> */}
      <SubMenu title="내보내기" onTitleClick={handleSubMenuClick}>
        <Item key="4">PDF 형식(.pdf)</Item>
        <Item key="5">TXT 형식(.txt)</Item>
      </SubMenu>
      {type === 'shared'
        ? <Item key="6">정보 보기</Item>
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