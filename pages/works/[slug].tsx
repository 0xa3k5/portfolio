import Head from "next/head";
import NotionService from "../api/notion";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { config } from "../../config";
import PostHero from "../../src/components/PostHero";
import OverviewCard from "../../src/components/Cards/OverviewCard";
import { getMorePosts } from "../../src/utils/getMorePosts";
import MorePosts from "../../src/components/MorePosts";
import { NotionPost, Feedback } from "../../@types/schema";
import FeedbackCard from "../../src/components/Cards/FeedbackCard";
import { motion, useScroll } from "framer-motion";
import { motionVariants } from "../../src/utils/motionVariants";
import { useState, useEffect, useRef } from "react";
import ContentReadIndicator from "../../src/components/ContentReadIndicator/index";
import Header from "../../src/components/Header/Header";
import MobileMenu from "../../src/components/Header/MobileMenu";
import { useRouter } from "next/router";
import Login from "../../src/components/Form/Login";
interface DetailProps {
  markdown: string;
  post: NotionPost;
  morePosts: NotionPost[];
  feedbacks: Feedback[];
  hasReadPermission?: boolean;
}

export default function Detail({
  markdown,
  post,
  morePosts,
  feedbacks,
  hasReadPermission,
}: DetailProps) {
  const router = useRouter();
  const ref = useRef(null);
  const mdRef = useRef();
  const { scrollYProgress } = useScroll({ target: mdRef });
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [color, setColor] = useState<string>("fff");
  const [scrollPos, setScrollPos] = useState(0);
  const [contentInView, setContentInView] = useState(false);

  const postFeedbacks = feedbacks.filter((f) =>
    post.feedbacks.relationIds.includes(f.id)
  );

  function updatePos() {
    setScrollPos(window.scrollY);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", updatePos, { passive: true });
    }

    watchScroll();

    function handleContentInView() {
      if (scrollPos > ref.current?.clientHeight + 20) {
        setColor("fff");
        setContentInView(true);
      } else {
        setColor(post.properties.color);
        setContentInView(false);
      }
    }

    window.addEventListener("scroll", updatePos, { passive: true });
    updatePos();
    handleContentInView();
    return () => window.removeEventListener("scroll", updatePos);
  }, [post.properties.color, scrollPos]);

  if (post.properties.password === false) hasReadPermission = true;

  return (
    <>
      <Head>
        <title>{post.details.title}</title>
        <meta
          name="description"
          title="description"
          content={post.details.description}
        />
        <meta
          name="og:description"
          title="og:description"
          content={post.details.description}
        />
        <meta name="og:image" title="og:title" content={post.details.img} />
      </Head>
      <Header
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
        color={hasReadPermission && color}
      />
      <MobileMenu
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
        color={hasReadPermission && color}
        bgColor={hasReadPermission && post.properties.bgColor}
      />
      {!hasReadPermission ? (
        <Login redirectPath={router.asPath} />
      ) : (
        <motion.main
          variants={motionVariants.pageVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: "linear" }}
        >
          <div className="" ref={ref}>
            <PostHero
              post={post}
              isNavbarOpen={isNavbarOpen}
              setIsNavbarOpen={setIsNavbarOpen}
              color={color}
            />
          </div>
          <div
            className="container flex flex-col items-center space-y-24 py-24 px-6 md:px-24"
            ref={mdRef}
          >
            <OverviewCard post={post} />
            <div className="mx-auto">
              <div className="flex items-center justify-center">
                {contentInView && (
                  <ContentReadIndicator
                    contentRef={mdRef}
                    post={post}
                    scrollYProgress={scrollYProgress}
                  />
                )}
                <article className="with-prose">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </article>
              </div>
            </div>
            {postFeedbacks.length > 0 && (
              <FeedbackCard.Grouped
                classname="w-full md:w-11/12"
                feedback={postFeedbacks}
              />
            )}
            <MorePosts posts={morePosts} />
          </div>
        </motion.main>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const pages = await getMorePosts(context.params?.slug as string);

  const notionService = new NotionService();

  const feedbacks = await notionService.getFeedbacks();

  const p = await notionService.getNotionPageDetail(
    context.params?.slug as string,
    config.notion().notionCareer
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
