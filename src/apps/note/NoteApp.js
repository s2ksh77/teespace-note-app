import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LNBContainer from './components/lnb/LNBContainer';
import useNoteStore from './store/useStore';
import { GlobalStyle, LNB, Content } from './GlobalStyles';
import PageContainer from './components/page/PageContainer';
import TagContainer from './components/tag/TagContainer';
import { useObserver } from 'mobx-react';
import { WWMS, useCoreStores, Toast, ComponentStore } from 'teespace-core';
import DragPreview from './components/common/DragPreview';
import NoteModal from './components/common/NoteModal';
import Overlay from './components/common/Overlay';
import TempEditor from './components/editor/TempEditor';
import LoadingImgContainer from './components/common/LoadingImgContainer';
import GlobalVariable from './GlobalVariable';
import { useTranslation } from 'react-i18next';
import PageStore from './store/pageStore';
import SlashCmdNote from './components/common/SlashCmdNote';

// layoutState는 collapse, expand, close가 있다
const NoteApp = ({ layoutState, roomId, channelId, language }) => {
  const { NoteStore, ChapterStore, EditorStore } = useNoteStore();
  const { i18n } = useTranslation();
  const { userStore, spaceStore, authStore, configStore } = useCoreStores();
  const renderCondition = target => !(NoteStore.layoutState === 'collapse' && NoteStore.targetLayout !== target);
  const history = useHistory();
  const MailWriteModal = ComponentStore.get('Mail:MailWriteModal');

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
      const { id: userId, name: userName, email: userEmail } = userStore.myProfile;
      const isBasicPlan = spaceStore.currentSpace?.plan === "BASIC";
      // todo : 나중에 mobile이랑 task에 알리고 객체로 바꾸기
      NoteStore.init(roomId, channelId, userId, userName, userEmail, async () => {
        GlobalVariable.setIsBasicPlan(isBasicPlan);
        GlobalVariable.setIsMailApp(!isBasicPlan && configStore.isActivateComponent('Note', 'customLink:openLink'));
        NoteStore.addWWMSHandler((authStore.sessionInfo.deviceType === 'PC') ? true : false); // PC인지 아닌지
        NoteStore.initVariables();
        // 톡 메타태그 클릭하여 노트앱 진입시
        if (channelId && NoteStore.metaTagInfo.isOpen) {
          NoteStore.setLoadingNoteApp(true); // 첫 진입시에만 loading이미지 보여주기
          await ChapterStore.openNote();
          NoteStore.setLoadingNoteApp(false);
          return;
        }
        // 깜빡임 방지위해 만든 변수
        NoteStore.setLoadingNoteApp(false);

        if (!channelId) return;
        if (layoutState === 'collapse') {
          // lnb는 따로 로딩 화면 X
          await ChapterStore.getNoteChapterList(true);
          NoteStore.setTargetLayout('LNB');
        } else { 
          await ChapterStore.fetchChapterList(true); 
          NoteStore.setTargetLayout(null);
        }        
        PageStore.checkEditingPage(); // 복구할 페이지가 있는 경우 팝업창을 띄운다
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
        NoteStore.setIsContentExpanded(false);
        NoteStore.setLoadingNoteApp(true);
      }
      WWMS.removeHandler('CHN0003', 'NoteWWMSHandler');
    }
  }, [roomId, channelId, layoutState]);

  useEffect(() => {
    return () => EditorStore.setInitialSearchState();
  }, [roomId, channelId])

  useEffect(()=>{
    if (NoteStore.isSlashCmd) SlashCmdNote();
    return () => NoteStore.setIsSlashCmd(false);
  },[NoteStore.isSlashCmd])

  const handleCloseMailModal = () => {
    NoteStore.setIsMailShare(false);
    NoteStore.setMailShareFileObjs([]);
    NoteStore.setMailReceiver([]);
  }
  useEffect(() => {
    if (!language) return;
    const editorLanguage = language === 'en' ? language : 'ko_KR';
    NoteStore.setI18nLanguage(editorLanguage);
    if (EditorStore.tinymce) EditorStore.tinymce.editorManager.i18n.setCode(editorLanguage);
  }, [language])

  return useObserver(() => (
    <>
      <GlobalStyle />
      {NoteStore.loadingNoteApp ? <LoadingImgContainer /> :
        <>
          <LNB show={(!NoteStore.isContentExpanded && renderCondition('LNB'))}>
            <LNBContainer />
          </LNB>
          <Content
            id="note-content"
            show={renderCondition('Content')}
            isBorderLeft={NoteStore.layoutState !== "collapse" && !NoteStore.isContentExpanded}
          >
            <PageContainer />
            <TagContainer />
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
          {NoteStore.isExporting && <Overlay />}
          {NoteStore.showModal && <NoteModal />}
          {NoteStore.isMailShare && <MailWriteModal
            uploadFiles={NoteStore.mailShareFileObjs}
            sender={{ mailAddr: NoteStore.userEmail, accountId: NoteStore.user_id }}
            toReceiver={NoteStore.mailReceiver}
            onClose={handleCloseMailModal}
            visible={true}
            totalSize={NoteStore.mailShareFileObjs[0] ? NoteStore.mailShareFileObjs[0].fileSize : 0} />}
        </>
      }
    </>
  ));
};

export { NoteApp };
