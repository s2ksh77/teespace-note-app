import React from 'react';
import {
  ModalSharedInfoContainer,
  ModalSharedInfoCover,
  ModalSharedInfoTitle,
  ModalSharedInfoContent,
} from '../../styles/commonStyle';
import useNoteStore from '../../store/useStore';

const ViewInfoModal = () => {
  const { NoteStore } = useNoteStore();
  const {sharedRoomName, sharedUserName, sharedDate} = NoteStore.sharedInfo;
  const sharedInfo = [
    { title: '출처 룸', content: sharedRoomName },
    { title: '전달한 멤버', content: sharedUserName },
    { title: '전달 날짜', content: sharedDate }
  ];

  return (
    <>
      <ModalSharedInfoContainer>
        {sharedInfo.map(info => {
          return (
            <ModalSharedInfoCover key={info.title}>
              <ModalSharedInfoTitle>{info.title}</ModalSharedInfoTitle>
              <ModalSharedInfoContent>{info.content}</ModalSharedInfoContent>
            </ModalSharedInfoCover>
          )
        })}
      </ModalSharedInfoContainer>
    </>
  )
}

export default ViewInfoModal;