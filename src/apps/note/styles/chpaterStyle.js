import styled from "styled-components";
import { Dropdown } from 'antd';

export const ChapterContainer = styled.ul`
  position: relative;
  user-select: none;
  margin: 0rem 0.81rem 0rem 0.81rem;
  padding: 0rem;
  display: block;
  flex-direction: column;
  font-size: 0.81rem;
  order: ${props => props.order};
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
  border-bottom: 0.06rem solid ${props => props.theme.LineSub};
  &:hover .ellipsisBtn {
    visibility: visible;
  }
  &:hover {
    background-color: ${props => props.theme.StateBright};
    border-radius: 0.31rem;
  }
  &:active {
    background-color: ${props => props.theme.StateNormal};
    border-radius: unset;
  }
`;

export const ChapterColor = styled.span`
  position: absolute;
  left: 0.19rem;
  display: flex;
  width: 0.38rem;
  height: 2.5rem;
  align-items: center;
  align-self: center;
  border-radius: 10px;
  margin: 0.31rem 0;
  background: ${props => props.background};
  min-width: 0.25rem;
`;

export const ChapterShareIcon = styled.img`
  position: absolute;
  width: 1rem;
  left: 1rem;
  filter: invert(47%) sepia(14%) saturate(163%) hue-rotate(349deg) brightness(96%) contrast(87%);
`;

export const ChapterTextInput = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: ${props => props.paddingLeft};
  padding-right: 1.69rem;
  font-weight: 500;
  border: none;
  outline: none;
  color: ${props => props.theme.TextMain};
  background-color: transparent;
  &::placeholder {
    color: ${props => props.theme.TextHinted};
  }
  &::selection {
    background-color: ${props => props.theme.StateDark};
    color: ${props => props.theme.TextMain};
  }
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
  width: fit-content;
  max-width: calc(100% - 3.5rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: normal;
  margin-left: ${props => props.marginLeft};
`;

// margin-right는 vertical menu 때문에 가려지지 않도록 추가
export const NewNoteMark = styled.div`
  display: flex;
  flex-shrink: 0;
  background-color: #DC4547;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-left: 0.25rem;
  margin-top: -0.5rem;
  margin-right:${props => props.isChapter ? "2rem" : ""};
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
    background-color: ${props => props.theme.StateLight};
  }
`;

export const ChapterFoldBtnIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(46%) sepia(9%) saturate(281%) hue-rotate(349deg) brightness(98%) contrast(84%);
`;

export const ChapterInput = styled.input`
  font-size: 0.81rem !important;
  color: ${props => props.theme.TextMain};
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-self: center;
  border: 0rem !important;
  background-color: transparent;
  padding-left: 1.69rem;
  &::placeholder {
    color: ${props => props.theme.TextHinted};
  }
  &::selection {
    background: ${props => props.theme.StateDark};
    color: ${props => props.theme.TextMain};
  }
  &:focus {
    outline: none;
  }
`;
