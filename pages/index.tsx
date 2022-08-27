import { GetStaticProps } from 'next';
import { NotionPost, StaticPage } from '../@types/schema';
import ContentCard from '../src/components/ContentCard';
import Footer from '../src/components/Footer';
import NotionService from './api/notion';
import CTA from '../src/components/CTA';
import PageHero from '../src/components/PageHero';
import PageHead from '../src/components/PageHead';
import { useState } from 'react';

interface HomeProps {
  page: StaticPage;
  works: NotionPost[];
}

export default function Home({ page, works }: HomeProps) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <PageHead page={page} />
      <main className='h-screen snap-y snap-mandatory overflow-scroll'>
        <PageHero
          page={page}
          isNavbarOpen={isNavbarOpen}
          setIsNavbarOpen={setIsNavbarOpen}
        />
        {works
          .sort(
            (a: NotionPost, b: NotionPost) =>
              a.properties.number - b.properties.number
          )
          .map((p: NotionPost) => (
            <section
              key={`works-${p.properties.id}`}
              style={{ backgroundColor: `#${p.properties.bgColor}` }}
              // className='h-[calc(100vh_+_10rem)] pt-32'
            >
              {p.properties.vertical ? (
                <ContentCard.Vertical key={p.properties.id} post={p} />
              ) : (
                <ContentCard.Horizontal key={p.properties.id} post={p} />
              )}
            </section>
          ))}

        <CTA className='snap-center' />
        <Footer className='snap-center' />
      </main>
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
