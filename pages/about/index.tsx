import NotionService from '../api/notion';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { WorkExp } from '../../@types/schema';
import WorkExperience from '../../src/components/WorkExperience';
import Head from 'next/head';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';

export default function About({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const pageTitle = data.aboutMe.title;
  const pageDesc = data.aboutMe.description;

  return (
    <div className='container'>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' title='description' content={pageDesc} />
        <meta name='og:description' title='og:description' content={pageDesc} />
        <meta name='og:image' title='og:title' content='/ak-logo.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='mx-auto flex max-w-4xl flex-col space-y-32 px-6 py-32'>
        <div className='flex flex-col flex-wrap py-8 lg:flex-row'>
          <div className='w-full md:w-4/6'>
            <div className='flex flex-col space-y-8'>
              <h1 className='font-bogart text-4xl font-bold'>
                {data.aboutMe.heroTitle}
              </h1>
              <p className='text-xl leading-relaxed opacity-80'>
                {data.aboutMe.heroText}
              </p>
            </div>
          </div>
        </div>
        <hr className='opacity-20' />
        <div className='flex flex-col'>
          {data.workExp
            .sort((a: WorkExp, b: WorkExp) => b.num - a.num, 0)
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
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const workExp = await notionService.getWorkExp();
  // const aboutMe = await notionService.getAboutMe();

  const aboutMe = (await notionService.getStaticPages())[1];

  return {
    props: {
      data: {
        aboutMe,
        workExp,
      },
    },
  };
};
