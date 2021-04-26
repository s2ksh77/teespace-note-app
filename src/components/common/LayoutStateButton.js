import React from 'react';
import { EventBus } from 'teespace-core';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import {
  LayoutStateButtonWrapper,
  HeaderDivider,
  ButtonWrapper,
  ButtonIcon,
} from '../../styles/CommonStyle';
import ExpandIcon from '../../assets/ts_maximize.svg';
import CollapseIcon from '../../assets/ts_minimize.svg';
import closeIcon from '../../assets/ts_cancel.svg';

const LayoutStateButton = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  /**
   * EventBus.dispatch('onLayoutExpand')
   * EventBus.dispatch('onLayoutCollapse')
   * EventBus.dispatch('onLayoutClose')
   * * */

  const expandCollapseIcon = (() => {
    switch (NoteStore.layoutState) {
      case 'expand':
        return CollapseIcon;
      default:
        return ExpandIcon;
    }
  })();

  const fetchFirstNote = async () => {
    PageStore.setIsLoading(true);
    await PageStore.fetchNoteInfoList(
      ChapterStore.chapterList[0]?.pageList[0]?.id,
    );
    PageStore.fetchNoteTagList(ChapterStore.chapterList[0]?.pageList[0]?.id);
    PageStore.setIsLoading(false);
  };

  const handleLayoutState = () => {
    // 같은 룸에서 layoutState만 바뀔 때
    switch (NoteStore.layoutState) {
      case 'expand':
        EventBus.dispatch('onLayoutCollapse');
        NoteStore.setTargetLayout('content');
        // NoteStore.setIsContentExpanded(false);
        break;
      default:
        EventBus.dispatch('onLayoutExpand');
        if (!PageStore.pageModel) fetchFirstNote();
        NoteStore.setTargetLayout('both');
        // if (NoteStore.targetLayout === 'Content')
        //   ChapterStore.getNoteChapterList();
        // else if (!PageStore.currentPageId) ChapterStore.fetchFirstNote();
        break;
    }
  };

  const handleCloseBtn = () => {
    // if (!PageStore.isReadMode()) {
    //   if (EditorStore.isUploading) {
    //     NoteStore.setModalInfo('uploadingFiles');
    //     return;
    //   }
    //   if (EditorStore.tinymce && !EditorStore.tinymce.undoManager.hasUndo()) {
    //     PageStore.handleNoneEdit();
    //     return;
    //   }
    //   NoteStore.setModalInfo('editCancel');
    //   return;
    // }
    EventBus.dispatch('onLayoutClose');
  };

  return useObserver(() => (
    <LayoutStateButtonWrapper>
      <HeaderDivider />
      <ButtonWrapper
        style={{ marginRight: '0.5rem' }}
        onClick={handleLayoutState}
      >
        <ButtonIcon src={expandCollapseIcon} />
      </ButtonWrapper>
      <ButtonWrapper onClick={handleCloseBtn}>
        <ButtonIcon src={closeIcon} />
      </ButtonWrapper>
    </LayoutStateButtonWrapper>
  ));
};

export default LayoutStateButton;
