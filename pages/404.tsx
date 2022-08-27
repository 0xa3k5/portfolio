import { GetStaticProps } from 'next';
import { NotionPost, StaticPage } from '../@types/schema';
import Footer from '../src/components/Footer';
import NotionService from './api/notion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import PageHero from '../src/components/PageHero';
import PageHead from '../src/components/PageHead';

import RightArrowPlain from '../public/icons/right-arrow-plain.svg';

interface WorksProps {
  page: StaticPage;
  portfolioPosts: NotionPost[];
}

export default function Works({
  page,
  portfolioPosts,
}: WorksProps): JSX.Element {
  const [hovered, setHovered] = useState<NotionPost>(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <PageHead page={page} />
      <main className=''>
        <PageHero
          page={page}
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        <div className='container flex flex-col justify-between px-8 xl:px-0'>
          <div className='flex items-start space-x-16'>
            <ul className='flex flex-1 flex-col space-y-12 pb-48'>
              {portfolioPosts
                .sort(
                  (a: NotionPost, b: NotionPost) =>
                    a.properties.number - b.properties.number
                )
                .map((p) => {
                  return (
                    <li
                      key={p.properties.id}
                      className='max-w-lg border-b border-white border-opacity-10 font-lora text-2xl font-medium leading-snug last:border-none md:text-3xl'
                      onMouseEnter={() => setHovered(p)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <Link href={`/works/${p.properties.slug}`}>
                        <div className='group flex items-start space-x-4 pb-12 duration-200 hover:cursor-pointer hover:space-x-0 hover:text-daisy'>
                          <RightArrowPlain className='w-8 shrink-0 text-white opacity-40 duration-200 group-hover:translate-x-1/2 group-hover:opacity-100' />
                          <span className='duration-200 group-hover:translate-x-5'>
                            {p.details.title}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
            </ul>
            {hovered && (
              <div className='relative hidden flex-1 md:block'>
                <Image
                  src={hovered.details.img}
                  alt={hovered.details.title}
                  layout='responsive'
                  height='100%'
                  width='100%'
                  objectFit='contain'
                  objectPosition='middle middle'
                  priority
                />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
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
