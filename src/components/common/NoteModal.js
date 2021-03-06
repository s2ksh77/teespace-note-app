import React from 'react';
import { observer } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { Message, Button, MobileMessage } from 'teespace-core';
import { Modal } from 'antd';
import ViewInfoModal from './ViewInfoModal';
import ForwardModal from './ForwardModal';
import RestoreModal from './RestoreModal';
import { handleUpload } from './NoteFile';
import { useTranslation } from 'react-i18next';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ChapterDialogInput from '../mobile/dialog/ChapterDialogInput';

// core코드
const StyledInfoIcon = styled(InfoCircleOutlined)`
  display: block;
  font-size: 1.25rem;
  color: ${props => props.theme.IconNormal2};
  margin-bottom: 0.94rem;
`;

const NoteModal = observer(({ isWeb = true }) => {
  const { NoteStore, EditorStore, ChapterStore } = useNoteStore();
  const { t } = useTranslation();
  const {
    targetComponent,
    modalName,
    title, // Modal, Message 공통 prop
    type,
    subTitle,
    btns, // 이 줄은 Message, 아래줄은 Modal prop
    className,
  } = NoteStore.modalInfo;

  // NoteMeta에서 NoteFile을 가져오면 안된다
  if (modalName === 'failUploadByFileNameLen') {
    btns[0].onClick = e => {
      e.stopPropagation();
      NoteStore.setModalInfo(null);
      if (EditorStore.uploadDTO.length === EditorStore.uploadLength) handleUpload();
    };
  }

  const handleCancel = function (e) {
    e.stopPropagation();
    NoteStore.setModalInfo(null);
  };

  const RenderModalContent = () => {
    switch (modalName) {
      case 'viewInfo': // 정보보기 팝업
        return <ViewInfoModal />;
      case 'forward': // 다른 룸으로 전달 팝업
        return <ForwardModal handleCancel={handleCancel} />;
      case 'restore': // 페이지 복원 후 위치할 챕터 선택 팝업
        return <RestoreModal />;
      default:
        return null;
    }
  };

  const modalHeader = (() => {
    switch (modalName) {
      case 'restore':
        return (
          <>
            <StyledInfoIcon />
            <div style={{ whiteSpace: 'pre-line' }}>{title}</div>
          </>
        );
      default:
        return title;
    }
  })();

  const modalFooter = (() => {
    switch (modalName) {
      case 'viewInfo':
        return [
          <Button key="confirm" type="solid" shape="defualt" onClick={handleCancel}>
            {t('NOTE_PAGE_LIST_CREATE_N_CHPT_03')}
          </Button>,
        ];
      default:
        return null;
    }
  })();

  const modalContent = (() => {
    if (modalName === undefined) NoteStore.setShowDialog(false);
    switch (modalName) {
      case 'createChapter':
      case 'renameChapter':
        return <ChapterDialogInput type={modalName} />;
      default:
        return null;
    }
  })();

  return (
    <>
      {targetComponent === 'Message' && isWeb ? (
        <Message
          visible={true}
          type={type}
          title={modalHeader}
          subtitle={subTitle}
          btns={btns}
        />
      ) : isWeb ? (
        <Modal
          visible={true}
          title={modalHeader}
          centered
          footer={modalFooter}
          onCancel={handleCancel}
          wrapClassName={className}
          closable={modalName === 'restore' ? false : true}
        >
          <RenderModalContent />
        </Modal>
      ) : (
        <MobileMessage
          visible={true}
          type={type}
          title={modalHeader}
          children={modalContent}
          subtitle={subTitle}
          btns={btns}
        />
      )}
    </>
  );
});

export default NoteModal;
