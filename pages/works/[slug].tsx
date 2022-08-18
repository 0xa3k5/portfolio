import Head from 'next/head';
import NotionService from '../api/notion';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import { config } from '../../config';

const Detail = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className='container'>
      <Head>
        <title>{post.title}</title>
        <meta
          name='description'
          title='description'
          content={post.description}
        />
        <meta
          name='og:description'
          title='og:description'
          content={post.description}
        />
        <meta name='og:image' title='og:title' content={post.img} />
      </Head>
      <Header />
      <div className='py-24'>
        <div className='mx-auto max-w-4xl'>
          <div className='flex items-center justify-center'>
            <article className='prose prose-base prose-invert prose-headings:font-bogart prose-headings:font-semibold prose-h4:font-normal prose-li:opacity-80 prose-img:rounded-xl md:prose-xl lg:prose-2xl'>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  const p = await notionService.getNotionPageDetail(
    context.params?.slug as string,
    config.notion.portfolioPosts
  );

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getPortfolioPosts();

  const paths = posts.map((p) => {
    return `/works/${p.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Detail;
