import styled from 'styled-components';

export const LNBWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;
export const LNBEditModeCover = styled.div`
  display: ${props => (props.mode === 'true' ? 'none' : 'flex')};
  width: inherit;
  height: 100%;
  position: absolute;
  z-index: 1;
`;

export const LNBChapterCover = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${props => props.theme.LineMain};
  color: ${props => props.theme.TextMain};
`;

export const LNBNewChapter = styled.div`
  position: relative;
  user-select: none;
  margin: 0rem 0.81rem;
  padding: 0rem;
  display: flex;
  flex-shrink: 0;
  line-height: 100% !important;
  font-size: 0.8125rem;
  width: auto;
  height: 2.81rem;
  font-weight: 500;
  border-bottom: 0.06rem solid ${props => props.theme.LineSub};
`;

// search 관련
export const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.938rem 0.375rem 0.938rem;
`;

export const SearchDivision = styled.div`
  display: flex;
  font-size: 0.75rem;
  color: ${props => props.theme.TextSub};
  margin: 0.375rem 0;
`;

export const ChapterSearchResult = styled.div`
  position: relative;
  width: 100%;
  height: 2.875rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0.25rem 0;
  border-radius: 0.31rem;
  &:hover {
    background-color: ${props => props.theme.StateBright};
  }
`;

export const ChapterSearchResultTitle = styled.span`
  margin-left: 1.69rem;
  font-size: 0.813rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PageSearchResult = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  padding: 0.688rem 1.188rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 0.31rem;
  &:hover {
    background-color: ${props => props.theme.StateBright};
  }
  background-color: ${props => (props.isSelected ? props.theme.StateDark : '')};
`;

export const PageSearchResultPageTitle = styled.div`
  font-size: 0.813rem;
  height: 1.125rem;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 0 0.25rem;
`;

export const PageSearchResultChapterTitle = styled.div`
  font-size: 0.75rem;
  color: ${props => (props.isContent ? props.theme.TextSub2 : props.theme.TextSub)};
  text-overflow: ellipsis;
  height: 1.125rem;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 0 0.25rem;
`;
