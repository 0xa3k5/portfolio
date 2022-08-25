import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NotionPost } from '../@types/schema';
import Head from 'next/head';
import ContentCard from '../src/components/ContentCard';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import NotionService from './api/notion';
import CTA from '../src/components/CTA';

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pageTitle = data.homePage.title;
  const pageDesc = data.homePage.description;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' title='description' content={pageDesc} />
        <meta name='og:description' title='og:description' content={pageDesc} />
        <meta name='og:image' title='og:title' content='/ak-logo.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <main className='h-screen snap-y snap-mandatory overflow-scroll'>
        <section className='container flex h-screen snap-start flex-col justify-between'>
          <Header />
          <div className='max-w-2xl'>
            <div className='flex flex-col space-y-8'>
              <h1 className='font-bogart text-4xl font-bold md:text-5xl lg:text-6xl'>
                {data.homePage.heroTitle}
              </h1>
              <p className='text-lg md:text-xl'>{data.homePage.heroText}</p>
            </div>
          </div>
          <div className='h-10'></div>
        </section>
        <div className='flex flex-col'>
          {data.works
            .sort((a: NotionPost, b: NotionPost) => a.properties.number - b.properties.number)
            .map((p: NotionPost) => {
              return (
                <div
                  key={`works-${p.properties.id}`}
                  style={{ backgroundColor: `#${p.properties.bgColor}` }}
                >
                  {p.properties.vertical ? (
                    <ContentCard.Vertical key={p.properties.id} post={p} />
                  ) : (
                    <ContentCard.Horizontal key={p.properties.id} post={p} />
                  )}
                </div>
              );
            })}
        </div>
        <CTA className='snap-center' />
        <Footer className='snap-center' />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const works = await notionService.getPortfolioPosts();

  const homePage = (await notionService.getStaticPages())[0];

  return {
    props: {
      data: {
        homePage,
        works,
      },
    },
  };
};
