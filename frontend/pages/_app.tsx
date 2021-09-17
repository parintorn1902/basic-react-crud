import "../styles/globals.css";
import "@fontsource/inter";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import AuthManager from "../src/core/auth/AuthManager";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#151515",
      },
    },
  },
  fonts: {
    body: "Inter",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  const authCheck = (url: string) => {
    const publicPaths = ["/", "/login"];
    const path = url.split("?")[0];
    if (!AuthManager.isLogin() && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push("/");
    } else {
      setAuthorized(true);
    }
  };

  return (
    <ChakraProvider theme={theme}>{authorized && <Component {...pageProps} />}</ChakraProvider>
  );
}
export default MyApp;
