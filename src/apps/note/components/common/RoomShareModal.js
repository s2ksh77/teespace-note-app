import React,{useState} from 'react';
import {
  RoomShareCover,  
  ButtonGroup,
} from '../../styles/commonStyle';
import { ItemSelector, Button } from 'teespace-core';
import useNoteStore from '../../store/useStore';
import styled from 'styled-components';

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 1.25rem 0;
`;
const AddMarginBtn = styled(Button)`
  margin-right:0.38rem;
`;

const RoomShareModal = ({handleCancel}) => {
  const { NoteStore } = useNoteStore();  
  const [shareArraysCnt, setShareArraysCnt] = useState(false);
  const [tooltipStr, setTooltipStr] = useState(null);
  
  const handleSelectChange = (data) => {
    NoteStore.setShareArrays(data);
    setShareArraysCnt(data.userArray.length + data.roomArray.length);
    if (shareArraysCnt === 0) setTooltipStr("프렌즈/구성원/룸을 선택해주세요");
    else setTooltipStr(null);
  }
  const handleShare = (e) => {
     e.stopPropagation(); 
     if (shareArraysCnt === 0) return;
     NoteStore.shareNote(); 
     NoteStore.setIsShared(false); 
     NoteStore.setModalInfo(null); 
  }
  console.log('shareRoom')
  return (
    <RoomShareCover>
      <ItemSelector
        isVisibleRoom={true}
        placeholder={`프렌즈/구성원/룸 목록에서\n 선택해 주세요.`}
        onSelectChange={handleSelectChange}
      />
      <StyledButtonGroup>
        <AddMarginBtn key="share" type="solid" shape="defualt" alert={tooltipStr} onClick={handleShare}>
          {"전달"} 
          {shareArraysCnt > 0 && ` ${shareArraysCnt}`}
        </AddMarginBtn>
        <Button key="cancel" type="oulined" shape="defualt" onClick={handleCancel}>취소</Button>
      </StyledButtonGroup>
    </RoomShareCover>
  )
}

export default RoomShareModal;