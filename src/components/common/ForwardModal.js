import React, { useState } from 'react';
import { ItemSelector, Button } from 'teespace-core';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../store/useStore';
import { RoomShareCover, ButtonGroup } from '../../styles/commonStyle';

const ForwardButton = styled(Button)`
  margin-right: 0.38rem;
`;

const ForwardModal = ({ handleCancel }) => {
  const { NoteStore } = useNoteStore();
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedCnt, setSelectedCnt] = useState(false);

  const handleSelectChange = data => {
    setSelectedItems(data);
    setSelectedCnt(data.userArray.length + data.roomArray.length);
  };

  const handleNoteShare = e => {
    e.stopPropagation();
    if (selectedCnt === 0) return;
    NoteStore.shareNote(selectedItems);
    NoteStore.setModalInfo(null);
  };

  return (
    <RoomShareCover>
      <ItemSelector
        isVisibleRoom
        placeholder={t('NOTE_DELIVER_TO_ANOTHER_ROOM_05')}
        onSelectChange={handleSelectChange}
      />
      <ButtonGroup style={{ margin: '1.25rem 0' }}>
        <ForwardButton
          key="share"
          type="solid"
          onClick={handleNoteShare}
          disabled={!selectedCnt}
        >
          {t('NOTE_DELIVER_TO_ANOTHER_ROOM_07')}
          {selectedCnt > 0 && ` ${selectedCnt}`}
        </ForwardButton>
        <Button key="cancel" type="oulined" onClick={handleCancel}>
          {t('NOTE_PAGE_LIST_DEL_PGE_CHPT_05')}
        </Button>
      </ButtonGroup>
    </RoomShareCover>
  );
};

export default ForwardModal;
