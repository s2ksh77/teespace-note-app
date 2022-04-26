import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  textarea#noteEditor {
    flex-grow:1;
  }
  .noteFocusedTag {
    color: ${props => props.theme.TextMain};
    background-color: ${props => props.theme.SubStateDark};
    border: 1px solid ${props => props.theme.SubStateVivid};
  }
  .readModeIcon{
     margin-left: 1.19rem;
  }
  .fileSelected{
    border: 1px solid #EC6222 !important;
  }
  .selected{
    background-color: ${props => props.theme.StateDark};
  }
  .selectedMenu {
    color: ${props => props.theme.TextPoinGreen};
  } 
  .ant-collapse {
    border:0;
  }
  .ant-collapse-header {
    height: 2.81rem !important;
    display: flex;
    align-items:center;
    border-bottom: 1px solid ${props => props.theme.LineSub} !important;
    padding: 0 0.75rem !important;
    background-color: ${props => props.theme.StateNormal};
    color: ${props => props.theme.TextMain} !important;
    font-size: 0.8125rem;
  }
  .ant-collapse-content {
    border:0 !important;
    background-color: ${props => props.theme.StateNormal};
    color: ${props => props.theme.TextMain};
  }
  .ant-collapse-content-box {
    padding: 10px 2.51rem !important;
  }
  .ant-collapse-item {
    border:0 !important;
  }
  .ant-tooltip-inner {
    background-color: ${props => props.theme.CoreLight};
    width: fit-content;
  }
  .ant-tooltip-arrow-content {
    background-color: ${props => props.theme.CoreLight};
  }
  .mce-tinymce iframe{
    flex: 1;
  }
  .tox {
    font-family : "Noto Sans KR", sans-serif !important;
  }
  .tox-edit-area__iframe html{
    height:100% !important;
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
      bottom: 0;
      border-top: 0.375rem solid transparent;
      border-bottom: 0.375rem solid transparent;
      border-left: 0.5rem solid #FB3A3A;
      transform: translate(-0.43rem, 0.45rem);
    }
  }
  .custom-dialog-header {
    height: 2.75rem !important;
    border-bottom: 1px solid ${props => props.theme.LineMain} !important;
    font-size: 0.875rem !important;
    color: #000000 !important;
  }
  .custom-link-dialog {
    height:auto !important;
  }
  .custom-dialog-form > .tox-form__group{
    position:relative;
  }
  .custom-dialog-form label{
    color: ${props => props.theme.TextMain} !important;
    margin-bottom: 0.75rem !important;
    font-weight: 500 !important;
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

  .link-toolbar {
    flex-direction: column !important;
    padding: 0 !important;
    margin: 0.15rem 0 !important;
    button {
      width: 100% !important;
      justify-content: flex-start !important;
      padding: 0 0.5rem 0 0.3rem !important;
      margin: 0 !important;
    }
  }
  .link-toolbar button .link-toolbar-btn {
    margin-left: 0.3rem;
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

  .tox .tox-dialog.custom-link-dialog {
    max-width: 24.38rem;
    border: 0;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.375rem 0 rgba(0,0,0,0.35);
    background-color: ${props => props.theme.StateNormal};
  }
  
  .tox .tox-dialog__header.custom-dialog-header {
    position: relative;
    padding: 0;
    height: 2.69rem;
    justify-content: center;
    background-color: ${props => props.theme.StateNormal};
  }

  .tox .tox-dialog__title.custom-dialog-title {
    color: ${props => props.theme.TextMain};
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: 0.88rem;
    margin: auto;
  }

  .tox .tox-dialog__header.custom-dialog-header .tox-button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0;
    width: 2.69rem;
    height: 2.69rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .tox .custom-dialog-header .tox-button.tox-button--naked:hover {
    background-color: transparent;
    border-color: transparent;
  }

  .tox .tox-dialog.custom-link-dialog .tox-dialog__body-content {
    padding: 1rem;
  }

  .tox .tox-dialog.custom-link-dialog .tox-label, .tox .tox-dialog.custom-link-dialog .tox-toolbar-label {
    font-size: 0.81rem;
    font-weight: 500;
  }

 .tox .tox-dialog__footer.custom-dialog-footer {
   padding: 0;
   border-top: 1px solid ${props => props.theme.LineOut};
   background-color: ${props => props.theme.StateNormal};
 }

 .tox .custom-dialog-btns.tox-button {
   border-color: transparent;
   width: 4.5rem;
   height: 1.88rem;
 }

  .tox .tox-tbtn:hover,
  .tox-collection__item--active:not(.tox-swatch) {
    background: ${props => props.theme.StateBright} !important;
  }
 
  .tox .tox-tbtn--enabled,
  .tox .tox-tbtn:focus,
  .tox .tox-collection--toolbar .tox-collection__item--enabled,
  .tox .tox-collection--list .tox-collection__item--enabled {
    background: ${props => props.theme.StateDark} !important;
  }

  // .tox .tox-tbtn--select[aria-label="Font sizes"] {
  //   width: 4rem;
  // }

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
  .ant-dropdown-menu {
    min-width: 7rem;
  }
  .ant-dropdown-menu-submenu-title {
    padding: 0.1875rem 0.75rem;
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: ${props => props.theme.TextMain};
    :hover {
      background-color: inherit;
    }
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
  .ant-dropdown-menu-submenu-expand-icon {
    svg {
      fill : ${props => props.theme.BeigeVivid};
    }
  }
  .ant-dropdown::before{
    bottom:0 !important;
  }
  .forwardModal .ant-modal {
    width:32.5rem !important;
  }
  .forwardModal .ant-modal-body {
    padding: 0rem !important;
  }
  .viewInfoModal .ant-modal {
    width: 24.375rem !important;
  }
  .viewInfoModal .ant-modal-body {
    padding: 1.69rem 3.44rem 0 3.44rem !important;
  }
  .viewInfoModal .ant-modal-footer{
    border-top: 0px solid black !important;
    padding:1.75rem 0 !important;
  }
  .restoreModal .ant-modal {
    width: 22.5rem !important;
  }
  .restoreModal .ant-modal-header {
    height: 6.69rem !important;
    border-bottom: 0px;
  }
  .restoreModal .ant-modal-title {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 0.938rem;
  }
  .restoreModal .ant-modal-body {
    padding: 0rem !important;
    height: 10.44rem !important;
    box-sizing: border-box;
  }
  .restoreModal .ant-space-vertical,
  .restoreModal .ant-radio-group {
    width: 100%;
  }
  .restoreModal .ant-radio-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .restoreModal .ant-modal-body .ant-radio-wrapper span:nth-of-type(2){
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.813rem;
    color: ${props => props.theme.TextMain};
  }
  .ant-radio-inner::after{
    margin-top: 0;
    margin-left: 0;
  } 
  
  .restoreModal .ant-modal-footer{
    border-top: 0px;
  }
  #note-content .ant-upload.ant-upload-select{
    display: none;
  }
  .x-todo li {
    list-style:none;
  }
  .x-todo-box {
    position: relative; 
    left: -24px;
  }
  .x-todo-box input{
    position: absolute;
  }

  .tox-tinymce-inline .tox-editor-header,
  .tox .accessibility-issue__description,
  .tox .tox-comment,
  .tox .tox-menu,
  .tox .tox-slider__rail,
  .tox .tox-well,
  .tox .tox-custom-editor {
    border: 1px solid ${props => props.theme.LineOut} !important;
  }

  .tox .tox-button:not(.tox-button--naked) {
    font-weight: 500 !important;
    font-size: 0.75rem !important;
    border-radius: 4px !important;
    line-height: normal !important;
    width: 4.5rem;
    height: 1.875rem;
  }

  .tox .tox-button:not(.tox-button--icon, .tox-button--secondary) {
    background-color: ${props => props.theme.CoreNormal} !important;
    border-color: ${props => props.theme.CoreNormal} !important;
    :hover {
      background-color: ${props => props.theme.CoreBright} !important;
      border-color: ${props => props.theme.CoreBright} !important;
    }
    :active {
      background-color: ${props => props.theme.CoreDark} !important;
      border-color: ${props => props.theme.CoreDark} !important;
    }
  }
  .tox .tox-button--secondary {
    background-color: ${props => props.theme.StateNormal} !important;
    border-color: ${props => props.theme.LineOut} !important;
    color: ${props => props.theme.TextSub} !important;
    :hover {
      background-color: ${props => props.theme.StateBright} !important;
    }
    :active {
      background-color: ${props => props.theme.StateNormal} !important;
      border-color: ${props => props.theme.ClearActiveIcon} !important;
      color: ${props => props.theme.TextMain} !important;
    }
  }
  .tox .tox-button:not(.tox-button--icon)[disabled] {
    background-color: ${props => props.theme.DisabledShape} !important;
    border-color: ${props => props.theme.DisabledShape} !important;
  }
  .tox .tox-split-button {
    background: none !important;
    box-shadow: none !important;
  }

  .tox .tox-menubar,
  .tox .tox-toolbar,
  .tox .tox-toolbar__primary,
  .tox .tox-toolbar__overflow {
    background: ${props => props.theme.StateNormal} !important;
    border-bottom: 1px solid ${props => props.theme.LineMain} !important;
  }
  .tox.tox-tinymce-aux .tox-toolbar__overflow {
    border: 1px solid ${props => props.theme.LineMain} !important;
  }
  .tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type) {
    border-right: 1px solid transparent !important;
  }
  .tox .tox-collection,
  .tox .tox-swatches-menu {
    background: ${props => props.theme.StateNormal} !important;
  }
  .tox .tox-collection--list .tox-collection__group {
    border-color: ${props => props.theme.LineSub} !important;
  }
  .tox .tox-swatches__picker-btn {
    background: transparent !important;
    svg {
      fill: ${props => props.theme.TextMain} !important;
    }
  }
  
  .tox .tox-dialog {
    background-color: ${props => props.theme.StateNormal} !important;
  }
  .tox .tox-dialog .tox-dialog__header {
    background-color: inherit !important;
  }
  
  .tox .tox-dialog.tox-dialog--width-lg .tox-dialog__header .tox-button{
    width: fit-content;
  }

  .tox .tox-selectfield select {
    background-color: ${props => props.theme.StateNormal} !important;
    :hover {
      background-color: ${props => props.theme.StateBright} !important;
    }
    option:checked {
      background-color: ${props => props.theme.StateDark} !important;
    }
  }
  .tox .tox-dialog .tox-textfield,
  .tox .tox-dialog .tox-textarea {
    border-color: ${props => props.theme.LineOut} !important;
    background-color: ${props => props.theme.StateNormal} !important;
    :focus {
      border-color: ${props => props.theme.SubStateVivid} !important;
    }
  }
  .tox .tox-dialog__footer {
    background-color: inherit !important;
    border-top: 1px solid ${props => props.theme.LineOut} !important;
  }
  .tox .tox-dialog,
  .tox .tox-textfield,
  .tox .tox-toolbar-textfield,
  .tox .tox-listboxfield .tox-listbox--select,
  .tox .tox-textarea,
  .tox .tox-selectfield select,
  .tox .tox-insert-table-picker > div {
    border-color: ${props => props.theme.LineOut} !important;
  }
  .tox .tox-insert-table-picker__selected {
    background-color: ${props => props.theme.StateDark} !important;
  }
  .tox .tox-pop__dialog {
    background-color: ${props => props.theme.StateNormal} !important;
    border: 1px solid ${props => props.theme.LineOut} !important;
    border-radius: 4px !important;
  }
  .tox .tox-pop.tox-pop--bottom::after {
    border-color: ${props => props.theme.StateNormal} transparent transparent transparent !important;
  }
  .tox .tox-pop.tox-pop--bottom::before {
    border-color: ${props => props.theme.LineOut} transparent transparent transparent !important;
  }
  .tox .tox-pop.tox-pop--top::after {
    border-color: transparent transparent ${props => props.theme.StateNormal} transparent !important;
  }
  .tox .tox-pop.tox-pop--top::before {
    border-color: transparent transparent ${props => props.theme.LineOut} transparent !important;
  }
  .tox .tox-pop.tox-pop--left::after {
    border-color: transparent ${props => props.theme.StateNormal} transparent transparent !important;
  }
  .tox .tox-pop.tox-pop--left::before {
    border-color: transparent ${props => props.theme.LineOut} transparent transparent !important;
  }
  .tox .tox-pop.tox-pop--right::after {
    border-color: transparent transparent transparent ${props => props.theme.StateNormal} !important;
  }
  .tox .tox-pop.tox-pop--right::before {
    border-color: transparent transparent transparent ${props => props.theme.LineOut} !important;
  }

  mark {
    padding: 0;
    background-color: #FFE362;
  }

  #root{ 
    overflow: hidden;
  }
`;

export const LNB = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  height: 100%;
  flex: 1 1 17.06rem;
  min-width: 17.06rem;
  background-color: ${props => props.theme.StateNormal};
`;
export const Content = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  flex: 2 2 42rem;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  border-left: ${props => (props.isBorderLeft ? `1px solid ${props.theme.LineMain}` : '0px')};
  background-color: ${props => props.theme.StateNormal};
`;

export const CenterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: cener;
  justify-content: center;
`;
