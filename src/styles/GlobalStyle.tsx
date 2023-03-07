import { createGlobalStyle } from 'styled-components';
import { Reset } from './Reset';

const GlobalStyle = createGlobalStyle`

${Reset}


html {
  width: 100%;
  height: 100%;
}

/* ----------------------- */

body {
  font-family: 'Noto Sans KR', sans-serif;
  transition: all 0.3s;
}

h1 {
 font-size: 3.125rem;
 font-weight: 900;
 font-family: 'S-CoreDream-7ExtraBold'
}

li {
  font-family: 'S-CoreDream-7ExtraBold'
}




@font-face {
     font-family: 'S-CoreDream-3Light';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}

@font-face {
     font-family: 'S-CoreDream-7ExtraBold';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}





`;

export default GlobalStyle;
