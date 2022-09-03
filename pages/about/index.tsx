import NotionService from '../api/notion';
import { GetStaticProps } from 'next';
import { WorkExp, StaticPage } from '../../@types/schema';
import WorkExperience from '../../src/components/WorkExperience';
import PageHead from '../../src/components/PageHead';
import PageHero from '../../src/components/PageHero';
import { motion } from 'framer-motion';
import { motionVariants } from '../../src/utils/motionVariants';
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
      <motion.main
        variants={motionVariants.pageVariants}
        initial='hidden'
        animate='enter'
        exit='exit'
        transition={{ type: 'linear' }}
      >
        <PageHero
          page={page}
          className='snap-center'
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <div className='container mx-auto flex max-w-4xl flex-col px-4 lg:px-0'>
          {workExp
            .sort((a: WorkExp, b: WorkExp) => b.num - a.num)
            .map((w: WorkExp) => {
              return (
                <WorkExperience
                  job={w}
                  key={`about-${w.id}`}
                  classname='border-b border-opacity-20 border-white last-of-type:border-none'
                />
              );
            })}
        </div>
      </motion.main>
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
