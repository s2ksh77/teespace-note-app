import React from 'react';
import {
  ModalSharedInfoContainer,
  ModalSharedInfoCover,
  ModalSharedInfoTitle,
  ModalSharedInfoContent,
} from '../../styles/commonStyle';

const ViewInfoModal = ({ sharedInfo }) => {

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