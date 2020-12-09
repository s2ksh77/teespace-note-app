// import React, {useState} from 'react';
// import {
//   MessageCover,
//   MessageNoteImg,
//   MessageNoteInfo,
//   NoteTitleCover,
//   NoteTitle,
//   NoteDate
// } from '../../styles/commonStyle';
// import noteImg from '../../assets/note_TeeNote.png';
// import hoverImg from '../../assets/TeeNote_hover.png';
// import useNoteStore from '../../store/useStore';
// import { useHistory } from 'react-router-dom';
// import {isFilled} from './validators';

// const ShareNoteMessage = ({noteId, noteTitle, noteDate}) => {
//   /*
//     test id
//     1) 유효하지 않은 노트 id는 "123"
//     noteId = "123"
//     2) 삭제된 노트 id test
//     noteId = "f73d1c57-2f40-4aa4-960e-212b70a894f3"
//     3) 유효한 노트 id
//     noteId = "72e742fa-564e-4b83-b4dd-4bb4ff154b03"
//   */
//   noteId = "72e742fa-564e-4b83-b4dd-4bb4ff154b03"

//   const history = useHistory();
//   const {NoteStore, PageStore} = useNoteStore();

//   const [imgSrc, setImgSrc] = useState(noteImg);

//   const handleMouseOver = () => {
//     setImgSrc(hoverImg);
//   }

//   const handleMouseOut = () => {
//     setImgSrc(noteImg);
//   }

//   const openNote = () => {
//     // 페이지 수정 중이었다면 modal 먼저 띄워야
//     if (!PageStore.isReadMode()) {
//       const isUndoActive = EditorStore.tinymce?.undoManager.hasUndo();
//       if (!isUndoActive) { PageStore.handleNoneEdit(); return; }
//       NoteStore.setModalInfo('editCancel');
//       return;
//     }
//     NoteStore.setShowPage(true);
//     NoteStore.setTargetLayout('Content');
//     PageStore.fetchCurrentPageData(noteId);
//   }

//   const handleClickMessage = async () => {    
//     console.log('handleClickMessage')
//     // 1. 해당 noteInfo를 가져온다(삭제되었는지 확인)
//     const noteInfo = await PageStore.getNoteInfoList(noteId);

//     console.log('noteInfo', noteInfo)
//     if (!noteInfo || !isFilled(noteInfo.note_id)) {
//       // 아직 모달을 띄울 수 없음
//       alert('삭제된 노트입니다.')
//       // NoteStore.setModalInfo('deletedPage');
//       return;
//     }

//     // 2. 노트앱 열기
//     console.log('history pathname', history.location.pathname)
//     console.log(history.location)
//     if (history.location.search !== "?sub=note") {
//       history.push({
//         pathname: history.location.pathname,
//         search: `?sub=note`
//       })
//     }
//     openNote();
//   }

//   return (
//     <MessageCover onClick={handleClickMessage}>
//       <MessageNoteImg 
//         src={imgSrc}
//         onMouseOver={handleMouseOver}
//         onMouseOut={handleMouseOut}
//       />
//       <MessageNoteInfo>
//         <NoteTitleCover>
//           <NoteTitle>{noteTitle}</NoteTitle>
//         </NoteTitleCover>
//         <NoteDate>{noteDate}</NoteDate>
//       </MessageNoteInfo>
//     </MessageCover>
//   )
// }

// export default ShareNoteMessage;