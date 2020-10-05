import React, { memo } from 'react';
import styled from 'styled-components';
import { useObserver } from 'mobx-react';
import tagImg from '../../assets/ts_tag@3x.png';
import useStore from '../../store/useStore';
import { LnbTagContainer, TagImg, TagTxt } from '../../styles/tagStyle';

const filterColor =
  'invert(43%) sepia(30%) saturate(7449%) hue-rotate(174deg) brightness(93%) contrast(101%)';

const LNBTag = memo(() => {
  const { NoteStore } = useStore();

  const onClickTagMenuBtn = () => {
    NoteStore.setShowPage(false);
  };

  return useObserver(() => (
    <>
      <LnbTagContainer
        className={!NoteStore.showPage ? 'selectedMenu' : ''}
        onClick={onClickTagMenuBtn}
      >
        <TagImg
          filter={!NoteStore.showPage ? filterColor : ''}
          src={tagImg}
          alt="tagImg"
        />
        <TagTxt>태그</TagTxt>
      </LnbTagContainer>
    </>
  ));
});

export default LNBTag;
