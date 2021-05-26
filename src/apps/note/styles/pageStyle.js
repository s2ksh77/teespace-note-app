import styled, { css } from "styled-components";

export const PageContainerCover = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const PageCover = styled.li`
  display: flex;
  width: 100%;
  height: 2.81rem;
  cursor: pointer;
  &:hover .ellipsisBtn{
    visibility: visible;
  }
`;

export const PageMargin = styled.span`
  flex: 0 0 1.875rem;
  height: 100%;
  display: flex;
`;

export const PageTextCover = styled.span`
  width: 100%;
  display: flex;
  max-width: calc(100% - 1.875rem);
`;

export const PageTextContainer = styled.span`
  width: 100%;
  display: flex;
  padding-right: 2rem;
  box-sizing: border-box;
  border-radius: 0.31rem;
  align-items: center;
  &:hover:not(.ellipsisBtn){
    background-color: ${props => props.theme.StateBright};
    border-radius: 0.31rem;
  }
  &:active:not(.ellipsisBtn) {
    background-color: ${props => props.theme.StateDark};
  }
`;

export const PageText = styled.span`
  display: inline-block;
  cursor: pointer;
  margin-left: 1.25rem;
  line-height: 1.1rem;
  align-self: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PageTextInput = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-weight: 400;
  border: none;
  outline: none;
  &::placeholder {
    color: #D0D0D0;
  }
  &::selection {
    background: #F2EFEC;
    color: #000000;
  }
`;

export const NewPage = styled.span`
  display: ${props => props.show ? "flex" : "none"};
  height: 2.81rem;
`;
export const NewPageBtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1.25rem;
  border-radius: 0.31rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.StateBright};
  }
  &:active {
    background-color: ${props => props.theme.StateDark};
  }
`;

export const EllipsisIcon = styled.i`
  background-image: url("../Assets/view_more.png");
  color: #75757f;
  width: 100%;
  height: 100%;
`;
