import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  a{
    text-decoration:none;
    color:inherit;
  }
  *{
    box-sizing:boerder-box;
  }
  body{
    font-size: 16px;
  }
  .a11y-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    margin: -1px;
    clip-path: polygon(0 0, 0 0, 0 0);
    clip: rect(0 0 0 0);
    clip: rect(0, 0, 0, 0);
  }
`;

export default GlobalStyles;
