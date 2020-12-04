import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { ContentHeaderCover, PreBtnWrapper, Button, RightAligned } from '../../styles/commonStyle';
import HeaderButtons from './buttons';
import preImg from '../../assets/back.svg';

const ContentHeader = ({handleBackBtn, alignment, children}) => {  
  const { NoteStore } = useNoteStore();
  // editor header부분은 borderBottom 없게
  return useObserver(() => (
    <>
      <ContentHeaderCover
        borderBottom={alignment === "center" ? false : true}
      >
        <PreBtnWrapper
          show={NoteStore.layoutState === 'collapse'}
        >
          <Button src={preImg} onClick={handleBackBtn} />
        </PreBtnWrapper>
        {alignment === "center" ? (children) : null}
        <RightAligned>
          {alignment === "right" ? (children) : null}
          <HeaderButtons />
        </RightAligned>        
      </ContentHeaderCover>
    </>
  ));
};

export default ContentHeader;
