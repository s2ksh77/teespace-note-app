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
  font-weight: 500;
  border-bottom: 0.0625rem solid #dadada;
  &:hover .ellipsisBtn {
    visibility: visible;
  }
  &:hover:not(.ellipsisBtn) {
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
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
`;

export const ChapterTextInput = styled.input`
  display: flex;
  margin-left: 1.05rem;
  margin-right: 0.2rem;
  min-width: calc(100% - 1.5rem);
  height: 100%;
  font-weight: 300;
  border: none;
  outline: none;
`;

export const ChapterTitle = styled.span`
  display: flex;
  flex: auto;
  margin-left: 1.69rem;
  height: 100%;
  font-weight: 500;
  max-width: calc(100% - 3.36rem);
  align-items: center;
  cursor: pointer;
`;

export const ChapterTextSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  min-width: calc(100% - 1.3rem);
  line-height: normal;
  font-weight: 400;
`;

export const ChapterFolderBtn = styled.span`
  display: flex;
  align-self: center;
  flex: 0 0 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem 1.5rem;
  align-items: center;
  cursor: pointer;
  margin-left: 0.2rem;
  justify-content: center;
  &:hover{
    background-color :rgba(30,168,223,0.2);
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
