import styled, { css } from 'styled-components';

export const PageWrapper = styled.li`
  display: flex;
  height: 2.81rem;
  margin-left: 1.875rem;
  padding-left: 1.25rem;
  align-items: center;
  cursor: pointer;
  &:hover .contextMenu {
    visibility: visible;
  }
  &:hover:not(.contextMenu) {
    background-color: #faf8f7;
    border-radius: 0.31rem;
  }
`;

export const PageTitle = styled.a`
  min-width: calc(100% - 2.1rem);
  max-width: calc(100% - 2.1rem);
  margin-right: 0.3rem;
  cursor: pointer;
  color: #000000 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    color: #000000;
  }
`;

export const PageTitleInput = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-weight: 400;
  border: none;
  outline: none;
  &::placeholder {
    color: #d0d0d0;
  }
  &::selection {
    background: #f2efec;
    color: #000000;
  }
`;

export const NewPageButton = styled.p`
  height: 2.81rem;
  display: flex;
  margin-left: 1.875rem;
  padding-left: 1.25rem;
  align-items: center;
  cursor: pointer;
  border-radius: 0.31rem;
  ${props =>
    props.active
      ? css`
          cursor: pointer;
          &:hover {
            background-color: #faf8f7;
          }
          &:active {
            background-color: #f2efec;
          }
        `
      : css`
          color: #c9c4be;
        `}
`;

/** 여기 아래부터 아직 안 쓰이는 곳 */

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
  &:hover:not(.ellipsisBtn) {
    background-color: #faf8f7;
    border-radius: 0.31rem;
  }
  &:active:not(.ellipsisBtn) {
    background-color: #f2efec;
  }
`;

export const NewPage = styled.span`
  display: ${props => (props.show ? 'flex' : 'none')};
  height: 2.81rem;
`;

export const EllipsisIcon = styled.i`
  background-image: url('../Assets/view_more.png');
  color: #75757f;
  width: 100%;
  height: 100%;
`;
