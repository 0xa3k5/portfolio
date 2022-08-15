import Head from 'next/head';
import NotionService from '../api/notion';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { config } from '../../config';

const Detail = ({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
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
      <div className='min-h-screen py-24'>
        <div className='mx-auto max-w-4xl'>
          <div className='flex items-center justify-center'>
            <article className='prose prose-xl prose-invert xl:prose-2xl'>
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const notionService = new NotionService();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const p = await notionService.getPostDetail(
    context.params?.slug[0],
    config.notion.sideProjects
  );

  if (!p) {
    throw '';
  }

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getSideProjects();

  const paths = posts.map((p) => {
    return `/side-projects/${p.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Detail;
