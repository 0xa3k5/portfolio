import { AnimatePresence } from "framer-motion";
import type { AppContext, AppProps } from "next/app";
import Footer from "../src/components/Footer";
import CTA from "../src/components/CTA";
import App from "next/app";
import { SessionProvider } from "next-auth/react";
import "../src/styles/globals.css";
import Header from "../src/components/Header/Header";
import MobileMenu from "../src/components/Header/MobileMenu";
import { ContextProvider } from "../hooks/useAppContext";
function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const url = `https://akml.io${router.route}`;

  return (
    <ContextProvider>
      <SessionProvider session={session}>
        <Header />
        <MobileMenu />
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
    </ContextProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
