import React from 'react';
import { Modal, Button } from 'antd';
import useStore from '../../store/useStore';
import { useObserver } from 'mobx-react';
import normalIcon from '../../assets/ts_info_normal@3x.png';
import alertIcon from '../../assets/ts_popup_info_alert@3x.png';
import defaultIcon from '../../assets/ts_info@3x.png';
import {
  ModalContent,
  DialogTitle,
  DialogBtn,
  IconImg,
  ButtonGroup,
} from '../../styles/commonStyle';

// icon type별 color : {normal : purple, alert:red, defaultIcon:black}
const icon = { normal: normalIcon, alert: alertIcon, default: defaultIcon };
const modalStyle = {
  // display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'center',
  padding: '0',
};

const buttonStyle = {
  backgroundColor: '#6C56E5',
  color: 'white',
  marginRight: '0.38rem',
};
const cancelButtonStyle = {
  border: '1px solid #C6CED6',
  color: ' #3B3B3B',
};
const Dialog = () => {
  const { NoteStore } = useStore();
  const { type, title, subTitle, buttons } = NoteStore.modalInfo;

  return useObserver(() => (
    <>
      <Modal
        visible={NoteStore.showModal}
        closable={false}
        centered
        title={null}
        footer={null}
        maskClosable={false}
        width={'22.5rem'}
        bodyStyle={modalStyle}
      >
        <ModalContent>
          <IconImg src={icon[type]} />
          <DialogTitle>{title}</DialogTitle>
          {subTitle && <DialogSubTitle>{subTitle}</DialogSubTitle>}
          <ButtonGroup>
            {buttons.map(button => {
              return (
                <DialogBtn
                  key={button.text}
                  style={
                    button.type === 'cancel' ? cancelButtonStyle : buttonStyle
                  }
                  onClick={button.onClick}
                >
                  {button.text}
                </DialogBtn>
              );
            })}
          </ButtonGroup>
        </ModalContent>
      </Modal>
    </>
  ));
};

export default Dialog;
