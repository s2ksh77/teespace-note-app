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
    NoteStore.setIsShared(false);
    NoteStore.setModalInfo(null);
  }

  return (
    <RoomShareCover>
      <ItemSelector
        isVisibleRoom={true}
        placeholder={t('selectFromList')}
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
          {t('send')}
          {shareArraysCnt > 0 && ` ${shareArraysCnt}`}
        </AddMarginBtn>
        <Button key="cancel" type="oulined" shape="defualt" onClick={handleCancel}>{t('cancel')}</Button>
      </StyledButtonGroup>
    </RoomShareCover>
  )
}

export default ForwardModal;