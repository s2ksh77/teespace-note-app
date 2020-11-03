import React, { useEffect } from 'react';
import LNBContainer from './components/lnb/LNBContainer';
import useStore from './store/useStore';
import { GlobalStyle, LNB, Content } from './GlobalStyles';
import PageContainer from './components/page/PageContainer';
import TagContainer from './components/tag/TagContainer';
import { useObserver } from 'mobx-react';
import { FoldBtn, FoldBtnImg } from './styles/editorStyle';
import foldImg from './assets/arrow_left.svg';
import { useCoreStores, WWMS } from 'teespace-core';
import Modal from './components/common/Modal';
import GlobalVariable from './GlobalVariable';
import { handleWebsocket } from './components/common/Websocket';

const NoteApp = ({ layoutState, roomId }) => {
  const targetChId = 'c80a1e40-a699-40cb-b13c-e9ac702cc6d4';
  const { NoteStore, PageStore, EditorStore } = useStore();
  // const { roomStore, userStore } = useCoreStores()
  // const { 'CHN0003': targetChId } = roomStore.getChannelIds({ roomId: roomId });
  NoteStore.setChannelId(targetChId);
  // NoteStore.setWsId(roomId);
  // NoteStore.setUserId(userStore.myProfile.id);
  // 임시
  if (!layoutState) layoutState = 'expand';
  const renderCondition = target =>
    !(
      NoteStore.layoutState === 'collapse' && NoteStore.targetLayout !== target
    );

  const handleClickOutsideEditor = (e) => {
    if (!PageStore.isEdit) return;
    if (GlobalVariable.editorWrapper && GlobalVariable.editorWrapper?.contains(e.target)) return;
    if (GlobalVariable.editorWrapper && document.querySelector('.tox.tox-tinymce-aux')?.contains(e.target)) return;
    if (document.querySelector('.tox-pop__dialog')?.contains(e.target)) return;

    const isUndoActive = EditorStore.tinymce?.undoManager.hasUndo();
    if (!isUndoActive) { PageStore.handleNoneEdit(); return; }
    NoteStore.setModalInfo('editCancel');
  }

  useEffect(() => {
    WWMS.addHandler('CHN0003', handleWebsocket);
    window.addEventListener('click', handleClickOutsideEditor);
    return () => {
      window.removeEventListener('click', handleClickOutsideEditor);
    };
  }, []);

  useEffect(() => {
    // collapse 아닐 때는 setTargetLayout(null) 넣어준다
    if (layoutState === 'collapse') {
      switch (NoteStore.layoutState) {
        case '':
          NoteStore.setTargetLayout('LNB');
          break;
        case 'collapse':
          break;
        // 확대
        default:
          NoteStore.setTargetLayout('Content');
          break;
      }
    }
    NoteStore.setLayoutState(layoutState);
  }, [layoutState]);

  return useObserver(() => (
    <>
      <GlobalStyle />
      {renderCondition('LNB') && (
        <LNB
          style={
            NoteStore.isExpanded ? { display: 'none' } : { display: 'flex' }
          }
        >
          <LNBContainer />
        </LNB>

      )}
      {renderCondition('Content') && (
        <Content>
          <FoldBtn
            className={NoteStore.isExpanded ? 'flipBtn' : ''}
            show={(NoteStore.showPage && (NoteStore.layoutState !== "collapse"))}
            onClick={() => NoteStore.setIsExpanded()}
          >
            <FoldBtnImg src={foldImg} />
          </FoldBtn>
          {NoteStore.showPage ? <PageContainer /> : <TagContainer />}
        </Content>
      )}
      <Modal />
    </>
  ));
};

export default NoteApp;
