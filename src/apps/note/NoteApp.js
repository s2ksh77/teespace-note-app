import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LNBContainer from './components/lnb/LNBContainer';
import useNoteStore from './store/useStore';
import { GlobalStyle, LNB, Content } from './GlobalStyles';
import PageContainer from './components/page/PageContainer';
import TagContainer from './components/tag/TagContainer';
import { useObserver } from 'mobx-react';
import { FoldBtn, FoldBtnImg } from './styles/editorStyle';
import foldImg from './assets/arrow_back_1.svg';
import { useCoreStores, Toast, Message } from 'teespace-core';
import {Modal} from 'antd';
import DragPreview from "./components/common/DragPreview";
import TempEditor from './components/editor/TempEditor';
import LoadingImgContainer from './components/common/LoadingImgContainer';

// layoutState는 collapse, expand, close가 있다
const NoteApp = ({ layoutState, roomId, channelId }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { userStore } = useCoreStores();
  const renderCondition = target => !(NoteStore.layoutState === 'collapse' && NoteStore.targetLayout !== target);
  const history = useHistory();

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

    /* 
      NoteStore.openNoteAfterInit : 다시 init해야하는 경우
      ShareNoteMessage는 noteInfo 서비스콜 보내고 노트앱을 
    */
    if (isOtherRoom) {
      NoteStore.init(roomId, channelId, userStore.myProfile.id, userStore.myProfile.name, userStore.myProfile.email, async () => {
        NoteStore.addWWMSHandler();
        // 깜빡임 방지위해 만든 변수
        NoteStore.setLoadingNoteApp(false);
        NoteStore.initVariables();

        if (!channelId) return;
        else if (NoteStore.noteIdFromTalk) NoteStore.openNote(NoteStore.noteIdFromTalk);
        else if (layoutState === 'collapse') {
          // lnb는 따로 로딩 화면 X
          ChapterStore.getNoteChapterList();
          NoteStore.setTargetLayout('LNB');
        }
        else { ChapterStore.fetchChapterList(); NoteStore.setTargetLayout(null); }
      })
    }
    NoteStore.setLayoutState(layoutState);

    return () => {
      // 초기화해주기(다른 앱 갔다가 노트로 돌아오는 경우 데이터 다시 받아오게 하기)
      if (!history.location.search.includes('note') || !history.location.pathname.includes(NoteStore.workspaceId)) {
        NoteStore.setWsId('');
        NoteStore.setChannelId('');
        // 노트앱 확대 상태 -> 다른 앱(축소 상태가 된다) -> 노트앱(축소) 일 때 확대 상태 그렸다가 축소 상태를 그림(그 전에 targetLayout 바꿔도 깜빡임)
        // loadingNoteApp을 넣어줌
        NoteStore.setLoadingNoteApp(true);
      }
    }
  }, [roomId, channelId, layoutState]);

  const handleFoldBtn = e => {
    const targetX = e.currentTarget.getBoundingClientRect().x;
    if (Math.abs(targetX - e.clientX) <= 5)
      NoteStore.setIsHoveredFoldBtnLine(true);
    else
      NoteStore.setIsHoveredFoldBtnLine(false);
  };

  return useObserver(() => (
    <>
      <GlobalStyle />
      {NoteStore.loadingNoteApp ? <LoadingImgContainer/> :
        <>
          <LNB show={(!NoteStore.isContentExpanded && renderCondition('LNB'))}>
            <LNBContainer />
          </LNB>
          <Content
            show={renderCondition('Content')}
            onMouseOver={handleFoldBtn}
            onMouseOut={handleFoldBtn}
          >
            <FoldBtn
              isExpanded={NoteStore.isContentExpanded}
              show={(
                NoteStore.showPage
                && NoteStore.layoutState !== "collapse"
                && NoteStore.isHoveredFoldBtnLine)}
              onMouseMove={() => NoteStore.setIsHoveredFoldBtnLine(true)}
              onClick={() => NoteStore.toggleIsContentExpanded()}
            >
              <FoldBtnImg src={foldImg} />
            </FoldBtn>
            {NoteStore.showPage ? <PageContainer /> : <TagContainer />}
          </Content>
          <Toast
            visible={NoteStore.isVisibleToast}
            children={NoteStore.toastText}
            onClose={() => NoteStore.setIsVisibleToast(false)}
          />
          {NoteStore.isDragging && Object.keys(NoteStore.draggedOffset).length
            ? <DragPreview items={NoteStore.draggedItems} />
            : null}
          <TempEditor />
          {(NoteStore.showModal && NoteStore.modalInfo.targetComponent === "Message") ? 
            <Message 
              visible={true}
              type={NoteStore.modalInfo.type}
              title={NoteStore.modalInfo.title}
              subtitle={NoteStore.modalInfo.subTitle}
              btns={NoteStore.modalInfo.btns}        
            /> 
          : null}
          {(NoteStore.showModal && NoteStore.modalInfo.targetComponent === "Modal") ?
            <Modal
              visible={true}
              title={NoteStore.modalInfo.title}
              centered
              footer={NoteStore.modalInfo.footer}
              onCancel={NoteStore.modalInfo.onCancel}
              wrapClassName={NoteStore.modalInfo.className}
            >
              {NoteStore.modalInfo.children}
            </Modal>
          : null}
        </>
      }
    </>
  ));
};

export default NoteApp;
