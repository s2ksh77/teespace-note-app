import React, {memo} from 'react';
import styled from 'styled-components';
import tagImg from '../assets/ts_tag@3x.png';
import useStore from '../store/useStore';

const TagContainer = styled.div`
  display:flex;
  align-items:center;
  position: relative; 
  width:calc(100% - 1.62rem);
  height : 2.81rem;
  padding: 0rem 0.81rem 0rem 0.81rem;
  font-size:0.81rem;
  cursor:pointer;
  &:hover .ellipsisBtn {
    background-color: rgba(30, 168, 223, 0.2);
  }
  &:hover:not(.ellipsisBtn) {
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  }
`;

const TagImg = styled.img`
  width:1rem;
  margin : 0 0.36rem 0 0.48rem;
  filter: invert(46%) sepia(7%) saturate(11%) hue-rotate(203deg) brightness(99%) contrast(91%);
`;

// 임시
const TagText = styled.span`
  font-weight:400; 
`;

const LnbMenuTagCover = memo(() => {
  const {NoteStore} = useStore();
  const onClickTagMenuBtn = () => {
    NoteStore.setShowPage(false);
  }
  return (
      <>
      <TagContainer onClick={onClickTagMenuBtn}>
          <TagImg src={tagImg} alt="tagImg"/>
          <TagText>태그</TagText>
      </TagContainer>
      </>
  )
})

export default LnbMenuTagCover; 