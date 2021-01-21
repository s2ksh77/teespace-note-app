import { Progress } from 'antd';
import styled, { css } from 'styled-components';

export const EditorContainerWrapper = styled.div`
  width:100%;
  height:100%;
  ${props => props.mode === "false" && css`
    .tox-editor-header{
     display:block;
    }
  `}
  ${props => props.mode === "true" && css`
    .tox-editor-header{
      display:none;
    }
  `}
  ${props => (props.isFile === "false" && props.mode === "true") && css`
    .tox-tinymce{
      height: calc(100% - 8.8rem) !important;
    }
  `}
  ${props => (props.isFile === "true" && props.mode === "true") && css`
    .tox-tinymce{
      height: calc(100% - 13rem) !important;
    }
  `}
  ${props => (props.isFile === "false" && props.mode === "false") && css`
    .tox-tinymce{
      height: calc(100% - 6rem) !important;
    }
  `}
  ${props => (props.isFile === "true" && props.mode === "false") && css`
    .tox-tinymce{
      height: calc(100% - 10.2rem) !important;
    }
  `}
`;

export const ReadModeContainer = styled.div`
  width: 100%;
  height: 2.81rem;
  border-top: 1px solid rgb(218, 218, 218);
  display: flex;
  align-items: center;
  flex-direction: row;
  color: #999999;
`;
export const ReadModeIcon = styled.img`
  margin-left: 16px;
`
export const ReadModeText = styled.span`
  margin-left: 0.5rem;
  color: #999999;
  font-size: 0.75rem;
  display: flex;
  font-size: 0.75rem;
`;

export const FoldBtn = styled.div`
  width: 0.94rem;
  height: 2.06rem;
  display: ${(props) => props.show ? "flex" : "none"};
  align-items: center;
  background-color: #205855;
  border: 0px solid #9ca7ad;
  cursor: pointer;
  border-top-left-radius: 0.31rem;
  border-bottom-left-radius: 0.31rem;
  position: fixed;
  z-index: 18;
  top: 50%;
  transform: ${props => props.isExpanded ? "rotate(180deg)"
    : "translate(-0.9rem, 0rem)"};
  &:hover {
    background-color: #205855;
  }
`;

export const FoldBtnImg = styled.img`
  width: 100%;
  filter: invert(99%) sepia(41%) saturate(0%) hue-rotate(145deg) brightness(113%) contrast(100%);
`;

export const FileBodyLayout = styled.div`
  width:auto;
  display : flex;
  align-items: center;
  height: 4.19rem;
  border-top: 0px solid #dadada;
  border-bottom: 1px solid #dadada;
  overflow: hidden;
  box-sizing :border-box;
  padding: 0rem 0.5rem;
`
export const FileBody = styled.div`
  display: flex;
  position: relative;
  padding: 0.375rem;
  border-radius: 0.5rem;
  ${props =>
    props.closable ?
      css`
      width: 13.75rem;
      min-width: 13.75rem;
    `
      : css`
      width: 12.5rem;
      min-width: 12.5rem;
    `
  }
  box-sizing: border-box; 
  border : 1px solid #dadada;
  height: 2.63rem;
  margin-left: 0.5rem;
  flex-direction : row;
  flex-wrap : wrap;
  &:first-child{
    margin-left: 0rem;
  }
  &:focus {
    outline: 0;
  }
`
export const FileContent = styled.div`
  min-width: calc(100% - 1.325rem);
  display: flex;
  margin-left: 0px;
`
export const FileDownloadIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-right: 0.38rem;
  margin-right: 0.375rem;
  width: 1.88rem;
  height: 1.88rem;
  &:hover{
    background-color : #C4C6FF;
    border-radius: 25px;
  }
`
export const FileErrorIcon = styled.div`
  .anticon-exclamation-circle {
    position: absolute;
    left : 1.5rem;
    font-size: 0.875rem;
    color: #FB3A3A;
  }
`

export const ProgressWrapper = styled.div` 
  width: 100%;
  top: -0.5rem !important;
  position: relative !important;
`

export const FileExtensionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-right: 0.375rem;
  margin-top: 0;
  width: 30px;
  height: 40px;
  ${FileDownloadIcon}:hover & {
    display:none;
  }
`

export const FileDownloadBtn = styled.img`
  filter: invert(40%) sepia(53%) saturate(5337%) hue-rotate(235deg) brightness(93%) contrast(91%);
`
export const FileExtensionBtn = styled.img`
`

export const FileData = styled.div`
  height: auto;
  line-height: 0.9375rem;
  max-width: 9.55rem;
  min-width: ${(props) => props.mode === "true" ? "" : "9.5rem"};
  overflow: inherit;
  display: inline-block;
  height: 40px;
  cursor : pointer;
  flex: 1;
`

export const FileDataName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const FileName = styled.div`
  font-size: 0.69rem;
  background-color: inherit;
  margin-right: 0rem;
  margin-top: 0;
  color: #45474A;
  line-height: 0.9375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover{
    text-decoration: underline;
  }
`
export const FileDataTime = styled.div`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 0.9375rem;
  height: auto;
  overflow: inherit;
  max-width: 9.55rem;
`

export const FileTime = styled.div`
  background-color: inherit;
  line-height: 0.9375rem;
  display: inline-block;
  font-size: 0.63rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color:#888D96;
`

export const FileClose = styled.div`
  display: flex;
  height: 100%;
  padding-left: 0.4625rem;
  color: #000000;
  cursor: pointer;
  border-radius: 0.5rem;
  align-items: center;
`

export const FileCloseBtn = styled.img`
  width: 0.56rem;
  height: 0.56rem;
  filter: invert(52%) sepia(1%) saturate(2165%) hue-rotate(202deg) brightness(90%) contrast(109%);
`

export const editorContentCSS = ` 
  html,body{
    height:calc(100% - 16px);
  }
  body{
    font-family : "Noto Sans KR",sans-serif;
  }
  a, img {
    cursor:pointer;
  }
  .mce-content-body .note-invalidUrl[data-mce-selected=inline-boundary] {
    background-color: #f8cac6;
  }
  .mce-content-body [data-mce-selected=inline-boundary] {
    background-color:#FFE362;
  }
  table[style*="border-width: 0px"],
  .mce-item-table:not([border]),
  .mce-item-table[border="0"],
  table[style*="border-width: 0px"] td,
  .mce-item-table:not([border]) td,
  .mce-item-table[border="0"] td,
  table[style*="border-width: 0px"] th,
  .mce-item-table:not([border]) th,
  .mce-item-table[border="0"] th,
  table[style*="border-width: 0px"] caption,
  .mce-item-table:not([border]) caption,
  .mce-item-table[border="0"] caption {
    border: 1px solid #ccc;
  }
  .mce-content-body{
    background: radial-gradient(rgba(0,0,0,0.04) 0.063rem, transparent 0rem) !important;
    background-size: 0.625rem 0.625rem !important;
  }
  img {
    max-width: 100%;
  }
`