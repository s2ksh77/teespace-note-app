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
