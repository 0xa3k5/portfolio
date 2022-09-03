import { GetStaticProps } from 'next';
import { NotionPost, StaticPage } from '../@types/schema';
import ContentCard from '../src/components/ContentCard';
import NotionService from './api/notion';
import PageHero from '../src/components/PageHero';
import PageHead from '../src/components/PageHead';
import { motion } from 'framer-motion';
import { motionVariants } from '../src/utils/motionVariants';
import { useState, useEffect } from 'react';
import { InView } from 'react-intersection-observer';

interface HomeProps {
  page: StaticPage;
  works: NotionPost[];
}

export default function Home({ page, works }: HomeProps) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [color, setColor] = useState<string>('fff');
  const [bgColor, setBgColor] = useState<string>('000');
  const [inViewPost, setInViewPost] = useState<NotionPost>(null);

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
        className='scroll-'
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
                as={'div'}
                onChange={(inView) => {
                  inView
                    ? setInViewPost(works.find((w, s) => s === i - 1))
                    : setInViewPost(works.find((w, s) => s === i - 2) || null);
                }}
                style={{ backgroundColor: `#${p.properties.bgColor}` }}
                className='sticky top-0 h-screen rounded-none md:rounded-2xl'
                key={`works-${p.properties.id}`}
              >
                {p.properties.vertical ? (
                  <ContentCard.Vertical post={p} />
                ) : (
                  <ContentCard.Horizontal post={p} />
                )}
              </InView>
            ))}
        </section>
      </motion.main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const works = await notionService.getPortfolioPosts();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === 'Home'
  );

  return {
    props: {
      page,
      works,
    },
  };
};
