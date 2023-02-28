import { createGlobalStyle } from 'styled-components';
import { Reset } from './Reset';

const GlobalStyle = createGlobalStyle`

${Reset}

html {
  width: 100%;
  height: 100%;
}

h1 {
 font-size: 2.4rem;
 font-weight: 900;
}
`;

export default GlobalStyle;
