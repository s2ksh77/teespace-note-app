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
import {useCoreStores, Message, RoomStore} from 'teespace-core';

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
  noteId = "f73d1c57-2f40-4aa4-960e-212b70a894f3"

  const history = useHistory();
  const {NoteStore, PageStore} = useNoteStore();
  const { userStore } = useCoreStores();

  const [imgSrc, setImgSrc] = useState(noteImg);
  const [informDeleted, setInformDeleted] = useState(false);

  const handleMouseOver = () => {
    setImgSrc(hoverImg);
  }

  const handleMouseOut = () => {
    setImgSrc(noteImg);
  }

  const openNote = () => {
    // 페이지 수정 중이었다면 modal 먼저 띄워야
    if (!PageStore.isReadMode()) {
      const isUndoActive = EditorStore.tinymce?.undoManager.hasUndo();
      if (!isUndoActive) { PageStore.handleNoneEdit(); return; }
      NoteStore.setModalInfo('editCancel');
      return;
    }
    NoteStore.setShowPage(true);
    NoteStore.setTargetLayout('Content');
    PageStore.fetchCurrentPageData(noteId);
  }

  const initNoteApp = () => {
    const targetChId = RoomStore.getChannelIds({ roomId })[NoteRepository.CH_TYPE];
    NoteStore.init(roomId, targetChId, userStore.myProfile.id, userStore.myProfile.name);
  }

  const handleClickMessage = async () => { 
    if (!history) return; // history가 없어서 바꿔야함 
    const isNoteApp = history.location.search === "?sub=note";
    if (!isNoteApp) initNoteApp();
    // 1. 해당 noteInfo를 가져온다(삭제되었는지 확인)
    const noteInfo = await PageStore.getNoteInfoList(noteId);
    
    if (!noteInfo || !isFilled(noteInfo.note_id)) {
      // 아직 모달을 띄울 수 없음
      setInformDeleted(true);
      return;
    }

    // 2. 노트앱 열기
    if (!isNoteApp) {
      history.push({
        pathname: history.location.pathname,
        search: `?sub=note`
      });      
    }
    openNote();
  }

  const handleClick = () => {
    setInformDeleted(false);
  }

  return ReactDom.createPortal(
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
    </>,
    document.body,
  )
}

export default ShareNoteMessage;