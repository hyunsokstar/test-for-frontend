import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { wrapper } from "../store";


const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp)

