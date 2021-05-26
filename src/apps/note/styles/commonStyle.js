import styled, { css } from 'styled-components';
import { Dropdown } from 'antd';

export const HeaderButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${props => (props.layoutState === "collapse" && props.targetLayout === "LNB") ? "0.75rem" : "0rem"};
`;

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
  display: ${props => (props.show ? "flex" : "none")};
  align-items: center;
  margin-right: 0.5rem;
  cursor:pointer;
  padding: 8px;
  &:hover{
    background: ${props => props.theme.BeigeBright};
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
  border-top: 1px solid ${props => props.theme.LineMain};
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
`
export const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  height: 1.5rem;
  cursor: pointer;
  &:hover{
    background: ${props => props.theme.BeigeBright};
    border-radius: 0.25rem;
  }
  & + div {
    margin-left: 0.5rem;
  }
`
// 1rem인 button
export const Button = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const MediumButtonWrapper = styled.div`
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.375rem;
  cursor: pointer;
`;

export const SmallButtonWrapper = styled.div`
  display: flex;
  width: 0.75rem;
  height: 0.75rem;
  cursor: pointer;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`;

export const CancelBtn = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  cursor:pointer;
  ${props =>
    !props.visible &&
      css`display:none;`
  }
`;

// 돋보기모양 submit btn
export const SearchImgInput = styled.input`
  width: 1rem;
  height: 1rem;
  cursor:pointer;
  margin-right:0.43rem;
  filter: invert(31%) sepia(0%) saturate(1197%) hue-rotate(255deg) brightness(97%) contrast(85%);
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
  width:8.13rem;
`;

export const ContextMenuCover = styled(Dropdown)`
  position: absolute;
  right: ${props => props.right};
  display: flex;
  visibility: hidden;
  flex: 0 0 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  border-radius: 0.38rem;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${props => props.theme.BeigeBright};
  }
`;

export const ContextMenuIconCover = styled.span``;

export const ContextMenuIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(46%) sepia(9%) saturate(281%) hue-rotate(349deg) brightness(98%) contrast(84%);
`;

// ShareNoteMessage
export const MessageCover = styled.div`
  width: 14.44rem;
  height: 3.19rem;
  display: flex;
  align-items: center;
  padding: 0.56rem 0.75rem;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.LineMain};
  background-color: #FAF8F5;
  cursor: pointer;
  &:hover {
    text-decoration:underline;
  }
`;

export const TextCover = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 2.5rem);
  overflow: hidden;
  margin-left:0.75rem;
`;

export const NoteType = styled.span`
  font-size: 0.563rem;
  color: #75757F;
`;

export const NoteTitle = styled.span`
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size:0.75rem;
  color: #000000;
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
  align-items:flex-start;
  margin-bottom: 0.75rem;
`;

export const ModalSharedInfoTitle = styled.span`
  display:inline-flex;
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
  width:4.06rem;
  margin:auto;
`;

export const RightAligned = styled.div`
  display:flex;
  margin-left:auto;
`;

export const DraggedComponentContainer = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  align-items: center;
  font-size: 0.81rem;
  z-index:20;
`;

export const DraggedComponent = styled.div`
  display: flex;
  height: 2.81rem;
  align-items: center;
  padding-left: 1.25rem;
  background-color: rgba(242,239,236,0.6);
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
  right:0;
  bottom:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color: rgba(250,250,250,.7);
  z-index: 1000;
`;

export const LoaderOverlay = styled.img`
  width: 5rem;
  height: 5rem;
`;

export const RestoreModalWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const RestoreModalBody = styled.div`
  height: 6.06rem;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0.63rem 1.25rem;
  background: #F7F4EF;
`;

export const RestoreChapterText = styled.div`
  margin-left: 1rem;
`;

export const RestoreModalFooter = styled.div`
  display: flex;  
  height: 4.38rem;
  justify-content: center;
  align-items: center;
`;