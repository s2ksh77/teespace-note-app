import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  .readModeIcon{
     margin-left: 1.19rem;
  }
  .selected{
    background-color: rgba(30,168,223,0.20);
  }
  .selectedMenu {
    color: #008CC8;
  } 
  .ant-tag{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.4375rem;
    margin-top: 0.4375rem;
    margin-right: 0.38rem;
    color: #333333;
    font-size: 0.875rem;
    font-weight: 400;
    border: 0.0625rem solid #1EA8DF;
    border-radius: 1.563rem;
    min-width: 4.5rem;
    max-width: 9.31rem;
    height: 1.88rem;
    z-index: 1;
    float: left;
    cursor: pointer;
    user-select: none;
    background-color: rgba(30,168,223,0.20);
    > .ant-tag-close-icon {
      margin-left:auto !important;
    }
  }
  .tox-editor-header{
    display:none;
  }
`;

export const LNB = styled.div`
  height: 100%;
  border-right: 1px solid #e3e7eb;
  flex: 1 1 23.06rem;
  min-width : 23.06rem;
`;
export const Content = styled.div`
  flex: 2 2 46rem;
  height: 100%;
`;

export const CenterContent = styled.div`
  width:100%;
  height:100%;
  display:flex;
  align-items:cener;
  justify-content:center;
`
