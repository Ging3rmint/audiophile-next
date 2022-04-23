import { createGlobalStyle } from "styled-components";
import { colors } from "../constants";

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

    .button-back {
      margin-bottom: 56px;
      display: inline-block;
      color: ${colors.black};
      opacity: 0.5;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }

    .cart-listing {
      padding: 0 16px;
      min-height: 100px;
      max-height: 400px;
      overflow-y: auto;
      margin-bottom: 32px;
      margin-top: 32px;
  
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
      }
      ::-webkit-scrollbar-thumb {
        background: #e1e1e1;
        border: 0px none #ffffff;
        border-radius: 50px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #ffffff;
      }
      ::-webkit-scrollbar-thumb:active {
        background: #000000;
      }
      ::-webkit-scrollbar-track {
        background: #666666;
        border: 0px none #ffffff;
        border-radius: 50px;
      }
      ::-webkit-scrollbar-track:hover {
        background: #666666;
      }
      ::-webkit-scrollbar-track:active {
        background: #333333;
      }
      ::-webkit-scrollbar-corner {
        background: transparent;
      }
    }
`;
