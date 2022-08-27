import NotionService from '../api/notion';
import { GetStaticProps } from 'next';
import { WorkExp, StaticPage } from '../../@types/schema';
import WorkExperience from '../../src/components/WorkExperience';
import Footer from '../../src/components/Footer';
import CTA from '../../src/components/CTA';
import PageHero from '../../src/components/PageHero';
import PageHead from '../../src/components/PageHead';
import { useState } from 'react';

interface AboutProps {
  page: StaticPage;
  workExp: WorkExp[];
}

export default function About({ page, workExp }: AboutProps): JSX.Element {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <PageHead page={page} />
      <main className={`${isNavbarOpen ? 'scroll-none' : ''} h-screen`}>
        <PageHero
          page={page}
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <div className='container mx-auto flex max-w-4xl flex-col px-16 lg:px-0'>
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
