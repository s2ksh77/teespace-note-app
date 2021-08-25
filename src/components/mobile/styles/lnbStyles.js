import styled from 'styled-components';

export const MainHeaderWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 2.875rem;
  padding: 0 1rem;
  align-items: center;
`;

export const HeaderTitle = styled.span`
  display: flex;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${props => props.theme.TextMain};
  margin-left: 0.75rem;
  flex: 1 auto;
`;

export const LNBBody = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.TextMain};
`;

export const ChapterItemContainer = styled.div`
  display: flex;
  align-items: center;
`;
