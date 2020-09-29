import styled from "styled-components";

export const ReadModeContainer = styled.div`
  width: 100%;
  height: 2.81rem;
  border-top: 1px solid rgb(218, 218, 218);
  display: flex;
  align-items: center;
  flex-direction: row;
  color: #999999;
`;
export const ReadModeText = styled.span`
  margin-left: 0.5rem;
  color: #999999;
  font-size: 0.75rem;
  display: flex;
  font-size: 0.75rem;
`;

export const FoldBtn = styled.div`
  width: 0.94rem;
  height: 2.06rem;
  display: flex;
  align-items: center;
  background-color: #1EA8DF;
  border: 0px solid #9ca7ad;
  cursor: pointer;
  border-top-left-radius: 0.31rem;
  border-bottom-left-radius: 0.31rem;
  position: absolute;
  z-index: 18;
  top: 50%;
  transform: translate(-0.9rem, 0rem);
`;

export const FoldBtnImg = styled.img`
  width:100%;
`;