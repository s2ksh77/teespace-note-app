import React, { useState } from 'react';
import {
  RoomShareCover,
  ButtonGroup,
} from '../../styles/commonStyle';
import { ItemSelector, Button } from 'teespace-core';
import useNoteStore from '../../store/useStore';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 1.25rem 0;
`;
const AddMarginBtn = styled(Button)`
  margin-right:0.38rem;
`;

const ForwardModal = ({ handleCancel }) => {
  const { NoteStore } = useNoteStore();
  const { t } = useTranslation();
  const [shareArraysCnt, setShareArraysCnt] = useState(false);
  const [tooltipStr, setTooltipStr] = useState(null);

  const handleSelectChange = (data) => {
    NoteStore.setShareArrays(data);
    setShareArraysCnt(data.userArray.length + data.roomArray.length);
    if (shareArraysCnt === 0) setTooltipStr("프렌즈/구성원/룸을 선택해 주세요");
    else setTooltipStr(null);
  }
  const handleShare = (e) => {
    e.stopPropagation();
    if (shareArraysCnt === 0) return;
    NoteStore.shareNote();
    NoteStore.setModalInfo(null);
  }

  return (
    <RoomShareCover>
      <ItemSelector
        isVisibleRoom={true}
        placeholder={t('NOTE_DELIVER_TO_ANOTHER_ROOM_05')}
        onSelectChange={handleSelectChange}
      />
      <StyledButtonGroup>
        <AddMarginBtn
          key="share"
          type="solid"
          shape="defualt"
          alert={tooltipStr}
          onClick={handleShare}
          disabled={!shareArraysCnt}
        >
          {t('NOTE_DELIVER_TO_ANOTHER_ROOM_07')}
          {shareArraysCnt > 0 && ` ${shareArraysCnt}`}
        </AddMarginBtn>
        <Button key="cancel" type="oulined" shape="defualt" onClick={handleCancel}>{t('NOTE_PAGE_LIST_DEL_PGE_CHPT_05')}</Button>
      </StyledButtonGroup>
    </RoomShareCover>
  )
}

export default ForwardModal;