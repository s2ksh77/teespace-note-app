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
      height: calc(100% - 13.8rem) !important;
    }
  `}
  ${props => (props.isFile === "false" && props.mode === "false") && css`
    .tox-tinymce{
      height: calc(100% - 6rem) !important;
    }
  `}
  ${props => (props.isFile === "true" && props.mode === "false") && css`
    .tox-tinymce{
      height: calc(100% - 11rem) !important;
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
  background-color: #1ea8df;
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
    background-color: #008CC8;
  }
`;

export const FoldBtnImg = styled.img`
  width: 100%;
`;

export const FileBodyLayout = styled.div`
  width:100%;
  display : flex;
  align-items: center;
  height: 4.9rem;
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
  width: 13.75rem;
  box-sizing: border-box; 
  border : 1px solid #dadada;
  height: 3.5rem;
  margin-left: 0.5rem;
  &:first-child{
    margin-left: 0rem;
  }
  &:hover{
    background-color: #DCDDFF;
  }
  &:focus {
    outline: 0;
  }
`
export const FileContent = styled.div`
  min-width: calc(100% - 1.325rem);
  padding: 5px;
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
  margin-top: 0;
  width: 1.875rem;
  height: 1.875rem;
`

export const FileExtensionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin-right: 0.38rem;
  margin-right: 0.375rem;
  margin-top: 0;
  width: 1.875rem;
  height: 1.875rem;
  ${FileBody}:hover & {
    display:none;
  }
`

export const FileDownloadBtn = styled.img`
  width:1.875rem;
  height:1.875rem;
`
export const FileExtensionBtn = styled.img`
`

export const FileData = styled.div`
  height: auto;
  line-height: 0.9375rem;
  max-width: 10.55rem;
  overflow: inherit;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 40px;
  cursor : pointer;
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
  font-size: 0.6875rem;
  background-color: inherit;
  margin-right: 0rem;
  margin-top: 0;
  color: #45474A;
  line-height: 0.9375rem;
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
  max-width: 10.55rem;
`

export const FileTime = styled.div`
  background-color: inherit;
  line-height: 0.9375rem;
  display: inline-block;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const FileClose = styled.div`
  display: flex;
  height: 100%;
  width: 1.625rem;
  font-size: 0.625rem;
  padding-left: 0.4625rem;
  color: #75757F;
  cursor: pointer;
  border-radius: 0.5rem;
  position: absolute;
  top: 0;
  right: 0;
`

export const FileCloseBtn = styled.img`
  width: 1rem;
  height: 1rem;
  margin-top: 0.38rem;
  filter: invert(52%) sepia(1%) saturate(2165%) hue-rotate(202deg) brightness(90%) contrast(109%);
`

export const editorContentCSS = ` 
  body{
    font-family : "Noto Sans KR",sans-serif !important;
  }
  a, img {
    cursor:pointer;
  }
  .mce-content-body .note-invalidUrl[data-mce-selected=inline-boundary] {
    background-color: #f8cac6;
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