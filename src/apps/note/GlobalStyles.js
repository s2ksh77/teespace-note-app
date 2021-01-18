import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  .noteFocusedTag {
    background-color: #DDD7CD;
    border: 1px solid #7B7671;
  }
  .readModeIcon{
     margin-left: 1.19rem;
  }
  .fileSelected{
    border: 1px solid #513EC7 !important;
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
    height: 2.81rem !important;
    display: flex;
    align-items:center;
    border-bottom: 1px solid #EEEDEB !important;
    padding: 0 0.75rem !important;
    background-color: #FFFFFF;
    color: #000000;
    font-size: 0.8125rem;
  }
  .ant-collapse-content {
    border:0 !important;
  }
  .ant-collapse-content-box {
    padding: 10px 2.51rem !important;
  }
  .ant-collapse-item {
    border:0 !important;
  }
  .ant-tooltip-inner {
    width: fit-content;
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
  .ant-dropdown-menu-submenu-title {
    padding: 0.1875rem 0.75rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #000;
    border-radius: 0.8125rem;
  }
  .ant-dropdown-menu-submenu-popup ul{
    margin: 0;
  }
  .ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-popup.ant-dropdown-menu {
    padding: 0;
    border: 0px solid #e0e0e0;
  }
  .ant-dropdown::before{
    bottom:0 !important;
  }
`;

export const LNB = styled.div`
  display:${props => props.show ? "flex" : "none"};
  height: 100%;
  border-right: 1px solid #e3e7eb;
  flex: 1 1 17.06rem;
  min-width: 17.06rem;
`;
export const Content = styled.div`
  display:${props => props.show ? "flex" : "none"};
  flex-direction:column;
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
