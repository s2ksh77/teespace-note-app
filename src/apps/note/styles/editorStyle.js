import styled from 'styled-components';

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
  display: flex;
  align-items: center;
  background-color: #1ea8df;
  border: 0px solid #9ca7ad;
  cursor: pointer;
  border-top-left-radius: 0.31rem;
  border-bottom-left-radius: 0.31rem;
  position: fixed;
  z-index: 18;
  top: 50%;
  transform: translate(-0.9rem, 0rem);
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
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
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
  display: none;
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
    display:flex;
  }
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
  width: 1.25rem;
  font-size: 0.625rem;
  padding-left: 0.4625rem;
  color: #75757F;
  cursor: pointer;
  border-radius: 0.5rem;
`

export const FileCloseBtn = styled.img`
  width: 1rem;
  height: 1rem;
  background-color: inherit;
  color: #c1c6ce;
`