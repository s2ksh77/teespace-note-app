import styled from "styled-components";
import { Dropdown } from 'antd';

export const ChapterContainer = styled.ul`
  position: relative;
  user-select: none;
  margin: 0rem 0.81rem 0rem 0.81rem;
  padding: 0rem;
  display: flex;
  flex-direction: column;
  font-size: 0.81rem;
  height: auto;
  width: auto;
  &.folded{
    .page-li {
      display: none;
    }
  }
}
`;
export const ChapterCover = styled.div`
  height: 2.81rem;
  display: flex;
  margin: 4px 0 4px 0;
  align-items: center;
  font-weight: 500;
  border-bottom: 0.0625rem solid #dadada;
  &:hover .ellipsisBtn {
    visibility: visible;
  }
  &:hover {
    background-color: #FAF8F7;
    border-radius: 0.31rem;
  }
  &:active:not(.ellipsisBtn) {
    background-color: #F2EFEC;
  }
`;

export const ChapterShareIcon = styled.img`
  position: absolute;
  width:0.8rem;
  height:0.9rem;
  margin: auto 0.5rem auto 0.35rem;
  top: 0.95rem;
  filter: ${props => props.selected
    ? 'invert(43%) sepia(30%) saturate(7449%) hue-rotate(174deg) brightness(93%) contrast(101%)'
    : 'invert(47%) sepia(6%) saturate(469%) hue-rotate(202deg) brightness(95%) contrast(85%)'};
`

export const ColorCover = styled.span`
  position:absolute;
  display: flex;
  width: fit-content;
  left: 0;
  align-items: center;
`;

export const Color = styled.span`
  width: 0.25rem;
  height: 2.19rem;
  align-self: center;
  border-radius: 0.13rem / 0.13rem;
  margin: 0.31rem 0;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  min-width: 0.25rem;
`;

export const ChapterTextInput = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 1.69rem;
  padding-right: 1.69rem;
  font-weight: 400;
  border: none;
  outline: none;
`;

export const ChapterTitle = styled.span`
  position: relative;
  display: flex;
  flex: auto;
  width: 100%;
  height: 100%;
  font-weight: 500;
  align-items: center;
  cursor: pointer;
  max-width: calc(100% - 1.93rem);
`;

export const ChapterTextSpan = styled.span`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: normal;
  font-weight: 400;
  margin-left: 1.69rem;
`;

export const ChapterFolderBtn = styled.span`
  display: flex;
  flex: 0 0 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.38rem;
  align-items: center;
  justify-content: center;
  margin-left: 0.15rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(235, 230, 223, 1);
  }
`;

export const ChapterInput = styled.input`
  font-size: 0.81rem !important;
  color: #000000 !important;
  height: 50%;
  width: calc(100% - 1.6rem);
  max-width: calc(100% - 1.6rem);
  overflow: hidden;
  align-self: center;
  border: 0rem !important;
  background-color: transparent !important;
  margin-right: 0.9375rem;
  padding-right: 0.3125rem;
  &::placeholder {
    color: #d0d0d0;
  }
  &::selection {
    background: rgba(30, 168, 223, 0.2);
    color: #000000;
  }
  &:focus {
    outline: none;
  }
`;
