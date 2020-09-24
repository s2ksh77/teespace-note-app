import React from "react";
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {
  ContextMenuCover,
  ContextMenuIconCover,
} from "../../styles/commonStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { Menu } from 'antd';

const ContextMenu = ({ type, chapterId, pageId, chapterTitle, pageTitle }) => {
  const { ChapterStore, PageStore } = useStore();

  const renameComponent = () => {
    // 이름을 변경한다.
    switch (type) {
      case "chapter":
        ChapterStore.setRenameFlag(true);
        ChapterStore.setRenameChapterId(chapterId);
        ChapterStore.setRenameChapterText(chapterTitle);
        break;
      case "page":
        PageStore.setRenameFlag(true);
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
    switch (type) {
      case "chapter":
        ChapterStore.deleteChapter(chapterId);
        break;
      case "page":
        PageStore.setDeletePageList({ note_id: pageId });
        PageStore.deletePage();
        break;
      default:
        break;
    }
  };

  const onClickContextMenu = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    
    if (key === "0") renameComponent();
    else if (key === "1") deleteComponent();
  };

  const menu = (
    <Menu style={{ borderRadius: 5 }} onClick={onClickContextMenu}>
      <Menu.Item key="0">이름 변경</Menu.Item>
      <Menu.Item key="1">삭제</Menu.Item>
    </Menu>
  );

  return useObserver(() => (
    <ContextMenuCover className="ellipsisBtn" overlay={menu} trigger={['click']} placement="bottomRight" onClick={e => e.stopPropagation()}>
      <ContextMenuIconCover>
        <FontAwesomeIcon icon={faEllipsisV} size={"1x"} />
      </ContextMenuIconCover>
    </ContextMenuCover>
  ));
}

export default ContextMenu;