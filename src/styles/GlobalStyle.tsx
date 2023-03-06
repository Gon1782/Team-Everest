import { createGlobalStyle } from 'styled-components';
import { Reset } from './Reset';

const GlobalStyle = createGlobalStyle`

${Reset}


html {
  width: 100%;
  height: 100%;
}

/* ----------------------- */



h1 {
 font-size: 3.125rem;
 font-weight: 900;
 font-family: 'S-CoreDream-7ExtraBold'
}



:root {
        --primary-color: #4d65de;
        --font-large: 2.8rem;
        --font-medium: 2.6rem;
        --font-reqular: 1.375rem;
        --font-small: 1.25rem
    }


    @font-face {
    font-family: 'SBAggroB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'SBAggroM';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroM.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

    /* 300, 500, 700 */
    @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;


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
