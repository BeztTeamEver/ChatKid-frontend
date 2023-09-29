import "@/styles/global.css";
import { MantineProvider, ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { getCookie, setCookie } from "cookies-next";
import NextApp, { AppProps, AppContext } from "next/app";
import { Nunito } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

import Layout from "../components/layout/layout";

const nunito = Nunito({ subsets: ["latin"] });

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);

    setCookie("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <Layout>
      <Head>
        <title>Kid Talkie</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <main className={nunito.className}>
            <Component {...pageProps} />
          </main>
          <Notifications />
        </MantineProvider>
      </ColorSchemeProvider>
    </Layout>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
  };
};
