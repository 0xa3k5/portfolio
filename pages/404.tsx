import { GetStaticProps } from 'next';
import { NotionPost, StaticPage } from '../@types/schema';
import NotionService from './api/notion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import PageHero from '../src/components/PageHero';
import PageHead from '../src/components/PageHead';

import RightArrowPlain from '../public/icons/right-arrow-plain.svg';
import { motion } from 'framer-motion';
import { motionVariants } from '../src/utils/motionVariants';

interface WorksProps {
  page: StaticPage;
  portfolioPosts: NotionPost[];
}

export default function Works({
  page,
  portfolioPosts,
}: WorksProps): JSX.Element {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [hovered, setHovered] = useState<NotionPost>(null);

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
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <div className='container flex items-center space-x-16 px-8 py-8 md:py-16'>
          <div className='flex min-h-[50vh] flex-1 flex-col space-y-12'>
            {portfolioPosts
              .sort(
                (a: NotionPost, b: NotionPost) =>
                  a.properties.number - b.properties.number
              )
              .map((p) => {
                return (
                  <div
                    key={p.properties.id}
                    className='max-w-md border-b border-white border-opacity-10 last:border-none '
                    onMouseEnter={() => setHovered(p)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <Link href={`/works/${p.properties.slug}`}>
                      <div className='group flex items-start space-x-4 pb-12 duration-200 hover:cursor-pointer hover:text-daisy md:hover:space-x-3'>
                        <RightArrowPlain className='w-8 shrink-0 text-white opacity-40 duration-200 group-hover:opacity-100 md:group-hover:translate-x-1/3' />
                        <span className='font-vollkorn text-2xl font-medium leading-snug duration-200 md:text-3xl lg:max-w-lg'>
                          {p.details.title}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          {hovered && (
            <div className='relative hidden flex-1 md:block'>
              <Image
                src={hovered.details.img}
                alt={hovered.details.title}
                layout='responsive'
                height='80%'
                width='100%'
                objectFit='contain'
                objectPosition='top'
                priority
                unoptimized
              />
            </div>
          )}
        </div>
      </motion.main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();

  const page = (await notionService.getStaticPage()).find(
    (data) => data.name === '404'
  );

  const portfolioPosts = await notionService.getPortfolioPosts();

  return {
    props: {
      page,
      portfolioPosts,
    },
  };
};
