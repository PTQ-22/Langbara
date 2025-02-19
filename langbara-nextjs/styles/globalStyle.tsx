import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    width: 100%;
    background: ${({ theme }: any) => theme.gradients.vertical};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    @media (min-width: 800px) {
      background: ${({ theme }: any) => theme.gradients.horizontal};
    }
    color: white;
  }
  html {
   
    background-color: #19535F;
  }


  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    scroll-behavior:smooth;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      color: white;
    }
  }
`;
