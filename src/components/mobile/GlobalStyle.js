import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  // tag style
  .ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
    padding: 1.25rem 0;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0.625rem 0;
  }
`;

export default GlobalStyle;
