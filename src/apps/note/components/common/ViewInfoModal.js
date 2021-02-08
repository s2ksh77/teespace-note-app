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
  const { sharedRoomName, sharedUserName, sharedDate } = NoteStore.sharedInfo;
  const sharedInfo = [
    { title: NoteStore.getI18n('forwardRoom'), content: sharedRoomName },
    { title: NoteStore.getI18n('forwardMemeber'), content: sharedUserName },
    { title: NoteStore.getI18n('forwardDate'), content: sharedDate }
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