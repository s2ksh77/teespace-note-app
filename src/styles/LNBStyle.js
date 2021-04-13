import styled from 'styled-components';

export const LNBContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const LNBBodyContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd9d4;
`;

export const ContextMenuWrapper = styled.div`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  visibility: hidden;
  cursor: pointer;
  border-radius: 0.38rem;
  margin-right: 0.15rem;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(235, 230, 223, 1);
  }
`;

export const ContextMenuIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(46%) sepia(9%) saturate(281%) hue-rotate(349deg)
    brightness(98%) contrast(84%);
`;

export const LNBTagWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 1.62rem);
  min-height: 2.81rem;
  padding: 0rem 0.81rem 0rem 1rem;
  font-size: 0.81rem;
  cursor: pointer;
  border-bottom: 0.0625rem solid #eeedeb;
  margin: 0 0.81rem;
  order: 2;
  &:hover {
    background-color: #faf8f7;
    border-radius: 0.31rem;
  }
`;

export const LNBTagIcon = styled.img`
  width: 1rem;
  filter: invert(47%) sepia(14%) saturate(163%) hue-rotate(349deg)
    brightness(96%) contrast(87%);
`;

export const LNBTagText = styled.div`
  font-weight: 500;
  margin-left: 0.63rem;
`;

/** 여기 아래부터 아직 안 쓰이는 곳 */

export const LNBEditModeCover = styled.div`
  display: ${props => (props.mode === 'true' ? 'none' : 'flex')};
  width: inherit;
  height: 100%;
  position: absolute;
  z-index: 1;
`;

export const LNBNewChapter = styled.div`
  position: relative;
  user-select: none;
  margin: 0rem 0.81rem;
  padding: 0rem;
  display: flex;
  line-height: 100% !important;
  font-size: 0.8125rem;
  width: auto;
  height: 2.81rem;
  font-weight: 500;
  border-bottom: 0.0625rem solid #eeedeb;
`;

// search 관련
export const ChapterSearchResult = styled.div`
  position: relative;
  width: calc(100% - 1.5rem);
  height: 3.81rem;
  margin: 0 0.75rem;
  padding: 0.75rem 1.69rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #faf8f7;
  }
`;
export const ChapterSearchShareIcon = styled.img`
  position: relative;
  width: 0.8rem;
  height: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: -10px;
  filter: invert(47%) sepia(6%) saturate(469%) hue-rotate(202deg)
    brightness(95%) contrast(85%);
`;
export const ChapterSearchResultColor = styled.div`
  background-color: ${props => props.backgroundColor};
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
  position: relative;
  width: calc(100% - 1.5rem);
  height: 3.81rem;
  margin: 0 0.75rem;
  padding: 0.75rem 1.69rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  &:hover {
    background-color: #faf8f7;
  }
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${props => (props.isSelected ? '#F2EFEC' : '')};
`;
export const PageSearchResultPageTitle = styled.div`
  font-size: 0.8125rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PageSearchResultChapterTitle = styled.div`
  font-size: 0.75rem;
  color: #888d96;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const SearchResultBotttom = styled.div`
  border-bottom: 1px solid #e3e7eb;
  position: absolute;
  left: 1.69rem;
  right: 1.69rem;
  bottom: 0;
`;
