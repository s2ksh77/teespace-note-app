import React from 'react';
import { observer } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { Message, Button } from 'teespace-core';
import { Modal } from 'antd';
import ViewInfoModal from './ViewInfoModal';
import ForwardModal from './ForwardModal';
import { handleUpload } from './NoteFile';

const NoteModal = observer(() => {
  const { NoteStore, EditorStore } = useNoteStore();
  const { targetComponent, modalName, title, // Modal, Message 공통 prop
    type, subTitle, btns, // 이 줄은 Message, 아래줄은 Modal prop 
    className, handleCancel } = NoteStore.modalInfo;
  // NoteMeta에서 NoteFile을 가져오면 안돼ㅓ
  if (modalName === 'failUploadByFileNameLen') {
    btns[0].onClick = (e) => {
      e.stopPropagation(); NoteStore.setModalInfo(null);
      EditorStore.setIsFileFilteredByNameLen(false);
      if (EditorStore.uploadDTO.length === EditorStore.uploadLength) handleUpload();
    };
  }

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
          footer={(modalName === "viewInfo") && <Button key="confirm" type="solid" shape="defualt" onClick={handleCancel}>{NoteStore.getI18n('ok')}</Button>}
          onCancel={handleCancel}
          wrapClassName={className}
        >
          {(modalName === "viewInfo") ? // 정보보기 팝업
            <ViewInfoModal /> :
            <ForwardModal handleCancel={handleCancel} /> // 다른 룸으로 전달 팝업
          }
        </Modal>
      }
    </>
  );
})

export default NoteModal;