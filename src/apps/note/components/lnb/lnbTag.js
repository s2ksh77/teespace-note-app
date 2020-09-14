import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react';
import tagImg from '../../assets/ts_tag@3x.png';
import useStore from '../../store/useStore';
import {LnbTagContainer, TagImg, TagText} from '../../styles/tagStyle'

const LnbMenuTagCover = memo(() => {
  const { NoteStore } = useStore();
  const filterColor = "invert(43%) sepia(30%) saturate(7449%) hue-rotate(174deg) brightness(93%) contrast(101%)"

  const onClickTagMenuBtn = () => {
    NoteStore.setShowPage(false);
    console.log('showPage?', NoteStore.showPage)
  };
  
  return useObserver(()=> (
    <>
      <LnbTagContainer color={!NoteStore.showPage ? "#008CC8": ""} onClick={onClickTagMenuBtn}>
        <TagImg filter={!NoteStore.showPage ? filterColor: ""} src={tagImg} alt="tagImg" />
        <TagText>태그</TagText>
      </LnbTagContainer>
    </>
  ));
});

export default LnbMenuTagCover;
