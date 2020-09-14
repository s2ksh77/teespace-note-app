import styled from "styled-components";
import {Collapse, Tag} from 'antd';

export const TagContainer = styled.div`
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

export const TagNewBtnDIV = styled.div`
  display: flex;
  flex: 0 0 1.25rem;
  border: none;
  margin-left: 0.75rem;
  margin-right: 0.88rem;
  align-self: center;
  background-color: transparent;
`;

export const TagListDIV = styled.div`
  display: flex !important;
  align-items: center !important;
  width: calc(100% - 2.4rem);
  box-sizing: border-box;
`;
export const TagTextSpan = styled.span``;

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
  width: 5rem;
  height: 1.88rem;
  margin-right: 0.38rem;
  border-radius: 1.563rem;
  padding-left: 0.63rem;
  padding-right: 0.63rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
  display: flex;
  border: 0.0625rem solid #1ea8df;
  background-color: #ffffff;
  font-size: 0.75rem;
  color: #3b3b3b;
  outline: none;
`;

// lnbTag
export const LnbTagContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: calc(100% - 1.62rem);
  height: 2.81rem;
  padding: 0rem 0.81rem 0rem 0.81rem;
  font-size: 0.81rem;
  cursor: pointer;
  color:${props => props.color || ""};
  &:hover .ellipsisBtn {
    background-color: rgba(30, 168, 223, 0.2);
  }
  &:hover:not(.ellipsisBtn) {
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const TagImg = styled.img`
  width: 1rem;
  margin: 0 0.36rem 0 0.48rem;
  filter:${props => props.filter || "invert(46%) sepia(7%) saturate(11%) hue-rotate(203deg) brightness(99%) contrast(91%)"};
`;

export const TagText = styled.span`
  font-weight: 400;
`;
// contents가 tag일 때
export const TagMenuHeader = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  padding: 0 0.75rem;
  box-sizing: border-box;
  border-bottom: 0.0625rem solid #dadada;
`;

export const TagListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow:scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:1.25rem 0.75rem;
`;

export const { Panel } = Collapse;

export const StyledCollapse = styled(Collapse)`
  width:100%;
`;

export const TagKeyBox = styled.div`
  display:flex;
  width:100%;
`;

export const TagKeyRow = styled.div`
  width:100%;
`

export const EllipsisTag = styled(Tag)`
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`
