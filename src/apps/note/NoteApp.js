import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  const renderCondition = target => !(NoteStore.layoutState === 'collapse' && NoteStore.targetLayout !== target);
  const history = useHistory();

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
  
  /*
    1) collapse 아닐 때는 setTargetLayout(null) 넣어준다
    2) fetch~는 로딩이미지 true -> false 로직이 있음
    3)
                                  다른 룸                                       같은 룸
    확대   initVar, chapterList가져오기+firstnoteinfo가져오기      [축소 -> 확대, 선택된 페이지 없을 때] firstNoteInfo가져오기                 
    축소   initVar, setTargetLayout(LNB)                          [확대 -> 축소 ] setTargetLayout(CONTENT) 
    4) 노트앱 -> 다른 앱 -> 노트앱일 때, roomId, channelId가 기존과 같아 unmount 하기 전 roomid, channelId 초기화
  */
  useEffect(() => {
    // setRoomId, setChannelId 전 id 비교!
    // 룸과 채널은 1:1 대응, roomId만 체크한다
    // 노트앱 -> 다른 앱 -> 노트앱일 때, 다른 앱 가기 전에 초기화해주었기 때문에 isOtherRoom === true
    const isOtherRoom = NoteStore.workspaceId !== roomId;
    
    if (isOtherRoom) {
      NoteStore.init(roomId, channelId, userStore.myProfile.id, userStore.myProfile.name, async () => {
        NoteStore.addWWMSHandler();
        // 깜빡임 방지위해 만든 변수
        NoteStore.setLoadingNoteApp(false);   
        NoteStore.initVariables();   

        if (!channelId) return;
        if (layoutState === 'collapse') {
          // lnb는 따로 로딩 화면 X
          ChapterStore.getNoteChapterList();
          NoteStore.setTargetLayout('LNB');
        }
        else {ChapterStore.fetchChapterList();NoteStore.setTargetLayout(null);}
      })
    }
    // 같은 룸에서 layoutState만 바뀔 대
    else {
      if (NoteStore.layoutState === 'collapse' && layoutState === 'expand') {
        if (!PageStore.currentPageId) ChapterStore.fetchFirstNote();
        NoteStore.setTargetLayout(null);
      } else if (NoteStore.layoutState === 'expand' && layoutState === 'collapse'){
        NoteStore.setTargetLayout('Content');
      }
    }
    NoteStore.setLayoutState(layoutState); 
    return () => {
      // 초기화해주기(다른 앱 갔다가 노트로 돌아오는 경우 데이터 다시 받아오게 하기)
      if (!history.location.search.includes('note') || !history.location.pathname.includes(NoteStore.workspaceId) ) {
        NoteStore.setWsId('');
        NoteStore.setChannelId('');
        // 노트앱 확대 상태 -> 다른 앱(축소 상태가 된다) -> 노트앱(축소) 일 때 확대 상태 그렸다가 축소 상태를 그림(그 전에 targetLayout 바꿔도 깜빡임)
        // loadingNoteApp을 넣어줌
        NoteStore.setLoadingNoteApp(true);
      }
    }
  }, [roomId, channelId, layoutState]);

  /*
    여기가 정확히 언제 그려지는지 모르겠다... store 변수를 바꾸었을 때!
    노트앱의 페이지나 태그 화면 축소모드로 보다가 -> 룸 바꿨을 때,
    기존 룸의 LNB 보였다가 새로운 룸 LNB로 보이는 문제(깜빡임 발생)
    store 변수 바꿔도 바꾼대로 바로 render되는게 아니라 효과가 없다..
  */
  return useObserver(() => (
    <>
      <GlobalStyle />
      {NoteStore.loadingNoteApp ? <div></div> : 
      <>
        <LNB show={(!NoteStore.isContentExpanded && renderCondition('LNB'))}>
          <LNBContainer />
        </LNB>
          <Content show={renderCondition('Content')}>
            <FoldBtn
              isExpanded={NoteStore.isContentExpanded}
              show={(NoteStore.showPage && (NoteStore.layoutState !== "collapse"))}
              onClick={() => NoteStore.toggleIsContentExpanded()}
            >
              <FoldBtnImg src={foldImg} />
            </FoldBtn>
            {NoteStore.showPage ? <PageContainer /> : <TagContainer />}
          </Content>
        <Modal />
      </>
      }
    </>
  ));
};

export default NoteApp;
