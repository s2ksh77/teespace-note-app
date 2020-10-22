import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  .noteFocusedTag {
    background-color:#1EA8DF !important;
  }
  .readModeIcon{
     margin-left: 1.19rem;
  }
  .selected{
    background-color: rgba(30,168,223,0.20);
  }
  .selectedMenu {
    color: #008CC8;
  } 
  .ant-collapse {
    border:0;
  }
  .ant-collapse-header {
    height: 1.38rem;
    display: flex;
    padding: 0 0.75rem !important;
    border-radius: 21px !important;
    background-color: #EFEFF2;
    border: 0 !important;
  }
  .ant-collapse-content {
    border:0 !important;
  }
  .ant-collapse-item {
    border:0 !important;
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
    outline: none !important;
    background-color: rgba(30,168,223,0.20);
    > .ant-tag-close-icon {
      margin-left:auto !important;
    }
  }
  .tox-editor-header{
    display:none;
  }
  .mce-tinymce iframe{
    flex: 1;
  }
  .tox-edit-area__iframe html{
    height:100% !important;
  }
  .tox-statusbar__branding{
    display: none !important;
  }
  .tox-statusbar__resize-handle{
    display: none !important;
  }
  .borderTopLine{
    border-top: 0.13rem solid #FB3A3A;
    &::before {
      content: '';
      position: absolute;
      width: 0; 
      height: 0; 
      border-top: 0.375rem solid transparent;
      border-bottom: 0.375rem solid transparent;
      border-left: 0.5rem solid #FB3A3A;
      transform: translate(-0.43rem, -0.45rem);
    }
  }
  .borderBottomLine{
    border-bottom: 0.13rem solid #FB3A3A;
    &::before {
      content: '';
      position: absolute;
      width: 0; 
      height: 0; 
      border-top: 0.375rem solid transparent;
      border-bottom: 0.375rem solid transparent;
      border-left: 0.5rem solid #FB3A3A;
      transform: translate(-0.43rem, 2.38rem);
    }
  }
  .draggedChapter{
    display: flex;
    align-items: center;
    position: absolute;
    width: auto;
    height: auto;
    border: 0.0625rem solid #dadada;
    border-radius: 0.5rem;
    padding: 1.1rem;
    padding-left: 1.7rem;
    font-size: 0.81rem;
    background-color: rgba(255,255,255,0.50);
  }
  .draggedPage{
    display: flex;
    align-items: center;
    position: absolute;
    padding-left: 1.25rem;
    font-size: 0.81rem;
    background-color: rgba(30,168,223,0.20);
  }
  .tagBorderTopLine{
    border-top: 0.13rem solid #FB3A3A;
    &::before {
      content: '';
      position: absolute;
      width: 0; 
      height: 0; 
      border-top: 0.375rem solid transparent;
      border-bottom: 0.375rem solid transparent;
      border-left: 0.5rem solid #FB3A3A;
      transform: translate(-1.2rem, -1.405rem);
    }
  }
`;

export const LNB = styled.div`
  height: 100%;
  border-right: 1px solid #e3e7eb;
  flex: 1 1 23.06rem;
  min-width: 23.06rem;
`;
export const Content = styled.div`
  flex: 2 2 46rem;
  height: 100%;
  overflow-x: hidden;
  position: relative;
`;

export const CenterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: cener;
  justify-content: center;
`;
