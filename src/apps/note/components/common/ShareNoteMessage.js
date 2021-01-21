import React, {useState} from 'react';
import ReactDom from 'react-dom';
import {
  MessageCover,
  NoteTitle
} from '../../styles/commonStyle';
// import noteImg from '../../assets/note_active.svg';
// import hoverImg from '../../assets/TeeNote_hover.png';
import useNoteStore from '../../store/useStore';
import { useHistory } from 'react-router-dom';
import {isFilled} from './validators';
import {Message, RoomStore, API } from 'teespace-core';
import NoteRepository from '../../store/noteRepository';
import NoteUtil from '../../NoteUtil';

//platform 코드 가져왔음
const REM_UNIT = 16;
const NoteActiveIcon = ({ width = 1.75, height = 1.75, color = '#1a79ff' }) => {
  const defaultWidth = 24;
  const defaultHeight = 24;

  return (
    <svg
      width={`${width}rem`}
      height={`${height}rem`}
      viewBox={`0 0 ${width * REM_UNIT} ${height * REM_UNIT}`}
      version="1.1"
    >
      <g
        id="Icon/apps/note_active"
        stroke="none"
        strokeWidth="1"
        fill="none"
        transform={`scale(${(width * REM_UNIT) / defaultWidth}, ${
          (height * REM_UNIT) / defaultHeight
        })`}
        fillRule="evenodd"
      >
        <path
          d="M15,1 C17.761,1 20,3.238 20,6 L20,6 L20,9.594 C20,10.389 19.684,11.151 19.122,11.714 L19.122,11.714 L14.166,16.675 C13.992,16.848 13.869,17.065 13.808,17.303 L13.808,17.303 L13.044,20.301 C13.014,20.415 13,20.532 13,20.65 C13,20.758 13.014,20.866 13.041,20.971 C13.095,21.188 13.203,21.392 13.354,21.558 C13.484,21.701 13.673,21.77 13.813,21.902 C13.829,21.918 13.844,21.933 13.858,21.949 C14.088,22.206 14.018,22.565 13.723,22.729 C13.613,22.789 13.497,22.839 13.378,22.878 C13.142,22.958 12.892,23 12.643,23 L12.643,23 L6,23 C3.239,23 1,20.762 1,18 L1,18 L1,6 C1,3.238 3.239,1 6,1 L6,1 Z M20.0947,13.2477 C20.4327,12.9087 20.9817,12.9077 21.3217,13.2447 L21.3217,13.2447 L21.3247,13.2477 L22.7427,14.6797 C23.0837,15.0167 23.0857,15.5667 22.7497,15.9077 C22.7467,15.9087 22.7447,15.9107 22.7427,15.9137 L22.7427,15.9137 L18.4117,20.2587 C18.3007,20.3687 18.1617,20.4487 18.0107,20.4887 L18.0107,20.4887 L16.0877,20.9797 C16.0167,20.9967 15.9447,21.0067 15.8717,21.0077077 C15.3917,21.0097 15.0017,20.6227 14.9997,20.1437 C14.9997,20.0687 15.0097,19.9926978 15.0287,19.9207 L15.0287,19.9207 L15.5197,17.9937 C15.5587,17.8447 15.6377,17.7087 15.7457,17.5997 L15.7457,17.5997 Z M11.5,15.469 L7,15.469 C6.448,15.469 6,15.916 6,16.469 C6,17.021 6.448,17.469 7,17.469 L7,17.469 L11.5,17.469 C12.052,17.469 12.5,17.021 12.5,16.469 C12.5,15.916 12.052,15.469 11.5,15.469 L11.5,15.469 Z M14,11 L7,11 C6.448,11 6,11.447 6,12 C6,12.553 6.448,13 7,13 L7,13 L14,13 C14.552,13 15,12.553 15,12 C15,11.447 14.552,11 14,11 L14,11 Z M14,6.531 L7,6.531 C6.448,6.531 6,6.979 6,7.531 C6,8.084 6.448,8.531 7,8.531 L7,8.531 L14,8.531 C14.552,8.531 15,8.084 15,7.531 C15,6.979 14.552,6.531 14,6.531 L14,6.531 Z"
          id="Combined-Shape"
          fill={color}
        />
      </g>
    </svg>
  );
};

const ShareNoteMessage = ({roomId, noteId, noteTitle}) => {
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
  // roomId = "d2456ccd-c4f3-4b74-8645-b31c04ee82ac";
  // if (!noteId) noteId = "0e27f084-1088-4110-bbf1-73817f1662ef"
  if (!noteId) return null;

  const history = useHistory();
  const {NoteStore, PageStore} = useNoteStore();
  const [informDeleted, setInformDeleted] = useState(false);
  noteTitle = NoteUtil.decodeStr(noteTitle);

  // const [imgSrc, setImgSrc] = useState(noteImg);
  // hover 효과 사라짐(혹시 몰라 남겨둠)
  // const handleMouseOver = () => {
  //   setImgSrc(hoverImg);
  // }

  // const handleMouseOut = () => {
  //   setImgSrc(noteImg);
  // }

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
        if (!isUndoActive && !PageStore.otherEdit) { PageStore.handleNoneEdit(); return; }
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
        <NoteActiveIcon/>
        <NoteTitle>{noteTitle}</NoteTitle>
      </MessageCover>
    </>
  )
}

export default ShareNoteMessage;