import JobHighlight from './components/JobHighlight';
import Seperator from './components/Seperator';
import PortfolioCard from './components/PortfolioCard';
import Header from './components/Header';
import Footer from './components/Footer';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import NotionService from './api/notion';
import { PortfolioPost, WorkExperience } from './api/schema';
import Head from 'next/head';

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const pageTitle = 'Ali Kemal Akcay – Product Design Portfolio'
  const pageDesc = 'Ali Kemal Akcay – Product Design Portfolio'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name='description'
          title='description'
          content={pageDesc}
        />
        <meta
          name='og:description'
          title='og:description'
          content={pageDesc}
        />
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
      <section className='border-b border-polar border-opacity-5 container h-full flex flex-col space-y-24 items-center justify-center p-24 font-inter'>
        <h2 className='font-playfair text-5xl'>Work Experience</h2>
        <div className='flex flex-col'>
          {data.workExperiences.map((w: WorkExperience, i) => {
            return (
              <>
                <JobHighlight
                  key={w.id}
                  job={w}
                  classname={
                    data.workExperiences.length > i + 1 &&
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
          {data.portfolioPosts.map((p: PortfolioPost) => {
            return <PortfolioCard key={p.id} portfolioPost={p} />;
          })}
        </div>
      </section>
      <section className='border-b border-polar border-opacity-5 container h-full flex flex-col space-y-24 items-center justify-center p-24 font-inter'>
        <h2 className='font-playfair text-5xl'>Side Projects</h2>
        <div className='container flex space-x-16'>
          {/* {data.portfolioPosts.map((p) => {
            return (
              <PortfolioCard
                key={p.id}
                img='placeholder.png'
                title={p.properties.Name.title[0].plain_text}
                description='A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country'
                period='2022'
              />
            );
          })}  */}
        </div>
      </section>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const portfolioPosts = await notionService.getPortfolioPosts();
  const workExperiences = await notionService.getWorkExperiences();

  return {
    props: {
      data: {
        portfolioPosts,
        workExperiences,
      },
    },
  };
};
