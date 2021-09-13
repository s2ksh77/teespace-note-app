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
  min-width: 0;
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
  position: absolute;
  width: 0.5rem;
  height: inherit;
  border-radius: 15px 0px 0px 15px;
  background-color: ${props => props.color};
`;

export const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0.625rem 1rem 1.125rem;
`;

export const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
`;

export const PagePreviewWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ChapterTitle = styled.span`
  font-size: 0.625rem;
  color: ${props => props.theme.TextSub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.625rem;
`;

export const PageTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.625rem;
`;

export const PagePreview = styled.span`
  font-size: 0.625rem;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PageItemContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  margin-bottom: 0.625rem;
`;

export const CheckBoxContainer = styled.div`
  align-items: center;
  margin-right: 1rem;
`;

export const TagItemContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 0.625rem;
  border-radius: 15px;
  background-color: ${props => props.theme.Beige};
  &:active {
    background-color: ${props => props.theme.BeigeDark};
  }
`;

export const TagChip = styled.div`
  display: flex;
  height: 1.625rem;
  color: ${props => props.theme.TextMain};
  font-size: 0.75rem;
  font-weight: 500;
  align-items: center;
  padding: 0.25rem 0.5rem;
  margin-right: 0.375rem;
  border: solid 1px ${props => props.theme.LineOut};
  border-radius: 25px;
  background-color: ${props => props.theme.StateNormal};
`;
