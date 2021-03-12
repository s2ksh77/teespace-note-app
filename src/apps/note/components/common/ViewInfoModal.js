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
    { title: t('NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_01'), content: sharedRoomName },
    { title: t('NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_02'), content: sharedUserName },
    { title: t('NOTE_DELIVER_CONTEXT_MENU_NOTE_INFO_03'), content: sharedDate }
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