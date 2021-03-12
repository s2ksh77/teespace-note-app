import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  textarea#noteEditor {
    flex-grow:1;
  }
  .noteFocusedTag {
    background-color: #DDD7CD;
    border: 1px solid #7B7671;
  }
  .readModeIcon{
     margin-left: 1.19rem;
  }
  .fileSelected{
    border: 1px solid #EC6222 !important;
  }
  .selected{
    background-color: #F2EFEC;
  }
  .selectedMenu {
    color: #205855;
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
  .tox-tinymce-aux{
    z-index: 100 !important;
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
  .custom-dialog-header {
    height: 2.75rem !important;
    border-bottom: 1px solid #DDD9D4 !important;
    font-size: 0.875rem !important;
    color: #000000 !important;
  }
  .custom-link-dialog {
    height:18rem !important;
  }
  .custom-dialog-title {
    font-weight: bold !important;
    margin: auto !important;
  }
  .custom-dialog-form > .tox-form__group{
    position:relative;
  }
  .custom-dialog-form label{
    margin-bottom:0.75rem !important;
    font-weight: bold !important;
  }
  .custom-dialog-form input{
    height:1.88rem !important;
  }
  .custom-dialog-form .tox-form__group:nth-child(1) input{
    margin-bottom:1.25rem !important;
  }
  .custom-dialog-footer {
    height: 4.39rem !important;
  }
  .custom-dialog-btns{
    margin: auto !important;
  }
  .custom-dialog-btns button {
    width:4.5rem !important;
    height:1.88rem !important;
    font-size:0.75rem !important;
  }
  .custom-dialog-btns button:nth-child(1) {
    background-color: #232D3B !important;
    color: white !important;
  }
  .custom-dialog-btns button:nth-child(2) {
    background-color:#FFFFFF !important;
    border: 1px solid #D0CCC7 !important;
    color: #3B3B3B !important;
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
  .note-link-form-error {
    position: absolute !important;
    display:none;
    align-items: center;
    width: 1.63rem !important;
    height: 1.63rem !important;
    right:0.25rem;
  }
  .tox-form__group > .note-link-form-error {
    top: 37px;
  }
  .tox-control-wrap > .note-link-form-error {
    top : 2px;
  }
  .note-link-error-tooltip{
    display:none;
    align-items: center;
    justify-content: center;
    width: fit-content !important;
    height: 1.5rem !important;
    padding:0 0.75rem !important;
    font-size:0.688rem !important; 
    background: #FF5151 !important;
    border-radius:10px;
    position:absolute !important;
    top:-90%;
    right: 0rem;
    color: #ffffff !important;;
  }
  .tox-form__group > .note-link-error-tooltip {
    top: -2px;
  }
  .tox-control-wrap > .note-link-error-tooltip {
    top : -36px;
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
      max-width: 770px;
      width: 100%;
    }
    table tr{
      page-break-inside:avoid; 
      page-break-after: auto;
    }
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
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    }
    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    }
    ::marker {
      unicode-bidi: isolate;
      font-variant-numeric: tabular-nums;
      text-transform: none;
      text-indent: 0px !important;
      text-align: start !important;
      text-align-last: start !important;
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
  }
  .ant-dropdown-menu-submenu-popup ul{
    margin: 0;
  }
  .ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-popup.ant-dropdown-menu {
    padding: 0;
    border: 0px solid #e0e0e0;
  }
  .ant-dropdown-menu-submenu.ant-dropdown-menu-submenu-disabled {
    background-color: unset;
  }
  .ant-dropdown::before{
    bottom:0 !important;
  }
  .forwardModal .ant-modal-content{
    width:32.5rem !important;
  }
  .forwardModal .ant-modal-body {
    padding: 0rem !important;
  }
  .viewInfoModal .ant-modal-body {
    padding: 1.69rem 3.44rem 0 3.44rem !important;
  }
  .viewInfoModal .ant-modal-footer{
    border-top: 0px solid black !important;
    padding:1.75rem 0 !important;
  }
  .ant-upload.ant-upload-select{
    display: none;
  }
`;

export const LNB = styled.div`
  display:${props => props.show ? "flex" : "none"};
  height: 100%;
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
  border-left:${props => props.isBorderLeft ? "1px solid  #DDD9D4" : "0px"};
`;

export const CenterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: cener;
  justify-content: center;
`;
