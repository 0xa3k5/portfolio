import Head from 'next/head';
import NotionService from '../api/notion';
import { GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';
import { config } from '../../config';
import PostHero from '../../src/components/PostHero';
import OverviewCard from '../../src/components/OverviewCard';
import { getMorePosts } from '../../src/utils/getMorePosts';
import MorePosts from '../../src/components/MorePosts';
import { NotionPost, Feedback } from '../../@types/schema';

import FeedbackCard from '../../src/components/FeedbackCard';
import { motion, useScroll } from 'framer-motion';
import { motionVariants } from '../../src/utils/motionVariants';
import { useState, useEffect, useRef } from 'react';
import { InView } from 'react-intersection-observer';

interface DetailProps {
  markdown: string;
  post: NotionPost;
  morePosts: NotionPost[];
  feedbacks: Feedback[];
}

const Detail = ({ markdown, post, morePosts, feedbacks }: DetailProps) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [color, setColor] = useState<string>('fff');

  const ref = useRef(null);

  const postFeedbacks = feedbacks.filter((f) =>
    post.feedbacks.relationIds.includes(f.id)
  );
  const { scrollYProgress } = useScroll();

  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    function updatePos() {
      setScrollPos(window.scrollY);
    }

    window.addEventListener('scroll', updatePos, { passive: true });
    updatePos();
    console.log(scrollPos);
    scrollPos > ref.current.clientHeight
      ? setColor('ffffff')
      : setColor(post.properties.color);

    return () => window.removeEventListener('scroll', updatePos);
  }, [window.scrollY]);

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
      <motion.main
        variants={motionVariants.pageVariants}
        initial='hidden'
        animate='enter'
        exit='exit'
        transition={{ type: 'linear' }}
      >
        <div className='' ref={ref}>
          <PostHero
            post={post}
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
            color={color}
          />
        </div>
        <div className='container flex flex-col items-center space-y-24 py-24 px-6 md:px-24'>
          <OverviewCard post={post} />
          <div className='mx-auto'>
            <div className='flex items-center justify-center'>
              <motion.div
                className='fixed bottom-0 left-0 right-0 h-2 origin-[0%] bg-daisy'
                style={{ scaleX: scrollYProgress }}
              />
              <article className='with-prose'>
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </article>
            </div>
          </div>
          {postFeedbacks.length > 0 && (
            <FeedbackCard
              classname='w-full md:w-11/12'
              feedback={postFeedbacks}
            />
          )}
          <MorePosts posts={morePosts} />
        </div>
      </motion.main>
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
