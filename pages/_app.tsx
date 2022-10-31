import { AnimatePresence } from "framer-motion";
import type { AppContext, AppProps } from "next/app";
import Footer from "../src/components/Footer";
import CTA from "../src/components/CTA";
import App from "next/app";
import { SessionProvider } from "next-auth/react";

import "../src/styles/globals.css";
import Header from "../src/components/Header/Header";
import { useState } from "react";
import MobileMenu from "../src/components/Header/MobileMenu";
function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const url = `https://akml.io${router.route}`;

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [color, setColor] = useState<string>("fff");

  return (
    <SessionProvider session={session}>
      <Header isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
      <MobileMenu
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} canonical={url} key={url} />
      </AnimatePresence>
      <CTA />
      <Footer />
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
