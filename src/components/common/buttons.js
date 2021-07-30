import React, { useContext } from 'react';
import { EventBus } from 'teespace-core';
import { useObserver } from 'mobx-react';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../store/useStore';
import {
  HeaderButtonContainer,
  Button,
  ButtonDiv,
} from '../../styles/commonStyle';
import {
  MaximizeIcon,
  MinimizeIcon,
  CloseIcon,
} from '../icons';

// 확대,축소 & 닫기 버튼
const HeaderButtons = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const themeContext = useContext(ThemeContext);
  /**
   * EventBus.dispatch('onLayoutExpand')
   * EventBus.dispatch('onLayoutCollapse')
   * EventBus.dispatch('onLayoutClose')
   * * */
  const onChangeImg = () => {
    switch (NoteStore.layoutState) {
      case 'expand':
        return <MinimizeIcon color={themeContext.IconNormal} />;
      default:
        return <MaximizeIcon color={themeContext.IconNormal} />;
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
        else if (!ChapterStore.currentChapterId && !PageStore.currentPageId)
          ChapterStore.fetchFirstNote();
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
      if (EditorStore.isEditCancelOpen()) {
        PageStore.editCancel();
        return;
      }
      PageStore.handleNoneEdit();
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
        <ButtonDiv onClick={handleLayoutState}>{onChangeImg()}</ButtonDiv>
        <ButtonDiv onClick={handleCancelBtn}>
          <CloseIcon color={themeContext.IconNormal} />
        </ButtonDiv>
      </HeaderButtonContainer>
    </>
  ));
};

export default HeaderButtons;
