import React, { useEffect } from 'react';
import LNBContainer from './components/lnb/LNBContainer';
import useStore from './store/useStore';
import { GlobalStyle, LNB, Content } from './GlobalStyles';
import PageContainer from './components/page/PageContainer';
import TagContainer from './components/tag/TagContainer';
import { useObserver } from 'mobx-react';
import { FoldBtn, FoldBtnImg } from './styles/editorStyle';
import foldImg from './assets/arrow_left.svg';
import { useCoreStores } from 'teespace-core';

const NoteApp = ({ layoutState, roomId }) => {
  const targetChId = 'c80a1e40-a699-40cb-b13c-e9ac702cc6d4';
  const { NoteStore, PageStore } = useStore();
  NoteStore.setChannelId(targetChId);

  // const { roomStore, authStore } = useCoreStores()
  // const { 'CHN0003': targetChId } = roomStore.getChannelIds(roomId);
  // NoteStore.setWsId(roomId);
  // NoteStore.setUserId(authStore.myInfo.id);
  // 임시
  if (!layoutState) layoutState = 'expand';

  const renderCondition = target =>
    !(
      NoteStore.layoutState === 'collapse' && NoteStore.targetLayout !== target
    );

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

  const handleClickModal = e => {
    if (!PageStore.isEdit) return;
    if (NoteStore.editorWrapper) {
      if (NoteStore.editorWrapper.contains(e.target)) return;
      else alert('페이지를 저장하고 나가시겠습니까?');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickModal);
    return () => {
      document.removeEventListener('click', handleClickModal);
    };
  }, []);

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
            onClick={() => NoteStore.setIsExpanded()}
          >
            <FoldBtnImg src={foldImg} />
          </FoldBtn>
          {NoteStore.showPage ? <PageContainer /> : <TagContainer />}
        </Content>
      )}
    </>
  ));
};

export default NoteApp;
