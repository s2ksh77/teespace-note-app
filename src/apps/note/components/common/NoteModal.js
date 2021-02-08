import React from 'react';
import { observer } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { Message, Button } from 'teespace-core';
import { Modal } from 'antd';
import ViewInfoModal from './ViewInfoModal';
import ForwardModal from './ForwardModal';

const NoteModal = observer(() => {
  const { NoteStore } = useNoteStore();
  const { targetComponent, title, // Modal, Message 공통 prop
    type, subTitle, btns, // 이 줄은 Message, 아래줄은 Modal prop 
    name, className, handleCancel } = NoteStore.modalInfo;

  return (
    <>
      {(targetComponent === "Message") ?
        <Message
          visible={true}
          type={type}
          title={title}
          subtitle={subTitle}
          btns={btns}
        /> :
        <Modal
          visible={true}
          title={title}
          centered
          footer={(name === "viewInfo") && <Button key="confirm" type="solid" shape="defualt" onClick={handleCancel}>{NoteStore.getI18n('ok')}</Button>}
          onCancel={handleCancel}
          wrapClassName={className}
        >
          {(name === "viewInfo") ? // 정보보기 팝업
            <ViewInfoModal /> :
            <ForwardModal handleCancel={handleCancel} /> // 다른 룸으로 전달 팝업
          }
        </Modal>
      }
    </>
  );
})

export default NoteModal;