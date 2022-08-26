import NotionService from '../api/notion';
import { GetStaticProps } from 'next';
import { WorkExp, StaticPage } from '../../@types/schema';
import WorkExperience from '../../src/components/WorkExperience';
import Head from 'next/head';
import Footer from '../../src/components/Footer';
import CTA from '../../src/components/CTA';
import PageHero from '../../src/components/PageHero';
import Header from '../../src/components/Header';

interface AboutProps {
  page: StaticPage;
  workExp: WorkExp[];
}

export default function About({ page, workExp }: AboutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta
          name='description'
          title='description'
          content={page.description}
        />
        <meta
          name='og:description'
          title='og:description'
          content={page.description}
        />
        <meta name='og:image' title='og:title' content='/ak-logo.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <main className=''>
        <div className='flex h-screen flex-col justify-between'>
          <Header />
          <PageHero page={page} />
          <div className='h-32'></div>
        </div>
        <div className='contianer mx-auto flex max-w-4xl flex-col px-16 lg:px-0'>
          {workExp
            .sort((a: WorkExp, b: WorkExp) => b.num - a.num)
            .map((w: WorkExp) => {
              return (
                <WorkExperience
                  job={w}
                  key={`about-${w.id}`}
                  classname='border-b border-opacity-20 border-white'
                />
              );
            })}
        </div>
        <CTA className='snap-center' />
        <Footer className='snap-center' />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const workExp = await notionService.getWorkExp();
  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === 'About'
  );

  return {
    props: {
      page,
      workExp,
    },
  };
};
