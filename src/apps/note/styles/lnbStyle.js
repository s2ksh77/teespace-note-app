import styled from "styled-components";

export const LNBCover = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  font-weight: 500;
  border-bottom: 0.0625rem solid #dadada;
`;

// search 관련
export const ChapterSearchResult = styled.div`
  position:relative;
  width:calc(100% - 1.5rem);
  height:3.81rem;
  margin:0 0.75rem;
  padding: 0.75rem 1.69rem;
  display:flex;
  flex-direction:row;
  align-items:center;
  cursor:pointer;
  &:hover {
    background-color: rgba(30,168,223,0.20);
  }
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
  position:relative;
  width:calc(100% - 1.5rem);
  height:3.81rem;
  margin:0 0.75rem;
  padding: 0.75rem 1.69rem;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  cursor:pointer;
  &:hover {
    background-color: rgba(30,168,223,0.20);
  }
`
export const PageSearchResultPageTitle = styled.div`
  font-size: 0.8125rem;
`

export const PageSearchResultChapterTitle = styled.div`
  font-size: 0.75rem;
  color: #888D96;
`

export const SearchResultBotttom = styled.div`
  border-bottom: 1px solid #E3E7EB;
  position: absolute;
  left: 1.69rem;
  right: 1.69rem;
  bottom: 0;
`;