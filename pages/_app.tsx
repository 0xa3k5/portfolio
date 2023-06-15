import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../src/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeContextProvider } from "../src/contexts/ThemeContext";

function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const url = `https://akml.io${router.route}`;
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} canonical={url} key={url} />
          <Analytics />
        </AnimatePresence>
      </ThemeContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
