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
import LoadingContent from './components/common/LoadingContent';
import GlobalVariable from './GlobalVariable';
import { useTranslation } from 'react-i18next';
import PageStore from './store/pageStore';
import SlashCmdNote from './components/common/SlashCmdNote';

const NoteApp = ({ layoutState, roomId, channelId, language, appType }) => {
  const { NoteStore, ChapterStore, EditorStore } = useNoteStore();
  const { i18n } = useTranslation();
  const { userStore, spaceStore, authStore, configStore } = useCoreStores();
  const renderCondition = target =>
    !(NoteStore.layoutState === 'collapse' && NoteStore.targetLayout !== target);
  const history = useHistory();
  const MailWriteModal = ComponentStore.get('Mail:MailWriteModal');
  const { id: userId, name: userName, email: userEmail } = userStore.myProfile;
  const isBasicPlan = spaceStore.currentSpace?.plan === 'BASIC';

  const fetchData = async () => {
    const targetLayout = layoutState === 'collapse';
    targetLayout
      ? await ChapterStore.getNoteChapterList(true)
      : await ChapterStore.fetchChapterList(true);

    NoteStore.setTargetLayout(targetLayout ? 'LNB' : null);
    NoteStore.setLoadingNoteApp(false);
  };

  const handleCloseMailModal = () => {
    NoteStore.setIsMailShare(false);
    NoteStore.setMailShareFileObjs([]);
    NoteStore.setMailReceiver([]);
  };

  useEffect(() => {
    if (!channelId) return;
    NoteStore.init(
      roomId,
      channelId,
      userId,
      userName,
      userEmail,
      NoteStore.addWWMSHandler(authStore.sessionInfo.deviceType === 'PC' ? true : false),
    );
    fetchData();
    PageStore.checkEditingPage();

    return () => {
      EditorStore.setInitialSearchState();
      NoteStore.initVariables();
      WWMS.removeHandler('CHN0003', 'NoteWWMSHandler');
    };
  }, [roomId, channelId]);

  useEffect(() => {
    GlobalVariable.setIsBasicPlan(isBasicPlan);
    GlobalVariable.setIsMailApp(
      !isBasicPlan && configStore.isActivateComponent('Note', 'customLink:openLink'),
    );
  }, []);

  useEffect(() => {
    NoteStore.setLayoutState(layoutState);
  }, [layoutState]);

  useEffect(() => {
    NoteStore.setAppType(appType);
  }, [appType]); // WAPL / Works 모드 변경

  useEffect(() => {
    if (!language) return;
    const editorLanguage = language === 'en' ? language : 'ko_KR';
    NoteStore.setI18nLanguage(editorLanguage);
    if (EditorStore.tinymce)
      EditorStore.tinymce.editorManager.i18n.setCode(editorLanguage);
  }, [language]);

  useEffect(() => {
    if (NoteStore.isSlashCmd) SlashCmdNote();
    return () => NoteStore.setIsSlashCmd(false);
  }, [NoteStore.isSlashCmd]);

  useEffect(() => {
    if (NoteStore.metaTagInfo.isOpen) {
      NoteStore.setLoadingNoteApp(true);
      ChapterStore.openNote();
      NoteStore.setLoadingNoteApp(false);
    }
  }, [NoteStore.metaTagInfo.isOpen]);

  return useObserver(() => (
    <>
      <GlobalStyle />
      {NoteStore.loadingNoteApp ? (
        <LoadingContent />
      ) : (
        <>
          <LNB show={!NoteStore.isContentExpanded && renderCondition('LNB')}>
            <LNBContainer />
          </LNB>
          <Content
            id="note-content"
            show={renderCondition('Content')}
            isBorderLeft={
              NoteStore.layoutState !== 'collapse' && !NoteStore.isContentExpanded
            }
          >
            <PageContainer />
            <TagContainer />
          </Content>
          <Toast
            visible={NoteStore.isVisibleToast}
            children={NoteStore.toastText}
            onClose={() => NoteStore.setIsVisibleToast(false)}
          />
          {NoteStore.isDragging && Object.keys(NoteStore.draggedOffset).length ? (
            <DragPreview items={NoteStore.draggedItems} />
          ) : null}
          {/* <TempEditor /> */}
          {NoteStore.isExporting && <Overlay />}
          {NoteStore.showModal && <NoteModal />}
          {NoteStore.isMailShare && (
            <MailWriteModal
              uploadFiles={NoteStore.mailShareFileObjs}
              toReceiver={NoteStore.mailReceiver}
              onClose={handleCloseMailModal}
              visible={true}
              totalSize={
                NoteStore.mailShareFileObjs[0]
                  ? NoteStore.mailShareFileObjs[0].fileSize
                  : 0
              }
            />
          )}
        </>
      )}
    </>
  ));
};

export { NoteApp };
