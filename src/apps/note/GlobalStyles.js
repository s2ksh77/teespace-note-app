import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html{
    width: 100%;
    height: 100%;  
  }
  body{
    min-width: 68.125rem;
    height : 100%;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0;
  }
  #root{
      display :flex;
      width: 100%;
      height: 100%;  
  }
  .readModeIcon{
     margin-left: 1.19rem;
  }
  .sun-editor{
    border-left: 0px solid #dadada;
    border-right: 0px solid #dadada;
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
  }
`;

export const LNBContainer = styled.div`
  width: 30%;
  height: 100%;
  border-right: 1px solid #e3e7eb;
  display: block;
`;
export const ContentContainer = styled.div`
  width: 70%;
`;
