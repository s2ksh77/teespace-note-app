import React from 'react';
import { EventBus } from 'teespace-core';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import ExpandImg from '../../assets/ts_maximize@3x.png';
import CollapseImg from '../../assets/ts_minimize@3x.png';
import cancel from '../../assets/ts_cancel@3x.png';
import { HeaderButtonContainer, Button } from '../../styles/commonStyle';

const style = { cursor: 'pointer', marginLeft: '0.69rem' };
// 확대,축소 & 닫기 버튼
const HeaderButtons = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
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
    // 같은 룸에서 layoutState만 바뀔 때
    switch (NoteStore.layoutState) {
      case 'expand':
        EventBus.dispatch('onLayoutCollapse');
        NoteStore.setTargetLayout('Content');
        break;
      default:
        EventBus.dispatch('onLayoutExpand');
        if (!PageStore.currentPageId) ChapterStore.fetchFirstNote();
        NoteStore.setTargetLayout(null);
        break;
    }
  };

  const handleCancelBtn = e => {
    if (!PageStore.isReadMode()) {
      NoteStore.setModalInfo('editCancel'); return;
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
