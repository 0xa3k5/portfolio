import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { WorkExp, Post } from '../@types/schema';
import Head from 'next/head';
import WorkExperience from './components/WorkExperience/WorkExperience';
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
      <section className='container flex flex-col justify-between '>
        <Header />
        <div className='h-full w-full py-64 pl-8'>
          <div className='flex flex-col space-y-8'>
            <h1 className='font-playfair text-6xl font-bold'>
              👋 My Name is Ali Kemal
            </h1>
            <p className='text-xl max-w-2xl'>
              People call me AK, I&apos;m a product designer and passionate
              about crypto.
            </p>
          </div>
        </div>
      </section>
      <section className='border-b border-woodBlue container flex flex-col space-y-24 items-center justify-center py-48'>
        <h2 className='font-playfair text-6xl font-bold'>Work Experience</h2>
        <div className='flex flex-col space-y-16 w-full px-96'>
          {data.workExp
            .sort((a, b) => b.num - a.num, 0)
            .map((w: WorkExp, i) => {
              return (
                <>
                  <WorkExperience
                    key={w.id}
                    job={w}
                    classname={
                      data.workExp.length > i + 1 && 'border-b border-woodBlue'
                    }
                  />
                </>
              );
            })}
        </div>
      </section>
      <section className='container border-b border-woodBlue w-full flex flex-col space-y-40 items-center py-64'>
        <h2 className='font-playfair text-6xl font-bold'>Career Highlights</h2>
        <div className='flex flex-col space-y-40 w-full'>
          {data.careerHighlights.map((p: Post) => {
            return <ContentCard.Full key={p.id} post={p} type='career' />;
          })}
        </div>
      </section>
      <section className='border-b border-woodBlue container h-full flex flex-col space-y-24 items-center justify-center py-48'>
        <h2 className='font-playfair text-6xl font-bold'>Side Projects</h2>
        <div className='container grid grid-cols-2 gap-16'>
          {data.sideProjects.map((p: Post) => {
            return (
              <ContentCard.Vertical
                key={p.id}
                post={p}
                type='side-projects'
                className='h-full'
              />
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const workExp = await notionService.getWorkExp();
  const careerHighlights = await notionService.getCareerHighlights();
  const sideProjects = await notionService.getSideProjects();

  return {
    props: {
      data: {
        workExp,
        careerHighlights,
        sideProjects,
      },
    },
  };
};
