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
    align-items:center;
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
    padding:0 0.63rem !important;
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
    display: none;
    align-items: center;
    position: absolute;
    width: auto;
    height: auto;
    border: 0.0625rem solid #dadada;
    border-radius: 0.5rem;
    margin-top: 1rem;
    margin-left: 2.5rem;
    padding: 0.5rem;
    padding-left: 1.5rem;
    font-size: 0.81rem;
    background-color: rgba(255,255,255,0.50);
    z-index:20;
  }
  .draggedPage{
    display: none;
    align-items: center;
    position: absolute;
    padding-left: 3.125rem;
    font-size: 0.81rem;
    background-color: rgba(30,168,223,0.20);
    z-index:20;
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
      transform: translate(-0.43rem, -1.405rem);
    }
  }  
  .link-dialog-reverse {
    flex-direction:column-reverse !important;
  }
  .note-link-footer{
    flex-direction:row-reverse !important;
    margin: auto !important;
  }
  .link-toolbar {
    flex-direction:column !important;
    width: 118px !important;
  }
  .link-toolbar button {
    width:100% !important;
    justify-content : flex-start !important;
  }
  .note-show-element{
    display:flex !important;
  }
  .note-link-input {
    border: 1px solid #FF5151 !important;
  }
  .note-link-error {
    position: absolute !important;
    display:none;
    align-items: center !important;
    float: right !important;
    width: 1.63rem !important;
    height: 1.63rem !important;
    top:10% !important;
    right: 3% !important;
  }
  .note-link-error-tooltip{
    display:none;
    width: 10.5rem !important;
    height: 1.5rem !important;
    background: #FF5151 !important;
    border-radius:10px !important;
    position:absolute !important;
    top:-80% !important;
    right: 3% !important;
    align-items: center !important;
    justify-content: center !important;
    color: #ffffff !important;
    font-size: 11px !important;
  }
  input{
    border:none;
  }
  input:focus{
    outline:none;
  }
  .tox-statusbar{ display :none !important; }
  .export {
    table {
      border-collapse: collapse;
    }
    table:not([cellpadding]) th,
    table:not([cellpadding]) td {
      padding: 0.4rem;
    }
    table[border]:not([border="0"]):not([style*="border-width"]) th,
    table[border]:not([border="0"]):not([style*="border-width"]) td {
      border-width: 1px;
    }
    table[border]:not([border="0"]):not([style*="border-style"]) th,
    table[border]:not([border="0"]):not([style*="border-style"]) td {
      border-style: solid;
    }
    table[border]:not([border="0"]):not([style*="border-color"]) th,
    table[border]:not([border="0"]):not([style*="border-color"]) td {
      border-color: #ccc;
    }
    figure {
      display: table;
      margin: 1rem auto;
    }
    figure figcaption {
      color: #999;
      display: block;
      margin-top: 0.25rem;
      text-align: center;
    }
    hr {
      border-color: #ccc;
      border-style: solid;
      border-width: 1px 0 0 0;
    }
    code {
      background-color: #e8e8e8;
      border-radius: 3px;
      padding: 0.1rem 0.2rem;
    }
    .mce-content-body:not([dir=rtl]) blockquote {
      border-left: 2px solid #ccc;
      margin-left: 1.5rem;
      padding-left: 1rem;
    }
    .mce-content-body[dir=rtl] blockquote {
      border-right: 2px solid #ccc;
      margin-right: 1.5rem;
      padding-right: 1rem;
    }
  }
  .afterClass{
    page-break-after:always;
  }
`;

export const LNB = styled.div`
  height: 100%;
  border-right: 1px solid #e3e7eb;
  flex: 1 1 21.06rem;
  min-width: 21.06rem;
`;
export const Content = styled.div`
  flex: 2 2 42rem;
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
