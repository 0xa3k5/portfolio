import { GetStaticProps } from 'next';
import { Exploration, NotionPost, StaticPage } from '../@types/schema';
import ContentCard from '../src/components/Cards/ContentCard';
import NotionService from './api/notion';
import PageHero from '../src/components/PageHero';
import PageHead from '../src/components/PageHead';
import { motion } from 'framer-motion';
import { motionVariants } from '../src/utils/motionVariants';
import { useState, useEffect } from 'react';
import SideProjectCard from '../src/components/Cards/SideProjectCard';
import { InView } from 'react-intersection-observer';
import ExplorationsCard from '../src/components/Cards/ExplorationsCard/ExplorationsCard';

interface HomeProps {
  page: StaticPage;
  posts: NotionPost[];
  explorations: Exploration[];
}

export default function Home({ page, posts, explorations }: HomeProps) {
  const works = posts.filter((p) => p.properties.tag !== 'Side Project');
  const sideProjecs = posts.filter((p) => p.properties.tag === 'Side Project');

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [color, setColor] = useState<string>('fff');
  const [bgColor, setBgColor] = useState<string>('000');
  const [inViewPost, setInViewPost] = useState<NotionPost>(null);

  const handleInView = (postIndex: number, inView: boolean) => {
    inView
      ? setInViewPost(works.find((w, s) => s === postIndex))
      : setInViewPost(works.find((w, s) => s === postIndex - 1));
  };

  useEffect(() => {
    setColor(inViewPost?.properties?.color || 'fff');
    setBgColor(inViewPost?.properties?.bgColor || '000');
  }, [inViewPost]);

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
          color={color}
          bgColor={bgColor}
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <section className='flex flex-col md:-space-y-16 md:first-of-type:-mt-16'>
          {works
            .sort(
              (a: NotionPost, b: NotionPost) =>
                a.properties.number - b.properties.number
            )
            .map((p: NotionPost, i) => (
              <InView
                threshold={1}
                onChange={(inView) => {
                  handleInView(i, inView);
                }}
                className='work-content-card sticky top-0'
                key={`works-${p.properties.id}`}
                style={{ backgroundColor: `#${p.properties.bgColor}` }}
              >
                {p.properties.vertical ? (
                  <ContentCard.Vertical post={p} />
                ) : (
                  <ContentCard.Horizontal post={p} />
                )}
              </InView>
            ))}
        </section>
        <section className='container flex flex-col gap-8 py-24 px-8 md:gap-24 md:py-64'>
          <div className='flex items-baseline space-x-8'>
            <h2 className='w-auto whitespace-nowrap text-4xl font-bold md:text-5xl'>
              on the side
            </h2>
            <hr className='relative w-full opacity-20' />
          </div>
          {sideProjecs.map((p) => {
            return (
              <SideProjectCard post={p} key={p.properties.id} className='' />
            );
          })}
        </section>
        <section className='container flex flex-col gap-8 py-24 px-8 md:gap-24 md:py-24'>
          <div className='flex items-baseline space-x-8'>
            <h2 className='w-auto whitespace-nowrap text-4xl font-bold md:text-5xl'>
              some explorations
            </h2>
            <hr className='relative w-full opacity-20' />
          </div>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {explorations.map((exp) => {
              return <ExplorationsCard exploration={exp} key={exp.id} />;
            })}
          </div>
        </section>
      </motion.main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === 'Home'
  );
  const posts = await notionService.getPortfolioPosts();
  const explorations = await notionService.getExplorations();

  return {
    props: {
      page,
      posts,
      explorations,
    },
  };
};
