import React from 'react';
import { EventBus } from 'teespace-core';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import ExpandImg from '../../assets/ts_maximize@3x.png';
import CollapseImg from '../../assets/ts_minimize@3x.png';
import cancel from '../../assets/ts_cancel@3x.png';
import '../../styles/note.css';
import { HeaderButtonContainer, Button } from '../../styles/commonStyle';

const style = { cursor: 'pointer', marginLeft: '0.69rem' };
// 확대,축소 & 닫기 버튼
const HeaderButtons = () => {
  const { NoteStore, PageStore } = useNoteStore();
  /**
   * EventBus.dispatch('onLayoutExpand')
   * EventBus.dispatch('onLayoutCollapse')
   * EventBus.dispatch('onLayoutClose')
   * **/
  const onChangeImg = () => {
    switch (NoteStore.layoutState) {
      case 'expand':
        return CollapseImg;
      default:
        return ExpandImg;
    }
  };
  const handleLayoutState = () => {
    switch (NoteStore.layoutState) {
      case 'expand':
        EventBus.dispatch('onLayoutCollapse');
        break;
      default:
        EventBus.dispatch('onLayoutExpand');
        break;
    }
  };

  const handleCancelBtn = e => {
    if (PageStore.isEdit) {
      NoteStore.setModalInfo('editCancel');
    }
    EventBus.dispatch('onLayoutClose');
  };

  return useObserver(() => (
    <>
      <HeaderButtonContainer>
        <Button style={style} src={onChangeImg()} onClick={handleLayoutState} />
        <Button style={style} src={cancel} onClick={handleCancelBtn} />
      </HeaderButtonContainer>
    </>
  ));
};

export default HeaderButtons;
