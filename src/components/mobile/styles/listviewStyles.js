import styled from 'styled-components';

export const ListViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const PageItemWrapper = styled.div`
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

export const Color = styled.div`
  display: flex;
  width: 0.5rem;
  height: inherit;
  border-radius: 15px 0px 0px 15px;
  background-color: ${props => props.color};
`;

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 0.5rem);
`;

export const PageTitleWrapper = styled.div`
  display: flex;
  height: 2.375rem;
  align-items: center;
`;

export const PagePreviewWrapper = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
`;

export const PageTitle = styled.span`
  margin-left: 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100% - 1rem);
  white-space: nowrap;
`;
export const PagePreview = styled.span`
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
