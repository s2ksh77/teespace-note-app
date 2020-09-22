import styled from 'styled-components';
import { Dropdown } from 'antd';

export const HeaderButtonContainer = styled.div`
    display: flex;
    align-items:center;
    margin-left:0.75rem; 
`;

export const Button = styled.img`
    width: 1rem;
    height: 1rem;
    curosr:pointer;
    filter: invert(52%) sepia(1%) saturate(2165%) hue-rotate(202deg) brightness(90%) contrast(109%);
`;

// 돋보기모양 submit btn
export const SearchImgInput = styled.input`
    width: 1rem;
    height: 1rem;
    curosr:pointer;
    margin-right:0.43rem;
    invert(87%) sepia(11%) saturate(177%) hue-rotate(169deg) brightness(94%) contrast(91%);
`;

export const SearchResultNotFoundCover = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`

export const SearchKeyword = styled.span`
    font-size: 0.94rem;
    color: #000000;
    margin-bottom: 0.69rem;
`

export const NoSearchResultTitle = styled.span`
    font-size: 0.75rem;
    color: #777777;
    margin-bottom: 1.25rem;
`

export const NoSearchResultImg = styled.img`
`

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

export const ContextMenuIconCover = styled.span`
`;