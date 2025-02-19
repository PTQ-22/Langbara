import "../styles/fonts.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/globalStyle";
import { theme } from "../styles/theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LangBara({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
      <ToastContainer 
        hideProgressBar={true}
        position={"bottom-center"}
        theme="colored"
        pauseOnHover
        closeButton={true}
        toastStyle={{backgroundColor: '#10363e', color: 'white'}}
      />
    </ThemeProvider>
  );
}

export default LangBara;
