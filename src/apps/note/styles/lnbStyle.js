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
  overflow-y: auto;
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

// search 관련
export const ChapterSearchResult = styled.div`
  width:calc(100% - 1.5rem);
  height:3.81rem;
  margin:0 0.75rem;
  display:flex;
  flex-direction:row;
  align-items:center;
  border-bottom: 1px solid #E3E7EB;
  cursor:pointer;
`
export const ChapterSearchResultColor = styled.div`
  background-color:${props => props.backgroundColor};
  width: 0.25rem;
  height: 2.19rem;
  align-self: center;
  border-radius: 0.13rem;
`;
export const ChapterSearchResultTitle = styled.div`
  padding-left: 1.19rem;
  font-size: 0.8125rem;
  font-weight: bold;
`;
export const PageSearchResult = styled.div`
  width:calc(100% - 1.5rem);
  height:3.81rem;
  margin:0 0.75rem;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  padding:0.75rem 0;
  border-bottom: 1px solid #E3E7EB;
  cursor:pointer;
`
export const PageSearchResultPageTitle = styled.div`
  font-size: 0.8125rem;
`

export const PageSearchResultChapterTitle = styled.div`
  font-size: 0.75rem;
  color: #888D96;
`
