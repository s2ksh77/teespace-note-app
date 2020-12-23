import styled from 'styled-components';
import { Collapse, Tag } from 'antd';

export const EditorTagCover = styled.div`
  white-space: nowrap;
  width: calc(100% - 0px);
  height: 2.94rem;
  border-width: 0px;
  border-style: solid;
  vertical-align: top;
  overflow: hidden;
  line-height: 66.1177px;
  display: flex;
  align-items: center;
`;

export const TagNewBtn = styled.div`
  display: flex;
  flex: 0 0 1.25rem;
  border: none;
  margin-left: 0.75rem;
  margin-right: 0.88rem;
  align-self: center;
  background-color: transparent;
  cursor: pointer;
`;

export const TagList = styled.div`
  display: flex !important;
  align-items: center !important;
  width: calc(100% - 2.4rem);
  box-sizing: border-box;
  overflow: hidden;
`;
export const TagText = styled.span`
  width: 100%;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height:23px;
`;

export const TagNewBtnIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
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
  display: flex;
  width: 8.75rem;
  height: 1.88rem;
  margin-right: 0.38rem;
  border-radius: 1.563rem;
  padding:0 0.75rem;
  border: 0.0625rem solid #1ea8df;
  background-color: #ffffff;
  font-size: 0.813rem;
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
  padding: 0rem 0.81rem 0rem 0rem;
  font-size: 0.81rem;
  cursor: pointer;
  border-bottom: 0.0625rem solid #dadada;
  margin: 0 0.81rem;
  color: ${props => props.color || ''};
  &:hover .ellipsisBtn {
    background-color: rgba(30, 168, 223, 0.2);
  }
  &:hover:not(.ellipsisBtn) {
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const TagImg = styled.img`
  position:absolute;
  width: 0.8rem;
  margin-left:0.33rem;
  filter: ${props =>
    props.showTag ? 'invert(43%) sepia(30%) saturate(7449%) hue-rotate(174deg) brightness(93%) contrast(101%)' :
      'invert(46%) sepia(7%) saturate(11%) hue-rotate(203deg) brightness(99%) contrast(91%)'};
`;

export const TagTxt = styled.div`
  font-weight: 400;
  margin-left:1.69rem;
`;

export const { Panel } = Collapse;

export const StyledCollapse = styled(Collapse)`
  width: 100%;
`;

export const TagKeyChildren = styled.div`
  display: flex;
  width: 100%;
`;

export const TagKeyContainer = styled.div`
  width: 100%;
`;

export const TagChipGroup = styled.div`
  display:flex;
  width:100%;
  flex-wrap:wrap;
`;

export const TagChip = styled(Tag)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding:0 0.63rem;
  margin-bottom: 0.4375rem;
  margin-top: 0.4375rem;
  margin-right: 0.38rem;
  color: #000000;
  font-size: 0.81rem;
  font-weight: 400;
  border: 0.0625rem solid #1EA8DF;
  border-radius: 1.563rem;
  min-width: 50px;
  max-width: 300px;
  text-overflow: ellipsis;
  overflow:hidden;
  height: 1.88rem;
  z-index: 1;
  float: left;
  cursor: pointer;
  user-select: none;
  outline: none !important;
  background-color: rgba(30,168,223,0.20);
  background: rgba(30,168,223,0.20);
  border: 1px solid #1EA8DF;
  border-radius: 25px;
  padding: 0 0.63rem;
`;

export const SearchTagChip = styled(Tag)`
  position: absolute;
  left: 1.88rem;
  max-width: calc(100% - 1.88rem) !important;
  width: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.63rem;
`;

export const TagChipText = styled.div`
  display: block;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: normal;
  color: #000000;
  margin: 0rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TagChipNum = styled.div`
  font-size: 0.75rem;
  margin-left: auto;
  font-weight: bold;
  align-self: center;
  color: #008cc8;
`;
