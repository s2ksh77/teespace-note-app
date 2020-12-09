import React, { useEffect } from 'react';
import LNBContainer from './components/lnb/LNBContainer';
import useNoteStore from './store/useStore';
import { GlobalStyle, LNB, Content } from './GlobalStyles';
import PageContainer from './components/page/PageContainer';
import TagContainer from './components/tag/TagContainer';
import { useObserver } from 'mobx-react';
import { FoldBtn, FoldBtnImg } from './styles/editorStyle';
import foldImg from './assets/arrow_left.svg';
import { useCoreStores } from 'teespace-core';
import Modal from './components/common/Modal';
import GlobalVariable from './GlobalVariable';

// layoutState는 collapse, expand, close가 있다
const NoteApp = ({ layoutState, roomId, channelId }) => {
  const { NoteStore, PageStore, EditorStore, ChapterStore } = useNoteStore();
  const { userStore, authStore } = useCoreStores();

  const renderCondition = target =>
    !(
      NoteStore.layoutState === 'collapse' && NoteStore.targetLayout !== target
    );

  const handleClickOutsideEditor = (e) => {
    if (PageStore.isReadMode()) return;
    if (EditorStore.isDrive || EditorStore.isAttatch) return;
    if (GlobalVariable.editorWrapper && GlobalVariable.editorWrapper?.contains(e.target)) return;
    if (GlobalVariable.editorWrapper && document.querySelector('.tox.tox-tinymce-aux')?.contains(e.target)) return;
    if (document.querySelector('.tox-pop__dialog')?.contains(e.target)) return;
    if (e.target.download) return;

    const isUndoActive = EditorStore.tinymce?.undoManager.hasUndo();
    if (!isUndoActive && !PageStore.isReadMode() && !PageStore.otherEdit) { PageStore.handleNoneEdit(); return; }
    NoteStore.setModalInfo('editCancel');
  }
  
  useEffect(() => {
    window.addEventListener('click', handleClickOutsideEditor);
    return () => {
      window.removeEventListener('click', handleClickOutsideEditor);
    };
  }, []);
  
  // FirstNoteInfo 하는 때 : 확대 상태로 방 바뀌었을 때, 축소->확대 처음할 때
  useEffect(() => {
    // channelId가 바뀔 때만 동작한다는 가정!
    NoteStore.init(roomId, channelId, userStore.myProfile.id, userStore.myProfile.name, async () => {
      NoteStore.addWWMSHandler();
      NoteStore.initVariables();
      if (channelId) {
        await ChapterStore.getNoteChapterList();
        if (layoutState === 'expand') ChapterStore.setFirstNoteInfo();
        else if (layoutState === 'collapse') NoteStore.setTargetLayout('LNB');
      }
      else ChapterStore.setChapterList([]);
    });
  }, [channelId]);

  /* 
    layoutState는 collapse, expand, close가 있다
    layoutState : 새로운 state
    NoteStore.layoutState : 기존 state
    collapse 아닐 때는 setTargetLayout(null) 넣어준다
    layoutState가 똑같은게 들어올 때는 타지 않음(NoteApp의 useEffect 로직)
  */
  // 한 번 클릭시 두 번씩 데이터가 들어와서 불완전하다
  useEffect(() => {
    if (layoutState !== NoteStore.layoutState) {
      if (NoteStore.layoutState === 'collapse' && layoutState === 'expand' && !PageStore.currentPageId) {
        ChapterStore.setFirstNoteInfo();
      } else if (NoteStore.layoutState === 'expand' && layoutState === 'collapse') {
        NoteStore.setTargetLayout('Content');
      }
      NoteStore.setLayoutState(layoutState);
    }    
  }, [layoutState]);

  return useObserver(() => (
    <>
      <GlobalStyle />
      {/* <ShareNoteMessage noteId={"123"} noteTitle={"test"} noteDate={"2020.12.8"} /> */}
      {renderCondition('LNB') && (
        <LNB
          style={
            NoteStore.isContentExpanded ? { display: 'none' } : { display: 'flex' }
          }
        >
          <LNBContainer />
        </LNB>
      )}
      {renderCondition('Content') && (
        <Content>
          <FoldBtn
            isExpanded={NoteStore.isContentExpanded}
            show={(NoteStore.showPage && (NoteStore.layoutState !== "collapse"))}
            onClick={() => NoteStore.toggleIsContentExpanded()}
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
