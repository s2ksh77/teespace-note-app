import styled from 'styled-components';

export const ChapterContainer = styled.ul`
  position: relative;
  user-select: none;
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
  height: 2.3rem;
  display: ${props =>
    props.appType === 'wapl' || props.isRecycleBin === true ? 'flex' : 'none'};
  margin: 4px 0 4px 0;
  align-items: center;
  font-weight: 500;
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
  background: ${props => props.background};
  min-width: 0.25rem;
`;

export const ChapterShareIcon = styled.img`
  position: absolute;
  width: 1rem;
  left: 1rem;
  filter: invert(47%) sepia(14%) saturate(163%) hue-rotate(349deg) brightness(96%)
    contrast(87%);
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
  max-width: calc(100% - 2.5rem);
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
  background-color: #dc4547;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-left: 0.25rem;
  margin-top: -0.5rem;
  margin-right: ${props => (props.isChapter ? '2rem' : '')};
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
  padding-left: 2.89rem;
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
