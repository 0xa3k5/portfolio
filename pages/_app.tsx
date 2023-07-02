import "../src/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeContextProvider } from "../src/contexts/ThemeContext";

function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const url = `https://akml.io${router.route}`;
  return (
    <ThemeContextProvider>
      <SessionProvider session={session}>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} canonical={url} key={url} />
        </AnimatePresence>
        <Analytics />
      </SessionProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
