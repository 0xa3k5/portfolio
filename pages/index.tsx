import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { WorkExp, Post } from '../@types/schema';
import Head from 'next/head';
import JobHighlight from './components/JobHighlight';
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
        <meta name='og:image' title='og:title' content='/akpfp.png' />
      </Head>
      <section className='flex flex-col items-center h-screen justify-between border-b border-polar border-opacity-5 container'>
        <Header />
        <div className='h-full w-full pb-24 justify-center items-center flex'>
          <div className='flex flex-col items-center space-y-8'>
            <h1 className='font-playfair text-6xl'>
              I design digital products
            </h1>
            <p className='text-xl max-w-2xl text-center'>
              A small river named Duden flows by their place and supplies it
              with the necessary regelialia. It is a paradisematic country
            </p>
          </div>
        </div>
      </section>
      <section className='border-b border-polar border-opacity-5 container h-full flex flex-col space-y-24 items-center justify-center px-24 py-48 font-inter'>
        <h2 className='font-playfair text-5xl'>Work Experience</h2>
        <div className='flex flex-col'>
          {data.workExp.map((w: WorkExp, i) => {
            return (
              <>
                <JobHighlight
                  key={w.id}
                  job={w}
                  classname={
                    data.workExp.length > i + 1 &&
                    'border-b border-woodBlue'
                  }
                />
              </>
            );
          })}
        </div>
      </section>
      <section className='border-b border-polar border-opacity-5 container h-full flex flex-col space-y-24 items-center justify-center py-24 font-inter'>
        <h2 className='font-playfair text-5xl'>Career Highlights</h2>
        <div className='container items-center flex flex-col space-y-12'>
          {data.careerHighlights.map((p: Post) => {
            return <ContentCard key={p.id} post={p} type='career' />
          })}
        </div>
      </section>
      <section className='border-b border-polar border-opacity-5 container h-full flex flex-col space-y-24 items-center justify-center p-24 font-inter'>
        <h2 className='font-playfair text-5xl'>Side Projects</h2>
        <div className='container flex space-x-16'>
          {data.sideProjects.map((p: Post) => {
            return <ContentCard key={p.id} post={p} type='side-projects' />;
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
