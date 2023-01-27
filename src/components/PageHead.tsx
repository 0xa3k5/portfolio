import Head from "next/head";
import { StaticPage } from "../types";

interface PageHeadProps {
  page: StaticPage;
}

export default function PageHead({ page }: PageHeadProps): JSX.Element {
  return (
    <Head>
      <title>{page.title}</title>
      <meta name="description" title="description" content={page.description} />
      <meta
        name="og:description"
        title="og:description"
        content={page.description}
      />
      <meta name="og:image" title="og:title" content="/ak-logo.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
}
