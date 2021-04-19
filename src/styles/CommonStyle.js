import styled, { css } from 'styled-components';
import { Dropdown } from 'antd';

export const ButtonWrapper = styled.span`
  display: flex;
  flex: 0 0 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.38rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #eae6e0;
  }
`;

export const ButtonIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(46%) sepia(9%) saturate(281%) hue-rotate(349deg)
    brightness(98%) contrast(84%);
`;

export const LayoutStateButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.63rem;
`;

export const HeaderDivider = styled.div`
  width: 0.06rem;
  height: 1.5rem;
  background: #ddd9d4;
  margin-right: 1rem;
`;

/** 여기 아래부터 아직 안 쓰이는 곳 */

export const ContentHeaderCover = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 0.75rem 0 1rem;
  box-sizing: border-box;
`;

export const PreBtnWrapper = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  margin-right: 0.5rem;
  cursor: pointer;
  padding: 8px;
  &:hover {
    background: #ebe6df;
    border-radius: 0.25rem;
    cursor: pointer;
  }
`;

export const ContentBodyCover = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 0.75rem;
  border-top: 1px solid #ddd9d4;
`;

export const NoneContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NoneTitle = styled.div`
  font-size: 0.938rem;
  font-weight: 400;
  color: #000000;
  width: auto;
  height: 1.38rem;
  line-height: normal;
`;

export const NoneText = styled.span`
  font-size: 0.75rem;
  font-weight: 300;
  margin-top: 0.75rem;
  color: #777777;
`;

export const NoneImg = styled.img`
  width: 8.13rem;
  margin-top: 1.25rem;
`;
export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  height: 1.5rem;
  cursor: pointer;
  &:hover {
    background: #ebe6df;
    border-radius: 0.25rem;
  }
  & + div {
    margin-left: 0.5rem;
  }
`;

// 1rem인 button
export const Button = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

// 돋보기모양 submit btn
export const SearchImgInput = styled.input`
    width: 1rem;
    height: 1rem;
    cursor:pointer;
    margin-right:0.43rem;
    filter: ${props =>
      props.isSearch
        ? 'invert(26%) sepia(5%) saturate(1127%) hue-rotate(352deg) brightness(93%) contrast(93%);'
        : 'invert(87%) sepia(11%) saturate(177%) hue-rotate(169deg) brightness(94%) contrast(91%);'}
    &:hover{
      filter: invert(26%) sepia(5%) saturate(1127%) hue-rotate(352deg) brightness(93%) contrast(93%);
    }
`;

export const SearchResultNotFoundCover = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const SearchKeyword = styled.span`
  font-size: 0.94rem;
  color: #000000;
  margin-bottom: 0.69rem;
`;

export const NoSearchResultTitle = styled.span`
  font-size: 0.75rem;
  color: #777777;
  margin-bottom: 1.25rem;
`;

export const NoSearchResultImg = styled.img`
  width: 8.13rem;
`;

// ShareNoteMessage
export const MessageCover = styled.div`
  border-radius: 0.75rem;
  background-color: white;
  width: 15.31rem;
  height: 3.19rem;
  display: flex;
  padding: 0.69rem 0.75rem;
  box-sizing: border-box;
  border: 1px solid #ddd9d4;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const NoteTitle = styled.span`
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 0.75rem;
  align-self: center;
  padding-left: 0.75rem;
`;

export const RoomShareCover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalSharedInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.94rem;
`;

export const ModalSharedInfoCover = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

export const ModalSharedInfoTitle = styled.span`
  display: inline-flex;
  width: 7rem;
  float: left;
  color: #000000;
  font-weight: bold;
`;

export const ModalSharedInfoContent = styled.span`
  display: inline-block;
  width: calc(100% - 7rem);
  color: #777777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonGroup = styled.div`
  display: flex;
`;

export const SearchLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const SearchLoadingTxt = styled.div`
  font-size: 0.75rem;
  color: #777777;
  text-align: center;
  margin-bottom: 1.25rem;
`;

export const SearchLoadingImg = styled.img`
  width: 8.44rem;
  height: 8.44rem;
`;

export const WaplLoadingImg = styled.img`
  width: 4.06rem;
  margin: auto;
`;

export const RightAligned = styled.div`
  display: flex;
  margin-left: auto;
`;

export const DraggedComponentContainer = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  align-items: center;
  font-size: 0.81rem;
  z-index: 20;
`;

export const DraggedComponent = styled.div`
  display: flex;
  height: 2.81rem;
  align-items: center;
  padding-left: 1.25rem;
  background-color: rgba(242, 239, 236, 0.6);
  border-radius: 0.31rem;
`;

export const DraggedComponentTitle = styled.span`
  padding-right: 1.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OverlayCover = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(250, 250, 250, 0.7);
  z-index: 1000;
`;

export const LoaderOverlay = styled.img`
  width: 5rem;
  height: 5rem;
`;