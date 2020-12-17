import React, {useState} from 'react';
import ReactDom from 'react-dom';
import {
  MessageCover,
  MessageNoteImg,
  MessageNoteInfo,
  NoteTitleCover,
  NoteTitle,
  NoteDate
} from '../../styles/commonStyle';
import noteImg from '../../assets/note_TeeNote.png';
import hoverImg from '../../assets/TeeNote_hover.png';
import useNoteStore from '../../store/useStore';
import { useHistory } from 'react-router-dom';
import {isFilled} from './validators';
import {Message, RoomStore, API } from 'teespace-core';
import NoteRepository from '../../store/noteRepository';

/*
  ToDo
  history가 undefined로 뜬다. 또한 우리가 아니라 외부에서 NoteApp을 render하는 로직으로 바꿔야
  모달도 NoteModal이 아니라 core Modal로 바꿔야 한다
*/
const ShareNoteMessage = ({roomId, noteId, noteTitle, noteDate}) => {
  /*
    test id
    1) 유효하지 않은 노트 id는 "123"
    noteId = "123"
    2) 삭제된 노트 id test
    noteId = "f73d1c57-2f40-4aa4-960e-212b70a894f3"
    3) 유효한 노트 id
    noteId = "010ddb34-ea14-4ff4-ae1d-61cfb2349625"
  */
  // 테스트용
  // if (!noteId) noteId = "4bf33c23-eda8-4377-bca0-58b5ba5e808f"
  if (!noteId) return null;
  
  const history = useHistory();
  const {NoteStore, PageStore} = useNoteStore();

  const [imgSrc, setImgSrc] = useState(noteImg);
  const [informDeleted, setInformDeleted] = useState(false);

  const handleMouseOver = () => {
    setImgSrc(hoverImg);
  }

  const handleMouseOut = () => {
    setImgSrc(noteImg);
  }

  const handleClickMessage = async (e) => { 
    // 해당 페이지 보고 있을 때(readMode, 수정 모드 모두) handleClickOutside editor 로직 타지 않도록
    e.stopPropagation();
    // 혹시나
    if (!history) return;

    const isNoteApp = history.location.search === "?sub=note";
    // 0. 해당 페이지 보고 있었거나 다른 페이지 수정중인 경우는 Modal 먼저 띄워야
    // LNB를 보고 있어도 PageStore.isReadMode() === true인경우 있어
    if (isNoteApp && NoteStore.targetLayout !== "LNB") {
      if (PageStore.currentPageId === noteId) return; 
      // 다른 페이지 수정중인 경우 Modal 띄우기   
      if (!PageStore.isReadMode()) {
        const isUndoActive = EditorStore.tinymce?.undoManager.hasUndo();
        if (!isUndoActive && !PageStore.isReadMode() && !PageStore.otherEdit) { PageStore.handleNoneEdit(); return; }
        NoteStore.setModalInfo('editCancel');
        return;
      }
    }

    
    // 1. 해당 noteInfo를 가져온다(삭제되었는지 확인)
    const targetChId = RoomStore.getChannelIds({ roomId })[NoteRepository.CH_TYPE];
    const {
      data: { dto:noteInfo },
    } = await API.Get(
      `note-api/noteinfo?action=List&note_id=${noteId}&note_channel_id=${targetChId}`,
    );

    if (!noteInfo || !isFilled(noteInfo.note_id)) {
      // 아직 모달을 띄울 수 없음
      setInformDeleted(true);
      return;
    }

    // 2. 노트앱 열기
    // 노트앱이 열려있지 않았다면 NoteApp -> useEffect에 있는 NoteStore.init 동작에서 openNote 수행한다
    if (!isNoteApp) {      
      history.push({
        pathname: history.location.pathname,
        search: `?sub=note`
      });
      NoteStore.setNoteIdFromTalk(noteId);
    } else NoteStore.openNote(noteId);
  }

  const handleClick = () => {
    setInformDeleted(false);
  }

  return (
    <>
      <Message
        visible={informDeleted}
        title={"노트가 삭제되어 불러올 수 없습니다."}
        type="error"
        btns={[{
          type : 'solid',
          shape : 'round',
          text : '확인',
          onClick : handleClick
        }]}
      />
      <MessageCover id="shareNoteMessage" onClick={handleClickMessage}>
        <MessageNoteImg 
          src={imgSrc}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
        <MessageNoteInfo>
          <NoteTitleCover>
            <NoteTitle>{noteTitle}</NoteTitle>
          </NoteTitleCover>
          <NoteDate>{noteDate}</NoteDate>
        </MessageNoteInfo>
      </MessageCover>
    </>
  )
}

export default ShareNoteMessage;