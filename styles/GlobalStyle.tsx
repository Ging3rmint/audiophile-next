import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: 'Manrope', sans-serif;
    }

    .container-lg{
      max-width: 1440px;
      padding: 0 20px;
      margin: 0 auto;
    }

    .container{
      max-width: 1150px;
      padding: 0 20px;
      margin: 0 auto;
    }

    .sr-only{
      height: 1px;
      width: 1px;
      visibility: hidden;
      opacity: 0;
      position: absolute;
      z-index: 0;
    }

    img{
        display: block;
    }

    ul{
      list-style: none;
    }

    a{
      text-decoration: none;
    }
`;
