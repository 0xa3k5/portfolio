import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NotionPost } from '../@types/schema';
import Head from 'next/head';
import ContentCard from '../src/components/ContentCard';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import NotionService from './api/notion';

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pageTitle = data.homePage.title;
  const pageDesc = data.homePage.description;

  return (
    <main className='h-screen w-screen snap-y snap-mandatory overflow-scroll'>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' title='description' content={pageDesc} />
        <meta name='og:description' title='og:description' content={pageDesc} />
        <meta name='og:image' title='og:title' content='/ak-logo.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <section className='container flex h-screen snap-center flex-col justify-between'>
        <Header />
        <div className='h-full w-full p-48'>
          <div className='flex flex-col space-y-8'>
            <h1 className='font-bogart text-6xl font-bold'>
              {data.homePage.heroTitle}
            </h1>
            <p className='max-w-2xl text-xl'>{data.homePage.heroText}</p>
          </div>
        </div>
      </section>
      <div className='flex flex-col -space-y-4'>
        {data.portfolioPosts.map((p: NotionPost, i: number) => {
          return (
            <div
              key={i}
              className='snap-center py-16'
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
        {data.sideProjects.map((p: NotionPost, i: number) => {
          return (
            <div
              key={`side-${i}`}
              className='snap-center py-32'
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
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const portfolioPosts = await notionService.getPortfolioPosts();
  const sideProjects = await notionService.getSideProjects();

  const homePage = (await notionService.getStaticPages())[0];

  return {
    props: {
      data: {
        homePage,
        portfolioPosts,
        sideProjects,
      },
    },
  };
};
