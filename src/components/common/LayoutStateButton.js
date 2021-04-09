import React from 'react';
import { EventBus } from 'teespace-core';
import { useObserver } from 'mobx-react';
import ExpandImg from '../../assets/ts_maximize.svg';
import CollapseImg from '../../assets/ts_minimize.svg';
import cancel from '../../assets/ts_cancel.svg';
import {
  HeaderButtonContainer,
  Button,
  ButtonDiv,
} from '../../styles/CommonStyle';

import useNoteStore from '../../stores/useNoteStore';

const LayoutStateButton = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  /**
   * EventBus.dispatch('onLayoutExpand')
   * EventBus.dispatch('onLayoutCollapse')
   * EventBus.dispatch('onLayoutClose')
   * * */
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
        NoteStore.setIsContentExpanded(false);
        break;
      default:
        EventBus.dispatch('onLayoutExpand');
        if (NoteStore.targetLayout === 'Content')
          ChapterStore.getNoteChapterList();
        else if (!PageStore.currentPageId) ChapterStore.fetchFirstNote();
        NoteStore.setTargetLayout(null);
        break;
    }
  };

  const handleCancelBtn = () => {
    if (!PageStore.isReadMode()) {
      if (EditorStore.isUploading) {
        NoteStore.setModalInfo('uploadingFiles');
        return;
      }
      if (EditorStore.tinymce && !EditorStore.tinymce.undoManager.hasUndo()) {
        PageStore.handleNoneEdit();
        return;
      }
      NoteStore.setModalInfo('editCancel');
      return;
    }
    EventBus.dispatch('onLayoutClose');
  };

  return useObserver(() => (
    <>
      <HeaderButtonContainer
        layoutState={NoteStore.layoutState}
        targetLayout={NoteStore.targetLayout}
      >
        <ButtonDiv>
          <Button src={onChangeImg()} onClick={handleLayoutState} />
        </ButtonDiv>
        <ButtonDiv>
          <Button src={cancel} onClick={handleCancelBtn} />
        </ButtonDiv>
      </HeaderButtonContainer>
    </>
  ));
};

export default LayoutStateButton;
