import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import Footer from "../src/components/Footer";
import CTA from "../src/components/CTA";
import { SessionProvider } from "next-auth/react";
import "../src/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "../src/components/Sidebar";

function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const url = `https://akml.io${router.route}`;

  return (
    <SessionProvider session={session}>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Sidebar />
        <Component {...pageProps} canonical={url} key={url} />
        <Analytics />
      </AnimatePresence>
      <CTA />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
