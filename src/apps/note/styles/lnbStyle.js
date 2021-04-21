import styled from "styled-components";

export const LNBCover = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;
export const LNBEditModeCover = styled.div`
  display: ${props => props.mode === "true" ? "none" : "flex"};
  width: inherit;
  height: 100%;
  position: absolute;
  z-index: 1;
`

export const LNBChapterCover = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display:flex;
  flex-direction: column;
  border-top: 1px solid #DDD9D4;
`;

export const LNBNewChapter = styled.div`
  position:relative;
  user-select: none;
  margin: 0rem 0.81rem;
  padding: 0rem;
  display: flex;
  flex-shrink:0;
  line-height: 100% !important;
  font-size: 0.8125rem;
  width: auto;
  height: 2.81rem;
  font-weight: 500;
  border-bottom: 0.0625rem solid #eeedeb;
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
    background-color: #FAF8F7;
  }
`
export const ChapterSearchShareIcon = styled.img`
  position: relative;
  width: 0.8rem;
  height: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left :-10px;
  filter: invert(47%) sepia(6%) saturate(469%) hue-rotate(202deg) brightness(95%) contrast(85%);
`
export const ChapterSearchResultColor = styled.div`
  background-color:${props => props.backgroundColor};
  width: 0.25rem;
  height: 2.19rem;
  align-self: center;
  border-radius: 0.13rem;
  min-width: 0.25rem;
`;
export const ChapterSearchResultTitle = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 1.19rem;
  font-size: 0.8125rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
    background-color: #FAF8F7;
  }
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color:${props=>props.isSelected ? '#F2EFEC' : ''};
`
export const PageSearchResultPageTitle = styled.div`
  font-size: 0.8125rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const PageSearchResultChapterTitle = styled.div`
  font-size: 0.75rem;
  color: #888D96;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const SearchResultBotttom = styled.div`
  border-bottom: 1px solid #E3E7EB;
  position: absolute;
  left: 1.69rem;
  right: 1.69rem;
  bottom: 0;
`;