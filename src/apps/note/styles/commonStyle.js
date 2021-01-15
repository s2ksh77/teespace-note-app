import styled from 'styled-components';
import { Dropdown } from 'antd';

export const HeaderButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.75rem;
`;

export const ContentHeaderCover = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 0.75rem;
  box-sizing: border-box;
  border-bottom: ${props => props.borderBottom ?
    "0.0625rem solid #dadada" : ""};
`;

export const PreBtnWrapper = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  align-items: center;
  margin-right: 0.5rem;
  cursor:pointer;
`;

export const ContentBodyCover = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 0.75rem;
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
  width: 13rem;
  margin-top: 2.19rem;
`

export const Button = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  filter: invert(52%) sepia(1%) saturate(2165%) hue-rotate(202deg)
    brightness(90%) contrast(109%);
`;

// 돋보기모양 submit btn
export const SearchImgInput = styled.input`
    width: 1rem;
    height: 1rem;
    cursor:pointer;
    margin-right:0.43rem;
    filter : invert(87%) sepia(11%) saturate(177%) hue-rotate(169deg) brightness(94%) contrast(91%);
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

export const NoSearchResultImg = styled.img``;

export const ContextMenuCover = styled(Dropdown)`
  display: flex;
  visibility: hidden;
  align-self: center;
  flex: 0 0 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  border-radius: 1.5rem 1.5rem;
  align-items: center;
  justify-content: center;
  color: #75757f;
  &:hover {
    background-color: rgba(30, 168, 223, 0.2);
  }
`;

export const ContextMenuIconCover = styled.span``;

// ShareNoteMessage
export const MessageCover = styled.div`
  border-radius: 0.75rem;
  background-color: white;
  width: 17.25rem;
  height: 4.25rem;
  display: flex;
  padding: 0.88rem 0.75rem;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    text-decoration:underline;
  }
`;

export const MessageNoteImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

export const MessageNoteInfo = styled.div`
  padding: 0.12rem 0 0.12rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: calc(100% - 2.5rem);
  box-sizing: border-box;
`;

export const NoteTitleCover = styled.div`
  font-size: 0.813rem;
  display: flex;
  height: 50%;
  align-items: center;
`

export const NoteTitle = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const NoteDate = styled.div`
  font-size: 0.688rem;
  color: #5B5F62;
  display: flex;
  height: 50%;
  align-items: center;
`;

// Modal.js
export const CustomOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.7);
  z-index: 1000;
`;
export const RoomShareModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width:auto;
  height:auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%,-50%);
  background-color: #FFF;
  padding: 1.25rem;
  box-sizing:border-box;
  z-index: 1000;
`;
export const RoomShareTitleContainer = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  font-size: 0.88rem;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  padding-bottom: 1rem;
`
export const RoomShareTitle = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
`

export const CustomModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width:22.5rem;
  height:11.88rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%,-50%);
  background-color: #FFF;
  padding: 1.25rem;
  box-sizing:border-box;
  z-index: 1000;
`;

export const IconImg = styled.img`
  display:flex;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0.88rem auto 0.94rem auto;
`;

export const ModalTitleContainer = styled.div`
  height: 4.44rem;
`;

export const ModalTitle = styled.div`
  text-align: center;
  font-size: 0.94rem;
  font-weight: bold;
`;

export const ModalSubTitle = styled.div`
  font-size: 0.81rem;
  color: #777777;
`;

export const SharedInfoModal = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 24.38rem;
  height: 13.75rem;
  align-items: center;
  transform: translate(-50%,-50%);
  background-color: #FFF;
  box-sizing: border-box;
  z-index: 1000;
`;

export const ModalSharedInfoHeader = styled.div`
  display: flex;  
  width: 100%;
  height: 2.69rem;
  align-items: center;
  font-size: 0.88rem;
  font-weight: bold;
  border-bottom: 0.06rem solid #dddddd;
`;

export const ModalHeaderBtn = styled.img`
  position: absolute;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const ModalSharedInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 17.5rem;
  height: 8rem;
  font-size: 0.94rem;
  padding-top: 1.18rem;
`;

export const ModalSharedInfoCover = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
`;

export const ModalSharedInfoTitle = styled.span`
  width: 7rem;
  float: left;
  color: #000000;
  font-weight: bold;
`;

export const ModalSharedInfoContent = styled.span`
  width: calc(100% - 7rem);
  color: #777777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
`;

export const ButtonGroup = styled.div`
  display: flex;
`;
export const ModalNormalBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 1.88rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  cursor: pointer;
  background-color: #6C56E5;
  color: white;
  margin-left: 0.38rem;
  &:hover{
    background-color: #DCDDFF;
    color: #000000;
  }
`;

export const ModalCancelBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 1.88rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  cursor: pointer;
  border: 1px solid #C6CED6;
  color: #3B3B3B;
  margin-left: 0.38rem;
  &:hover{
    background-color: #DCDDFF;
    color: #000000;
  }
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
  background-color: rgba(30,168,223,0.20);
  z-index:20;
`;

export const DraggedComponent = styled.div`
  display: flex;
  height: 2.81rem;
  align-items: center;
  padding-left: 3.125rem;
`;

export const DraggedComponentTitle = styled.span`
  padding-right: 1.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;