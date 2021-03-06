import styled from 'styled-components';
import { Collapse, Tag } from 'antd';

export const TagContainerCover = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const EditorTagCover = styled.div`
  white-space: nowrap;
  width: 100%;
  height: 2.81rem;
  border-width: 0px;
  border-style: solid;
  vertical-align: top;
  overflow: hidden;
  line-height: 66.1177px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

export const TagNewBtn = styled.div`
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.63rem;
  cursor: pointer;
`;

export const PanelArrow = styled.img`
  width: 0.8rem;
  bottom: 1rem;
`;

export const TagList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;
export const TagText = styled.span`
  width: 100%;
  display: block;
  min-width: 25px;
  max-width: 15.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TagNewBtnIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const TagInputDIV = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  max-width: none;
  white-space: nowrap;
  box-sizing: border-box;
`;
export const TagInput = styled.input`
  flex: auto;
  display: flex;
  width: 8.75rem;
  height: 1.88rem;
  margin-right: 0.38rem;
  border-radius: 1.563rem;
  padding: 0 1.5rem 0 0.75rem;
  border: 0.06rem solid #7b7671;
  background-color: #ffffff;
  font-size: 0.81rem;
  color: #000000;
  outline: none;
`;

// lnbTag
export const LnbTagContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: calc(100% - 1.62rem);
  height: 2.81rem;
  min-height: 2.81rem;
  padding: 0rem 0.81rem 0rem 0rem;
  font-size: 0.81rem;
  cursor: pointer;
  margin: 0 0.81rem;
  order: ${props => props.order};
  color: ${props => props.color || ''};
  &:hover {
    background-color: ${props => props.theme.StateBright};
    border-radius: 0.31rem;
  }
`;

export const TagImg = styled.img`
  position: absolute;
  width: 1rem;
  left: 1rem;
  filter: invert(47%) sepia(14%) saturate(163%) hue-rotate(349deg) brightness(96%)
    contrast(87%);
`;

export const TagTxt = styled.div`
  font-weight: 500;
  margin-left: 2.63rem;
`;

export const { Panel } = Collapse;

export const PanelHeader = styled(Panel)`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
`;

export const StyledCollapse = styled(Collapse)`
  width: 100%;
`;

export const TagKeyChildren = styled.div`
  display: flex;
  width: 100%;
`;

export const TagKeyContainer = styled.div`
  width: 100%;
  font-size: 0.8125rem;
`;

export const TagChipGroup = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

// * gui??? ???????????? min-width??? 50px????????? ?????? ????????? ???????????? ??? tag text??? ??????????????? 50px ???????????? ??? ??????
// max-width??? display:flex??? ??? ?????? ????????? ?????? span tag??? max-width:15.69rem
export const TagChip = styled(Tag)`
  min-width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.63rem;
  margin-bottom: 0.4375rem;
  margin-top: 0.4375rem;
  margin-right: 0.38rem;
  color: ${props => props.theme.TextSub};
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 1.563rem;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 1.88rem;
  z-index: 1;
  float: left;
  cursor: pointer;
  user-select: none;
  outline: none !important;
  background-color: ${props => props.theme.SubStateNormal};
  border: 1px solid transparent;
  border-radius: 25px;
  padding: 0 0.63rem;
  transition-duration: 0s;
  &:hover {
    color: ${props => props.theme.TextMain};
    border: 1px solid ${props => props.theme.SubStateVivid};
    background-color: ${props => props.theme.SubStateBright};
  }
  svg {
    fill: ${props => props.theme.IconNormal};
  }
  :focus {
    svg {
      fill: ${props => props.theme.IconActive};
    }
  }
`;

export const SearchTagChip = styled(Tag)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.63rem;
  height: calc(100% - 0.26rem);
  width: fit-content;
  max-width: calc(100% - 1.88rem) !important;
  color: ${props => props.theme.TextSub};
  font-size: 0.81rem;
  cursor: pointer;
  user-select: none;
  outline: none !important;
  border: 1px solid ${props => props.theme.SubStateVivid};
  background-color: ${props => props.theme.SubStateNormal};
  border-radius: 25px;
  &:hover {
    color: ${props => props.theme.TextMain};
    background-color: ${props => props.theme.SubStateBright};
  }
  svg {
    fill: ${props => props.theme.IconNormal};
  }
  :focus {
    svg {
      fill: ${props => props.theme.IconActive};
    }
  }
`;

export const TagChipNum = styled.div`
  font-size: 0.688rem;
  margin-left: auto;
  color: ${props => props.theme.BeigeVivid};
  padding-left: 0.4rem;
  line-height: normal;
`;
