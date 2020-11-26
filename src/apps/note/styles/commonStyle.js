import styled from 'styled-components';
import { Dropdown, Modal } from 'antd';

export const HeaderButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.75rem;
`;

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

export const CustomModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width:22.5rem;
  height:11.88rem;
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

export const IconImg = styled.img`
  display:flex;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0.88rem auto 0.94rem auto;
`;

export const ModalTitle = styled.div`
  font-size: 1rem;
`;

export const ModalSubTitle = styled.div`
  height: 0.813rem;
  color: #777777;
`;
export const ButtonGroup = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: 0rem;
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