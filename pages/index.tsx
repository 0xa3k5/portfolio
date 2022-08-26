import { GetStaticProps } from 'next';
import { NotionPost, StaticPage } from '../@types/schema';
import ContentCard from '../src/components/ContentCard';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import NotionService from './api/notion';
import CTA from '../src/components/CTA';
import PageHero from '../src/components/PageHero';
import PageHead from '../src/components/PageHead';

interface HomeProps {
  page: StaticPage;
  works: NotionPost[];
}

export default function Home({ page, works }: HomeProps) {
  return (
    <>
      <PageHead page={page} />
      <main className='h-screen snap-y snap-mandatory overflow-scroll'>
        <div className='flex h-screen snap-center flex-col justify-between'>
          <Header />
          <PageHero page={page} />
          <div className='h-32'></div>
        </div>
        <div className='flex flex-col'>
          {works
            .sort(
              (a: NotionPost, b: NotionPost) =>
                a.properties.number - b.properties.number
            )
            .map((p: NotionPost) => {
              return (
                <div
                  key={`works-${p.properties.id}`}
                  style={{ backgroundColor: `#${p.properties.bgColor}` }}
                >
                  {p.properties.vertical ? (
                    <ContentCard.Vertical key={p.properties.id} post={p} />
                  ) : (
                    <ContentCard.Horizontal key={p.properties.id} post={p} />
                  )}
                </div>
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
