import Head from 'next/head';
import NotionService from '../api/notion';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import { config } from '../../config';
import PostHero from '../../src/components/PostHero';
import OverviewCard from '../../src/components/OverviewCard';
import CTA from '../../src/components/CTA';
import { getPosts } from '../../src/utils/getPosts';
import MorePosts from '../../src/components/MorePosts';

const Detail = ({
  markdown,
  post,
  morePosts,
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
      <main className='bg-midnight'>
        <div
          className=''
          style={{
            backgroundColor: `#${post.bgColor}`,
            color: `#${post.color}`,
          }}
        >
          <div className='container flex h-screen flex-col justify-between'>
            <Header />
            <PostHero post={post} />
            <div className='h-32'></div>
          </div>
        </div>
        <div className='container flex flex-col items-center space-y-24 py-24'>
          <OverviewCard post={post} />
          <div className='mx-auto'>
            <div className='flex items-center justify-center'>
              <article className='with-prose'>
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </article>
            </div>
          </div>
          <MorePosts posts={morePosts} />
        </div>
        <CTA />
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pages = await getPosts(context.params?.slug as string);

  const notionService = new NotionService();

  const p = await notionService.getNotionPageDetail(
    context.params?.slug as string,
    config.notion.portfolioPosts
  );

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
      morePosts: pages.morePosts,
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
