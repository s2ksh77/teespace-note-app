import styled from "styled-components";

export const LNBCover = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 23.06rem;
  flex: 1 1 23.06rem;
  line-height: 100% !important;
  height: 100%;
`;

export const LNBChapterCover = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
`;

export const LNBNewChapter = styled.div`
  user-select: none;
  margin: 0rem 0.81rem;
  padding: 0rem;
  display: flex;
  line-height: 100% !important;
  font-size: 0.8125rem;
  width: auto;
  height: 2.81rem;
  display: flex;
  font-weight: 500;
  border-bottom: 0.0625rem solid #dadada;
`;
