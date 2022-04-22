import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { GlobalStyle } from "styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Component {...pageProps} />{" "}
      </Provider>
    </>
  );
}

export default MyApp;
