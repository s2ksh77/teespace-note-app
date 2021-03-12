import React from 'react';
import { observer } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { Message, Button } from 'teespace-core';
import { Modal } from 'antd';
import ViewInfoModal from './ViewInfoModal';
import ForwardModal from './ForwardModal';
import { handleUpload } from './NoteFile';
import { useTranslation } from 'react-i18next';

const NoteModal = observer(() => {
  const { NoteStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();
  const { targetComponent, modalName, title, // Modal, Message 공통 prop
    type, subTitle, btns, // 이 줄은 Message, 아래줄은 Modal prop 
    className, handleCancel } = NoteStore.modalInfo;
  // NoteMeta에서 NoteFile을 가져오면 안돼ㅓ
  if (modalName === 'failUploadByFileNameLen') {
    btns[0].onClick = (e) => {
      e.stopPropagation(); NoteStore.setModalInfo(null);
      if (EditorStore.uploadDTO.length === EditorStore.uploadLength) handleUpload();
    };
  }

  return (
    <>
      {(targetComponent === "Message") ?
        <Message
          visible={true}
          type={type}
          title={t(title)}
          subtitle={t(subTitle)}
          btns={btns}
        /> :
        <Modal
          visible={true}
          title={t(title)}
          centered
          footer={(modalName === "viewInfo") && <Button key="confirm" type="solid" shape="defualt" onClick={handleCancel}>{t('NOTE_PAGE_LIST_CREATE_N_CHPT_03')}</Button>}
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