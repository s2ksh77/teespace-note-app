import styled from 'styled-components';
import { Collapse, Tag } from 'antd';

// * gui에 나온대로 min-width를 50px이라고 하면 태그가 많아졌을 때 tag text가 안보인채로 50px 사이즈가 돼 버림
// max-width가 display:flex일 때 먹지 않아서 내부 span tag에 max-width:15.69rem
export const TagItem = styled(Tag)`
  min-width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.63rem;
  margin-bottom: 0.4375rem;
  margin-top: 0.4375rem;
  margin-right: 0.38rem;
  color: #3b3b3b;
  font-size: 0.81rem;
  font-weight: 400;
  border-radius: 1.563rem;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 1.88rem;
  z-index: 1;
  float: left;
  cursor: pointer;
  user-select: none;
  outline: none !important;
  background-color: #f7f4ef;
  border: 1px solid transparent;
  border-radius: 25px;
  padding: 0 0.63rem;
  transition-duration: 0s;
  &:hover {
    color: #000000;
    border: 1px solid #7b7671;
    background-color: #ebe6df;
  }
`;

export const TagText = styled.span`
  width: 100%;
  display: block;
  max-width: 15.69rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 23px;
  line-height: normal;
`;

export const TagCancelButton = styled.img`
  margin-left: 0.69rem;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const TagCollapse = styled(Collapse)`
  width: 100%;
`;

const { Panel } = Collapse;
export const TagCategory = styled(Panel)`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  font-color: #000000;
`;

export const TagKeyContainer = styled.div`
  width: 100%;
  font-size: 0.8125rem;
`;

export const TagKey = styled.div``;

export const TagItemNum = styled.div`
  font-size: 0.688rem;
  margin-left: auto;
  color: #7b7671;
  padding-left: 0.4rem;
  line-height: normal;
`;

export const PageTagListWrapper = styled.div`
  width: 100%;
  height: 2.81rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

/** 여기 아래부터 아직 안 쓰이는 곳 */

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

export const PanelArrow = styled.img`
  width: 0.8rem;
  bottom: 1rem;
`;

export const TagList = styled.div`
  display: flex !important;
  align-items: center !important;
  width: calc(100% - 2.4rem);
  box-sizing: border-box;
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
  display: flex;
  width: 8.75rem;
  height: 1.88rem;
  margin-right: 0.38rem;
  border-radius: 1.563rem;
  padding: 0 0.75rem;
  border: 0.0625rem solid #7b7671;
  background-color: #ffffff;
  font-size: 0.81rem;
  color: #000000;
  outline: none;
`;

export const TagKeyList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const SearchTagChip = styled(Tag)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.63rem;
  height: calc(100% - 0.26rem);
  width: fit-content;
  max-width: calc(100% - 1.88rem) !important;
  color: #000000;
  font-size: 0.81rem;
  cursor: pointer;
  user-select: none;
  outline: none !important;
  background-color: #f7f4ef;
  border-radius: 25px;
  border: 0px solid #7b7671;
  &:hover {
    color: #000000;
    background-color: #ebe6df;
  }
`;
