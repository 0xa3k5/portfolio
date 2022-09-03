import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import CTA from '../src/components/CTA';
import '../src/styles/globals.css';
import Footer from '../src/components/Footer';

function MyApp({ Component, pageProps, router }: AppProps) {
  const url = `https://akml.io${router.route}`;

  return (
    <>
      <AnimatePresence
        mode='wait'
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} canonical={url} key={url} />
      </AnimatePresence>
      <CTA />
      <Footer />
    </>
  );
}
export default MyApp;
