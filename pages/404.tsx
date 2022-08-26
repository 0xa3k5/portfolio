import { GetStaticProps } from 'next';
import Head from 'next/head';
import { NotionPost, StaticPages } from '../@types/schema';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import NotionService from './api/notion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import RightArrowPlain from '../public/icons/right-arrow-plain.svg';

interface WorksProps {
  page: StaticPages;
  portfolioPosts: NotionPost[];
}

export default function Works({
  page,
  portfolioPosts,
}: WorksProps): JSX.Element {
  const [hovered, setHovered] = useState<NotionPost>(null);

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta
          name='description'
          title='description'
          content={page.description}
        />
        <meta
          name='og:description'
          title='og:description'
          content={page.description}
        />
        <meta name='og:image' title='og:title' content={''} />
      </Head>
      <main className='bg-midnight'>
        <div className='container flex flex-col justify-between px-8 xl:px-0'>
          <Header />
          <div className='max-w-2xl py-24 md:py-48 '>
            <div className='flex flex-col space-y-8'>
              <h1 className='font-bogart text-4xl font-bold md:text-6xl'>
                {page.heroTitle}
              </h1>
              <p className='text-lg md:text-xl'>{page.heroText}</p>
            </div>
          </div>
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
                      className='max-w-lg border-b border-white border-opacity-10 font-bogart text-2xl font-medium leading-snug last:border-none md:text-3xl'
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

  const page = (await notionService.getStaticPages()).find(
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
