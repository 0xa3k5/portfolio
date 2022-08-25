import Head from 'next/head';
import NotionService from '../api/notion';
import { GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import { config } from '../../config';
import PostHero from '../../src/components/PostHero';
import OverviewCard from '../../src/components/OverviewCard';
import CTA from '../../src/components/CTA';
import { getMorePosts } from '../../src/utils/getMorePosts';
import MorePosts from '../../src/components/MorePosts';
import { NotionPost, Feedback } from '../../@types/schema';

import Util from 'util';
import FeedbackCard from '../../src/components/FeedbackCard';

interface DetailProps {
  markdown: string;
  post: NotionPost;
  morePosts: NotionPost[];
  feedbacks: Feedback[];
}

const Detail = ({ markdown, post, morePosts, feedbacks }: DetailProps) => {
  const postFeedbacks = feedbacks.filter((f) =>
    post.feedbacks.relationIds.includes(f.id)
  );

  return (
    <>
      <Head>
        <title>{post.details.title}</title>
        <meta
          name='description'
          title='description'
          content={post.details.description}
        />
        <meta
          name='og:description'
          title='og:description'
          content={post.details.description}
        />
        <meta name='og:image' title='og:title' content={post.details.img} />
      </Head>
      <main className='bg-midnight'>
        <div
          className=''
          style={{
            backgroundColor: `#${post.properties.bgColor}`,
            color: `#${post.properties.color}`,
          }}
        >
          <div className='container flex h-screen flex-col justify-between'>
            <Header />
            <PostHero post={post} />
            <div className='h-32'></div>
          </div>
        </div>
        <div className='container flex flex-col items-center space-y-24 py-24 px-8 md:px-24'>
          <OverviewCard post={post} />

          <div className='mx-auto'>
            <div className='flex items-center justify-center'>
              <article className='with-prose'>
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </article>
            </div>
          </div>
          <FeedbackCard classname='w-11/12' feedback={postFeedbacks} />
          <MorePosts posts={morePosts} />
        </div>
        <CTA />
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pages = await getMorePosts(context.params?.slug as string);

  const notionService = new NotionService();

  const feedbacks = await notionService.getFeedbacks();

  const p = await notionService.getNotionPageDetail(
    context.params?.slug as string,
    config.notion.portfolioPosts
  );

  return {
    props: {
      markdown: p.markdown,
      post: p.post,
      morePosts: pages.morePosts,
      feedbacks: feedbacks,
    },
  };
};

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getPortfolioPosts();

  const paths = posts.map((p) => {
    return `/works/${p.properties.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export default Detail;
