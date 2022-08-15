import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post } from '../@types/schema';
import Head from 'next/head';
import ContentCard from './components/ContentCard';
import Header from './components/Header';
import Footer from './components/Footer';
import NotionService from './api/notion';

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pageTitle = 'Ali Kemal Akcay – Product Design Portfolio';
  const pageDesc = 'Ali Kemal Akcay – Product Design Portfolio';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' title='description' content={pageDesc} />
        <meta name='og:description' title='og:description' content={pageDesc} />
        <meta name='og:image' title='og:title' content='/ak-logo.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <section className='container flex h-screen flex-col justify-between'>
        <Header />
        <div className='h-full w-full p-48'>
          <div className='flex flex-col space-y-8'>
            <h1 className='font-bogart text-6xl font-bold'>
              👋 My Name is Ali Kemal
            </h1>
            <p className='max-w-2xl text-xl'>
              People call me AK, I&apos;m a product designer and passionate
              about crypto.
            </p>
          </div>
        </div>
      </section>
      <div className='flex flex-col -space-y-4'>
        {data.portfolioPosts.map((p: Post, i) => {
          return (
            <div
              key={i}
              className='py-32'
              style={{ backgroundColor: `#${p.bgColor}` }}
            >
              {p.vertical ? (
                <ContentCard.Vertical key={p.id} post={p} />
              ) : (
                <ContentCard.Horizontal key={p.id} post={p} />
              )}
            </div>
          );
        })}
      </div>
      <div className='flex flex-col -space-y-4'>
        {data.sideProjects.map((p: Post, i) => {
          return (
            <div
              key={i}
              className='py-32'
              style={{ backgroundColor: `#${p.bgColor}` }}
            >
              {p.vertical ? (
                <ContentCard.Vertical key={p.id} post={p} />
              ) : (
                <ContentCard.Horizontal key={p.id} post={p} />
              )}
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const workExp = await notionService.getWorkExp();
  const portfolioPosts = await notionService.getPortfolioPosts();
  const sideProjects = await notionService.getSideProjects();

  return {
    props: {
      data: {
        workExp,
        portfolioPosts,
        sideProjects,
      },
    },
  };
};
