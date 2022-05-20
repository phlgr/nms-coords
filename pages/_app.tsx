import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLayout from "../layout/AppLayout";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>NMS Coordinates</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
          >
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}
