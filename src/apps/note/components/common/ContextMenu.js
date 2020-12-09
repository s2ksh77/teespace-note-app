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
import { useCoreStores } from 'teespace-core';
import NoteRepository from '../../store/noteRepository';

const ContextMenu = ({ noteType, chapter, chapterIdx, page, nextSelectableChapterId, nextSelectablePageId, type }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { roomStore } = useCoreStores();

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
        PageStore.setDeletePageList({ note_id: page.id });
        PageStore.setDeleteParentIdx(chapterIdx);
        NoteStore.setModalInfo('page');
        NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
        break;
      default:
        break;
    }
  };

  const shareComponent = () => {
    /*
      룸을 체크할 수 있는 modal을 띄운다.
      modal에서 체크된 roomIds를 받는다.
      roomIds를 돌아가며 선택된 list를 보내준다.
    */
    NoteStore.setIsShared(true);
    NoteStore.setModalInfo('shareRoom');
    // const targetRoomIds = shareModal.getRoomIds();
    // const sharedRoomName = roomStore.getRoom(NoteRepository.WS_ID).name;
    // const targetRoomIds = [NoteRepository.WS_ID, ];
    // const sharedRoomName = roomStore.rooms[NoteRepository.WS_ID].name;
    // targetRoomIds.forEach(targetRoomId => {
    //   const targetChId = roomStore.getChannelIds({ roomId: targetRoomId })[NoteRepository.CH_TYPE];
    //   if (noteType === 'chapter')
    //     ChapterStore.createNoteShareChapter(targetRoomId, targetChId, sharedRoomName, [chapter, ]);
    //   else if (noteType === 'page')
    //     PageStore.createNoteSharePage(targetRoomId, targetChId, sharedRoomName, [page, ]);
    // });
    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
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
    else if (key === "3") exportComponent();
    else infoComponent();
  };

  const menu = (
    <Menu style={{ borderRadius: 5 }} onClick={onClickContextMenu}>
      <Menu.Item key="0">이름 변경</Menu.Item>
      <Menu.Item key="1">삭제</Menu.Item>
      {/* <Menu.Item key="2">다른 룸으로 전달</Menu.Item> */}
      <Menu.Item key="3">내보내기(.pdf)</Menu.Item>
      {type === 'shared'
        ? <Menu.Item key="4">정보 보기</Menu.Item>
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