import React from 'react';
import {
  ModalSharedInfoContainer,
  ModalSharedInfoCover,
  ModalSharedInfoTitle,
  ModalSharedInfoContent,
} from '../../styles/commonStyle';
import useNoteStore from '../../store/useStore';
import { useTranslation } from 'react-i18next';

const ViewInfoModal = () => {
  const { NoteStore } = useNoteStore();
  const { t } = useTranslation();
  const { sharedRoomName, sharedUserName, sharedDate } = NoteStore.sharedInfo;
  const sharedInfo = [
    { title: t('forwardRoom'), content: sharedRoomName },
    { title: t('forwardMemeber'), content: sharedUserName },
    { title: t('forwardDate'), content: sharedDate }
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