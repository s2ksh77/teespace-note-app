import React from 'react';
import ReactDom from 'react-dom';
import {
  CustomModal,
  RoomShareModal,
  RoomShareTitleContainer,
  RoomShareTitle,
  CustomOverlay,
  ModalTitle,
  ModalSubTitle,
  ShraedInfoModal,
  ModalSharedInfoHeader,
  ModalHeaderBtn,
  ModalSharedInfoContainer,
  ModalSharedInfoCover,
  ModalSharedInfoTitle,
  ModalSharedInfoContent,
  ButtonGroup,
  IconImg,
  Button,
  ModalNormalBtn,
  ModalCancelBtn
} from '../../styles/commonStyle';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import normalIcon from '../../assets/ts_info_normal@3x.png';
import alertIcon from '../../assets/ts_popup_info_alert@3x.png';
import defaultIcon from '../../assets/ts_info@3x.png';
import { ItemSelector, useCoreStores } from 'teespace-core'
import cancelImg from '../../assets/ts_cancel@3x.png';

const icon = { normal: normalIcon, alert: alertIcon, default: defaultIcon };
const Modal = () => {
  const { NoteStore } = useNoteStore();
  const { userStore, roomStore } = useCoreStores();
  const { type, title, subTitle, buttons, sharedInfo } = NoteStore.modalInfo;

  let el = ReactDom.createPortal(
    <>
      <CustomOverlay />
      {NoteStore.isShared ? (
        <>
          <RoomShareModal>
            <RoomShareTitleContainer>
              <RoomShareTitle>다른 룸으로 전달</RoomShareTitle>
              <ModalHeaderBtn 
                style={{ right: '1.25rem' }}
                src={cancelImg} 
                onClick={() => {
                  NoteStore.setModalInfo(null); NoteStore.setIsShared(false);
                }}
              />
            </RoomShareTitleContainer>
            <ItemSelector
              isVisibleRoom={true}
              onSelectChange={data => {
                console.log(data)
                NoteStore.setShareArrays(data);
              }}
            />
            <ButtonGroup>
              {buttons && buttons.map(button => {
                if (button.type === 'cancel') {
                  return (
                    <ModalCancelBtn key={button.text} onClick={button.onClick}>
                      {button.text}
                    </ModalCancelBtn>
                  );
                }
                return (
                  <ModalNormalBtn key={button.text} onClick={button.onClick}>
                    {button.text}
                  </ModalNormalBtn>
                );
              })}
            </ButtonGroup>
          </RoomShareModal>
        </>
      ) : (
          <>
            {sharedInfo
              ? (
                <ShraedInfoModal className="NoteModal">
                  <ModalSharedInfoHeader>
                    <RoomShareTitle>정보 보기</RoomShareTitle>
                    <ModalHeaderBtn 
                      src={cancelImg} 
                      onClick={() => NoteStore.setModalInfo(null)}
                    />
                  </ModalSharedInfoHeader>
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
                  <ButtonGroup>
                    {buttons && buttons.map(button => {
                      return (
                        <ModalNormalBtn key={button.text} onClick={button.onClick}>
                          {button.text}
                        </ModalNormalBtn>
                      );
                    })}
                  </ButtonGroup>
                </ShraedInfoModal>
              )
              : (
                <CustomModal className="NoteModal" >
                  <IconImg src={icon[type]} />
                  <ModalTitle>{title}</ModalTitle>
                  {subTitle && <ModalSubTitle>{subTitle}</ModalSubTitle>}
                  <ButtonGroup>
                    {buttons && buttons.map(button => {
                      if (button.type === 'cancel') {
                        return (
                          <ModalCancelBtn key={button.text} onClick={button.onClick}>
                            {button.text}
                          </ModalCancelBtn>
                        );
                      }
                      return (
                        <ModalNormalBtn key={button.text} onClick={button.onClick}>
                          {button.text}
                        </ModalNormalBtn>
                      );
                    })}
                  </ButtonGroup>
                </CustomModal>
              )}
          </>
        )
      }
    </>,
    document.body,
  );
  return useObserver(() => (
    NoteStore.showModal ? el : false
  ))
}

export default Modal;
