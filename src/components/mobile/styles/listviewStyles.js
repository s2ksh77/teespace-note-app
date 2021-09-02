import styled from 'styled-components';

export const ListViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const PageCover = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  height: 5.375rem;
  border-radius: 15px;
  background-color: #f7f4ef;
  cursor: pointer;
  &:active {
    background-color: #ddd7cd;
  }
`;

export const PageColor = styled.div`
  display: flex;
  width: 0.5rem;
  height: inherit;
  border-radius: 15px 0px 0px 15px;
  background-color: ${props => props.color};
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 0.5rem);
`;

export const PageTitle = styled.div`
  display: flex;
  height: 2.375rem;
  align-items: center;
`;

export const PageContent = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
`;

export const PageTitleSpan = styled.span`
  margin-left: 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 1rem);
  white-space: nowrap;
`;
export const PageContentSpan = styled.span`
  margin-left: 0.625rem;
  font-size: 0.625rem;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 1rem);
  white-space: nowrap;
`;

export const PageItemContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 0.625rem;
`;

export const CheckBoxContainer = styled.div`
  align-items: center;
  margin-left: 1rem;
`;
