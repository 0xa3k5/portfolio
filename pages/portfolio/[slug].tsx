import Head from 'next/head';
import NotionService from '../api/notion';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';

const Detail = ({
  markdown,
  portfolioPost,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{portfolioPost.title}</title>
        <meta name='description' title='description' content={portfolioPost.description} />
        <meta name='og:description' title='og:description' content={portfolioPost.description} />
        <meta name='og:image' title='og:title' content={portfolioPost.img} />
      </Head>

      <div className='min-h-screen'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center justify-center'>
            <article className='prose'>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const p = await notionService.getPortfolioDetail(context.params?.slug);

  if (!p) {
    throw '';
  }

  return {
    props: {
      markdown: p.markdown,
      portfolioPost: p.portfolioPost,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const portfolioPosts = await notionService.getPortfolioPosts();

  const paths = portfolioPosts.map((p) => {
    return `/portfolio/${p.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Detail;
