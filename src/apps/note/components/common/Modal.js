import React from 'react';
import ReactDom from 'react-dom';
import {
  CustomModal,
  CustomOverlay,
  ModalTitle,
  ModalSubTitle,
  ButtonGroup,
  IconImg,
  ModalNormalBtn,
  ModalCancelBtn
} from '../../styles/commonStyle';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import normalIcon from '../../assets/ts_info_normal@3x.png';
import alertIcon from '../../assets/ts_popup_info_alert@3x.png';
import defaultIcon from '../../assets/ts_info@3x.png';

const icon = { normal: normalIcon, alert: alertIcon, default: defaultIcon };
const Modal = () => {
  const { NoteStore } = useStore();
  const { type, title, subTitle, buttons } = NoteStore.modalInfo;

  let el = ReactDom.createPortal(
    <>
      <CustomOverlay />
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
    </>,
    document.body,
  );
  return useObserver(() => (
    NoteStore.showModal ? el : false
  ))
}

export default Modal;
