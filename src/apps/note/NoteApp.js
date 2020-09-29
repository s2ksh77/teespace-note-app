import React, { useEffect, useCallback } from 'react';
import LNBContainer from './components/lnb/LNBContainer';
import useStore from './store/useStore';
import { GlobalStyle, LNB, Content } from './GlobalStyles';
import PageContainer from './components/page/PageContainer';
import TagContainer from './components/tag/TagContainer';
import { useObserver } from 'mobx-react';

const NoteApp = ({ layoutState }) => {
  const targetChId = 'c80a1e40-a699-40cb-b13c-e9ac702cc6d4';
  const { NoteStore } = useStore();
  NoteStore.setChannelId(targetChId);
  // 임시
  if (!layoutState) layoutState= 'expand';

  const renderCondition = useCallback((target) => {
    return !((NoteStore.layoutState === "collapse") && ( NoteStore.targetLayout !== target ));
  })

  useEffect(() => {
    // collapse 아닐 때는 setTargetLayout(null) 넣어준다
    if (layoutState === "collapse") {
      switch (NoteStore.layoutState) {
        case "":
          NoteStore.setTargetLayout("LNB");
          break;
        case "collapse":
          break;
        // 확대
        default:
          NoteStore.setTargetLayout("CONTENT");
          break;        
      }
    }
    NoteStore.setLayoutState(layoutState);
  }, [layoutState]);  

  return useObserver(() => (
    <>
      <GlobalStyle />
      {renderCondition("LNB") && <LNB>
        <LNBContainer />
      </LNB>
      }
      {renderCondition("Content") && <Content>
        {NoteStore.showPage ? <PageContainer /> : <TagContainer />}
      </Content>
      }
    </>
  ));
};

export default NoteApp;
